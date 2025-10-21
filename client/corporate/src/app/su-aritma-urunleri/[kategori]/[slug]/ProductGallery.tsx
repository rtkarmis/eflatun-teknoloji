"use client";

import Image from "next/image";
import { useEffect, useRef, useState, memo } from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

type SlickSlider = {
  slickGoTo: (index: number) => void;
} | null;

function ProductGalleryBase({ images }: { images: string[] }) {
  const mainRef = useRef<SlickSlider>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);

  /** CSS'leri sadece tarayıcıda yükle */
  useEffect(() => {
    import("slick-carousel/slick/slick.css");
    import("slick-carousel/slick/slick-theme.css");
  }, []);

  /** Görseller değiştiğinde slider sıfırlanır */
  useEffect(() => {
    if (!mainRef.current || !images?.length) return;
    const t = setTimeout(() => {
      mainRef.current?.slickGoTo(0);
      setCurrent(0);
    }, 100);
    return () => clearTimeout(t);
  }, [images]);

  /** Aktif küçük görsel görünür alanda kalır */
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const active = container.querySelector(
      `[data-thumb-index="${current}"]`
    ) as HTMLElement | null;
    active?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [current]);

  if (!images?.length) return null;

  /** Slick ayarları */
  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    swipe: true,
    adaptiveHeight: true,
    lazyLoad: "ondemand",
    beforeChange: (_: number, next: number) => setCurrent(next),
    responsive: [{ breakpoint: 768, settings: { arrows: false, dots: true } }],
  };

  /** 🧠 Hover sırasında preload */
  const preloadImage = (src: string) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  };

  return (
    <div>
      {/* 🖼️ Ana Görsel */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100">
        <Slider
          ref={(c: unknown) => (mainRef.current = c as SlickSlider)}
          {...mainSettings}
        >
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Ürün görseli ${i + 1}`}
              width={600}
              height={600}
              quality={75}
              priority
              fetchPriority="high"
              loading="eager"
              decoding="async"
              sizes="(max-width:480px) 90vw, (max-width:768px) 70vw, (max-width:1200px) 50vw, 600px"
              className="object-contain w-full h-auto max-w-[600px] mx-auto rounded-xl bg-gray-50 aspect-square select-none will-change-transform"
              style={{ color: "transparent" }}
            />
          ))}
        </Slider>
      </div>

      {/* 🖼️ Küçük Önizlemeler */}
      {images.length > 1 && (
        <div className="relative overflow-x-auto scrollbar-hide will-change-transform">
          <div
            ref={thumbsRef}
            className="flex items-center gap-2 py-2 px-1 snap-x snap-mandatory scroll-smooth touch-pan-x select-none"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                data-thumb-index={i}
                onMouseEnter={() => preloadImage(src)}
                onFocus={() => preloadImage(src)}
                onClick={() => {
                  mainRef.current?.slickGoTo(i);
                  setCurrent(i);
                }}
                aria-label={`Ürün küçük görsel ${i + 1}`}
                className={`relative flex-shrink-0 snap-center rounded-xl overflow-hidden border transition-all duration-200 ease-out ${
                  current === i
                    ? "border-[color:var(--color-primary)] shadow-md scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-[1.02]"
                }`}
                style={{
                  width: 60,
                  height: 60,
                  willChange: "transform",
                }}
              >
                <Image
                  src={src}
                  alt={`Ürün küçük görsel ${i + 1}`}
                  width={60}
                  height={60}
                  quality={70}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="60px"
                  className="object-cover w-full h-full bg-gray-100"
                />
                {current === i && (
                  <span className="absolute inset-0 ring-2 ring-[color:var(--color-primary)] rounded-xl pointer-events-none"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductGalleryBase);
