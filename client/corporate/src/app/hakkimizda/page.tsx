import { generatePageMetadata } from "@/lib/seo";
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
            name: "Eflatun Teknoloji Su Arıtma Sistemleri",
            url: "https://eflatun-teknoloji.com",
            logo: "https://eflatun-teknoloji.com/images/settings/logo1.webp",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+90 536 706 1434",
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
