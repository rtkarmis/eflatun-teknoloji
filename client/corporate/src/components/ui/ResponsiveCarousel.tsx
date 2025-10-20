"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ResponsiveCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoplay?: boolean;
  interval?: number;
}

export function ResponsiveCarousel<T>({
  items,
  renderItem,
  autoplay = false,
  interval = 4000,
}: ResponsiveCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isHovered) return;
    const id = setInterval(() => scroll("right"), interval);
    return () => clearInterval(id);
  }, [autoplay, isHovered, interval]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -width * 0.8 : width * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden gap-4 px-1 md:px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth select-none pb-3"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-y pinch-zoom", // ✅ dikey kaydırmaya öncelik verir
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%]"
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {/* Masaüstü butonları */}
      {items.length > 3 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10 w-10 h-10 rounded-full bg-white shadow hover:shadow-lg transition items-center justify-center border border-gray-200"
            aria-label="Sola kaydır"
          >
            <ChevronLeft className="text-gray-700" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10 w-10 h-10 rounded-full bg-white shadow hover:shadow-lg transition items-center justify-center border border-gray-200"
            aria-label="Sağa kaydır"
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}
