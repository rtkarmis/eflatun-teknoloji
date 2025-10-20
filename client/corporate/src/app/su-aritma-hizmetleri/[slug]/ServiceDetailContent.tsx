"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildServiceDetailBreadcrumb } from "@/lib/breadcrumbs";
import { Service } from "@/types/service";
import Image from "next/image";

export default function ServiceDetailContent({
  service,
}: {
  service: Service;
}) {
  return (
    <div>
      <article>
        <Breadcrumb items={buildServiceDetailBreadcrumb(service)} />
        <PageTitle text={service.title} />

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={`/images/services/${service.image}`}
            alt={`${service.title} - Eflatun Teknoloji`}
            width={500}
            height={340}
            className="rounded-lg shadow-md w-full md:w-1/2"
            loading="eager"
          />
          <div
            className="text-gray-700 leading-relaxed md:flex-1"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </div>
      </article>
    </div>
  );
}
