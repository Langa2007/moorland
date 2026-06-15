import { Resend } from "resend";
import { env } from "../config/env.js";

let resend;

function getResend() {
  if (!env.resendApiKey) return null;
  if (!resend) resend = new Resend(env.resendApiKey);
  return resend;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlTemplate(title, lines = [], action = null) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#182027;background:#f7f3ea;padding:24px">
      <div style="max-width:640px;margin:0 auto;background:#fffaf1;border-radius:8px;padding:24px;border:1px solid #e8dfcf">
        <p style="margin:0 0 8px;color:#0e8f8f;font-weight:800;text-transform:uppercase;letter-spacing:.08em">Moorland House & Spa</p>
        <h2 style="margin:0 0 16px;font-family:Georgia,serif;color:#182027">${escapeHtml(title)}</h2>
        ${lines.map((line) => `<p style="margin:0 0 10px">${escapeHtml(line)}</p>`).join("")}
        ${action ? `<p style="margin-top:22px"><a href="${escapeHtml(action.href)}" style="display:inline-block;background:#0e8f8f;color:#182027;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:800">${escapeHtml(action.label)}</a></p>` : ""}
      </div>
    </div>
  `;
}

async function sendMail({ to, subject, title, lines = [], action = null }) {
  const client = getResend();
  if (!client || !to) return null;
  return client.emails.send({
    from: env.resendFromEmail,
    to,
    subject,
    html: htmlTemplate(title, lines, action)
  });
}

export async function sendAdminNotification({ subject, title, lines = [] }) {
  return sendMail({ to: env.adminNotifyEmail, subject, title, lines });
}

export async function sendGuestNotification({ to, subject, title, lines = [], action = null }) {
  return sendMail({ to, subject, title, lines, action });
}

export async function sendBookingReceived({ booking, kind, payment }) {
  const paymentLine = payment
    ? `Payment status: ${payment.status}. ${payment.instructions || ""}`
    : "Payment: cash or pay-on-arrival request.";
  return sendGuestNotification({
    to: booking.email,
    subject: `Moorland ${kind} received`,
    title: `Your ${kind} request is received`,
    lines: [
      `Hello ${booking.name}, thank you for choosing Moorland House & Spa.`,
      `Reference: ${booking.id}`,
      paymentLine,
      "Our team will review the details and confirm shortly."
    ]
  });
}

export async function sendStatusNotification({ record, kind, status }) {
  return sendGuestNotification({
    to: record.email,
    subject: `Moorland ${kind} ${status}`,
    title: `Your ${kind} is ${status}`,
    lines: [
      `Hello ${record.name}, your ${kind} reference ${record.id} is now ${status}.`,
      status === "confirmed"
        ? "We look forward to hosting you."
        : "Contact our team if you need support or changes."
    ]
  });
}
