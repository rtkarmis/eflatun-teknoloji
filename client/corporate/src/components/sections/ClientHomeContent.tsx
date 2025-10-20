"use client";
import dynamic from "next/dynamic";

const ServicesContent = dynamic(() => import("./Services"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});
const ProductsPreview = dynamic(() => import("./ProductsPreview"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});
const WhyUsContent = dynamic(() => import("./WhyUs"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});
const ReviewsContent = dynamic(() => import("./Reviews"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});
const ServiceAreasContent = dynamic(() => import("./ServiceAreas"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});
const CallToActionContent = dynamic(() => import("./CallToAction"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-xl" />,
});

export default function ClientHomeContent() {
  return (
    <>
      <ServicesContent />
      <ProductsPreview />
      <WhyUsContent />
      <ReviewsContent />
      <ServiceAreasContent />
      <CallToActionContent />
    </>
  );
}
