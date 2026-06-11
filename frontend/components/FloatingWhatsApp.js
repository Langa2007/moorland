import { contact } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center justify-center rounded-full bg-pool px-5 font-black text-charcoal shadow-glow"
      aria-label="Chat with Moorland House and SPA on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
