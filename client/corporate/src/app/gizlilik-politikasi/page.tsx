import { siteConfig } from "@/lib/seo";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata = {
  title: "Gizlilik Politikası | Eflatun Teknoloji",
  description:
    "Eflatun Teknoloji gizlilik politikası. Web sitemizde toplanan kişisel verilerin işlenmesi ve korunması hakkında bilgi alın.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/gizlilik-politikasi`,
  },
};
export const dynamic = "force-static";
export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
