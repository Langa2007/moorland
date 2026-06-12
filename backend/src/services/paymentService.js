import { db } from "../db/index.js";
import { createId, now } from "../utils/ids.js";

export async function createPayment({ referenceType, referenceId, method, amount, phone = "" }) {
  const status = method === "mpesa" ? "pending" : "pending";
  const payment = await db.insert("payments", {
    id: createId("pay"),
    referenceType,
    referenceId,
    method,
    amount,
    phone,
    status,
    provider: method === "mpesa" ? "mpesa-stk-preview" : `${method}-preview`,
    providerReference: createId("provider"),
    instructions:
      method === "mpesa"
        ? "M-Pesa STK Push placeholder created. Add Safaricom Daraja credentials to make this live."
        : "Payment placeholder created. Connect a card or mobile money gateway before production.",
    createdAt: now(),
    updatedAt: now()
  });

  return payment;
}
