import Link from "next/link";
import { contact, navItems } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="luxury-container grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-bold">Moorland House & SPA</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-cream/80">
            Where Elegance Meets Serenity. A luxury lounge, SPA, boutique accommodation, pool, and gardens destination
            opening on 1 July 2026.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-cream hover:border-pool"
              >
                {social.label}
              </a>
            ))}
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
            <Link href="/blog" className="hover:text-pool">Blog & Wellness</Link>
            <Link href="/privacy" className="hover:text-pool">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-pool">Terms</Link>
          </div>
        </div>

        <div>
          <p className="font-bold uppercase tracking-[0.14em] text-pool">Contact</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-cream/80">
            <a href={contact.phoneLink} className="hover:text-pool">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="hover:text-pool">{contact.email}</a>
            <span>{contact.website}</span>
            <span>{contact.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/60">
        Copyright 2026 Moorland House & SPA. All rights reserved.
      </div>
    </footer>
  );
}
