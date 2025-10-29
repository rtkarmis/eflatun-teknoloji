import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import SchemaServiceAreaSingle from "@/components/seo/service-area/SchemaServiceAreaSingle";
import { serviceAreas } from "@/data/service-areas";
import { buildServiceAreaDetailBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import ServiceAreaDetailContent from "./ServiceAreaDetailContent";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const awaitedParams = await params;
  const serviceArea = serviceAreas.find((s) => s.slug === awaitedParams.slug);
  if (!serviceArea) return notFound();

  return generatePageMetadata({
    title: serviceArea.title,
    description: serviceArea.shortDesc,
    slug: `hizmet-bolgeleri/${serviceArea.slug}`,
    image: serviceArea.image,
  });
}
export const dynamic = "force-static";

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const awaitedParams = await params;
  const serviceArea = serviceAreas.find((s) => s.slug === awaitedParams.slug);
  if (!serviceArea) return notFound();

  return (
    <>
      <SchemaServiceAreaSingle serviceArea={serviceArea} />
      <SchemaBreadcrumb items={buildServiceAreaDetailBreadcrumb(serviceArea)} />
      <ServiceAreaDetailContent serviceArea={serviceArea} />
    </>
  );
}
