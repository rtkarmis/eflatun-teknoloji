import { siteConfig } from "@/lib/seo";
import { Metadata } from "next";
import SiteMapContent from "./SiteMapContent";

export const metadata: Metadata = {
  title: "Site Haritası | Eflatun Teknoloji Su Arıtma Sistemleri",
  description:
    "Eflatun Teknoloji web sitesindeki tüm sayfalar, ürünler ve hizmetlerin listesi. Site haritası üzerinden hızlı erişim sağlayın.",
  alternates: { canonical: `${siteConfig.siteUrl}/site-haritasi` },
};
export const dynamic = "force-static";
export default function SitemapPage() {
  return <SiteMapContent />;
}
