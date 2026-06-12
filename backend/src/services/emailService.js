import { Resend } from "resend";
import { env } from "../config/env.js";

let resend;

function getResend() {
  if (!env.resendApiKey) return null;
  if (!resend) resend = new Resend(env.resendApiKey);
  return resend;
}

export async function sendAdminNotification({ subject, title, lines = [] }) {
  const client = getResend();
  if (!client) return null;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#182027">
      <h2>${title}</h2>
      ${lines.map((line) => `<p>${line}</p>`).join("")}
    </div>
  `;

  return client.emails.send({
    from: env.resendFromEmail,
    to: env.adminNotifyEmail,
    subject,
    html
  });
}
