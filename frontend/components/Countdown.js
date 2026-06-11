"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-07-01T00:00:00+03:00").getTime();

function getTimeLeft() {
  const distance = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Countdown to grand opening on 1 July 2026">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="rounded-lg border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
          <span className="block font-serif text-2xl font-bold sm:text-4xl">{String(value).padStart(2, "0")}</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-cream/80">{label}</span>
        </div>
      ))}
    </div>
  );
}
