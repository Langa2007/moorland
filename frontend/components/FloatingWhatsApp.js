import { contact } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa6";

export default function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-105 md:right-6"
      aria-label="Chat with Moorland House and Spa on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </a>
  );
}
