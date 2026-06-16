import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";
import { contact, navItems } from "@/lib/data";
import CookieBanner from "./CookieBanner";

const socialIconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  x: FaXTwitter,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp
};

function socialIcon(label) {
  return socialIconMap[label.toLowerCase().replace(/\s|\(.*\)/g, "")] || FaXTwitter;
}

export default function Footer() {
  const socialLinks = [
    ...(contact.socials || []),
    { label: "WhatsApp", handle: "Chat", href: contact.whatsapp }
  ];

  return (
    <>
      <footer className="bg-charcoal text-ivory">
        <div className="luxury-container grid gap-10 py-14 lg:grid-cols-[1.1fr_0.85fr_1fr_1.05fr]">
          <div>
            <p className="font-serif text-3xl font-bold">Moorland House & Spa</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-cream/80">
              Where Elegance Meets Serenity. Luxury stays, dining, Spa rituals, poolside calm, events, and curated hospitality.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = socialIcon(social.label);
                return (
                  <a
                    key={`${social.label}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition hover:border-pool hover:bg-white/10 hover:text-pool"
                    aria-label={`Visit Moorland House & Spa on ${social.label}`}
                    title={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-pool">Explore</p>
            <div className="mt-4 grid gap-3 text-sm text-cream/80">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-pool">
                  {item.label}
                </Link>
              ))}
              <Link href="/lounge#events" className="hover:text-pool">Events</Link>
              <Link href="/blog" className="hover:text-pool">Blog & Wellness</Link>
            </div>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-pool">Guest Care</p>
            <div className="mt-4 grid gap-3 text-sm text-cream/80">
              <Link href="/privacy" className="hover:text-pool">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-pool">Terms & Conditions</Link>
              <Link href="/cookie-policy" className="hover:text-pool">Cookie Policy</Link>
              <Link href="/contact" className="hover:text-pool">Contact Team</Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="font-bold uppercase tracking-[0.14em] text-pool">Location</p>
            <div className="mt-4 grid gap-4 text-sm leading-6 text-cream/85">
              <p className="flex gap-3">
                <MdLocationPin className="mt-1 h-5 w-5 shrink-0 text-pool" />
                <span>
                  <span className="block font-black text-ivory">Migori Kenya</span>
                  <span className="text-cream/70">Luxury hospitality, Spa, dining, events, and accommodation.</span>
                </span>
              </p>
              <a href={contact.phoneLink} className="flex gap-3 hover:text-pool">
                <MdPhone className="mt-0.5 h-5 w-5 shrink-0 text-pool" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-pool">
                <MdMail className="mt-0.5 h-5 w-5 shrink-0 text-pool" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-cream/60">
          Copyright 2026 Moorland House & Spa. All rights reserved.
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}
