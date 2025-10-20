import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import SchemaServiceSingle from "@/components/seo/service/SchemaServiceSingle";
import { services } from "@/data/services";
import { buildServiceDetailBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import ServiceDetailContent from "./ServiceDetailContent";

interface Params {
  slug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const awaitedParams = await params;
  const service = services.find((s) => s.slug === awaitedParams.slug);
  if (!service) return notFound();

  return generatePageMetadata({
    title: service.title,
    description: service.shortDesc,
    slug: `su-aritma-hizmetleri/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const awaitedParams = await params;
  const service = services.find((s) => s.slug === awaitedParams.slug);
  if (!service) return notFound();

  return (
    <>
      <SchemaServiceSingle service={service} />
      <SchemaBreadcrumb items={buildServiceDetailBreadcrumb(service)} />
      <ServiceDetailContent service={service} />
    </>
  );
}
