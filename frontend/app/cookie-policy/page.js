import { contact } from "@/lib/data";

export const metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Moorland House & Spa."
};

const sections = [
  {
    title: "1. What Are Cookies?",
    body: [
      "Cookies are small text files that are stored on your computer, tablet, or mobile device when you visit a website. They help us remember your preferences, keep our booking systems secure, and analyze traffic to improve our online experience.",
      "Most web browsers automatically accept cookies, but you can change your settings to reject cookies or prompt you before accepting them. Note that blocking all cookies may affect the website's functionality."
    ]
  },
  {
    title: "2. How We Use Cookies",
    body: [
      "We use cookies to enable core website functionalities (such as room reservations, Spa bookings, and contact submissions), understand how visitors interact with our site, and deliver personalized promotions.",
      "Moorland House & Spa categorizes cookies into Essential, Analytics & Performance, and Marketing & Personalization cookies. You can accept, reject, or customize these preferences at any time."
    ]
  },
  {
    title: "3. Essential Cookies",
    body: [
      "These cookies are strictly necessary for the website to function properly. They enable basic features such as secure page navigation, booking request persistence, security verification, and accessibility controls.",
      "Because the website cannot function correctly without them, Essential cookies cannot be turned off. They do not store any personally identifiable information."
    ]
  },
  {
    title: "4. Analytics & Performance Cookies",
    body: [
      "These cookies allow us to count visits, trace traffic sources, measure loading speeds, and observe user behavior on the site. This helps us understand which pages are the most and least popular and how we can refine the navigation.",
      "All information collected by these cookies is aggregated and therefore anonymous. If you disable these cookies, we will not know when you have visited our site and will be unable to monitor its performance."
    ]
  },
  {
    title: "5. Marketing & Personalization Cookies",
    body: [
      "These cookies may be set through our site by our marketing partners and social media platforms. They may be used to build a profile of your interests and show you relevant advertisements on other websites, or to integrate social media sharing buttons.",
      "They work by uniquely identifying your browser and device. If you disable these cookies, you will experience less targeted advertising and may not be able to interact with direct social shares or map widgets."
    ]
  },
  {
    title: "6. Managing Your Cookie Preferences",
    body: [
      "When you first visit our website from a new device or browser, you are presented with a cookie consent banner. You can choose to 'Accept All', 'Reject All', or click 'Customize' to manually select which cookie categories you wish to allow.",
      "Additionally, you can manage, block, or delete cookies directly in your browser settings (e.g., Chrome, Safari, Firefox, or Edge). Deleting cookies will reset your preferences on our website."
    ]
  },
  {
    title: "7. Updates to This Policy",
    body: [
      "We may update this Cookie Policy from time to time to reflect changes in our technology, regulatory compliance, or business practices. The updated policy will be active immediately upon posting on this page.",
      "We recommend checking this page periodically to stay informed about our use of cookies and related technologies."
    ]
  },
  {
    title: "8. Contact Us",
    body: [
      `If you have any questions or feedback regarding our Cookie Policy, please contact us at ${contact.email}, call us at ${contact.phone}, or contact our reservations team via our official WhatsApp channels.`
    ]
  }
];

export default function CookiePolicyPage() {
  return (
    <main className="pt-24">
      <section className="bg-cream py-16 md:py-24">
        <div className="luxury-container max-w-4xl">
          <p className="eyebrow">Cookie Policy</p>
          <h1 className="heading-lg mt-3">Cookie Policy</h1>
          <p className="mt-5 text-lg leading-8 text-mist">
            This Cookie Policy explains how Moorland House & Spa uses cookies and similar technologies to recognize you when you visit our website, manage bookings, and personalize your experience.
          </p>
          <p className="mt-3 text-sm font-bold text-wood">Last updated: 15 June 2026</p>
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
