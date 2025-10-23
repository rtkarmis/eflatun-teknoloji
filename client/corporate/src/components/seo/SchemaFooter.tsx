import { siteConfig } from "@/lib/seo";
import Script from "next/script";

/* --------------------------------------------------
   ✅ SchemaFooter (LocalBusiness + BreadcrumbList)
   Google Rich Results & SEO Optimization
-------------------------------------------------- */
export default function SchemaFooter() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.siteName,
    legalName: siteConfig.legalName || siteConfig.siteName,
    taxID: siteConfig.vkn || "1234567890",
    url: siteConfig.siteUrl,
    logo: siteConfig.defaultImage,
    image: siteConfig.defaultImage,
    description: siteConfig.defaultDescription,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress || siteConfig.address,
      addressLocality: siteConfig.addressLocality || "Bolu",
      postalCode: siteConfig.postalCode || "14100",
      addressCountry: siteConfig.addressCountry || "TR",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo?.latitude || 40.737002,
      longitude: siteConfig.geo?.longitude || 31.609721,
    },
    priceRange: "₺₺",
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: `${siteConfig.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${siteConfig.siteUrl}/su-aritma-hizmetleri`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Ürünler",
        item: `${siteConfig.siteUrl}/su-aritma-urunleri`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "İletişim",
        item: `${siteConfig.siteUrl}/iletisim`,
      },
    ],
  };

  return (
    <>
      {/* 🏢 Local Business Schema */}
      <Script
        id="schema-footer-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema, null, 2),
        }}
      />

      {/* 🧭 Breadcrumb Schema */}
      <Script
        id="schema-footer-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2),
        }}
      />
    </>
  );
}
