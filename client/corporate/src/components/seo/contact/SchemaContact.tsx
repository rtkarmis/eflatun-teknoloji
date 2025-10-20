"use client";

import { siteConfig } from "@/lib/seo";
import Script from "next/script";
export default function SchemaContact() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://eflatunteknoloji.com/iletisim",
    name: "Eflatun Teknoloji - Su Arıtma Sistemleri",
    image: "https://eflatunteknoloji.com/public/images/settings/logo1.webp",
    url: "https://eflatunteknoloji.com",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₺₺",
    description:
      "Eflatun Teknoloji, Bolu ve çevresinde profesyonel su arıtma cihazı, filtre ve ekipman satışı, montajı ve bakım hizmetleri sunar. Kaliteli içme suyu için güvenilir çözümler üretir.",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress || siteConfig.address,
      addressLocality: siteConfig.addressLocality || "Bolu",
      postalCode: siteConfig.postalCode || "14100",
      addressCountry: siteConfig.addressCountry || "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.737026,
      longitude: 31.607161,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
        description: "Kapalı",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        availableLanguage: ["Turkish"],
        areaServed: "Bolu",
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "sales",
        availableLanguage: ["Turkish"],
      },
    ],
    sameAs: [
      "https://www.google.com/maps/place/Eflatun+%C3%87orap+ve+Su+Ar%C4%B1tma+Bolu/",
      "https://www.instagram.com/eflatunteknoloji",
      "https://www.facebook.com/eflatunteknoloji",
    ],
  };

  return (
    <Script
      id="contact-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
