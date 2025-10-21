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
  },
};

export default nextConfig;
