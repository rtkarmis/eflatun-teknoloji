// app/su-aritma-urunleri/[kategori]/[slug]/page.tsx
import { notFound } from "next/navigation";
import MetaHead from "@/components/seo/MetaHead";
import SchemaProductSingle from "@/components/seo/product/SchemaProductSingle";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import ProductDetailContent from "./ProductDetailContent";

import { products } from "@/data/products";
import { buildProductDetailBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

/* ✅ Static generation & incremental revalidation */
export const revalidate = 3600; // 1 saat (3600 sn)
export const dynamic = "force-static";

/* ✅ Tüm ürün slug’larını build sırasında hazırla */
export async function generateStaticParams() {
  return products.map((p) => ({
    kategori: p.category || "su-aritma-cihazlari",
    slug: p.slug,
  }));
}

/* ✅ Dinamik Metadata (her ürün için) */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { kategori: string; slug: string };
  searchParams?: { color?: string | string[] };
}) {
  // Next.js 14+ params ve searchParams dinamik API'si asenkron olabilir
  const resolvedParams =
    typeof params === "object" && "then" in params ? await params : params;
  const resolvedSearchParams =
    typeof searchParams === "object" && "then" in searchParams
      ? await searchParams
      : searchParams;
  const { slug } = resolvedParams;
  const colorParam = Array.isArray(resolvedSearchParams?.color)
    ? resolvedSearchParams.color[0]
    : resolvedSearchParams?.color;

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const selectedVariant =
    (colorParam &&
      product.colorVariants.find(
        (v) => v.colorName.toLowerCase() === colorParam.toLowerCase()
      )) ||
    product.colorVariants.find((v) => v.isCover) ||
    product.colorVariants[0];

  const metaImage = selectedVariant?.imageList?.[0] || "";
  const canonicalUrl = selectedVariant?.canonical || product.canonical;

  return generatePageMetadata({
    title: `${product.name} | ${product.brand} Su Arıtma Cihazı`,
    description: product.shortDesc,
    slug: canonicalUrl,
    image: metaImage,
  });
}

/* ✅ Sayfa */
export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: { kategori: string; slug: string };
  searchParams?: { color?: string | string[] };
}) {
  // Next.js 14+ params ve searchParams dinamik API'si asenkron olabilir
  const resolvedParams =
    typeof params === "object" && "then" in params ? await params : params;
  const resolvedSearchParams =
    typeof searchParams === "object" && "then" in searchParams
      ? await searchParams
      : searchParams;
  const { kategori, slug } = resolvedParams;
  const colorParam = Array.isArray(resolvedSearchParams?.color)
    ? resolvedSearchParams.color[0]
    : resolvedSearchParams?.color;

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const selectedVariant =
    (colorParam &&
      product.colorVariants.find(
        (v) => v.colorName.toLowerCase() === colorParam.toLowerCase()
      )) ||
    product.colorVariants.find((v) => v.isCover) ||
    product.colorVariants[0];

  const headImage = selectedVariant?.imageList?.[0] || "";
  const canonicalUrl = selectedVariant?.canonical || product.canonical;

  return (
    <>
      <MetaHead
        title={`${product.name} | ${product.brand} Su Arıtma Cihazı`}
        description={product.shortDesc}
        keywords={product.keywords}
        canonical={canonicalUrl}
        image={headImage}
      />
      <SchemaProductSingle product={product} />
      <SchemaBreadcrumb items={buildProductDetailBreadcrumb(product)} />
      <ProductDetailContent
        key={`${slug}-${colorParam || ""}`}
        product={product}
        params={{ kategori }}
        searchParams={{ color: colorParam }}
      />
    </>
  );
}
