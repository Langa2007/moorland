import Link from "next/link";

export default function RongoApartmentAd({ advert }) {
  if (!advert || advert.active === false) return null;

  const images = advert.images?.length ? advert.images : ["/logo.png"];
  const primaryImage = images[0];

  return (
    <section className="section-pad bg-charcoal text-ivory">
      <div className="luxury-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="eyebrow text-pool">{advert.eyebrow || "Partner Property"}</p>
          <h2 className="heading-lg mt-3">{advert.title || "Rongo Furnished Apartment"}</h2>
          <p className="mt-5 text-lg leading-8 text-cream/80">
            {advert.description || "A dedicated advertisement space for the upcoming Rongo Furnished Apartment property."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={advert.ctaHref || "/contact"} className="btn-primary">
              {advert.ctaLabel || "Request Details"}
            </Link>
            <Link href="/accommodations#booking" className="btn-ghost">
              View Moorland Rooms
            </Link>
          </div>
        </div>
        <div className="grid gap-3">
          <img src={primaryImage} alt={`${advert.title || "Rongo Furnished Apartment"} featured view`} className="aspect-[16/10] w-full rounded-lg object-cover shadow-soft" loading="lazy" />
          {images.length > 1 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.slice(1, 4).map((image, index) => (
                <img key={`${image}-${index}`} src={image} alt={`${advert.title || "Rongo Furnished Apartment"} preview ${index + 2}`} className="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
              ))}
            </div>
          ) : (
            <div className="italic p-4 text-sm leading-6 text-cream/80">
              Rongo Furnished Apartment
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
