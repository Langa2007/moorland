"use client";

import { useState } from "react";

export default function BookingPanel({ type = "stay" }) {
  const copy = {
    stay: {
      title: "Check Room Availability",
      fields: ["Check-in", "Check-out", "Guests"],
      action: "Preview Stay Booking"
    },
    spa: {
      title: "Book a SPA Treatment",
      fields: ["Date", "Preferred time", "Guests"],
      action: "Preview SPA Booking"
    },
    lounge: {
      title: "Reserve Lounge Table",
      fields: ["Date", "Time", "Guests"],
      action: "Preview Reservation"
    }
  }[type];

  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="soft-card rounded-lg p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h3 className="font-serif text-2xl font-bold">{copy.title}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {copy.fields.map((field, index) => (
          <label key={field} className="grid gap-2 text-sm font-bold text-mist">
            {field}
            {field.toLowerCase().includes("guest") ? (
              <select className="field" defaultValue="2">
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="4">4 guests</option>
                <option value="6">6 guests</option>
              </select>
            ) : field.toLowerCase().includes("time") ? (
              <select className="field" defaultValue="18:30">
                <option value="10:00">10:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
            ) : (
              <input className="field" type="date" defaultValue={index === 1 && type === "stay" ? "2026-07-03" : "2026-07-01"} />
            )}
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="btn-secondary" type="submit">{copy.action}</button>
        <p className="text-sm leading-6 text-mist">
          Availability preview only. Backend booking, deposits, M-Pesa, card, and mobile money will connect later.
        </p>
      </div>
      {submitted && (
        <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal" role="status">
          Preview request captured. A real confirmation flow will be connected to the backend.
        </p>
      )}
    </form>
  );
}
