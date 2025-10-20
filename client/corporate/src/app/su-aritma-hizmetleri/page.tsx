import { generatePageMetadata } from "@/lib/seo";
import ServiceContent from "./ServiceContent";
import SchemaServiceGroup from "@/components/seo/service/SchemaServiceGroup";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata = generatePageMetadata({
  title: "Su Arıtma Hizmetleri",
  description:
    "Eflatun Teknoloji olarak Bolu ve çevresinde su arıtma cihazı satışı, montaj ve bakım hizmetleri sunuyoruz.",
  slug: "su-aritma-hizmetleri",
});

export default function ServicesPage() {
  return (
    <>
      <SchemaServiceGroup />
      <SchemaBreadcrumb items={buildServicesBreadcrumb()} />
      <ServiceContent />
    </>
  );
}
