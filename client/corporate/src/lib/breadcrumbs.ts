import { productCategories } from "@/data/products";
import { BreadcrumbItem } from "@/types/common";
import { Product, ProductCategory } from "@/types/product";
import { Service } from "@/types/service";
import { ServiceArea } from "@/types/service-area";

export const buildHome = (): BreadcrumbItem[] => [
  { label: "Anasayfa", href: "/" },
];

// Products
export const buildProductsMainBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Ürünlerimiz" },
];

export const buildProductsBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Ürünler", href: "/su-aritma-urunleri" },
];

export const buildProductCategoryBreadcrumb = (
  cat: ProductCategory
): BreadcrumbItem[] => [...buildProductsBreadcrumb(), { label: cat.name }];

export const buildProductDetailBreadcrumb = (
  product: Product,
  params?: { kategori?: string }
): BreadcrumbItem[] => {
  const categorySlug = params?.kategori || product.category;
  const cat = productCategories.find((c) => c.slug === categorySlug);

  const items: BreadcrumbItem[] = [...buildProductsBreadcrumb()];
  if (cat) {
    items.push({ label: cat.name, href: `/su-aritma-urunleri/${cat.slug}` });
  }
  items.push({ label: product.name });
  return items;
};

// Services
export const buildServicesBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Hizmetlerimiz" },
];

export const buildServiceDetailBreadcrumb = (
  service: Service
): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Hizmetlerimiz", href: "/su-aritma-hizmetleri" },
  { label: service.title },
];

// Service areas
export const buildServiceAreasBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Hizmet Bölgelerimiz" },
];

export const buildServiceAreaDetailBreadcrumb = (
  area: ServiceArea
): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
  { label: `${area.title} Su Arıtma Servisi` },
];

// About
export const buildAboutBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Hakkımızda" },
];

export const buildContactBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "İletişim" },
];

export const buildPolicyBreadcrumb = (title: string): BreadcrumbItem[] => [
  ...buildHome(),
  { label: title },
];

export const buildSitemapBreadcrumb = (): BreadcrumbItem[] => [
  ...buildHome(),
  { label: "Site Haritası" },
];
// (named exports only)
