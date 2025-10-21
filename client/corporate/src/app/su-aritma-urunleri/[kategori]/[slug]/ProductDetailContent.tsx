"use client";

import { memo, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";

import ActionButton from "@/components/ui/ActionButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import PageTitle from "@/components/ui/PageTitle";
import ProductGallery from "./ProductGallery";

import { buildProductDetailBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { Product } from "@/types/product";

function ProductDetailContentBase({
  product,
  params,
  searchParams,
}: {
  product: Product;
  params: { kategori: string };
  searchParams?: { color?: string };
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /** 🔹 Seçili renk */
  const currentColor =
    searchParams?.color ||
    sp?.get("color") ||
    product.colorVariants.find((v) => v.isCover)?.colorName ||
    product.colorVariants[0]?.colorName;

  /** 🔹 Renk varyantı (memoize edilmiş) */
  const variant = useMemo(() => {
    const sel = (currentColor || "").toLowerCase();
    return (
      product.colorVariants.find((v) => v.colorName.toLowerCase() === sel) ||
      product.colorVariants.find((v) => v.isCover) ||
      product.colorVariants[0]
    );
  }, [product, currentColor]);

  /** 🔹 Prefetch + geçiş */
  function onSelectColor(colorName: string) {
    startTransition(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("color", colorName);
      router.replace(url.pathname + url.search);

      // Prefetch optimize
      const variantToPrefetch = product.colorVariants.find(
        (v) => v.colorName === colorName
      );
      if (variantToPrefetch?.imageList) {
        variantToPrefetch.imageList.forEach((src) => {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = src;
          document.head.appendChild(link);
        });
      }
    });
  }

  return (
    <div>
      <Breadcrumb items={buildProductDetailBreadcrumb(product, params)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 🎨 Sol: Görseller */}
        <div className="lg:col-span-7">
          <div className="lg:hidden mb-4">
            <PageTitle text={product.name} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          <ProductGallery images={variant?.imageList || []} />
        </div>

        {/* 📋 Sağ: Bilgiler */}
        <div className="lg:col-span-5">
          <div className="hidden lg:block">
            <PageTitle text={product.name} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          {/* Fiyat ve Marka */}
          <div className="flex flex-col mb-3">
            <p className="text-sm text-gray-600 mb-2">
              Marka:{" "}
              <span className="font-medium text-gray-800">{product.brand}</span>
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {product.price.toLocaleString()} {product.currency}
              </div>
              <div className="text-sm text-gray-500">
                ({product.type || "Evsel"})
              </div>
            </div>
          </div>

          {/* Teklif Butonu */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6 w-full">
            <ActionButton
              href={`tel:${siteConfig.phone}`}
              title="Teklif Al"
              color={COLORS.primary}
              bgColor="#fff"
              icon={<FaPhoneAlt size={22} className="mr-2" />}
              className="border border-[#007F8C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E0F7FA] transition"
            />
          </div>

          {/* 🎨 Renk Seçenekleri */}
          {product.colorVariants.length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Renk Seçenekleri
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                {product.colorVariants.map((v) => {
                  const isActive =
                    (variant?.colorName || "").toLowerCase() ===
                    v.colorName.toLowerCase();
                  return (
                    <button
                      key={v.colorName}
                      onClick={() => onSelectColor(v.colorName)}
                      aria-pressed={isActive}
                      title={v.colorName}
                      disabled={isPending}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all ${
                        isActive
                          ? "border-blue-600 ring-2 ring-blue-200 scale-105"
                          : "border-gray-200 hover:border-blue-400 hover:scale-105"
                      }`}
                      style={{
                        background: v.colorHex,
                        opacity: isPending ? 0.6 : 1,
                        cursor: isPending ? "not-allowed" : "pointer",
                      }}
                    >
                      <span className="sr-only">{v.colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🧾 Özellikler */}
          <CollapsibleSection title="Ürün Özellikleri" defaultOpen={false}>
            <ul className="grid grid-cols-1 gap-2 mb-6">
              {product.features.map((f) => (
                <li
                  key={f.name}
                  className="text-sm bg-gray-50 px-3 py-2 rounded-md flex justify-between"
                >
                  <span>{f.name}</span>
                  <span className="font-medium">{f.value}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* 📖 Açıklama */}
          <CollapsibleSection title="Ürün Açıklaması" defaultOpen={false}>
            <div
              className="mt-4 prose prose-gray max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetailContentBase);
