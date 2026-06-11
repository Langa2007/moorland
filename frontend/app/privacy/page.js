import { contact } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Moorland House & SPA."
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "We may collect your name, phone number, email address, booking dates, guest count, room or service preferences, dining requests, payment reference details, and any message you send through our website, WhatsApp, phone, email, or social media channels.",
      "When online payments and booking systems are connected, payment details may be processed by trusted payment providers such as M-Pesa, mobile money, or card payment partners. Moorland House & SPA should not store full card numbers on this website."
    ]
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use your information to respond to inquiries, manage accommodation bookings, reserve lounge tables, schedule SPA treatments, prepare food and drink orders, process deposits or payments, send booking confirmations, and provide guest support.",
      "We may also use your contact details to send opening announcements, offers, newsletters, and service updates where you have chosen to receive them."
    ]
  },
  {
    title: "3. Sharing of Information",
    body: [
      "We may share limited information with service providers who help us operate the website, manage reservations, process payments, deliver email or SMS messages, provide analytics, or support customer service.",
      "We do not sell guest personal information. Information may be disclosed where required by law, safety, fraud prevention, or lawful business operations."
    ]
  },
  {
    title: "4. Cookies and Analytics",
    body: [
      "The website may use cookies and analytics tools to understand visitor activity, improve page performance, measure marketing campaigns, and remember selected preferences such as language.",
      "You can control cookies through your browser settings. Some website features may work less smoothly if cookies are disabled."
    ]
  },
  {
    title: "5. Data Security",
    body: [
      "We aim to protect guest information using reasonable technical and organizational safeguards. No online system is completely risk-free, so guests should avoid sending sensitive payment details through ordinary messages.",
      "Payment processing should be handled through secure payment providers once the booking and payment gateway integrations are live."
    ]
  },
  {
    title: "6. Your Choices",
    body: [
      "You may ask to update, correct, or delete your personal information where applicable. You may also unsubscribe from marketing messages at any time.",
      `For privacy requests, contact us at ${contact.email} or ${contact.phone}.`
    ]
  },
  {
    title: "7. Updates to This Policy",
    body: [
      "We may update this Privacy Policy as our booking, ordering, payment, and guest services evolve. The latest version will be posted on this page."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <section className="bg-cream py-16 md:py-24">
        <div className="luxury-container max-w-4xl">
          <p className="eyebrow">Privacy Policy</p>
          <h1 className="heading-lg mt-3">Privacy Policy</h1>
          <p className="mt-5 text-lg leading-8 text-mist">
            This Privacy Policy explains how Moorland House & SPA collects, uses, protects, and shares information from
            guests and website visitors.
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
