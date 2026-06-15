"use client";

import { useMemo, useState } from "react";
import { apiClient } from "@/lib/apiClient";

const copy = {
  stay: {
    title: "Check Room Availability",
    action: "Book Room",
    endpoint: "/bookings/accommodation"
  },
  spa: {
    title: "Book a Spa Treatment",
    action: "Book Spa",
    endpoint: "/bookings/spa"
  },
  lounge: {
    title: "Reserve Lounge Table",
    action: "Reserve Table",
    endpoint: "/reservations/lounge"
  },
  event: {
    title: "Plan an Event or Conference",
    action: "Request Event",
    endpoint: "/bookings/events"
  }
};

function todayValue() {
  return new Date().toISOString().split("T")[0];
}

function firstId(items) {
  return items?.[0]?.id || "";
}

export default function BookingPanel({ type = "stay", rooms = [], services = [] }) {
  const settings = copy[type] || copy.stay;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [guests, setGuests] = useState(type === "event" ? 30 : 2);
  const today = todayValue();
  const selectable = type === "stay" ? rooms : type === "spa" ? services : [];
  const defaultResourceId = firstId(selectable);
  const paymentHint = useMemo(() => (
    type === "lounge" ? "No deposit is required online for table reservations." : "Choose M-PESA for instant STK Push or cash for team confirmation."
  ), [type]);

  function adjustGuests(delta) {
    const max = type === "event" ? 500 : type === "lounge" ? 40 : type === "spa" ? 4 : 12;
    setGuests((prev) => Math.min(max, Math.max(1, prev + delta)));
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setStatus("");
    const form = new FormData(event.currentTarget);
    const shared = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      guests,
      notes: form.get("notes") || ""
    };

    const payloads = {
      stay: {
        ...shared,
        roomId: form.get("roomId"),
        checkIn: form.get("checkIn"),
        checkOut: form.get("checkOut"),
        paymentMethod: form.get("paymentMethod")
      },
      spa: {
        ...shared,
        serviceId: form.get("serviceId"),
        date: form.get("date"),
        time: form.get("time"),
        paymentMethod: form.get("paymentMethod")
      },
      lounge: {
        ...shared,
        date: form.get("date"),
        time: form.get("time"),
        occasion: form.get("occasion") || ""
      },
      event: {
        ...shared,
        date: form.get("date"),
        time: form.get("time"),
        eventType: form.get("eventType"),
        organization: form.get("organization") || "",
        setup: form.get("setup") || "",
        packageName: form.get("packageName") || "",
        paymentMethod: form.get("paymentMethod"),
        depositAmount: Number(form.get("depositAmount") || 0)
      }
    };

    try {
      const response = await apiClient.post(settings.endpoint, payloads[type]);
      const data = response.data?.data || {};
      const record = data.booking || data.order || data;
      const payment = data.payment;
      setStatus(`${settings.action} received. Reference: ${record.id}${payment ? `. Payment: ${payment.status}. ${payment.instructions || ""}` : "."}`);
      event.currentTarget.reset();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not submit request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="soft-card rounded-lg p-5" onSubmit={submit}>
      <h3 className="font-serif text-2xl font-bold leading-tight">{settings.title}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {type === "stay" ? (
          <>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Room
              <select className="field" name="roomId" required defaultValue={defaultResourceId}>
                {rooms.map((room) => <option key={room.id || room.name} value={room.id}>{room.name}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Check-in
              <input className="field" name="checkIn" type="date" min={today} required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Check-out
              <input className="field" name="checkOut" type="date" min={today} required />
            </label>
          </>
        ) : null}

        {type === "spa" ? (
          <>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Treatment
              <select className="field" name="serviceId" required defaultValue={defaultResourceId}>
                {services.map((service) => <option key={service.id || service.name} value={service.id}>{service.name}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Date
              <input className="field" name="date" type="date" min={today} required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Time
              <input className="field" name="time" type="time" required />
            </label>
          </>
        ) : null}

        {["lounge", "event"].includes(type) ? (
          <>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Date
              <input className="field" name="date" type="date" min={today} required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              Time
              <input className="field" name="time" type="time" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-mist">
              {type === "event" ? "Event type" : "Occasion"}
              <input className="field" name={type === "event" ? "eventType" : "occasion"} required={type === "event"} placeholder={type === "event" ? "Conference, wedding, retreat" : "Dinner, birthday, meeting"} />
            </label>
          </>
        ) : null}

        <label className="grid gap-2 text-sm font-bold text-mist">
          {type === "spa" ? "People" : "Guests"}
          <div className="flex min-h-11 items-center rounded-lg border border-line bg-cream">
            <button type="button" aria-label="Decrease guests" className="h-11 w-11 text-xl font-bold text-mist" onClick={() => adjustGuests(-1)}>-</button>
            <span className="flex-1 text-center text-base font-black text-charcoal">{guests}</span>
            <button type="button" aria-label="Increase guests" className="h-11 w-11 text-xl font-bold text-mist" onClick={() => adjustGuests(1)}>+</button>
          </div>
        </label>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
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
          <input className="field" name="phone" type="tel" required placeholder="2547..." />
        </label>
      </div>

      {type === "event" ? (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-mist">
            Organization
            <input className="field" name="organization" placeholder="Company or group" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-mist">
            Setup
            <input className="field" name="setup" placeholder="Boardroom, banquet, theatre" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-mist">
            Deposit amount
            <input className="field" name="depositAmount" type="number" min="0" placeholder="Optional" />
          </label>
        </div>
      ) : null}

      {type !== "lounge" ? (
        <label className="mt-5 grid gap-2 text-sm font-bold text-mist md:max-w-xs">
          Payment
          <select className="field" name="paymentMethod" defaultValue="mpesa">
            <option value="mpesa">M-PESA STK Push</option>
            <option value="cash">Cash / pay at property</option>
          </select>
        </label>
      ) : null}

      <label className="mt-5 grid gap-2 text-sm font-bold text-mist">
        Notes
        <textarea className="field min-h-28" name="notes" placeholder="Special requests, accessibility needs, arrival time" />
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="btn-secondary" type="submit" disabled={submitting}>{submitting ? "Sending..." : settings.action}</button>
        <p className="text-sm leading-6 text-mist">{paymentHint}</p>
      </div>

      {status && <p className="mt-4 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal" role="status">{status}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800" role="alert">{error}</p>}
    </form>
  );
}
