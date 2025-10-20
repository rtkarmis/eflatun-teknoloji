import { generatePageMetadata } from "@/lib/seo";
import ServiceContent from "./ServiceContent";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";
import dynamic from "next/dynamic";
import ClientSchemaServiceGroup from "../../components/seo/service/ClientSchemaServiceGroup";

export const metadata = generatePageMetadata({
  title: "Su Arıtma Hizmetleri",
  description:
    "Eflatun Teknoloji olarak Bolu ve çevresinde su arıtma cihazı satışı, montaj ve bakım hizmetleri sunuyoruz.",
  slug: "su-aritma-hizmetleri",
});
// SchemaServiceGroup dinamik importu artık Client Component'te
const SchemaBreadcrumb = dynamic(
  () => import("@/components/seo/SchemaBreadcrumb"),
  { ssr: true }
);

export default function ServicesPage() {
  return (
    <>
      <ClientSchemaServiceGroup />
      <SchemaBreadcrumb items={buildServicesBreadcrumb()} />
      <ServiceContent />
    </>
  );
}
