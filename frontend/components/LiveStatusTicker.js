"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const highlights = [
  { icon: "🌿", label: "Spa", detail: "Open daily · 9 AM – 8 PM" },
  { icon: "🍽️", label: "Lounge", detail: "Lunch & Dinner · 11 AM – 10 PM" },
  { icon: "🏊", label: "Pool & Grounds", detail: "Sunrise to Sunset · All guests" },
  { icon: "🛏️", label: "Rooms", detail: "3 suite tiers · Walk-ins welcome" },
];

export default function LiveStatusTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const item = highlights[activeIndex];

  return (
    <div
      className="live-ticker"
      aria-label="Moorland House highlights"
      role="region"
    >
      <div className="live-ticker-dots">
        {highlights.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Show ${highlights[i].label}`}
            className={`ticker-dot${i === activeIndex ? " ticker-dot--active" : ""}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="live-ticker-row"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? false : { opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="ticker-icon" aria-hidden="true">{item.icon}</span>
          <div>
            <span className="ticker-label">{item.label}</span>
            <span className="ticker-detail">{item.detail}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
