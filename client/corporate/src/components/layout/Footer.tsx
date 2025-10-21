"use client";

import { menuLinks } from "@/data/menu";
import { siteConfig } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

// 🔹 Lazy-load Schema Footer
const SchemaFooter = dynamic(() => import("../seo/SchemaFooter"), {
  ssr: true,
});

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#f9fafb] border-t border-gray-200 pt-12 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* 🟣 Hakkında */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {siteConfig.siteName}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Eflatun Teknoloji, Bolu ve çevresinde{" "}
            <strong>su arıtma cihazı satışı</strong>, <strong>montaj</strong> ve{" "}
            <strong>bakım</strong> hizmetleri sunan şahıs şirketidir.
          </p>
          <div className="flex items-center gap-4 mt-4">
            {siteConfig.socialLinks.instagram && (
              <Link
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-600 transition-colors touch-target pointer-target"
              >
                <FaInstagram size={20} />
              </Link>
            )}
            {siteConfig.socialLinks.facebook && (
              <Link
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600 transition-colors touch-target pointer-target"
              >
                <FaFacebook size={20} />
              </Link>
            )}
            {siteConfig.socialLinks.whatsapp && (
              <Link
                href={siteConfig.socialLinks.whatsapp}
                target="_blank"
                aria-label="WhatsApp"
                className="text-gray-600 hover:text-green-600 transition-colors touch-target pointer-target"
              >
                <FaWhatsapp size={20} />
              </Link>
            )}
          </div>
        </section>

        {/* 🔹 Hızlı Erişim */}
        <nav>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Hızlı Erişim
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-blue-600 transition touch-target pointer-target"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🔹 Ürünler */}
        <nav>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Ürün Kategorileri
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                href="/su-aritma-urunleri/su-aritma-cihazlari"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Su Arıtma Cihazları
              </Link>
            </li>
            <li>
              <Link
                href="/su-aritma-urunleri/su-aritma-filtreleri"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Su Arıtma Filtreleri
              </Link>
            </li>
            <li>
              <Link
                href="/su-aritma-urunleri/su-aritma-ekipmanlari"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Su Arıtma Ekipmanları
              </Link>
            </li>
          </ul>
        </nav>

        {/* 🔹 Politikalar */}
        <nav>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Politikalar
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                href="/gizlilik-politikasi"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link
                href="/cerez-politikasi"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Çerez Politikası
              </Link>
            </li>
            <li>
              <Link
                href="/kvkk-aydinlatma-metni "
                className="hover:text-blue-600 touch-target pointer-target"
              >
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link
                href="/site-haritasi"
                className="hover:text-blue-600 touch-target pointer-target"
              >
                Site Haritası
              </Link>
            </li>
          </ul>
        </nav>

        {/* 🔹 İletişim */}
        <section>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">İletişim</h4>
          <ul className="space-y-3 text-sm text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-gray-500 mt-[3px]" size={14} />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <FaPhoneAlt className="inline-block text-gray-500 mr-2" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-blue-600 touch-target pointer-target"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <FaEnvelope className="inline-block text-gray-500 mr-2" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-blue-600 touch-target"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>

          {/* 📍 Harita Lazy-load */}
          <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 aspect-[4/3]">
            <iframe
              src={siteConfig.locationFrameUrl}
              loading="lazy"
              width="100%"
              height="100%"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
              title="Eflatun Teknoloji Konumu"
            />
          </div>
        </section>
      </div>

      {/* ⚫ Alt Bilgi */}
      <div className="border-t border-gray-200 mt-10 pt-5 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} {siteConfig.siteName}. Tüm hakları
          saklıdır.
        </p>
        <p className="mt-1">
          {siteConfig.siteName} | Vergi Dairesi: Bolu |{" "}
          <strong>VKN: {siteConfig.vkn}</strong>
        </p>
        <p className="mt-3 text-gray-400 text-[11px] tracking-wide">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <Link
            href="/"
            className="font-medium text-gray-500 hover:text-blue-600 transition touch-target pointer-target"
          >
            Eflatun Teknoloji
          </Link>
        </p>
      </div>

      <SchemaFooter />
    </footer>
  );
}
