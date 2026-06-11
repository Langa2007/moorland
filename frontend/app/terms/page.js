import { contact } from "@/lib/data";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Moorland House & SPA."
};

const sections = [
  {
    title: "1. Use of This Website",
    body: [
      "This website provides information about Moorland House & SPA, including accommodation, SPA services, lounge reservations, cuisine, gallery content, opening updates, and contact options.",
      "By using this website, you agree to use it lawfully and not to interfere with its security, availability, booking features, forms, or payment integrations."
    ]
  },
  {
    title: "2. Reservations and Availability",
    body: [
      "Accommodation, SPA treatment, lounge table, and food order availability is subject to confirmation by Moorland House & SPA.",
      "Dates, times, rooms, menus, prices, packages, and promotions may change based on season, availability, operating hours, and management decisions."
    ]
  },
  {
    title: "3. Payments and Deposits",
    body: [
      "Bookings may require a deposit, full payment, or payment authorization before confirmation. Supported payment options may include M-Pesa, card payments, mobile money, bank transfer, or cash where accepted.",
      "Payment instructions should only be followed when they are issued through official Moorland House & SPA channels."
    ]
  },
  {
    title: "4. Cancellations and Changes",
    body: [
      "Cancellation, refund, no-show, and date-change rules may vary by room type, package, event, treatment, or promotional offer.",
      "Guests should contact Moorland House & SPA as early as possible when they need to change or cancel a booking."
    ]
  },
  {
    title: "5. Guest Conduct",
    body: [
      "Guests are expected to respect staff, other guests, property, quiet areas, safety rules, and any policies shared at the venue.",
      "Moorland House & SPA may refuse service, cancel a booking, or remove guests where conduct creates risk, disturbance, damage, fraud, or breach of these terms."
    ]
  },
  {
    title: "6. Website Content",
    body: [
      "Images, descriptions, menus, room details, service information, and opening content are provided for general guidance. Some preview images may be placeholders until official venue photography is uploaded.",
      "Moorland House & SPA may update website content at any time to reflect current services, photography, pricing, and operating details."
    ]
  },
  {
    title: "7. Liability",
    body: [
      "Moorland House & SPA aims to keep website information accurate and available, but cannot guarantee uninterrupted access or error-free content at all times.",
      "To the fullest extent allowed by law, Moorland House & SPA is not responsible for indirect losses arising from use of the website, third-party links, payment provider downtime, or network interruptions."
    ]
  },
  {
    title: "8. Contact",
    body: [
      `For booking questions, service terms, payment confirmation, or support, contact Moorland House & SPA at ${contact.phone}, ${contact.email}, or through official WhatsApp.`
    ]
  }
];

export default function TermsPage() {
  return (
    <main className="pt-24">
      <section className="bg-cream py-16 md:py-24">
        <div className="luxury-container max-w-4xl">
          <p className="eyebrow">Terms & Conditions</p>
          <h1 className="heading-lg mt-3">Terms & Conditions</h1>
          <p className="mt-5 text-lg leading-8 text-mist">
            These terms explain the basic rules for using this website and engaging with Moorland House & SPA services,
            bookings, payments, and guest communications.
          </p>
          <p className="mt-3 text-sm font-bold text-wood">Last updated: 11 June 2026</p>
        </div>
      </section>

      <section className="bg-ivory py-14 md:py-20">
        <div className="luxury-container max-w-4xl space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="border-b border-mist/15 pb-8 last:border-0">
              <h2 className="font-serif text-3xl font-bold text-charcoal">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-mist">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
