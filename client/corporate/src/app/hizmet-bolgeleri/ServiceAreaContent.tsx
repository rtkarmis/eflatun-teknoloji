"use client";

import React from "react";
import { serviceAreas } from "@/data/service-areas";
import SchemaServiceAreaSingle from "@/components/seo/service-area/SchemaServiceAreaSingle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildServiceAreasBreadcrumb } from "@/lib/breadcrumbs";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";

export default function ServiceAreaContent() {
  return (
    <div>
      <section>
        <div>
          <Breadcrumb items={buildServiceAreasBreadcrumb()} />
          <PageTitle text="Hizmet Bölgelerimiz" />

          {/* Mobilde motion, masaüstünde normal article */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((serviceArea, index) => (
              <article
                key={index}
                className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <SchemaServiceAreaSingle serviceArea={serviceArea} />
                <InfoCard
                  imageUrl={`/images/areas/${serviceArea.image}`}
                  title={`${serviceArea.title} Su Arıtma Servisi`}
                  description={serviceArea.shortDesc}
                  ctaUrl={`/hizmet-bolgeleri/${serviceArea.slug}`}
                  ctaText="Detaylı Bilgi →"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
