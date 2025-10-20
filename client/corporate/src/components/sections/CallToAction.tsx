"use client";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// 🔹 Lazy load ikonlu buton bileşeni
const ActionButton = dynamic(() => import("../ui/ActionButton"), {
  ssr: false,
  loading: () => (
    <button className="px-6 py-3 rounded-lg bg-gray-200 animate-pulse w-36 h-12" />
  ),
});

export default function CallToAction() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="iletisim"
        className="text-white py-12 md:py-16 px-4 text-center"
        style={{
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen İletişime Geçin!
          </h2>

          <p className="mb-8 text-base md:text-lg text-white/90 leading-relaxed">
            Sağlıklı suya ulaşmak için bize şimdi ulaşın.{" "}
            <strong>Aynı gün servis garantisiyle</strong> yanınızdayız.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ActionButton
              href={`tel:${siteConfig.phone}`}
              title="Hemen Ara"
              color={COLORS.primary}
              bgColor="#fff"
              icon={
                <FaPhoneAlt
                  size={20}
                  className="inline-block align-middle mr-2 text-[color:var(--color-primary)]"
                />
              }
              className="border border-white font-semibold px-6 py-3 rounded-lg hover:bg-[#E0F7FA] hover:text-[color:var(--color-primary)] transition"
            />

            <ActionButton
              href={siteConfig.socialLinks.whatsapp}
              title="WhatsApp Destek"
              color="#fff"
              bgColor="transparent"
              icon={
                <FaWhatsapp
                  size={20}
                  className="inline-block align-middle mr-2"
                />
              }
              className="border border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[color:var(--color-primary)] transition"
            />
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
