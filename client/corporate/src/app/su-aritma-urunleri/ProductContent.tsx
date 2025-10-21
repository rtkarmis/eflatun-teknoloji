"use client";
import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { productCategories } from "@/data/products";
import { buildProductsMainBreadcrumb } from "@/lib/breadcrumbs";

export default function ProductContent() {
  return (
    <div>
      <section>
        {productCategories.length > 0 && (
          <div>
            <Breadcrumb items={buildProductsMainBreadcrumb()} />
            <PageTitle text="Ürünlerimiz" />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((cat, i) => (
                <li
                  key={cat.slug}
                  className="p-6 bg-gray-50 rounded-2xl shadow-sm md:hover:shadow-lg md:transition-all duration-300"
                >
                  <InfoCard
                    imageUrl={`/images/products/categories/${cat.imageName}`}
                    title={cat.name}
                    description={cat.desc}
                    ctaUrl={`/su-aritma-urunleri/${cat.slug}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
