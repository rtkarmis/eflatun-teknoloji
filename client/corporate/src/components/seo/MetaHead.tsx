// src/components/seo/MetaHead.tsx
"use client";

import Head from "next/head";

interface MetaHeadProps {
  title: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  noIndex?: boolean;
}

export default function MetaHead({
  title,
  description,
  keywords,
  canonical,
  image = "/images/og-default.webp",
  noIndex = false,
}: MetaHeadProps) {
  const siteName = "Eflatun Teknoloji";
  const fullTitle = `${title} | ${siteName}`;
  const defaultDescription =
    "Eflatun Teknoloji – Bolu ve çevresinde su arıtma cihazı, filtre ve ekipman satış, montaj ve bakım hizmetleri.";
  const pageDescription = description || defaultDescription;

  return (
    <Head>
      {/* 🧠 Temel Meta Bilgiler */}
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}

      {/* 🧭 Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* 🚫 İndeksleme Ayarı (opsiyonel) */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* 🧩 Open Graph (Facebook & LinkedIn) */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={siteName} />

      {/* 🐦 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
