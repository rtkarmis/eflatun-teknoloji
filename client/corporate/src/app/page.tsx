import ClientHomeContent from "@/components/sections/ClientHomeContent";
import Hero from "@/components/sections/Hero";
import { generatePageMetadata } from "@/lib/seo";
export const generateMetadata = async () =>
  generatePageMetadata({
    title: "Ana Sayfa",
    description:
      "Eflatun Teknoloji – Bolu ve çevresinde su arıtma cihazı satışı, montaj ve bakım hizmetleri.",
    slug: "",
  });
export default function HomePage() {
  return (
    <div className="w-full bg-white text-gray-800">
      <Hero />
      <ClientHomeContent />
    </div>
  );
}
