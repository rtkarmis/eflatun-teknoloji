import { generatePageMetadata, siteConfig } from "@/lib/seo";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import { buildAboutBreadcrumb } from "@/lib/breadcrumbs";
import Script from "next/script";
import AboutContent from "./AboutContent";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Hakkımızda",
    description:
      "Eflatun Teknoloji Su Arıtma Sistemleri — Bolu'da su arıtma cihazı satışı, montajı ve bakım hizmetlerinde güvenilir, yerel çözümler.",
    slug: "hakkimizda",
  });
}
export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <SchemaBreadcrumb items={buildAboutBreadcrumb()} />

      {/* Organization Schema for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.siteName,
            url: siteConfig.siteUrl,
            logo: siteConfig.defaultImage,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: siteConfig.phoneDisplay || siteConfig.phone,
              contactType: "customer service",
              areaServed: "TR",
              availableLanguage: "Turkish",
            },
          }),
        }}
      />

      <AboutContent />
    </>
  );
}
