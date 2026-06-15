import { db } from "../db/index.js";
import { env } from "../config/env.js";
import { createId, now } from "../utils/ids.js";
import { AppError } from "../utils/errors.js";

const referenceCollections = {
  accommodation: "accommodationBookings",
  spa: "spaBookings",
  "food-order": "foodOrders",
  event: "eventBookings"
};

function mpesaBaseUrl() {
  return env.mpesaEnv === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

function hasMpesaConfig() {
  return Boolean(
    env.mpesaConsumerKey &&
    env.mpesaConsumerSecret &&
    env.mpesaShortcode &&
    env.mpesaPasskey &&
    (env.mpesaCallbackUrl || env.backendUrl)
  );
}

function mpesaTimestamp() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join("");
}

export function normalizeMpesaPhone(phone = "") {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
  if (digits.startsWith("1") && digits.length === 9) return `254${digits}`;
  return digits;
}

async function getAccessToken() {
  const credentials = Buffer.from(`${env.mpesaConsumerKey}:${env.mpesaConsumerSecret}`).toString("base64");
  const response = await fetch(`${mpesaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new AppError(data.errorMessage || data.error || "M-PESA authentication failed", 502, data);
  }
  return data.access_token;
}

function callbackUrl() {
  return env.mpesaCallbackUrl || `${env.backendUrl}/api/payments/mpesa/callback`;
}

async function initiateStkPush({ amount, phone, referenceId }) {
  if (!hasMpesaConfig()) {
    return {
      provider: "mpesa-stk",
      status: "config_required",
      instructions: "Add MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, and MPESA_CALLBACK_URL to activate STK Push."
    };
  }

  const timestamp = mpesaTimestamp();
  const password = Buffer.from(`${env.mpesaShortcode}${env.mpesaPasskey}${timestamp}`).toString("base64");
  const token = await getAccessToken();
  const phoneNumber = normalizeMpesaPhone(phone);
  const payload = {
    BusinessShortCode: env.mpesaShortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.ceil(Number(amount)),
    PartyA: phoneNumber,
    PartyB: env.mpesaShortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl(),
    AccountReference: `${env.mpesaAccountReference}-${referenceId}`.slice(0, 12),
    TransactionDesc: env.mpesaTransactionDesc
  };

  const response = await fetch(`${mpesaBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ResponseCode !== "0") {
    throw new AppError(data.errorMessage || data.ResponseDescription || "M-PESA STK Push failed", 502, data);
  }

  return {
    provider: "mpesa-stk",
    status: "pending",
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
    providerReference: data.CheckoutRequestID,
    instructions: data.CustomerMessage || "STK Push sent. Complete the M-PESA prompt on your phone.",
    rawProviderResponse: data
  };
}

async function syncReferenceStatus(payment) {
  const collection = referenceCollections[payment.referenceType];
  if (!collection || !payment.referenceId) return null;
  const nextStatus = payment.status === "paid" ? "confirmed" : payment.status === "failed" ? "failed" : undefined;
  if (!nextStatus) return null;
  return db.update(collection, payment.referenceId, {
    status: nextStatus,
    paymentStatus: payment.status,
    paymentId: payment.id
  });
}

export async function createPayment({ referenceType, referenceId, method, amount, phone = "" }) {
  const base = {
    id: createId("pay"),
    referenceType,
    referenceId,
    method,
    amount: Number(amount),
    phone,
    status: "pending",
    provider: method === "mpesa" ? "mpesa-stk" : `${method}-manual`,
    providerReference: "",
    instructions:
      method === "mpesa"
        ? "STK Push is being prepared."
        : "Payment record created for manual confirmation.",
    createdAt: now(),
    updatedAt: now()
  };

  const providerData = method === "mpesa"
    ? await initiateStkPush({ amount, phone, referenceId })
    : {};

  const payment = await db.insert("payments", {
    ...base,
    ...providerData
  });

  if (payment.status === "paid" || payment.status === "failed") await syncReferenceStatus(payment);
  return payment;
}

function callbackItems(body) {
  return body?.Body?.stkCallback?.CallbackMetadata?.Item || [];
}

function callbackValue(body, name) {
  return callbackItems(body).find((item) => item.Name === name)?.Value;
}

export async function handleMpesaCallback(body) {
  const callback = body?.Body?.stkCallback;
  if (!callback?.CheckoutRequestID) {
    throw new AppError("Invalid M-PESA callback payload", 422);
  }

  const payments = await db.get("payments");
  const payment = payments.find((item) => item.checkoutRequestId === callback.CheckoutRequestID);
  if (!payment) {
    return { received: true, matched: false, checkoutRequestId: callback.CheckoutRequestID };
  }

  const success = Number(callback.ResultCode) === 0;
  const patch = {
    status: success ? "paid" : "failed",
    resultCode: callback.ResultCode,
    resultDescription: callback.ResultDesc,
    merchantRequestId: callback.MerchantRequestID,
    checkoutRequestId: callback.CheckoutRequestID,
    providerReference: callbackValue(body, "MpesaReceiptNumber") || payment.providerReference,
    mpesaReceiptNumber: callbackValue(body, "MpesaReceiptNumber") || "",
    transactionDate: callbackValue(body, "TransactionDate") || "",
    paidPhone: callbackValue(body, "PhoneNumber") || "",
    paidAmount: callbackValue(body, "Amount") || "",
    rawCallback: body,
    paidAt: success ? now() : payment.paidAt || "",
    updatedAt: now()
  };

  const updated = await db.update("payments", payment.id, patch);
  await syncReferenceStatus(updated);
  return { received: true, matched: true, payment: updated };
}

export async function verifyMpesaPayment(paymentId) {
  const payment = (await db.get("payments")).find((item) => item.id === paymentId);
  if (!payment) throw new AppError("Payment not found", 404);
  if (payment.method !== "mpesa") return payment;
  if (!payment.checkoutRequestId) return payment;
  if (!hasMpesaConfig()) return payment;

  const timestamp = mpesaTimestamp();
  const password = Buffer.from(`${env.mpesaShortcode}${env.mpesaPasskey}${timestamp}`).toString("base64");
  const token = await getAccessToken();
  const response = await fetch(`${mpesaBaseUrl()}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      BusinessShortCode: env.mpesaShortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: payment.checkoutRequestId
    })
  });
  const data = await response.json().catch(() => ({}));
  const resultCode = data.ResultCode ?? data.ResponseCode;
  const updated = await db.update("payments", payment.id, {
    status: String(resultCode) === "0" ? "paid" : payment.status,
    queryResult: data,
    resultCode,
    resultDescription: data.ResultDesc || data.ResponseDescription || payment.resultDescription || "",
    updatedAt: now()
  });
  await syncReferenceStatus(updated);
  return updated;
}

export async function markPaymentStatus(paymentId, status) {
  const payment = await db.update("payments", paymentId, {
    status,
    paidAt: status === "paid" ? now() : "",
    updatedAt: now()
  });
  if (payment) await syncReferenceStatus(payment);
  return payment;
}
