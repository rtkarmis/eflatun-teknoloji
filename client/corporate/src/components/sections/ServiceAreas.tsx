"use client";
import { serviceAreas } from "@/data/service-areas";
import { COLORS } from "@/lib/constants";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ServiceAreas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="hizmet-yerlerimiz"
        className="py-12 md:py-20 bg-white relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: COLORS.primary }}
          >
            Bolu ve İlçelerinde Su Arıtma Servisi Hizmet Bölgelerimiz
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Eflatun Teknoloji olarak Bolu merkez başta olmak üzere Gerede,
            Mengen, Mudurnu, Göynük ve çevre ilçelerde su arıtma cihazı satışı,
            montaj ve bakım hizmetleri sunmaktayız.
          </p>

          {/* ✅ Scrollable container */}
          <div className="relative">
            <m.div
              ref={scrollRef}
              className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-2 scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {serviceAreas.map((a, i) => (
                <article
                  key={a.slug}
                  className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[32%] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 mb-3"
                >
                  <Link href={`/hizmet-bolgeleri/${a.slug}`}>
                    <Image
                      src={`/images/areas/${a.image}`}
                      alt={`${a.title} su arıtma cihazı satışı, montaj ve bakım hizmeti`}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover"
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      blurDataURL="/images/placeholder.webp"
                      loading={"lazy"}
                    />
                    <div className="p-4 text-center">
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: COLORS.secondary }}
                      >
                        {a.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                        {a.shortDesc || "Su arıtma satışı, montaj ve servis"}
                      </p>
                      <span
                        className="hover:underline text-sm font-medium"
                        style={{ color: COLORS.primary }}
                      >
                        {a.title} Su Arıtma Servisi →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </m.div>

            {/* 🔹 Masaüstü için ok butonları */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {serviceAreas.map((a, i) => (
                <article
                  key={a.slug}
                  className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 bg-white"
                >
                  <Link href={`/hizmet-bolgeleri/${a.slug}`}>
                    <Image
                      src={`/images/areas/${a.image}`}
                      alt={`${a.title} su arıtma cihazı satışı, montaj ve bakım hizmeti`}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.webp"
                      loading={"lazy"}
                    />
                    <div className="p-4 text-center">
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: COLORS.secondary }}
                      >
                        {a.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                        {a.shortDesc || "Su arıtma satışı, montaj ve servis"}
                      </p>
                      <span
                        className="hover:underline text-sm font-medium"
                        style={{ color: COLORS.primary }}
                      >
                        {a.title} Su Arıtma Servisi →
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
