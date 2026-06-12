import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const metadata = {
  title: "Pool & Grounds",
  description: "Turquoise pool, wooden decks, lush gardens, and panoramic setting."
};

export default async function PoolGroundsPage() {
  const { gallery, images } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-ivory">
        <div className="luxury-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={images.pool} alt="Moorland turquoise pool and deck placeholder" className="h-[620px] w-full rounded-lg object-cover shadow-soft" />
          <SectionHeading
            eyebrow="Pool & Grounds"
            title="A serene outdoor setting for golden-hour relaxation."
            text="Highlight the turquoise pool, wooden decks, lush gardens, event-ready exteriors, and panoramic views once the authentic images are uploaded."
          />
        </div>
        <div className="luxury-container mt-12 grid gap-5 md:grid-cols-3">
          {gallery.filter((item) => ["Pool", "Exteriors", "Lifestyle"].includes(item.category)).slice(0, 6).map((item) => (
            <img key={item.title} src={item.image} alt={item.title} className="h-80 w-full rounded-lg object-cover shadow-soft" loading="lazy" />
          ))}
        </div>
      </section>
    </main>
  );
}
