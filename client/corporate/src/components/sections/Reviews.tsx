"use client";

import type { ReviewsApiResponse } from "@/app/api/reviews/route";
import { allReviewURL, COLORS } from "@/lib/constants";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewsSkeleton } from "../skeleton/ReviewsSkeleton";

export default function Reviews() {
  const [data, setData] = useState<ReviewsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [canHover, setCanHover] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Fetch reviews (cached)
  useEffect(() => {
    let ignore = false;
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { next: { revalidate: 3600 } });
        const json = (await res.json()) as ReviewsApiResponse;
        if (!ignore) setData(json);
      } catch {
        if (!ignore) setData({ reviews: [], error: "FETCH_ERROR" });
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchReviews();
    return () => {
      ignore = true;
    };
  }, []);

  // Optimize hover detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const reviews = data?.reviews ?? [];

  // Refs and scroll logic
  const updateArrows = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 8);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.clientWidth * 0.9;
    container.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateArrows();
    container.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      container.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="google-yorumlari"
        className="py-12 md:py-16"
        style={{ background: COLORS.background }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center px-4 relative">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: COLORS.primary }}
          >
            Google Yorumları
          </h2>

          {!loading && (data?.rating || data?.total) && (
            <p className="text-sm text-gray-600 mb-8">
              {data?.placeName && `${data.placeName} · `}
              {data?.rating && `Ortalama ${data.rating.toFixed(1)}/5`}
              {data?.total && ` · ${data.total}+ yorum`}
            </p>
          )}

          {loading && <ReviewsSkeleton />}

          {!loading && reviews.length > 0 && (
            <>
              {/* Mobil scroll-snap alanı */}
              <m.div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth px-2 md:px-4 scrollbar-hide md:overflow-hidden"
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                  scrollSnapType: "x mandatory",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {reviews.map((r, i) => (
                  <m.article
                    key={r.authorName + i}
                    className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[32%] bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-left mb-3 transition-transform duration-200"
                    {...(canHover ? { whileHover: { scale: 1.02 } } : {})}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={
                          r.profilePhotoUrl || "/images/avatar-placeholder.png"
                        }
                        alt={`${r.authorName} profil fotoğrafı`}
                        width={40}
                        height={40}
                        loading={i < 2 ? "eager" : "lazy"}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {r.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {r.relativeTime || "Yakın zaman"}
                        </p>
                      </div>
                    </div>

                    <div
                      className="text-yellow-500 text-sm mb-2"
                      aria-label={`Puan: ${r.rating}/5`}
                    >
                      {"★".repeat(Math.round(r.rating))}
                      {"☆".repeat(5 - Math.round(r.rating))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
                      {r.text}
                    </p>

                    {r.authorUrl && (
                      <Link
                        href={r.authorUrl}
                        target="_blank"
                        className="mt-4 text-sm font-medium hover:underline inline-block"
                        style={{ color: COLORS.primary }}
                      >
                        Google’da gör →
                      </Link>
                    )}
                  </m.article>
                ))}
              </m.div>

              {/* Masaüstü ok butonları */}
              <div className="hidden md:flex justify-between absolute top-1/2 left-0 right-0 px-2 -translate-y-1/2 pointer-events-none">
                {showLeftArrow && (
                  <button
                    onClick={() => scroll("left")}
                    className="pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow flex items-center justify-center border border-gray-100 transition"
                    aria-label="Sola kaydır"
                  >
                    <ChevronLeft className="text-gray-700" />
                  </button>
                )}
                {showRightArrow && (
                  <button
                    onClick={() => scroll("right")}
                    className="pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow flex items-center justify-center border border-gray-100 transition"
                    aria-label="Sağa kaydır"
                  >
                    <ChevronRight className="text-gray-700" />
                  </button>
                )}
              </div>

              {/* CTA */}
              <m.div
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={allReviewURL}
                  target="_blank"
                  className="inline-block text-sm font-semibold border border-gray-200 rounded-lg px-6 py-3 hover:bg-gray-50 transition"
                  style={{ color: COLORS.primary }}
                >
                  Tüm Yorumları Gör →
                </Link>
              </m.div>
            </>
          )}
        </div>
      </m.section>
    </LazyMotion>
  );
}
