"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function ReviewForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await apiClient.post("/reviews", {
        name: form.get("name"),
        role: form.get("role") || "Guest",
        rating: Number(form.get("rating")),
        quote: form.get("quote"),
        stayDate: form.get("stayDate") || undefined
      });
      setStatus("Thank you. Your review has been sent for approval.");
      event.currentTarget.reset();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not send review.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="soft-card rounded-lg p-5" onSubmit={submit}>
      <h3 className="font-serif text-2xl font-bold">Share a Review</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input className="field" name="name" required placeholder="Full name" />
        <input className="field" name="role" placeholder="Guest, family traveler, event host" />
        <select className="field" name="rating" defaultValue="5">
          {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
        </select>
        <input className="field" name="stayDate" type="date" />
      </div>
      <textarea className="field mt-4 min-h-28" name="quote" required placeholder="Tell us about your experience" />
      <button className="btn-secondary mt-4" type="submit" disabled={sending}>{sending ? "Sending..." : "Submit Review"}</button>
      {status && <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal" role="status">{status}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800" role="alert">{error}</p>}
    </form>
  );
}
