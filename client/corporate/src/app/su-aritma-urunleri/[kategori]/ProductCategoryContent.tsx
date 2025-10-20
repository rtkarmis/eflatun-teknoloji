"use client";
import SchemaProductSingle from "@/components/seo/product/SchemaProductSingle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { buildProductCategoryBreadcrumb } from "@/lib/breadcrumbs";
import { Product, ProductCategory } from "@/types/product";
import { motion } from "framer-motion";
import React from "react";

export default function ProductCategoryContent({
  category,
  products,
  params,
}: {
  category: ProductCategory;
  products: Product[];
  params: { kategori: string };
}) {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <Breadcrumb items={buildProductCategoryBreadcrumb(category)} />
          <PageTitle text={category.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <React.Fragment key={product.slug}>
                <SchemaProductSingle product={product} />
                <article className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-all p-6">
                  <InfoCard
                    imageUrl={
                      product.colorVariants.find((v) => v.isCover)
                        ?.imageList[0] || ""
                    }
                    title={product.name}
                    description={product.shortDesc}
                    ctaUrl={`/su-aritma-urunleri/${params.kategori}/${product.slug}`}
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
