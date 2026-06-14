import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const metadata = {
  title: "About Us",
  description: "The story, team philosophy, and location details for Moorland House & Spa."
};

export default async function AboutPage() {
  const { images } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionHeading
            eyebrow="About Moorland"
            title="A modern classic retreat shaped by Kenyan hospitality."
            text="Moorland House & Spa is designed as a refined Migori destination where food, wellness, rooms, poolside leisure, and quiet service come together in one serene setting."
          />
          <img src={images.garden} alt="Moorland exterior and gardens" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft lg:aspect-[5/4]" />
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-5 md:grid-cols-3">
          {[
            ["Philosophy", "Luxury should feel calm, personal, and warm, never cold or intimidating."],
            ["Team", "Hospitality professionals, chefs, therapists, and hosts focused on polished guest care."],
            ["Place", "A serene Migori Town setting with panoramic views, gardens, and easy access for guests."]
          ].map(([title, text]) => (
            <article key={title} className="soft-card rounded-lg p-6">
              <h2 className="font-serif text-3xl font-bold">{title}</h2>
              <p className="mt-4 leading-7 text-mist">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
