import CallToAction from "@/components/sections/CallToAction";
import Hero from "@/components/sections/Hero";
import ProductsPreview from "@/components/sections/ProductsPreview";
import Reviews from "@/components/sections/Reviews";
import ServiceAreas from "@/components/sections/ServiceAreas";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
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
      <Services />
      <ProductsPreview />
      <WhyUs />
      <Reviews />
      <ServiceAreas />
      <CallToAction />
    </div>
  );
}
