import { contact } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-pool text-sm font-black text-charcoal shadow-glow transition hover:scale-105 md:right-6"
      aria-label="Chat with Moorland House and SPA on WhatsApp"
    >
      WA
    </a>
  );
}
