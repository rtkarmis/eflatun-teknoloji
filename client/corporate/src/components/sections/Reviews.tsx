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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

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

  // Masaüstü/mobil ayrımı
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Masaüstü için oklarla scroll ve index güncelleme
  const [atEnd, setAtEnd] = useState(false);
  const scrollDesktop = useCallback(
    (dir: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;
      const cardEls = Array.from(container.children) as HTMLElement[];
      const cardWidth = cardEls[0]?.offsetWidth || 1;
      let newIndex = activeIndex;
      if (dir === "left" && activeIndex > 0) {
        newIndex = activeIndex - 1;
      } else if (dir === "right" && activeIndex < reviews.length - 1) {
        newIndex = activeIndex + 1;
      }
      setActiveIndex(newIndex);
      container.scrollTo({
        left: cardWidth * newIndex + 16 * newIndex, // 16px gap varsayımı
        behavior: "smooth",
      });
      // Scroll sonrası atEnd'i güncelle
      setTimeout(() => {
        const lastCard = cardEls[cardEls.length - 1];
        const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
        const containerRight = container.scrollLeft + container.clientWidth;
        setAtEnd(containerRight >= lastCardRight - 1);
      }, 350);
    },
    [activeIndex, reviews.length]
  );

  // Son kart en sağda mı kontrolü (her scroll ve resize'da güncellenir)
  useEffect(() => {
    if (!isDesktop) return;
    const container = scrollRef.current;
    if (!container) return;
    const checkAtEnd = () => {
      const cardEls = Array.from(container.children) as HTMLElement[];
      if (cardEls.length === 0) return setAtEnd(false);
      const lastCard = cardEls[cardEls.length - 1];
      const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
      const containerRight = container.scrollLeft + container.clientWidth;
      setAtEnd(containerRight >= lastCardRight - 1);
    };
    checkAtEnd();
    container.addEventListener("scroll", checkAtEnd, { passive: true });
    window.addEventListener("resize", checkAtEnd);
    return () => {
      container.removeEventListener("scroll", checkAtEnd);
      window.removeEventListener("resize", checkAtEnd);
    };
  }, [isDesktop, reviews.length]);

  // Scroll pozisyonu değişince aktif kartı güncelle
  useEffect(() => {
    if (!isDesktop) return;
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const cardEls = Array.from(container.children) as HTMLElement[];
      const scrollLeft = container.scrollLeft;
      let idx = 0;
      let minDiff = Infinity;
      cardEls.forEach((el, i) => {
        const diff = Math.abs(el.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          idx = i;
        }
      });
      setActiveIndex(idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [isDesktop, reviews.length]);

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
              {isDesktop && reviews.length > 3 && (
                <>
                  {activeIndex > 0 && (
                    <button
                      onClick={() => scrollDesktop("left")}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow items-center justify-center border border-gray-100 transition z-10"
                      aria-label="Sola kaydır"
                    >
                      <ChevronLeft className="text-gray-700" />
                    </button>
                  )}
                  {!atEnd && (
                    <button
                      onClick={() => scrollDesktop("right")}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow items-center justify-center border border-gray-100 transition z-10"
                      aria-label="Sağa kaydır"
                    >
                      <ChevronRight className="text-gray-700" />
                    </button>
                  )}
                </>
              )}

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
