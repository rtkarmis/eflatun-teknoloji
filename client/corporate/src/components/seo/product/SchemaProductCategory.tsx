// src/components/seo/SchemaProductCategory.tsx
"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/seo";
import { ProductCategory } from "@/types/product";

interface Props {
  category:ProductCategory;
}

export default function SchemaProductCategory({category}: Props)
{
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: category.name,
    description: category.desc,
    brand: {
      "@type": "Brand",
      name: siteConfig.siteName,
    },
    category: category.name,
    url: `${siteConfig.siteUrl}/su-aritma-urunleri/${category.slug}`,
  };

  return (
    <Script
      id={`schema-category-${category.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
