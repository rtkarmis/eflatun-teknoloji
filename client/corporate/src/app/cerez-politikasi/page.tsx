import { siteConfig } from "@/lib/seo";
import CookiePolicyContent from "./CookiePolicyContent";

export const metadata = {
  title: "Çerez Politikası | Eflatun Teknoloji",
  description:
    "Eflatun Teknoloji çerez politikası. Web sitemizde kullanılan çerezlerin türleri, amaçları ve yönetim seçenekleri hakkında bilgi alın.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/cerez-politikasi`,
  },
};
export const dynamic = "force-static";
export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
