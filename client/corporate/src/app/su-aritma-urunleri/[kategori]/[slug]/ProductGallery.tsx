"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

type SlickSlider = {
  slickGoTo: (index: number) => void;
} | null;

export default function ProductGallery({ images }: { images: string[] }) {
  const mainRef = useRef<SlickSlider>(null);
  const [current, setCurrent] = useState(0);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  /** 🎯 Görseller değiştiğinde slider sıfırlanır (küçük gecikmeyle flicker engellenir) */
  useEffect(() => {
    if (!mainRef.current || !images?.length) return;
    const t = setTimeout(() => {
      mainRef.current?.slickGoTo(0);
      setCurrent(0);
    }, 150);
    return () => clearTimeout(t);
  }, [images]);

  // When the current slide changes, ensure the corresponding thumbnail is visible
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const active = container.querySelector(
      `[data-thumb-index="${current}"]`
    ) as HTMLElement | null;
    if (active) {
      // center the active thumbnail in the visible area when possible
      active.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [current]);

  if (!images || images.length === 0) return null;

  const mainSettings: Record<string, unknown> = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    swipe: true,
    adaptiveHeight: true,
    beforeChange: (_: number, next: number) => setCurrent(next),
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false, dots: true },
      },
    ],
  };

  return (
    <div>
      {/* Ana Görsel Alanı */}
      <div
        key={images[0]}
        className="rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100"
      >
        <Slider
          ref={(c: unknown) => (mainRef.current = c as SlickSlider)}
          {...mainSettings}
        >
          {images.map((src, i) => (
            <Image
              src={src}
              key={i}
              alt={`Ürün görseli ${i + 1}`}
              width={1200}
              height={800}
              className="object-contain"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          ))}
        </Slider>
      </div>

      {/* Küçük Önizleme Görselleri (Swipeable) */}
      {images.length > 1 && (
        <div className="relative overflow-x-auto scrollbar-hide">
          <div
            ref={thumbsRef}
            className="flex items-center gap-3 py-2 px-1 snap-x snap-mandatory scroll-smooth touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                data-thumb-index={i}
                onClick={() => {
                  mainRef.current?.slickGoTo(i);
                  setCurrent(i);
                }}
                className={`flex-shrink-0 snap-center rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  current === i
                    ? "border-blue-600 shadow"
                    : "border-transparent hover:border-gray-300"
                }`}
                aria-label={`Görsel ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Görsel ${i + 1}`}
                  width={60}
                  height={60}
                  className="object-cover w-[60px] h-[60px]"
                  priority={i === 0}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
