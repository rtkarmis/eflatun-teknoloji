import React from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/seo";
import { ServiceArea } from "@/types/service-area";

interface Props {
  serviceArea: ServiceArea;
}

export default function SchemaServiceAreaSingle({ serviceArea }: Props) {
  const url = `${siteConfig.siteUrl}/hizmet-bolgeleri/${serviceArea.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${serviceArea.title} Su Arıtma Servisi | Eflatun Teknoloji`,
    image: siteConfig.defaultImage,
    url,
    telephone: siteConfig.phone,
    description: serviceArea.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: serviceArea.title,
      addressRegion: siteConfig.addressLocality || "Bolu",
      addressCountry: "TR",
    },
    geo: serviceArea.coordinates && {
      "@type": "GeoCoordinates",
      latitude: serviceArea.coordinates.lat,
      longitude: serviceArea.coordinates.lng,
    },
    areaServed: serviceArea.title,
    serviceType: [
      "Su arıtma cihazı satışı",
      "Montaj hizmeti",
      "Filtre değişimi",
    ],
    provider: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <Script
      id={`schema-service-area-${serviceArea.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
