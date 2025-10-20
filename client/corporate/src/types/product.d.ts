// src/types/product.ts
export interface Product {
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  category:
    | "su-aritma-cihazlari"
    | "su-aritma-filtreleri"
    | "su-aritma-ekipmanlari";
  type?: string; // sadece cihazlar için (ör. "Pompalı", "Pompasız")
  brand: string;
  price: number;
  currency: string;
  colorVariants: ProductColorVariant[];
  features: ProductFeature[];
  keywords: string[];
  stockStatus: "inStock" | "outOfStock";
  ratingValue: number;
  reviewCount: number;
  canonical: string;
}

export interface ProductCategory {
  name: string;
  imageName: string;
  slug: string;
  desc: string;
  keywords: string[];
  // schema is JSON-LD like object; define expected fields and allow additional unknown props
  schema: ProductCategorySchema;
}

export interface ProductCategorySchema {
  "@context"?: string;
  "@type"?: string;
  name?: string;
  description?: string;
  productGroupID?: string;
  brand?: string;
  category?: string;
  url?: string;
  // allow additional fields but typed as unknown to avoid 'any'
  [key: string]: unknown;
}

export interface ProductColorVariant {
  colorName: string;
  colorHex: string;
  imageList: string[];
  canonical: string;
  isCover: boolean;
}

export interface ProductFeature {
  name: string;
  value: string;
}
