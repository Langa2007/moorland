"use client";

import { motion, useReducedMotion } from "framer-motion";

const headline = "Coming Soon";
const subtitle = "Grand Opening 1 July 2026";

export default function AnimatedComingSoon() {
  const reduceMotion = useReducedMotion();
  const letters = headline.split("");

  if (reduceMotion) {
    return (
      <div className="coming-soon-badge" aria-label={`${headline}. ${subtitle}`}>
        <span className="coming-soon-text">{headline}</span>
        <span className="coming-soon-divider" />
        <span className="coming-soon-date">{subtitle}</span>
      </div>
    );
  }

  return (
    <div className="coming-soon-badge" aria-label={`${headline}. ${subtitle}`}>
      <span className="sr-only">{headline}</span>
      <span className="coming-soon-text" aria-hidden="true">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className={letter === " " ? "inline-block w-2 sm:w-3" : "inline-block"}
            initial={{ opacity: 0, y: 8, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: index * 0.09,
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
        <motion.span
          className="coming-soon-caret"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 1, 0] }}
          transition={{ delay: letters.length * 0.09, duration: 1.4, repeat: Infinity, repeatDelay: 0.7 }}
        />
      </span>
      <motion.span
        className="coming-soon-divider"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="coming-soon-date"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.55 }}
      >
        {subtitle}
      </motion.span>
    </div>
  );
}
