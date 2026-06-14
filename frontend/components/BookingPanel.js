"use client";

import { useState } from "react";

export default function BookingPanel({ type = "stay" }) {
  const copy = {
    stay: {
      title: "Check Room Availability",
      action: "Request Stay"
    },
    spa: {
      title: "Book a Spa Treatment",
      action: "Request Spa Booking"
    },
    lounge: {
      title: "Reserve Lounge Table",
      action: "Request Reservation"
    }
  }[type];

  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function adjustGuests(delta) {
    setGuests((prev) => Math.min(20, Math.max(1, prev + delta)));
  }

  return (
    <form
      className="soft-card rounded-lg p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h3 className="font-serif text-2xl font-bold leading-tight">{copy.title}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {type === "stay" ? (
          <>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Check-in
              <input
                className="field"
                type="date"
                required
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && checkOut < e.target.value) setCheckOut(e.target.value);
                }}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-mist">
              Check-out
              <input
                className="field"
                type="date"
                required
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Date
              <input
                className="field"
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-mist">
              {type === "spa" ? "Preferred time" : "Time"}
              <input
                className="field"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </>
        )}

        <label className="grid gap-2 text-sm font-bold text-mist">
          {type === "spa" ? "People" : "Guests"}
          <div className="flex items-center rounded-lg border border-line bg-cream">
            <button
              type="button"
              aria-label="Decrease guests"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-l-lg text-xl font-bold text-mist transition hover:bg-pool/10 disabled:opacity-40"
              onClick={() => adjustGuests(-1)}
              disabled={guests <= 1}
            >
              −
            </button>
            <span className="flex-1 text-center text-base font-black text-charcoal">
              {guests} {guests === 1 ? "person" : "people"}
            </span>
            <button
              type="button"
              aria-label="Increase guests"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-r-lg text-xl font-bold text-mist transition hover:bg-pool/10 disabled:opacity-40"
              onClick={() => adjustGuests(1)}
              disabled={guests >= 20}
            >
              +
            </button>
          </div>
        </label>

      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="btn-secondary" type="submit">{copy.action}</button>
        <p className="text-sm leading-6 text-mist">
          Share your preferred date and guest count. The Moorland team will confirm availability and next steps.
        </p>
      </div>

      {submitted && (
        <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal" role="status">
          Thank you. Your request has been captured for confirmation.
        </p>
      )}
    </form>
  );
}
