import BookingPanel from "@/components/BookingPanel";
import FoodOrder from "@/components/FoodOrder";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const metadata = {
  title: "The Lounge",
  description: "African and international cuisine, lounge reservations, ambience gallery, and order requests."
};

export default async function LoungePage() {
  const { gallery, images, menuItems } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The Lounge"
              title="A warm, elegant lounge for African classics, international plates, and refined evenings."
              text="Browse cuisine photography, prices, descriptions, dietary tags, and order requests."
            />
          </div>
          <img src={images.lounge} alt="Elegant Moorland lounge and dining room" className="h-[520px] w-full rounded-lg object-cover shadow-soft" />
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <SectionHeading eyebrow="Food & Drink" title="Signature plates, lounge favourites, and easy order requests." />
          <div className="mt-10">
            <FoodOrder items={menuItems} />
          </div>
        </div>
      </section>
      <section id="reservation" className="section-pad bg-cream">
        <div className="luxury-container">
          <BookingPanel type="lounge" />
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="luxury-container">
          <SectionHeading eyebrow="Ambiance" title="Lounge and cuisine moments." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {gallery.filter((item) => item.category === "Lounge & Cuisine").map((item) => (
              <img key={item.title} src={item.image} alt={item.title} className="h-80 w-full rounded-lg object-cover shadow-soft" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
