"use client";

import dynamic from "next/dynamic";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { services } from "@/data/services";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";

const SchemaService = dynamic(
  () => import("@/components/seo/service/SchemaServiceSingle"),
  { ssr: false }
);

export default function ServiceContent() {
  return (
    <section>
      <Breadcrumb items={buildServicesBreadcrumb()} />
      <PageTitle text="Hizmetlerimiz" />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <li
            key={service.slug}
            className="p-6 bg-gray-50 rounded-2xl shadow-sm md:hover:shadow-lg md:transition-all duration-300"
          >
            <SchemaService service={service} />
            <InfoCard
              imageUrl={`/images/services/${service.image}`}
              title={service.title}
              description={service.shortDesc}
              ctaUrl={`/su-aritma-hizmetleri/${service.slug}`}
              loading={i === 0 ? "eager" : "lazy"}
              priority={i === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
