import { generatePageMetadata } from "@/lib/seo";
import ProductContent from "./ProductContent";
import SchemaProductList from "@/components/seo/product/SchemaProductList";
import { productCategories } from "@/data/products";
import { buildProductsMainBreadcrumb } from "@/lib/breadcrumbs";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata = generatePageMetadata({
  title: "Su Arıtma Ürünleri",
  description:
    "Su arıtma cihazı, filtre ve ekipman kategorilerimizle Eflatun Teknoloji farkını keşfedin. Ev tipi ve endüstriyel sistemler için en uygun çözümler.",
  slug: "su-aritma-urunleri",
});
export const dynamic = "force-static";
export default function ProductsPage() {
  return (
    <>
      <SchemaProductList
        categories={productCategories}
        products={[]}
        slug="su-aritma-urunleri"
      />
      <SchemaBreadcrumb items={buildProductsMainBreadcrumb()} />
      <ProductContent />
    </>
  );
}
