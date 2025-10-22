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
    name: "Eflatun Teknoloji",
    legalName: "Eflatun Teknoloji - Ramazan Karmış Şahıs Şirketi",
    taxID: siteConfig.vkn || "1234567890",
    url: siteConfig.siteUrl,
    logo: siteConfig.defaultImage,
    image: siteConfig.defaultImage,
    description:
      "Eflatun Teknoloji, Bolu ve çevresinde su arıtma cihazları, filtreleri, montaj ve bakım hizmetleri sunan şahıs şirketidir.",
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
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "21:00",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.737002,
      longitude: 31.609721,
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
