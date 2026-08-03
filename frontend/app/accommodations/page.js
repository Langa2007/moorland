import BookingPanel from "@/components/BookingPanel";
import RongoApartmentAd from "@/components/RongoApartmentAd";
import SectionHeading from "@/components/SectionHeading";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Luxury Accommodations",
  description: "Imperial Suite, Executive Suite, and Superior Suite accommodation at Moorland House & Spa."
};

export default async function AccommodationsPage() {
  const { rooms, rongoApartment } = await getSiteData();

  return (
    <main className="pt-24">
      <section className="section-pad bg-cream">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Boutique Rooms"
            title="Luxury suites with panoramic calm and warm hospitality."
            text="Compare suite tiers, rates, amenities, and comfort details before requesting your stay."
          />
          <div className="mt-12 grid gap-10">
            {rooms.map((room, index) => (
              <article key={room.name} className="grid overflow-hidden rounded-lg bg-ivory shadow-soft lg:grid-cols-2">
                <img src={room.image} alt={room.name} className={`aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[360px] ${index % 2 ? "lg:order-2" : ""}`} />
                <div className="p-7 md:p-10">
                  <p className="eyebrow">Suite {index + 1}</p>
                  <h2 className="heading-md mt-2">{room.name}</h2>
                  <p className="mt-3 font-black text-wood">{room.rate}</p>
                  <p className="mt-5 leading-8 text-mist">{room.desc}</p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {room.amenities.map((amenity) => (
                      <span key={amenity} className="rounded-lg bg-cream px-4 py-3 text-sm font-bold text-mist">{amenity}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RongoApartmentAd advert={rongoApartment} />
      <section id="booking" className="section-pad bg-ivory">
        <div className="luxury-container">
          <BookingPanel type="stay" rooms={rooms} />
        </div>
      </section>
    </main>
  );
}
