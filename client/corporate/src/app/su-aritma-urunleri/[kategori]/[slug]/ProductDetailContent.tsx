"use client";

import ActionButton from "@/components/ui/ActionButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import PageTitle from "@/components/ui/PageTitle";
import { buildProductDetailBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import ProductGallery from "./ProductGallery";

export default function ProductDetailContent({
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

  const currentColor =
    searchParams?.color ||
    sp?.get("color") ||
    product.colorVariants.find((v) => v.isCover)?.colorName ||
    product.colorVariants[0]?.colorName;

  const variant = useMemo(() => {
    const sel = (currentColor || "").toString().toLowerCase();
    return (
      product.colorVariants.find((v) => v.colorName.toLowerCase() === sel) ||
      product.colorVariants.find((v) => v.isCover) ||
      product.colorVariants[0]
    );
  }, [product, currentColor]);

  function onSelectColor(colorName: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("color", colorName);
    router.replace(url.pathname + url.search);
  }

  return (
    <div>
      <Breadcrumb items={buildProductDetailBreadcrumb(product, params)} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol: Görseller */}
        <div className="lg:col-span-7">
          {/* Mobilde başlık ve kısa açıklama */}
          <div className="lg:hidden mb-4">
            <PageTitle text={product.name} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>
          <ProductGallery images={variant?.imageList || []} />
        </div>

        {/* Sağ: Bilgiler */}
        <div className="lg:col-span-5">
          <div className="hidden lg:block">
            <PageTitle text={product.name} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

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

          {/* Renk seçenekleri */}
          {product.colorVariants.length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Renk Seçenekleri
              </h4>
              <div className="flex items-center gap-3">
                {product.colorVariants
                  .filter(
                    (v) =>
                      (variant?.colorName || "").toLowerCase() !==
                      v.colorName.toLowerCase()
                  )
                  .map((v) => (
                    <button
                      key={v.colorName}
                      onClick={() => onSelectColor(v.colorName)}
                      aria-pressed={
                        (variant?.colorName || "").toLowerCase() ===
                        v.colorName.toLowerCase()
                      }
                      title={v.colorName}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center focus:outline-none ${
                        (variant?.colorName || "").toLowerCase() ===
                        v.colorName.toLowerCase()
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-200"
                      }`}
                      style={{ background: v.colorHex }}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Özellikler */}
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

          {/* Açıklama */}
          <CollapsibleSection title="Ürün Açıklaması" defaultOpen={false}>
            <div
              className="mt-4 prose prose-gray max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
