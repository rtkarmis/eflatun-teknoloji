import { services } from "@/data/services";
import { siteConfig } from "@/lib/seo";
import Script from "next/script";

export default function SchemaServiceGroup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ServiceGroup",
    name: "Eflatun Teknoloji Su Arıtma Hizmetleri",
    description:
      "Bolu ve çevresinde su arıtma cihazı satışı, montaj, bakım ve filtre değişimi hizmetleri.",
    serviceType: "WaterPurificationService",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
      image: siteConfig.defaultImage,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.streetAddress || siteConfig.address,
        addressLocality: siteConfig.addressLocality || "Bolu",
        postalCode: siteConfig.postalCode || "14100",
        addressCountry: siteConfig.addressCountry || "TR",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Su Arıtma Hizmetleri",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDesc || service.description,
          url: `${siteConfig.siteUrl}/su-aritma-hizmetleri/${service.slug}`,
          areaServed: [
            "Bolu",
            "Gerede",
            "Mengen",
            "Mudurnu",
            "Göynük",
            "Yeniçağa",
            "Dörtdivan",
          ],
        },
      })),
    },
  };

  return (
    <Script
      id="schema-service-group"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
