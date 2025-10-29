// app/su-aritma-urunleri/[kategori]/[slug]/page.tsx
import MetaHead from "@/components/seo/MetaHead";
import SchemaProductSingle from "@/components/seo/product/SchemaProductSingle";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import { products } from "@/data/products";
import { buildProductDetailBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetailContent from "./ProductDetailContent";

export const revalidate = 86400; // 24 hours

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  // Default varyant kullan (cover veya ilk)
  const selectedVariant =
    product.colorVariants.find((v) => v.isCover) || product.colorVariants[0];

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

export async function generateStaticParams() {
  const params = [];

  // Her ürün için temel sayfa
  for (const product of products) {
    params.push({
      kategori: product.category,
      slug: product.slug,
    });
  }

  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ kategori: string; slug: string }>;
}) {
  const routeParams = (await params) as { kategori: string; slug: string };

  const product = products.find((p) => p.slug === routeParams.slug);
  if (!product) return notFound();

  // Default varyant kullan - client-side'da query params handle edilecek
  const selectedVariant =
    product.colorVariants.find((v) => v.isCover) || product.colorVariants[0];

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
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-gray-600">Yükleniyor...</div>
          </div>
        }
      >
        <ProductDetailContent
          key={routeParams.slug}
          product={product}
          params={routeParams}
        />
      </Suspense>
    </>
  );
}
