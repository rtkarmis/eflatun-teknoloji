import React from "react";
import Script from "next/script";
import { siteConfig, getLocalBusinessSchema } from "@/lib/seo";
import { Service } from "@/types/service";

interface Props {
  service: Service;
  slug?: string; // canonical URL
}

export default function SchemaServiceSingle({ service}: Props) {
  const url = service.slug
    ? `${siteConfig.siteUrl}/su-aritma-hizmetleri/${service.slug}`
    : `${siteConfig.siteUrl}`;
  const image = service.image
    ? `${siteConfig.siteUrl}${service.image}`
    : siteConfig.defaultImage;

  // 🧠 LocalBusiness schema'dan areaServed'i çekiyoruz
  const localBusiness = getLocalBusinessSchema();
  const areaServed = localBusiness.areaServed;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description:
      service.shortDesc ||
      service.description ||
      siteConfig.defaultDescription,
    image,
    url,
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
      address: localBusiness.address,
    },
    areaServed, // 🔥 Artık merkezi kaynaktan geliyor
  };

  return (
    <Script
      id={`schema-service-${service.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
