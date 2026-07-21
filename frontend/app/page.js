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
import ParallaxHero from "@/components/ParallaxHero";
import ParallaxSection from "@/components/ParallaxSection";
import MotionReveal, { MotionItem } from "@/components/MotionReveal";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { contact, experiences, images, menuItems, rooms, spaServices, gallery, testimonials, rongoApartment } = await getSiteData();

  return (
    <main>
      {/* ── Hero with parallax ────────────────────────────────── */}
      <ParallaxHero
        src={images.hero}
        alt="Luxury pool and hospitality setting at golden hour"
      >
        <div className="luxury-container pb-12 pt-32">
          <div className="max-w-5xl">
            <MotionReveal delay={0.1} variant="fade">
              <div className="mb-6">
                <AnimatedNowOpen />
              </div>
            </MotionReveal>
            <MotionReveal delay={0.25} variant="fadeUp" duration={0.8}>
              <h1 className="heading-xl">Where Elegance Meets Serenity</h1>
            </MotionReveal>
            <MotionReveal delay={0.4} variant="fadeUp" duration={0.8}>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cream md:text-2xl">
                Migori Town's Premier Luxury Escape - Elegant Lounge with African &amp; International Cuisine -
                Rejuvenating Spa - Boutique Rooms with Panoramic Views
              </p>
            </MotionReveal>
            <MotionReveal delay={0.55} variant="fadeUp">
              <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
                <Link href="/lounge" className="btn-primary">Explore Lounge</Link>
                <Link href="/spa#booking" className="btn-ghost">Book Spa</Link>
                <Link href="/accommodations#booking" className="btn-ghost">Book Stay</Link>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.7} variant="fadeUp">
              <div className="mt-10 max-w-xl rounded-lg border border-white/15 bg-charcoal/50 p-4 backdrop-blur">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-cream/70">What&apos;s on today</p>
                <LiveStatusTicker />
              </div>
            </MotionReveal>
          </div>
        </div>
      </ParallaxHero>

      {/* ── Quick links ───────────────────────────────────────── */}
      <section className="bg-charcoal py-5 text-ivory">
        <MotionReveal stagger staggerDelay={0.08} delay={0.05} className="luxury-container grid gap-3 md:grid-cols-3">
          {[
            ["Book Room", "/accommodations#booking", "Compare suites and request your stay."],
            ["Reserve Table", "/lounge#reservation", "Plan lunch, dinner, or a private gathering."],
            ["Book Spa", "/spa#booking", "Choose a calming treatment time."]
          ].map(([label, href, text]) => (
            <MotionItem key={href} variant="fadeUp">
              <Link href={href} className="block rounded-lg border border-white/15 bg-white/10 p-4 transition hover:border-pool hover:bg-white/15">
                <span className="block font-serif text-2xl font-bold">{label}</span>
                <span className="mt-1 block text-sm leading-6 text-cream/80">{text}</span>
              </Link>
            </MotionItem>
          ))}
        </MotionReveal>
      </section>

      {/* ── Experiences ───────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Our Experience"
            title="A complete luxury escape for dining, wellness, stays, and celebrations."
            text="Dining, wellness, accommodation, gardens, and poolside spaces come together in one polished Migori destination."
          />
          <MotionReveal stagger staggerDelay={0.12} delay={0.1} className="mt-10 grid gap-5 md:grid-cols-3">
            {experiences.map((item) => (
              <MotionItem key={item.title} variant="scale">
                <Link href={item.href} className="group block overflow-hidden rounded-lg bg-ivory shadow-soft">
                  <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-serif text-3xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-mist">{item.text}</p>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* ── Rongo apartment ad ────────────────────────────────── */}
      <RongoApartmentAd advert={rongoApartment} />

      {/* ── Parallax divider — lounge teaser ─────────────────── */}
      <ParallaxSection src={images.hero} minHeight="340px" speed={0.4} className="my-0">
        <div className="luxury-container py-16 text-center text-ivory">
          <MotionReveal variant="scale" duration={0.7}>
            <p className="eyebrow text-pool">African warmth · International polish</p>
            <h2 className="heading-lg mt-3">The Lounge awaits.</h2>
            <Link href="/lounge" className="btn-primary mt-8 inline-flex">View Full Menu</Link>
          </MotionReveal>
        </div>
      </ParallaxSection>

      {/* ── Lounge section ────────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal variant="fadeLeft" duration={0.7}>
            <SectionHeading
              eyebrow="The Lounge"
              title="African warmth, international polish, and a menu built for memorable evenings."
              text="Explore signature plates, dietary notes, pricing, and an easy order request flow."
            />
            <Link href="/lounge" className="btn-secondary mt-8">View Lounge &amp; Menu</Link>
          </MotionReveal>
          <MotionReveal stagger staggerDelay={0.1} delay={0.15} variant="fadeRight" className="grid gap-4 sm:grid-cols-2">
            {menuItems.slice(0, 4).map((item) => (
              <MotionItem key={item.id} variant="scale">
                <article className="overflow-hidden rounded-lg bg-cream">
                  <img src={item.image} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-pool">{item.category}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold">{item.name}</h3>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </section>

      {/* ── Spa section ───────────────────────────────────────── */}
      <section className="section-pad bg-charcoal text-ivory">
        <div className="luxury-container grid gap-8 lg:grid-cols-2">
          <MotionReveal variant="fadeLeft" duration={0.75}>
            <p className="eyebrow text-pool">Spa &amp; Wellness</p>
            <h2 className="heading-lg mt-3">Quiet rituals, warm oils, and restorative care.</h2>
            <p className="mt-5 text-lg leading-8 text-cream/80">
              Choose from calming treatments designed for deep rest, recovery, and quiet celebration.
            </p>
          </MotionReveal>
          <MotionReveal stagger staggerDelay={0.12} delay={0.1} className="grid gap-4">
            {spaServices.slice(0, 3).map((service) => (
              <MotionItem key={service.name} variant="fadeRight">
                <div className="rounded-lg border border-white/15 bg-white/10 p-5">
                  <div className="flex flex-wrap justify-between gap-4">
                    <h3 className="font-serif text-2xl font-bold">{service.name}</h3>
                    <span className="font-black text-pool">{service.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-cream/70">{service.duration}</p>
                  <p className="mt-3 leading-7 text-cream/80">{service.desc}</p>
                </div>
              </MotionItem>
            ))}
            <MotionItem variant="fadeUp">
              <Link href="/spa" className="btn-primary w-fit">View Spa Services</Link>
            </MotionItem>
          </MotionReveal>
        </div>
      </section>

      {/* ── Accommodations ────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Luxury Accommodations"
            title="Three suite tiers, presented in the requested order."
            text="Presidential Suite, Executive Suite, and Superior Suite each offer warm finishes, calm privacy, and attentive service."
          />
          <MotionReveal stagger staggerDelay={0.14} delay={0.1} className="mt-10 grid gap-5 lg:grid-cols-3">
            {rooms.map((room) => (
              <MotionItem key={room.name} variant="fadeUp">
                <article className="overflow-hidden rounded-lg bg-ivory shadow-soft">
                  <img src={room.image} alt={room.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-serif text-3xl font-bold">{room.name}</h3>
                    <p className="mt-2 font-black text-wood">{room.rate}</p>
                    <p className="mt-3 leading-7 text-mist">{room.desc}</p>
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
          <div id="booking" className="mt-10">
            <BookingPanel type="stay" rooms={rooms} />
          </div>
        </div>
      </section>

      {/* ── Pool & Grounds ────────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <MotionReveal variant="fadeLeft" duration={0.75}>
            <img src={images.pool} alt="Turquoise pool, wooden decks, and serene gardens" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft lg:aspect-[5/4]" loading="lazy" />
          </MotionReveal>
          <MotionReveal variant="fadeRight" duration={0.75} delay={0.15}>
            <SectionHeading
              eyebrow="Pool & Grounds"
              title="Turquoise water, wooden decks, lush gardens, and panoramic calm."
              text="The grounds page gives the client a visual story for daytime relaxation, evening events, and family-friendly escapes."
            />
            <Link href="/pool-grounds" className="btn-secondary mt-8">Explore Pool &amp; Grounds</Link>
          </MotionReveal>
        </div>
      </section>

      {/* ── Parallax divider — pool image ─────────────────────── */}
      <ParallaxSection src={images.pool} minHeight="300px" speed={0.3} className="my-0">
        <div className="luxury-container py-14 text-center text-ivory">
          <MotionReveal variant="fade" duration={0.8}>
            <p className="eyebrow text-pool">Serene · Refreshing · Yours</p>
            <h2 className="heading-md mt-3">Step into the calm.</h2>
          </MotionReveal>
        </div>
      </ParallaxSection>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading eyebrow="Guest Trust" title="What our guests are saying." align="center" />
          <MotionReveal variant="fadeUp" delay={0.15} className="mt-10">
            <Testimonials items={testimonials} />
          </MotionReveal>
          <MotionReveal variant="fadeUp" delay={0.25} className="mt-8">
            <ReviewForm />
          </MotionReveal>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <SectionHeading eyebrow="Gallery Teaser" title="A cinematic look at Moorland's spaces and experiences." />
          <MotionReveal variant="fadeUp" delay={0.1} className="mt-10">
            <GalleryGrid items={gallery} />
          </MotionReveal>
        </div>
      </section>

      {/* ── Contact & Newsletter ──────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="luxury-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <MotionReveal variant="fadeLeft" duration={0.7}>
            <SectionHeading
              eyebrow="Location & Contact"
              title="Migori Town's serene new destination."
              text={`${contact.location}. Reach the team by phone, WhatsApp, email, or the contact page.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.phoneLink} className="btn-secondary">Call {contact.phone}</a>
              <a href={contact.whatsapp} className="btn-primary" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </MotionReveal>
          <MotionReveal variant="fadeRight" delay={0.15} duration={0.7}>
            <Newsletter />
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
