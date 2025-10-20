"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildServiceDetailBreadcrumb } from "@/lib/breadcrumbs";
import { Service } from "@/types/service";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ServiceDetailContent({
  service,
}: {
  service: Service;
}) {
  return (
    <div>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Breadcrumb items={buildServiceDetailBreadcrumb(service)} />
        <PageTitle text={service.title} />

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={`/images/services/${service.image}`}
            alt={`${service.title} - Eflatun Teknoloji`}
            width={500}
            height={340}
            className="rounded-lg shadow-md w-full md:w-1/2"
            loading="lazy"
          />
          <div
            className="text-gray-700 leading-relaxed md:flex-1"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </div>
      </motion.article>
    </div>
  );
}
