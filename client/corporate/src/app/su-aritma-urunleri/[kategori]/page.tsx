// app/su-aritma-urunleri/[kategori]/page.tsx
import { notFound } from "next/navigation";
import { productCategories, products } from "@/data/products";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import SchemaProductCategory from "@/components/seo/product/SchemaProductCategory";
import ProductCategoryContent from "./ProductCategoryContent";
import SchemaProductList from "@/components/seo/product/SchemaProductList";
import MetaHead from "@/components/seo/MetaHead";
import { buildProductCategoryBreadcrumb } from "@/lib/breadcrumbs";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export async function generateMetadata({
  params,
}: {
  params: { kategori: string };
}) {
  const awaitedParams = await params;
  const category = productCategories.find(
    (c) => c.slug === awaitedParams.kategori
  );
  if (!category) return notFound();

  return generatePageMetadata({
    title: `${category.name}`,
    description: category.desc,
    slug: `su-aritma-urunleri/${category.slug}`,
  });
}

export default async function ProductCategoryPage({
  params,
}: {
  params: { kategori: string };
}) {
  const awaitedParams = await params;
  const category = productCategories.find(
    (c) => c.slug === awaitedParams.kategori
  );
  if (!category) return notFound();
  const filteredProducts = products.filter(
    (p) => p.category === awaitedParams.kategori
  );

  return (
    <>
      <MetaHead
        title={category.name}
        description={category.desc}
        canonical={`${siteConfig.siteUrl}/su-aritma-urunleri/${category.slug}`}
        keywords={category.keywords}
      />
      <SchemaProductCategory category={category} />
      <SchemaProductList
        categories={[]}
        products={filteredProducts}
        slug={`su-aritma-urunleri/${category.slug}`}
      />
      <SchemaBreadcrumb items={buildProductCategoryBreadcrumb(category)} />
      <ProductCategoryContent
        key={awaitedParams.kategori}
        category={category}
        products={filteredProducts}
        params={awaitedParams}
      />
    </>
  );
}
