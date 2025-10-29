import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"], // optimize edilmiş görseller
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "maps.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
    ],
  },

  // 🔧 Gereksiz polyfill'leri dışarıda bırak
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    };
    return config;
  },

  // ⚡ ISR veya static optimizasyon için
  output: "export", // => next export ile statik HTML üretimi
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
