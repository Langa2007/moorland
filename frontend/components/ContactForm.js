"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <form
      className="soft-card rounded-lg p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setSending(true);
        setError("");
        const formData = new FormData(event.currentTarget);
        try {
          await apiClient.post("/contact", {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone") || "",
            interest: formData.get("interest"),
            message: formData.get("message")
          });
          setSent(true);
          event.currentTarget.reset();
        } catch (requestError) {
          setError(requestError.response?.data?.message || requestError.message || "Could not send inquiry.");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-mist">
          Full name
          <input className="field" name="name" required placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Email
          <input className="field" name="email" type="email" required placeholder="you@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Phone
          <input className="field" name="phone" type="tel" placeholder="+254..." />
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Interest
          <select className="field" name="interest" defaultValue="Accommodation">
            <option>Accommodation</option>
            <option>SPA booking</option>
            <option>Lounge reservation</option>
            <option>Events and private dining</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Message
          <textarea className="field min-h-36 resize-y" name="message" required placeholder="Tell us what you need" />
        </label>
      </div>
      <button className="btn-secondary mt-5 w-full" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send Inquiry"}
      </button>
      {sent && <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold" role="status">Inquiry sent. The Moorland team has been notified.</p>}
      {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800" role="alert">{error}</p>}
    </form>
  );
}
