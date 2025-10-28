import { generatePageMetadata } from "@/lib/seo";
import ServiceContent from "./ServiceContent";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";
import ClientSchemaServiceGroup from "../../components/seo/service/ClientSchemaServiceGroup";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata = generatePageMetadata({
  title: "Su Arıtma Hizmetleri",
  description:
    "Eflatun Teknoloji olarak Bolu ve çevresinde su arıtma cihazı satışı, montaj ve bakım hizmetleri sunuyoruz.",
  slug: "su-aritma-hizmetleri",
});
export const dynamic = "force-static";
export default function ServicesPage() {
  return (
    <>
      <ClientSchemaServiceGroup />
      <SchemaBreadcrumb items={buildServicesBreadcrumb()} />
      <ServiceContent />
    </>
  );
}
