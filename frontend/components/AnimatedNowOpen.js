"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedNowOpen() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="now-open-badge"
      aria-label="Now Open · Moorland House & Spa"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing live dot */}
      <span className="now-open-dot" aria-hidden="true">
        <span className="now-open-dot-ring" />
      </span>

      <motion.span
        className="now-open-label"
        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Now Open
      </motion.span>

      <span className="now-open-divider" aria-hidden="true" />

      <motion.span
        className="now-open-sub"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        Moorland House &amp; Spa · Migori
      </motion.span>
    </motion.div>
  );
}
