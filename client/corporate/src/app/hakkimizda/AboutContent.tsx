"use client";
import { Phone, MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ActionButton from "@/components/ui/ActionButton";
import { COLORS } from "@/lib/constants";
import { buildAboutBreadcrumb } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/seo";

export default function AboutContent() {
  return (
    <section className="text-gray-800">
      <Breadcrumb items={buildAboutBreadcrumb()} />

      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-8"
        style={{ color: COLORS.primary }}
      >
        Hakkımızda
      </h1>

      <article className="text-lg leading-relaxed space-y-6">
        <p>
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong>, Bolu merkezli
          olarak faaliyet gösteren ve su arıtma cihazı satışı, montajı, filtre
          değişimi ve bakım hizmetlerinde uzmanlaşmış bir kuruluştur. 2015
          yılından bu yana bireysel ve kurumsal müşterilerine güvenilir, çevre
          dostu çözümler sunmaktadır.
        </p>
        <p>
          Müşteri memnuniyetini ön planda tutan deneyimli teknik ekibimizle{" "}
          <strong>aynı gün servis</strong> ve <strong>yerinde çözüm</strong>{" "}
          garantisi vermekteyiz. Tüm ürünlerimiz kalite standartlarına uygun
          olup, satış sonrası süreçte de tam destek sağlamaktayız.
        </p>
      </article>

      {/* Bölümler */}
      {[
        {
          title: "Vizyonumuz",
          text: "Sağlıklı suyun her eve ulaşmasını sağlamak ve su arıtma teknolojilerinde bölgesel liderliği sürdürmektir. Yenilikçi ürünler ve profesyonel hizmet anlayışımızla uzun ömürlü çözümler sunuyoruz.",
        },
        {
          title: "Misyonumuz",
          text: "Müşterilerimize yalnızca ürün değil, uzun vadeli bir hizmet deneyimi sunmak. Şeffaflık, kalite ve memnuniyet odaklı yaklaşımımızla güvenilir bir marka olmaya devam etmek.",
        },
        {
          title: "Kalite Politikamız",
          text: "Her müşterimize aynı kalite standardında hizmet sunmak için sürekli eğitim, teknik güncellemeler ve orijinal yedek parça garantisiyle çalışıyoruz. Yalnızca test edilmiş markalarla iş birliği yapıyoruz.",
        },
      ].map((item) => (
        <section key={item.title} className="mt-10">
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: COLORS.secondary }}
          >
            {item.title}
          </h2>
          <p className="text-lg leading-relaxed">{item.text}</p>
        </section>
      ))}

      {/* Yetkili Bilgisi */}
      <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mt-12">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          Yetkili Kişi Bilgisi
        </h2>
        <ul className="space-y-2 text-lg">
          <li>
            <strong>Ramazan Karmış</strong> – Firma Sahibi
          </li>
          <li>
            Telefon:{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-[#007F8C] hover:underline"
            >
              {siteConfig.phoneDisplay || siteConfig.phone}
            </a>
          </li>
          <li>
            E-posta:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#007F8C] hover:underline"
            >
              {siteConfig.email}
            </a>
          </li>
          <li>Adres: {siteConfig.address}</li>
        </ul>
      </section>

      {/* İletişim CTA */}
      <section className="text-center mt-14">
        <h3
          className="text-2xl font-semibold mb-4"
          style={{ color: COLORS.secondary }}
        >
          İletişim ve Destek
        </h3>
        <p className="text-lg mb-6">
          Her türlü soru ve destek talebiniz için bizimle iletişime
          geçebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <ActionButton
            href={`tel:${siteConfig.phone}`}
            title="Telefon ile Ara"
            color="#fff"
            bgColor={COLORS.secondary}
            icon={<Phone size={20} className="inline mr-2" />}
            className="font-semibold px-6 py-3 rounded-lg hover:bg-[#005F6B] transition"
          />
          <ActionButton
            href={siteConfig.socialLinks.whatsapp}
            title="WhatsApp Destek"
            color={COLORS.secondary}
            bgColor="#fff"
            icon={<MessageCircle size={20} className="inline mr-2" />}
            className="border border-[#007F8C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E0F7FA] transition"
          />
        </div>
      </section>
    </section>
  );
}
