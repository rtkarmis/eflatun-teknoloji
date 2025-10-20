"use client";

import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center text-center py-20 md:py-28 px-4"
      style={{
        background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Ana başlık (LCP elemanı) */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
        Bolu Su Arıtma Cihazı Satışı, Montaj ve Servis Hizmetleri
      </h1>

      {/* ✅ Açıklama */}
      <p className="text-white/90 text-base md:text-lg mt-4 max-w-2xl mx-auto">
        Eflatun Teknoloji, Bolu ve çevresinde orijinal filtre garantisiyle{" "}
        <strong>su arıtma cihazı satışı</strong>, <strong>montaj</strong> ve{" "}
        <strong>bakım</strong> hizmeti sunar. Aynı gün servis garantisiyle
        profesyonel destek.
      </p>

      {/* ✅ CTA Butonları */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`tel:${siteConfig.phone}`}
          className="bg-white text-[#044C9A] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Hemen Ara
        </Link>

        <Link
          href="/su-aritma-urunleri"
          className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
        >
          Ürünleri İncele
        </Link>
      </div>

      {/* ✅ SEO açısından görünmez microdata (JSON-LD değil, inline hint) */}
      <span className="sr-only">
        Bolu su arıtma cihazı satışı, montajı ve bakım hizmetleri. Eflatun
        Teknoloji güvencesiyle.
      </span>
    </motion.section>
  );
}
