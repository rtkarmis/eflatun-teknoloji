"use client";
import { siteConfig } from "@/lib/seo";
import { Product } from "@/types/product";
import Head from "next/head";
interface SchemaProductSingleProps {
  product: Product;
  selectedColor?: string;
}

export default function SchemaProductSingle({
  product,
  selectedColor,
}: SchemaProductSingleProps) {
  // 🔹 Aktif varyantı belirle
  const variant =
    product.colorVariants.find(
      (v) => v.colorName.toLowerCase() === selectedColor?.toLowerCase()
    ) ||
    product.colorVariants.find((v) => v.isCover) ||
    product.colorVariants[0];

  const canonicalUrl = variant?.canonical || product.canonical;
  const imageList = variant?.imageList || [];

  // 🔹 Ana ürün objesi (color varyantlı yapı)
  const baseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDesc,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    image: imageList.map((img) => `${siteConfig.siteUrl}${img}`),
    sku: product.slug,
    url: canonicalUrl,
    productID: product.slug,
    category: product.category,
    inProductGroupWithID: product.category,
    // 🔹 varyant rengi
    color: variant?.colorName,
    // 🔹 Özellikleri "additionalProperty" olarak ekliyoruz (Google Rich Results destekler)
    additionalProperty: product.features.map((f) => ({
      "@type": "PropertyValue",
      name: f.name,
      value: f.value,
    })),
    // 🔹 Fiyat bilgisi (Offer)
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.stockStatus === "inStock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Eflatun Teknoloji",
      },
    },
    // 🔹 Ortalama değerlendirme (Google arama sonuçlarında yıldızlar için)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
    },
  };

  // 🔹 Eğer birden fazla varyant varsa (örneğin renk), hasVariant eklenir
  if (product.colorVariants.length > 1) {
    baseSchema.hasVariant = product.colorVariants.map((v) => ({
      "@type": "Product",
      name: `${product.name} (${v.colorName})`,
      url: v.canonical.startsWith("http")
        ? v.canonical
        : `${siteConfig.siteUrl}${v.canonical}`,
      color: v.colorName,
      image: v.imageList.map((img) => `${siteConfig.siteUrl}${img}`),
    }));
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
    </Head>
  );
}
