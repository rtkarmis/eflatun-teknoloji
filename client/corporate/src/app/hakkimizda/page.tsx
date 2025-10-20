// app/hakkimizda/page.tsx
import { generatePageMetadata } from "@/lib/seo";
import AboutContent from "./AboutContent";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import { buildAboutBreadcrumb } from "@/lib/breadcrumbs";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Hakkımızda",
    description:
      "Eflatun Teknoloji Su Arıtma Sistemleri — Bolu ve çevresinde su arıtma cihazı satışı, montajı ve bakım hizmetlerinde güvenilir, yerel hizmet.",
    slug: "hakkimizda",
  });
}

export default function AboutPage() {
  return (
    <>
      <SchemaBreadcrumb items={buildAboutBreadcrumb()} />
      <AboutContent />
    </>
  );
}
