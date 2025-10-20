"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { productCategories } from "@/data/products";
import { buildProductsMainBreadcrumb } from "@/lib/breadcrumbs";
import { motion } from "framer-motion";
import React from "react";

export default function ProductContent() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {productCategories.length > 0 && (
          <div>
            <Breadcrumb items={buildProductsMainBreadcrumb()} />
            <PageTitle text="Ürünlerimiz" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((cat) => (
                <React.Fragment key={cat.slug}>
                  <article className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all p-6">
                    <InfoCard
                      imageUrl={`/images/products/categories/${cat.imageName}`}
                      title={cat.name}
                      description={cat.desc}
                      ctaUrl={`/su-aritma-urunleri/${cat.slug}`}
                    />
                  </article>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}
