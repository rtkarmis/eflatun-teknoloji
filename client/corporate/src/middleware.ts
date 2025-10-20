// src/middleware.ts
import { products } from "@/data/products";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // sadece ürün detay rotalarını kontrol et
  if (pathname.startsWith("/su-aritma-urunleri/")) {
    const parts = pathname.split("/").filter(Boolean);
    const slug = parts[2];
    const colorParam = searchParams.get("color");

    if (slug && !colorParam) {
      const product = products.find((p) => p.slug === slug);
      if (product && product.colorVariants.length > 1) {
        const cover = product.colorVariants.find((v) => v.isCover);
        if (cover?.canonical) {
          const redirectUrl = new URL(cover.canonical, request.url);
          return NextResponse.redirect(redirectUrl, 308);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/su-aritma-urunleri/:path*"],
};
