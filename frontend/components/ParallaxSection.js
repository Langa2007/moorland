"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxSection — a full-width banner with a parallax background image.
 * Use between content sections as a cinematic divider or as a section background.
 *
 * @param {string} src — image URL
 * @param {string} alt — image alt text
 * @param {string} overlay — CSS class or inline color for overlay darkness
 * @param {number} speed — parallax speed factor (0 = static, 1 = full scroll). Default 0.35
 */
export default function ParallaxSection({
  src,
  alt = "",
  children,
  className = "",
  minHeight = "420px",
  speed = 0.35,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yPercent = speed * 50; // max shift in percent
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${yPercent}%`, `${yPercent}%`]
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-[-30%] will-change-transform"
        style={{ y }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Content */}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
