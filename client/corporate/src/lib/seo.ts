import type { Metadata } from "next";

/* -------------------------------------------------------------
 🧩 1. Site Genel Ayarları
------------------------------------------------------------- */

export const siteConfig = {
  siteUrl: "https://eflatunteknoloji.com",
  siteName: "Eflatun Teknoloji Su Arıtma Sistemleri",
  legalName: "Eflatun Teknoloji Su Arıtma Sistemleri",
  defaultTitle: "Eflatun Teknoloji Su Arıtma Sistemleri | Bolu",
  defaultDescription:
    "Bolu ve çevresinde su arıtma cihazı satışı, montaj ve bakım hizmetleri. Eflatun Teknoloji ile sağlıklı suya ulaşın.",
  defaultImage: "https://eflatunteknoloji.com/images/settings/logo.webp",
  email: "info@eflatunteknoloji.com",
  phone: "+905367061434",
  // human-friendly phone for display in UI
  phoneDisplay: "+90 536 706 14 34",
  address: "İhsaniye, Çeşmeli Sk. No: 14/B, 14100 Bolu Merkez/Bolu",
  // structured address parts for use in schemas and pages
  streetAddress: "İhsaniye, Çeşmeli Sk. No: 14/B",
  addressLocality: "Bolu",
  postalCode: "14100",
  addressCountry: "TR",
  locationFrameUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.136678652022!2d31.607120376518697!3d40.737017936082964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d3fb58ac35c43%3A0xe28352fb2a6a0f09!2sEflatun%20Teknoloji%20Su%20Ar%C4%B1tma%20Sistemleri!5e0!3m2!1str!2str!4v1760849227785!5m2!1str!2str",
  socialLinks: {
    instagram: "https://www.instagram.com/eflatunteknolojii",
    facebook: "https://www.facebook.com/eflatunteknoloji",
    whatsapp: "https://wa.me/905367061434",
  },
  // Google My Business Place ID used for external Google reviews link
  gmbPlaceId: "ChIJQ1zDirU_nUARCQ9qKvtSg-I",
  vkn: "5240554617",
  geo: {
    latitude: 40.737002,
    longitude: 31.609721,
  },
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  weekend: ["Sunday"],
  openingHours: {
    weekdays: { open: "09:00", close: "21:00" },
    sunday: { open: "12:00", close: "21:00" },
  },
  areaServed: [
    "Bolu Merkez",
    "Gerede",
    "Mengen",
    "Mudurnu",
    "Göynük",
    "Yeniçağa",
    "Dörtdivan",
    "Kıbrıscık",
    "Seben",
  ],
};

/* -------------------------------------------------------------
 ⚙️ 2. Varsayılan Metadata
------------------------------------------------------------- */

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [
    "Bolu su arıtma",
    "su arıtma cihazı",
    "filtre değişimi Bolu",
    "Eflatun Teknoloji",
    "su arıtma Bolu",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.siteUrl,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 800,
        height: 600,
        alt: "Eflatun Teknoloji Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.defaultImage],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

/* -------------------------------------------------------------
 🧩 3. Sayfa Bazlı Metadata Üreticisi
------------------------------------------------------------- */

export function generatePageMetadata({
  title,
  description,
  slug,
  image,
}: {
  title: string;
  description?: string;
  slug?: string;
  image?: string;
}): Metadata {
  const url = slug
    ? `${siteConfig.siteUrl.replace(/\/$/, "")}/${slug}`
    : siteConfig.siteUrl;

  return {
    title,
    description: description || siteConfig.defaultDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.siteName}`,
      description: description || siteConfig.defaultDescription,
      url,
      images: [
        {
          url: image || siteConfig.defaultImage,
          width: 800,
          height: 600,
          alt: "Eflatun Teknoloji Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || siteConfig.defaultDescription,
      images: [image || siteConfig.defaultImage],
    },
  };
}

/* -------------------------------------------------------------
 📞 4. Structured Data JSON-LD (Schema.org)
------------------------------------------------------------- */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.siteName,
    image: siteConfig.defaultImage,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        siteConfig.streetAddress || "İhsaniye, Çeşmeli Sk. No: 14/B",
      addressLocality: siteConfig.addressLocality || "Bolu",
      postalCode: siteConfig.postalCode || "14100",
      addressCountry: siteConfig.addressCountry || "Türkiye",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo?.latitude || 40.737002,
      longitude: siteConfig.geo?.longitude || 31.609721,
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: "Su Arıtma Cihazı Tedariği" },
      { "@type": "Offer", itemOffered: "Montaj Hizmeti" },
      { "@type": "Offer", itemOffered: "Filtre Değişimi ve Bakım" },
    ],
    areaServed: siteConfig.areaServed.map((place) => ({
      "@type": "Place",
      name: place,
    })),
    sameAs: Object.values(siteConfig.socialLinks),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.weekdays,
        opens: siteConfig.openingHours.weekdays.open,
        closes: siteConfig.openingHours.weekdays.close,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.weekend,
        opens: siteConfig.openingHours.sunday.open,
        closes: siteConfig.openingHours.sunday.close,
      },
    ],
  };
}
