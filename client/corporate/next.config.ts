import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "maps.gstatic.com", // Google Maps içeriği için
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com", // Harita görselleri için
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080],
    imageSizes: [16, 32, 64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 hafta cache
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "react-icons"],
    esmExternals: true,
  },
  compiler: {
    removeConsole: true,
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
