"use client";
import { services } from "@/data/services";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <section id="hizmetlerimiz" className="py-12 md:py-16 bg-white w-full">
      <div className="max-w-6xl mx-auto text-center px-4 md:px-6">
        {/* Başlık */}
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: COLORS.primary }}
        >
          Hizmetlerimiz
        </h2>

        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base md:text-lg">
          Satış, montaj, bakım ve filtre değişimi dahil tüm{" "}
          <strong>su arıtma hizmetlerini</strong> uzman ekibimizle sunuyoruz.
        </p>

        {/* 🔹 Mobil görünüm */}
        <div className="block sm:hidden space-y-6">
          {services.map((s) => (
            <div
              key={s.slug}
              className="bg-[#F9FAFB] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="relative w-full h-56 sm:h-60 md:h-64">
                <Image
                  src={`/images/services/${s.image}`}
                  alt={`${s.title} hizmeti`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  quality={80}
                  loading={"lazy"}
                />
              </div>

              <div className="p-5 flex flex-col items-center text-center">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: COLORS.secondary }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed max-w-xs">
                  {s.shortDesc}
                </p>
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="font-medium hover:underline text-sm"
                  style={{ color: COLORS.primary }}
                >
                  Hemen Hizmet Al →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Masaüstü görünüm */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.slug}
              className="bg-[#F9FAFB] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col text-center"
            >
              <div className="relative w-full h-56 md:h-60 lg:h-64">
                <Image
                  src={`/images/services/${s.image}`}
                  alt={`${s.title} hizmeti`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 33vw, 400px"
                  quality={80}
                  loading={"lazy"}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 items-center justify-center">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: COLORS.secondary }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm max-w-xs">
                  {s.shortDesc}
                </p>
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="font-medium hover:underline text-sm mt-auto"
                  style={{ color: COLORS.primary }}
                >
                  Hemen Hizmet Al →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
