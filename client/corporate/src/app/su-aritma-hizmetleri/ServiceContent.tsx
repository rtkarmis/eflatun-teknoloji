"use client";

import SchemaService from "@/components/seo/service/SchemaServiceSingle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { services } from "@/data/services";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";
import { motion } from "framer-motion";
import React from "react";

export default function ServiceContent() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <Breadcrumb items={buildServicesBreadcrumb()} />
          <PageTitle text="Hizmetlerimiz" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <React.Fragment key={service.slug}>
                <article className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                  {/* Sadece mobilde motion efektini uygula */}
                  <SchemaService service={service} />
                  <InfoCard
                    imageUrl={`/images/services/${service.image}`}
                    title={service.title}
                    description={service.shortDesc}
                    ctaUrl={`/su-aritma-hizmetleri/${service.slug}`}
                  />
                </article>
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
