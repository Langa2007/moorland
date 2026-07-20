import Link from "next/link";
import AnimatedNowOpen from "@/components/AnimatedNowOpen";
import BookingPanel from "@/components/BookingPanel";
import LiveStatusTicker from "@/components/LiveStatusTicker";
import GalleryGrid from "@/components/GalleryGrid";
import Newsletter from "@/components/Newsletter";
import ReviewForm from "@/components/ReviewForm";
import RongoApartmentAd from "@/components/RongoApartmentAd";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { contact, experiences, images, menuItems, rooms, spaServices, gallery, testimonials, rongoApartment } = await getSiteData();

  return (
    <main>
      <section className="hero-image relative grid place-items-end overflow-hidden bg-charcoal text-ivory">
        <img src={images.hero} alt="Luxury pool and hospitality setting at golden hour" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/25" />
        <div className="luxury-container relative z-10 pb-12 pt-32">
          <div className="max-w-5xl">
            <div className="mb-6">
              <AnimatedNowOpen />
            </div>
            <h1 className="heading-xl">Where Elegance Meets Serenity</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-cream md:text-2xl">
              Migori Town's Premier Luxury Escape - Elegant Lounge with African & International Cuisine -
              Rejuvenating Spa - Boutique Rooms with Panoramic Views
            </p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              <Link href="/lounge" className="btn-primary">Explore Lounge</Link>
              <Link href="/spa#booking" className="btn-ghost">Book Spa</Link>
              <Link href="/accommodations#booking" className="btn-ghost">Book Stay</Link>
            </div>
          </div>
          <div className="mt-10 max-w-xl rounded-lg border border-white/15 bg-charcoal/50 p-4 backdrop-blur">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-cream/70">What&apos;s on today</p>
            <LiveStatusTicker />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-5 text-ivory">
        <div className="luxury-container grid gap-3 md:grid-cols-3">
          {[
            ["Book Room", "/accommodations#booking", "Compare suites and request your stay."],
            ["Reserve Table", "/lounge#reservation", "Plan lunch, dinner, or a private gathering."],
            ["Book Spa", "/spa#booking", "Choose a calming treatment time."]
          ].map(([label, href, text]) => (
            <Link key={href} href={href} className="rounded-lg border border-white/15 bg-white/10 p-4 transition hover:border-pool hover:bg-white/15">
              <span className="block font-serif text-2xl font-bold">{label}</span>
              <span className="mt-1 block text-sm leading-6 text-cream/80">{text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Our Experience"
            title="A complete luxury escape for dining, wellness, stays, and celebrations."
            text="Dining, wellness, accommodation, gardens, and poolside spaces come together in one polished Migori destination."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {experiences.map((item) => (
              <Link href={item.href} key={item.title} className="group overflow-hidden rounded-lg bg-ivory shadow-soft">
                <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-serif text-3xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-mist">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RongoApartmentAd advert={rongoApartment} />

      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The Lounge"
              title="African warmth, international polish, and a menu built for memorable evenings."
              text="Explore signature plates, dietary notes, pricing, and an easy order request flow."
            />
            <Link href="/lounge" className="btn-secondary mt-8">View Lounge & Menu</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {menuItems.slice(0, 4).map((item) => (
              <article key={item.id} className="overflow-hidden rounded-lg bg-cream">
                <img src={item.image} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-pool">{item.category}</p>
                  <h3 className="mt-1 font-serif text-xl font-bold">{item.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-ivory">
        <div className="luxury-container grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-pool">Spa & Wellness</p>
            <h2 className="heading-lg mt-3">Quiet rituals, warm oils, and restorative care.</h2>
            <p className="mt-5 text-lg leading-8 text-cream/80">
              Choose from calming treatments designed for deep rest, recovery, and quiet celebration.
            </p>
          </div>
          <div className="grid gap-4">
            {spaServices.slice(0, 3).map((service) => (
              <div key={service.name} className="rounded-lg border border-white/15 bg-white/10 p-5">
                <div className="flex flex-wrap justify-between gap-4">
                  <h3 className="font-serif text-2xl font-bold">{service.name}</h3>
                  <span className="font-black text-pool">{service.price}</span>
                </div>
                <p className="mt-2 text-sm text-cream/70">{service.duration}</p>
                <p className="mt-3 leading-7 text-cream/80">{service.desc}</p>
              </div>
            ))}
            <Link href="/spa" className="btn-primary w-fit">View Spa Services</Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Luxury Accommodations"
            title="Three suite tiers, presented in the requested order."
            text="Presidential Suite, Executive Suite, and Superior Suite each offer warm finishes, calm privacy, and attentive service."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.name} className="overflow-hidden rounded-lg bg-ivory shadow-soft">
                <img src={room.image} alt={room.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-serif text-3xl font-bold">{room.name}</h3>
                  <p className="mt-2 font-black text-wood">{room.rate}</p>
                  <p className="mt-3 leading-7 text-mist">{room.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div id="booking" className="mt-10">
            <BookingPanel type="stay" rooms={rooms} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={images.pool} alt="Turquoise pool, wooden decks, and serene gardens" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft lg:aspect-[5/4]" loading="lazy" />
          <div>
            <SectionHeading
              eyebrow="Pool & Grounds"
              title="Turquoise water, wooden decks, lush gardens, and panoramic calm."
              text="The grounds page gives the client a visual story for daytime relaxation, evening events, and family-friendly escapes."
            />
            <Link href="/pool-grounds" className="btn-secondary mt-8">Explore Pool & Grounds</Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading eyebrow="Guest Trust" title="What our guests are saying." align="center" />
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>
          <div className="mt-8">
            <ReviewForm />
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <SectionHeading eyebrow="Gallery Teaser" title="A cinematic look at Moorland's spaces and experiences." />
          <div className="mt-10">
            <GalleryGrid items={gallery} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="luxury-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Location & Contact"
              title="Migori Town's serene new destination."
              text={`${contact.location}. Reach the team by phone, WhatsApp, email, or the contact page.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.phoneLink} className="btn-secondary">Call {contact.phone}</a>
              <a href={contact.whatsapp} className="btn-primary" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <Newsletter />
        </div>
      </section>
    </main>
  );
}
