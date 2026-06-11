"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="soft-card rounded-lg p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-mist">
          Full name
          <input className="field" required placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Email
          <input className="field" type="email" required placeholder="you@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Interest
          <select className="field" defaultValue="Accommodation">
            <option>Accommodation</option>
            <option>SPA booking</option>
            <option>Lounge reservation</option>
            <option>Events and private dining</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-mist">
          Message
          <textarea className="field min-h-36 resize-y" required placeholder="Tell us what you need" />
        </label>
      </div>
      <button className="btn-secondary mt-5 w-full" type="submit">Send Inquiry</button>
      {sent && <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold" role="status">Inquiry preview saved. Backend email delivery will be connected later.</p>}
    </form>
  );
}
