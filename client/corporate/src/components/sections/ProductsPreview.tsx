"use client";
import { productCategories } from "@/data/products";
import { COLORS } from "@/lib/constants";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ProductsPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="products-preview"
        className="py-12 md:py-20 w-full bg-[#F9FAFB]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center px-4 md:px-6">
          {/* Başlık */}
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Ürünlerimiz
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base md:text-lg">
            Su arıtma cihazlarından filtre setlerine kadar{" "}
            <strong>orijinal ve garantili ürünler</strong>. Sağlıklı su için en
            uygun çözümleri keşfedin.
          </p>
          {/* ✅ Scrollable container */}
          <div className="relative">
            <m.div
              ref={scrollRef}
              className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {productCategories.map((cat, i) => (
                <article
                  key={cat.slug}
                  className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[32%] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 mb-3"
                >
                  <Link href={`/su-aritma-urunleri/${cat.slug}`}>
                    <Image
                      src={`/images/products/categories/${cat.imageName}`}
                      alt={`${cat.name} su arıtma cihazı`}
                      width={400}
                      height={240}
                      className="w-full h-44 object-contain bg-white"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.webp"
                      loading={"lazy"}
                    />
                    <div className="p-4 text-center">
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: COLORS.secondary }}
                      >
                        {cat.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600 mb-2 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: cat.desc }}
                      />
                      <span
                        className="hover:underline text-sm font-medium"
                        style={{ color: COLORS.primary }}
                      >
                        İncele →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </m.div>

            {/* 🔹 Masaüstü için ok butonları */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {productCategories.map((cat, i) => (
                <article
                  key={cat.slug}
                  className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 bg-white"
                >
                  <Link href={`/su-aritma-urunleri/${cat.slug}`}>
                    <Image
                      src={`/images/products/categories/${cat.imageName}`}
                      alt={`${cat.name} su arıtma cihazı`}
                      width={320}
                      height={180}
                      className="rounded-lg mb-4 w-full h-44 object-contain"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.webp"
                      loading={"lazy"}
                    />
                    <div className="p-4 text-center">
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: COLORS.secondary }}
                      >
                        {cat.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600 mb-2 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: cat.desc }}
                      />
                      <span
                        className="hover:underline text-sm font-medium"
                        style={{ color: COLORS.primary }}
                      >
                        İncele →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
