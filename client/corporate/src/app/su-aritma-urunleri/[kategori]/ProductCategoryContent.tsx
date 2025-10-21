"use client";
import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InfoCard from "@/components/ui/InfoCard";
import PageTitle from "@/components/ui/PageTitle";
import { buildProductCategoryBreadcrumb } from "@/lib/breadcrumbs";
import { Product, ProductCategory } from "@/types/product";
import dynamic from "next/dynamic";
const SchemaProductSingle = dynamic(
  () => import("@/components/seo/product/SchemaProductSingle"),
  { ssr: false }
);
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
      <section>
        <div>
          <Breadcrumb items={buildProductCategoryBreadcrumb(category)} />
          <PageTitle text={category.name} />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <li
                key={product.slug}
                className="p-6 bg-gray-50 rounded-2xl shadow-sm md:hover:shadow-lg md:transition-all duration-300"
              >
                <SchemaProductSingle product={product} />
                <InfoCard
                  imageUrl={
                    product.colorVariants.find((v) => v.isCover)
                      ?.imageList[0] || ""
                  }
                  title={product.name}
                  description={product.shortDesc}
                  ctaUrl={`/su-aritma-urunleri/${params.kategori}/${product.slug}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  priority={i === 0}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
