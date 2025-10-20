"use client";

import ActionButton from "@/components/ui/ActionButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildAboutBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function AboutContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div>
      <Breadcrumb items={buildAboutBreadcrumb()} />
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-10"
        style={{ color: COLORS.primary }}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        Hakkımızda
      </motion.h1>

      <motion.section
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <p className="text-lg leading-relaxed mb-6">
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong>, Bolu merkezli
          olarak faaliyet gösteren ve su arıtma cihazı satışı, montajı, filtre
          değişimi ve bakım hizmetlerinde uzmanlaşmış bir kuruluştur. 2015
          yılından bu yana hem bireysel hem de kurumsal müşterilerine güvenilir,
          hızlı ve çevre dostu çözümler sunmaktadır.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Müşteri memnuniyetini ön planda tutarak, alanında deneyimli teknik
          ekibimizle <strong>aynı gün servis</strong> ve{" "}
          <strong>yerinde çözüm</strong> garantisi vermekteyiz. Tüm ürünlerimiz
          uluslararası kalite standartlarına uygun olup, satış sonrası destek
          sürecinde de tam hizmet sağlamaktayız.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          Vizyonumuz
        </h2>
        <p className="text-lg leading-relaxed">
          Sağlıklı suyun her eve ve işletmeye ulaşmasını sağlamak, su arıtma
          teknolojilerinde bölgesel liderliği sürdürmektir. Yenilikçi ürünler ve
          profesyonel hizmet anlayışımızla, müşterilerimize uzun ömürlü çözümler
          sunuyoruz.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          Misyonumuz
        </h2>
        <p className="text-lg leading-relaxed">
          Müşterilerimize yalnızca ürün değil, uzun vadeli bir hizmet deneyimi
          sunmak. Şeffaflık, kalite ve memnuniyet odaklı yaklaşımımızla su
          arıtma sektöründe güvenilir bir marka olmaya devam etmek.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          Kalite Politikamız
        </h2>
        <p className="text-lg leading-relaxed">
          Her müşterimize aynı kalite standardında hizmet sunmak için sürekli
          eğitim, teknik güncellemeler ve orijinal yedek parça garantisiyle
          çalışıyoruz. Ürün tedarikinde yalnızca test edilmiş ve sertifikalı
          markalarla iş birliği yapıyoruz.
        </p>
      </motion.section>

      <motion.section
        className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={5}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          Yetkili Kişi Bilgisi
        </h2>
        <p className="text-lg mb-2">
          <strong>Ramazan Karmış</strong> – Firma Sahibi ve Sorumlu Kişi
        </p>
        <p className="text-lg mb-2">
          Telefon:{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-[#007F8C] hover:underline"
          >
            {siteConfig.phoneDisplay || siteConfig.phone}
          </a>
        </p>
        <p className="text-lg mb-2">
          E-posta:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[#007F8C] hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
        <p className="text-lg">Adres: {siteConfig.address}</p>
      </motion.section>

      <motion.section
        className="text-center mt-12"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={6}
      >
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          İletişim ve Destek
        </h3>
        <p className="text-lg mb-4">
          Her türlü soru ve destek talebiniz için bizimle iletişime
          geçebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <ActionButton
            href="tel:+905367061434"
            title="Telefon ile Ara"
            color="#fff"
            bgColor={COLORS.secondary}
            icon={<span>📞</span>}
            className="font-semibold px-6 py-3 rounded-lg hover:bg-[#005F6B] transition"
          />
          <ActionButton
            href="https://wa.me/905367061434"
            title="WhatsApp Destek"
            color={COLORS.secondary}
            bgColor="#fff"
            icon={
              <FaWhatsapp
                size={22}
                className="inline-block align-middle mr-2"
              />
            }
            className="border border-[#007F8C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E0F7FA] transition"
          />
        </div>
      </motion.section>
    </div>
  );
}
