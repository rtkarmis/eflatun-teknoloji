import React from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/seo";
import { serviceAreas } from "@/data/service-areas";

export default function SchemaServiceAreaGroup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ServiceGroup",
    name: "Eflatun Teknoloji Su Arıtma Hizmet Bölgeleri",
    description:
      "Bolu merkez ve tüm ilçelerinde su arıtma satışı, montaj ve bakım hizmetleri.",
    serviceType: "WaterPurificationService",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hizmet Bölgeleri",
      itemListElement: serviceAreas.map((area) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${area.title} Su Arıtma Servisi`,
          url: `${siteConfig.siteUrl}/hizmet-bolgeleri/${area.slug}`,
          areaServed: area.title,
        },
      })),
    },
  };

  return (
    <Script
      id="schema-service-area-group"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
