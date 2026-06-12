import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

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
            title="A filtered masonry gallery ready for authentic client photos."
            text="Use admin later to replace placeholders with pool, lounge, cuisine, room, exterior, garden, signage, and lifestyle images."
          />
          <div className="mt-10">
            <GalleryGrid items={gallery} />
          </div>
        </div>
      </section>
    </main>
  );
}
