"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function Newsletter() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  return (
    <form
      className="rounded-lg bg-charcoal p-6 text-ivory shadow-soft md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setSending(true);
        setError("");
        const formData = new FormData(event.currentTarget);
        try {
          await apiClient.post("/newsletter", {
            email: formData.get("email"),
            name: formData.get("name") || ""
          });
          setDone(true);
          event.currentTarget.reset();
        } catch (requestError) {
          setError(requestError.response?.data?.message || requestError.message || "Could not subscribe.");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 font-bold">
          Name
          <input className="field bg-ivory text-charcoal" name="name" placeholder="Your name" />
        </label>
        <label className="grid gap-2 font-bold">
          Join the opening list
          <input className="field bg-ivory text-charcoal" name="email" type="email" placeholder="you@example.com" required />
        </label>
        <button className="btn-primary" type="submit" disabled={sending}>{sending ? "Sending..." : "Notify Me"}</button>
      </div>
      {done && <p className="mt-4 text-sm font-bold text-pool" role="status">Thank you. You are on the opening list.</p>}
      {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800" role="alert">{error}</p>}
    </form>
  );
}
