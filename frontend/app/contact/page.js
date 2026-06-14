import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Location",
  description: "Contact Moorland House & Spa by phone, WhatsApp, email, directions, or inquiry form."
};

export default async function ContactPage() {
  const { contact } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact & Location"
              title="Reach the opening team."
              text="Use the form for accommodation, Spa, lounge, events, and private dining inquiries. Phone and WhatsApp are ready for immediate guest calls."
            />
            <div className="mt-8 grid gap-3 text-lg">
              <a href={contact.phoneLink} className="font-black text-wood">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="font-black text-wood">{contact.email}</a>
              <p className="text-mist">{contact.location}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-primary">WhatsApp</a>
              <a href={contact.phoneLink} className="btn-secondary">Call Now</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <div className="overflow-hidden rounded-lg shadow-soft">
            <iframe
              title="Moorland House and Spa map"
              src="https://www.google.com/maps?q=Migori%20Town%20Kenya&output=embed"
              className="h-[480px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
