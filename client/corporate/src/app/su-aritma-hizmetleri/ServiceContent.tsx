"use client";

import SchemaService from "@/components/seo/service/SchemaServiceSingle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { services } from "@/data/services";
import { buildServicesBreadcrumb } from "@/lib/breadcrumbs";
import React from "react";

export default function ServiceContent() {
  return (
    <div>
      <section>
        <div>
          <Breadcrumb items={buildServicesBreadcrumb()} />
          <PageTitle text="Hizmetlerimiz" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <React.Fragment key={service.slug}>
                <article className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                  {/* Sadece mobilde motion efektini uygula */}
                  <SchemaService service={service} />
                  <InfoCard
                    imageUrl={`/images/services/${service.image}`}
                    title={service.title}
                    description={service.shortDesc}
                    ctaUrl={`/su-aritma-hizmetleri/${service.slug}`}
                    loading={i == 0 ? "eager" : "lazy"}
                  />
                </article>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
