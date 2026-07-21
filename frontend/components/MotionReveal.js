"use client";

import { motion } from "framer-motion";

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * MotionReveal — wraps any content and animates it into view when it
 * enters the viewport. Supports staggered children via `staggerChildren`.
 *
 * @param {"fadeUp"|"fadeLeft"|"fadeRight"|"scale"|"fade"} variant
 * @param {number} delay — seconds before animation starts
 * @param {number} duration — animation duration in seconds
 * @param {boolean} stagger — if true, children animate in sequence
 * @param {number} staggerDelay — gap between child animations
 */
export default function MotionReveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  stagger = false,
  staggerDelay = 0.1,
  once = true,
}) {
  const selectedVariant = variants[variant] ?? variants.fadeUp;

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={selectedVariant}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionItem — use inside a stagger MotionReveal as direct children.
 * Picks up the parent's stagger timing automatically.
 */
export function MotionItem({
  children,
  className = "",
  variant = "fadeUp",
  duration = 0.6,
}) {
  const selectedVariant = variants[variant] ?? variants.fadeUp;
  return (
    <motion.div
      className={className}
      variants={selectedVariant}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
