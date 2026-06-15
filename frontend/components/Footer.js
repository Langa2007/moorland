import Link from "next/link";
import { contact, navItems } from "@/lib/data";
import CookieBanner from "./CookieBanner";

export default function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: contact.socials.find((s) => s.label === "Facebook")?.href || "https://facebook.com",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      )
    },
    {
      label: "Instagram",
      href: contact.socials.find((s) => s.label === "Instagram")?.href || "https://instagram.com",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.948.072-4.358.2-6.78 2.618-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      label: "X (Twitter)",
      href: contact.socials.find((s) => s.label === "X")?.href || "https://x.com",
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: "WhatsApp",
      href: contact.whatsapp,
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.124 1.01 11.56 1.01c-5.439 0-9.863 4.372-9.867 9.802-.001 1.73.461 3.417 1.337 4.937l-1.013 3.693 3.784-.979c1.502.81 3.18 1.238 4.846 1.238zm11.517-7.79c-.31-.155-1.84-.907-2.126-1.01-.286-.104-.495-.155-.703.155-.208.311-.806.907-.988 1.114-.182.208-.364.233-.674.078-2.106-1.055-3.484-1.823-4.88-4.22-.365-.628.365-.583 1.042-1.936.115-.233.057-.44-.028-.596-.086-.156-.703-1.696-.963-2.32-.253-.61-.51-.527-.703-.537-.182-.01-.39-.012-.597-.012-.208 0-.546.078-.832.39-.286.311-1.092 1.066-1.092 2.6 0 1.533 1.118 3.012 1.274 3.22.156.208 2.2 3.359 5.33 4.716.744.323 1.325.515 1.777.659.749.237 1.43.204 1.969.124.6-.09 1.84-.753 2.1-1.448.259-.696.259-1.293.182-1.417-.078-.124-.286-.208-.596-.363z" />
        </svg>
      )
    },
    {
      label: "Google Maps",
      href: contact.googleMaps || "https://maps.google.com",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <footer className="bg-charcoal text-ivory">
        <div className="luxury-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1.1fr_0.7fr]">
          <div>
            <p className="font-serif text-3xl font-bold">Moorland House & Spa</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-cream/80">
              Where Elegance Meets Serenity. A luxury lounge, Spa, boutique accommodation, pool, and gardens destination
              opening on 1 July 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-pool hover:bg-white/10 hover:text-pool hover:scale-105"
                  aria-label={`Visit Moorland House & Spa on ${social.label}`}
                >
                  {social.icon}
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
            </div>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-pool">Legal & Compliance</p>
            <div className="mt-4 grid gap-3 text-sm text-cream/80">
              <Link href="/privacy" className="hover:text-pool">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-pool">Terms & Conditions</Link>
              <Link href="/cookie-policy" className="hover:text-pool">Cookie Policy</Link>
            </div>
          </div>

          <div>
            <p className="font-bold uppercase tracking-[0.14em] text-pool">Contact</p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-cream/80">
              <a href={contact.phoneLink} className="hover:text-pool">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="hover:text-pool">{contact.email}</a>
              <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="hover:text-pool">{contact.website}</a>
              <span>{contact.location}</span>
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
