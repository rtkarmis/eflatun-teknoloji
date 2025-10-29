// app/su-aritma-urunleri/[kategori]/[slug]/page.tsx
import MetaHead from "@/components/seo/MetaHead";
import SchemaProductSingle from "@/components/seo/product/SchemaProductSingle";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import { products } from "@/data/products";
import { buildProductDetailBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { notFound } from "next/navigation";
import ProductDetailContent from "./ProductDetailContent";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ kategori: string; slug: string }>;
  searchParams?: Promise<{ color?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  // color param'ı varsa uygun varyantı bul
  const colorParam = Array.isArray(query?.color)
    ? query.color[0]
    : query?.color;

  const selectedVariant =
    colorParam && product.colorVariants.length > 0
      ? product.colorVariants.find(
          (v) => v.colorName.toLowerCase() === colorParam.toLowerCase()
        )
      : product.colorVariants.find((v) => v.isCover) ||
        product.colorVariants[0];

  // Meta için kullanılacak görsel ve canonical
  const metaImage = selectedVariant?.imageList?.[0] || "";
  const canonicalUrl = selectedVariant?.canonical || product.canonical;

  return generatePageMetadata({
    title: `${product.name} | ${product.brand} Su Arıtma Cihazı`,
    description: product.shortDesc,
    slug: canonicalUrl.replace(`${siteConfig.siteUrl}/`, ""),
    image: metaImage,
  });
}
export const dynamic = "force-static";

export async function generateStaticParams() {
  return products.map((product) => ({
    kategori: product.category,
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ kategori: string; slug: string }>;
  searchParams?: Promise<{ color?: string | string[] }>;
}) {
  const routeParams = (await params) as { kategori: string; slug: string };
  const query = (await searchParams) as
    | { color?: string | string[] }
    | undefined;

  const product = products.find((p) => p.slug === routeParams.slug);
  if (!product) return notFound();

  const colorParam = Array.isArray(query?.color)
    ? query.color[0]
    : query?.color;

  const selectedVariant = colorParam
    ? product.colorVariants.find(
        (v) => v.colorName.toLowerCase() === colorParam.toLowerCase()
      )
    : product.colorVariants.find((v) => v.isCover) || product.colorVariants[0];

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
        key={routeParams.slug}
        product={product}
        params={routeParams}
        searchParams={{ color: colorParam }}
      />
    </>
  );
}
