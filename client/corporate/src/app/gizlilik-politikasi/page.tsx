import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata = {
  title: "Gizlilik Politikası | Eflatun Teknoloji",
  description:
    "Eflatun Teknoloji gizlilik politikası. Web sitemizde toplanan kişisel verilerin işlenmesi ve korunması hakkında bilgi alın.",
  alternates: {
    canonical: "https://eflatunteknoloji.com/gizlilik-politikasi",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
