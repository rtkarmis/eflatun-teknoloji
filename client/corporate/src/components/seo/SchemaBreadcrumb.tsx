"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/seo";
import { BreadcrumbItem } from "@/types/common";

interface Props {
  items: BreadcrumbItem[];
}

export default function SchemaBreadcrumb({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href?.startsWith("http")
        ? item.href
        : `${siteConfig.siteUrl}${item.href}`,
    })),
  };

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
