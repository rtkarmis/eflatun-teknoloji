"use client";

import { siteConfig } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

/**
 * 🔹 Tek Logo bileşeni (responsive + 16:9 optimize)
 * - Mobil ve masaüstü için tek yapı
 * - Doğal oran: 1024x576 (16:9)
 * - CLS yok (sabit width/height)
 * - Lazy load + async decoding
 * - Retina ekranlarda net görünüm
 */
export default function Logo({
  href = "/",
  priority = false,
  width = 150,
  height = 84, // 16:9 oranı (150x84)
}: {
  href?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center select-none"
      aria-label={siteConfig.siteName}
    >
      <Image
        src="/images/settings/logo.webp"
        alt={siteConfig.siteName}
        width={width}
        height={height}
        priority={priority}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={`object-contain w-auto h-auto max-h-[${height}px]`}
        sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
      />
    </Link>
  );
}
