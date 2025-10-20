"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildServiceAreaDetailBreadcrumb } from "@/lib/breadcrumbs";
import { ServiceArea } from "@/types/service-area";
import Image from "next/image";

export default function ServiceAreaDetailContent({
  serviceArea,
}: {
  serviceArea: ServiceArea;
}) {
  return (
    <div>
      <article>
        <Breadcrumb items={buildServiceAreaDetailBreadcrumb(serviceArea)} />
        <PageTitle text={`${serviceArea.title} Su Arıtma Servisi`} />

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={`/images/areas/${serviceArea.image}`}
            alt={`${serviceArea.title} - Eflatun Teknoloji`}
            width={500}
            height={340}
            className="rounded-lg shadow-md w-full md:w-1/2"
            loading="eager"
          />
          <div
            className="text-gray-700 leading-relaxed md:flex-1"
            dangerouslySetInnerHTML={{ __html: serviceArea.description }}
          />
        </div>
      </article>
    </div>
  );
}
