"use client";

import { useState } from "react";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="rounded-lg bg-charcoal p-6 text-ivory shadow-soft md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 font-bold">
          Join the opening list
          <input className="field bg-ivory text-charcoal" type="email" placeholder="you@example.com" required />
        </label>
        <button className="btn-primary" type="submit">Notify Me</button>
      </div>
      {done && <p className="mt-4 text-sm font-bold text-pool" role="status">Thank you. Newsletter backend will be connected later.</p>}
    </form>
  );
}
