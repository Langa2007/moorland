"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { contact, navItems } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [swahili, setSwahili] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pool/30 bg-charcoal text-ivory shadow-[0_14px_44px_rgba(24,32,39,0.22)]">
      <div className="luxury-container flex min-h-[74px] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label="Moorland House & SPA home">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-pool/50 bg-cream text-sm font-black text-charcoal">
            MH
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold">Moorland</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-pool">House & SPA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-bold text-ivory"
            onClick={() => setSwahili((value) => !value)}
            aria-pressed={swahili}
          >
            {swahili ? "SW" : "EN"}
          </button>
          <a href={contact.whatsapp} className="min-h-11 rounded-full border border-pool/50 px-4 py-2 text-sm font-bold text-cream transition hover:border-pool hover:bg-pool/10" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link href="/accommodations#booking" className="btn-primary text-sm">
            {swahili ? "Weka Nafasi" : "Book Now"}
          </Link>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="h-0.5 w-5 bg-ivory before:block before:h-0.5 before:w-5 before:-translate-y-2 before:bg-ivory before:content-[''] after:block after:h-0.5 after:w-5 after:translate-y-[6px] after:bg-ivory after:content-['']" />
        </button>
      </div>

      <AnimatePresence>
      {open && (
        <motion.div
          className="border-t border-white/10 bg-charcoal px-4 py-5 shadow-soft xl:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <nav className="mx-auto grid max-w-md gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 font-bold text-ivory hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={contact.whatsapp} className="btn-primary mt-3" target="_blank" rel="noreferrer">
              WhatsApp Inquiry
            </a>
          </nav>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
