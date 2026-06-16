"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars, FaChevronDown, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { contact, navItems } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const bookingLinks = [
    { label: "Book Room", href: "/accommodations#booking" },
    { label: "Reserve Table", href: "/lounge#reservation" },
    { label: "Book Spa", href: "/spa#booking" },
    { label: "Events", href: "/lounge#events" }
  ];

  const getBookingInfo = (href) => {
    switch (href) {
      case "/accommodations#booking":
        return {
          title: "Stay with Us",
          desc: "Presidential, Executive & Superior suites."
        };
      case "/spa#booking":
        return {
          title: "Spa & Wellness",
          desc: "Signature massages & restorative body rituals."
        };
      case "/lounge#reservation":
        return {
          title: "Lounge Dining",
          desc: "African classics & signature cocktails."
        };
      case "/lounge#events":
        return {
          title: "Events & Conferences",
          desc: "Private dining, meetings & celebrations."
        };
      default:
        return { title: "", desc: "" };
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-charcoal/90 text-ivory shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300">
      <div className="luxury-container flex min-h-[76px] items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="group flex items-center gap-3.5" aria-label="Moorland House & Spa home">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-pool/30 bg-cream transition duration-300 group-hover:border-pool group-hover:scale-105 shadow-[0_0_15px_rgba(69,184,172,0.15)]">
            <img src="/logo.png" alt="" className="h-full w-full object-cover transition duration-300" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-wide group-hover:text-pool transition duration-300">Moorland</span>
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.22em] text-pool/90">House & Spa</span>
          </span>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="nav-link text-[11px] font-bold uppercase tracking-[0.18em] text-cream/90 transition hover:text-pool"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Quick WhatsApp Contact */}
          <a 
            href={contact.whatsapp} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-cream/80 transition hover:border-pool hover:bg-white/5 hover:text-pool"
          >
            <FaWhatsapp className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Hover Reservations Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setBookingOpen(true)}
            onMouseLeave={() => setBookingOpen(false)}
          >
            <button 
              className="flex items-center gap-2 rounded-full bg-pool px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-charcoal shadow-glow transition hover:scale-102 hover:bg-pool/90 active:scale-98"
              onClick={() => setBookingOpen(!bookingOpen)}
            >
              <span>Reservations</span>
              <FaChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${bookingOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {bookingOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-3 w-80 rounded-xl border border-white/10 bg-charcoal/95 p-2 shadow-2xl backdrop-blur-md"
                >
                  <div className="grid gap-1">
                    {bookingLinks.map((item) => {
                      const info = getBookingInfo(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex flex-col rounded-lg p-3.5 transition hover:bg-white/5"
                          onClick={() => setBookingOpen(false)}
                        >
                          <span className="font-serif text-sm font-bold text-ivory group-hover:text-pool transition-colors duration-200">
                            {info.title}
                          </span>
                          <span className="mt-1 text-[11px] leading-relaxed text-cream/60 transition group-hover:text-cream/80 duration-200">
                            {info.desc}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory xl:hidden transition duration-300 hover:border-pool"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-white/10 bg-charcoal/95 px-5 py-6 shadow-2xl xl:hidden backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mx-auto grid max-w-md gap-3" aria-label="Mobile navigation">
              {/* Mobile Reservations Group */}
              <div className="mb-2 rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-pool">
                  Reservations
                </p>
                <div className="mt-2.5 grid gap-1.5">
                  {bookingLinks.map((item) => {
                    const info = getBookingInfo(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col rounded-lg p-2.5 hover:bg-white/5"
                        onClick={() => setOpen(false)}
                      >
                        <span className="font-serif text-sm font-bold text-ivory">
                          {info.title}
                        </span>
                        <span className="text-[11px] text-cream/50 mt-0.5 leading-normal">
                          {info.desc}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Standard mobile links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-wider text-ivory/80 hover:bg-white/5 hover:text-pool transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Quick Action Buttons */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a 
                  href={contact.whatsapp} 
                  className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-pool/50 text-xs font-bold text-pool hover:bg-pool/10 transition w-full" 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
