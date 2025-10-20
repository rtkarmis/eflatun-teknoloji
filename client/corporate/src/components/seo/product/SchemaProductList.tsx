// src/components/seo/SchemaProductList.tsx
"use client";

import Script from "next/script";
import { Product, ProductCategory } from "@/types/product";
import { siteConfig } from "@/lib/seo";

export default function SchemaProductList({
  products,
  categories,
  slug,
}: {
  products?: Product[];
  categories?: ProductCategory[];
  slug: string;
}) {
  const items = products || categories || [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ürün Listesi",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.siteUrl}/su-aritma-urunleri/${item.slug}`,
      name: item.name,
    })),
  };

  return (
    <Script
      id={`schema-product-list-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
