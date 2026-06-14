import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery",
  description: "Filtered masonry gallery with lightbox for pool, cuisine, rooms, exteriors, and lifestyle imagery."
};

export default async function GalleryPage() {
  const { gallery } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Gallery"
            title="A filtered masonry gallery of Moorland's spaces."
            text="Explore pool, lounge, cuisine, rooms, exteriors, gardens, and lifestyle moments."
          />
          <div className="mt-10">
            <GalleryGrid items={gallery} />
          </div>
        </div>
      </section>
    </main>
  );
}
