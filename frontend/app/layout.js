import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: {
    default: "Moorland House & SPA | Where Elegance Meets Serenity",
    template: "%s | Moorland House & SPA"
  },
  description:
    "Moorland House & SPA is Migori Town's premier luxury lounge, spa, and boutique accommodation venue opening on 1 July 2026.",
  keywords: [
    "Moorland House & SPA",
    "Migori luxury hotel",
    "Kenya spa",
    "African cuisine Migori",
    "boutique accommodation Kenya",
    "pool lounge Migori"
  ],
  metadataBase: new URL("https://moorlandhouse-spa.com"),
  openGraph: {
    title: "Moorland House & SPA",
    description: "Where Elegance Meets Serenity",
    url: "https://moorlandhouse-spa.com",
    siteName: "Moorland House & SPA",
    locale: "en_KE",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Moorland House & SPA",
    slogan: "Where Elegance Meets Serenity",
    openingDate: "2026-07-01",
    telephone: "+254727623260",
    url: "https://moorlandhouse-spa.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Migori Town",
      addressRegion: "Nairobi",
      addressCountry: "KE"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Luxury SPA", value: true },
      { "@type": "LocationFeatureSpecification", name: "Boutique rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pool and gardens", value: true },
      { "@type": "LocationFeatureSpecification", name: "African and international lounge cuisine", value: true }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <div className="page-shell">
          <Header />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  );
}
