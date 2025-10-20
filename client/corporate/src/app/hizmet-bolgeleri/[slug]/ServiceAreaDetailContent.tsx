"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildServiceAreaDetailBreadcrumb } from "@/lib/breadcrumbs";
import { ServiceArea } from "@/types/service-area";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ServiceAreaDetailContent({
  serviceArea,
}: {
  serviceArea: ServiceArea;
}) {
  return (
    <div>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Breadcrumb items={buildServiceAreaDetailBreadcrumb(serviceArea)} />
        <PageTitle text={`${serviceArea.title} Su Arıtma Servisi`} />

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={`/images/areas/${serviceArea.image}`}
            alt={`${serviceArea.title} - Eflatun Teknoloji`}
            width={500}
            height={340}
            className="rounded-lg shadow-md w-full md:w-1/2"
            loading="lazy"
          />
          <div
            className="text-gray-700 leading-relaxed md:flex-1"
            dangerouslySetInnerHTML={{ __html: serviceArea.description }}
          />
        </div>
      </motion.article>
    </div>
  );
}
