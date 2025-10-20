"use client";

import ContactSkeleton from "@/components/skeleton/ContactSkeleton"; // ✅ skeleton import
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildContactBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactContent() {
  const [showCards, setShowCards] = useState(false);

  // 🧠 sayfa yüklenirken kartlar için kısa bir gecikme oluştur
  useEffect(() => {
    const timeout = setTimeout(() => setShowCards(true), 300);
    return () => clearTimeout(timeout);
  }, []);
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      text: siteConfig.phoneDisplay || siteConfig.phone,
      link: `tel:${siteConfig.phone}`,
    },
    {
      icon: Mail,
      title: "E-Posta",
      text: siteConfig.email,
      link: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      title: "Adres",
      text: siteConfig.address,
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      text: "Pazartesi – Cumartesi: 09:00 – 20:00\nPazar: Kapalı",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Breadcrumb items={buildContactBreadcrumb()} />

      {/* 🟦 Hero Section */}
      <section className="relative text-center mb-16">
        <div
          className="absolute inset-0 opacity-90 rounded-3xl -z-10"
          style={{
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
          }}
        />
        <div className="py-16 text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Bizimle İletişime Geçin
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Su arıtma sistemleri satış, montaj ve bakım hizmetlerinde size bir
            telefon kadar yakınız. Sorularınız için bizimle hemen iletişime
            geçin.
          </p>
        </div>
      </section>

      {/* 🟩 Bilgi Kartları (Skeleton destekli) */}
      {showCards ? (
        <motion.section
          key="contact-cards"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center border border-gray-100"
            >
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <item.icon className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  className="text-blue-600 font-medium hover:underline text-sm break-all"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {item.text}
                </p>
              )}
            </motion.div>
          ))}
        </motion.section>
      ) : (
        <ContactSkeleton /> // ✅ sadece bu kısım skeleton olarak gelir
      )}

      {/* 🗺️ Harita */}
      <section className="rounded-3xl overflow-hidden shadow-lg mb-10">
        <iframe
          src={siteConfig.locationFrameUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* 🟨 CTA */}
      <motion.section
        className="text-center py-12 text-white rounded-3xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Bizi Ziyaret Edin veya Arayın
        </h2>
        <p className="mb-6 text-sm md:text-base opacity-90">
          Her türlü soru, teklif veya destek talepleriniz için bize
          ulaşabilirsiniz.
        </p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
        >
          Şimdi Ara
        </a>
      </motion.section>
    </motion.div>
  );
}
