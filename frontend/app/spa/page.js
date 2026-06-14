import BookingPanel from "@/components/BookingPanel";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const metadata = {
  title: "SPA & Wellness",
  description: "Luxury SPA treatments, wellness rituals, and booking requests at Moorland House & SPA."
};

export default async function SpaPage() {
  const { images, spaServices } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-charcoal text-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-pool">SPA & Wellness</p>
            <h1 className="heading-lg mt-3">Rejuvenating rituals for quiet recovery.</h1>
            <p className="mt-5 text-lg leading-8 text-cream/80">
              Treatment rituals, pricing, duration, and easy booking requests for restorative care.
            </p>
          </div>
          <img src={images.spa} alt="Luxury SPA treatment room" className="h-[520px] w-full rounded-lg object-cover shadow-soft" />
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <SectionHeading eyebrow="Treatment Menu" title="Signature therapies, facials, and couples rituals." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {spaServices.map((service) => (
              <article key={service.name} className="soft-card overflow-hidden rounded-lg">
                <img src={service.image} alt={service.name} className="h-64 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <div className="flex flex-wrap justify-between gap-3">
                    <h2 className="font-serif text-3xl font-bold">{service.name}</h2>
                    <span className="font-black text-wood">{service.price}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-pool">{service.duration}</p>
                  <p className="mt-4 leading-7 text-mist">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="booking" className="section-pad bg-cream">
        <div className="luxury-container">
          <BookingPanel type="spa" />
        </div>
      </section>
    </main>
  );
}
