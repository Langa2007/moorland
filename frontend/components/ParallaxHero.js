"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxHero — wraps the hero section and applies a smooth parallax
 * to the background image. The image moves at ~40% of scroll speed,
 * creating that cinematic "site is moving under you" effect.
 */
export default function ParallaxHero({ src, alt, children, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image moves upward slower than the scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Slight scale-down as you scroll away adds cinematic feel
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  // Content fades and drifts up slightly on exit
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className={`hero-image relative grid place-items-end overflow-hidden bg-charcoal text-ivory ${className}`}>
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y, scale }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover opacity-70"
          fetchpriority="high"
        />
      </motion.div>

      {/* Gradient overlay — static */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/25" />

      {/* Content fades out as you scroll away */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}
