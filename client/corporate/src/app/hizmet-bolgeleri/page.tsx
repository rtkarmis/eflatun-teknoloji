import { generatePageMetadata } from "@/lib/seo";
import ServiceAreaContent from "./ServiceAreaContent";
import SchemaServiceAreaGroup from "@/components/seo/service-area/SchemaServiceAreaGroup";
import { buildServiceAreasBreadcrumb } from "@/lib/breadcrumbs";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata = generatePageMetadata({
  title: "Hizmet Bölgelerimiz",
  description:
    "Eflatun Teknoloji olarak Bolu merkez ve tüm ilçelerinde su arıtma cihazı satışı, montaj ve bakım hizmetleri sunuyoruz.",
  slug: "hizmet-yerleri",
});
export const dynamic = "force-static";
export default function ServiceAreasPage() {
  return (
    <>
      <SchemaServiceAreaGroup />
      <SchemaBreadcrumb items={buildServiceAreasBreadcrumb()} />
      <ServiceAreaContent />
    </>
  );
}
