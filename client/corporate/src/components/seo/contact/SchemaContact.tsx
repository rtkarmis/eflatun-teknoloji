"use client";

import { siteConfig } from "@/lib/seo";
import Script from "next/script";
export default function SchemaContact() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://eflatunteknoloji.com/iletisim",
    name: siteConfig.siteName,
    image: siteConfig.defaultImage,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₺₺",
    description: siteConfig.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress || siteConfig.address,
      addressLocality: siteConfig.addressLocality || "Bolu",
      postalCode: siteConfig.postalCode || "14100",
      addressCountry: siteConfig.addressCountry || "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo?.latitude || 40.737002,
      longitude: siteConfig.geo?.longitude || 31.607161,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.weekdays,
        opens: siteConfig.openingHours.weekdays.open,
        closes: siteConfig.openingHours.weekdays.close,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.weekend,
        opens: siteConfig.openingHours.sunday.open,
        closes: siteConfig.openingHours.sunday.close,
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
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.facebook,
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
