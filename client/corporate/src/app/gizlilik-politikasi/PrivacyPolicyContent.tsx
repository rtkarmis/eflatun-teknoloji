"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildPolicyBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";

export default function PrivacyPolicyContent() {
  return (
    <div>
      <Breadcrumb items={buildPolicyBreadcrumb("Gizlilik Politikası")} />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
        Gizlilik Politikası
      </h1>

      <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
        <p>
          <strong>Eflatun Teknoloji</strong> (“Şirket”) olarak,
          kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına
          büyük önem veriyoruz. Bu gizlilik politikası,{" "}
          <strong>Ramazan Karmış – Eflatun Teknoloji (Şahıs Şirketi)</strong>{" "}
          tarafından işletilen{" "}
          <a
            href="https://eflatunteknoloji.com"
            className="text-blue-600 underline"
          >
            eflatunteknoloji.com
          </a>{" "}
          adresli web sitesi üzerinden toplanan bilgilerin nasıl işlendiğini ve
          korunduğunu açıklar.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          1. Toplanan Bilgiler
        </h2>
        <p>
          Web sitemizi ziyaret ettiğinizde veya iletişim formlarımızı
          doldurduğunuzda; ad, soyad, telefon numarası, e-posta adresi, konum
          bilgisi gibi kişisel veriler toplanabilir. Ayrıca, çerezler
          aracılığıyla anonim ziyaretçi verileri (IP adresi, tarayıcı türü,
          sayfa görüntüleme istatistikleri) de işlenebilir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          2. Verilerin Kullanım Amacı
        </h2>
        <ul>
          <li>Hizmet taleplerinizi değerlendirmek, size dönüş sağlamak,</li>
          <li>Satış ve servis süreçlerini yürütmek,</li>
          <li>Teknik destek ve garanti hizmetlerini yerine getirmek,</li>
          <li>
            Kullanıcı deneyimini iyileştirmek ve web sitesini optimize etmek,
          </li>
          <li>Yasal yükümlülükleri yerine getirmek.</li>
        </ul>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          3. Çerez (Cookie) Kullanımı
        </h2>
        <p>
          Sitemiz, deneyiminizi geliştirmek ve hizmet kalitemizi artırmak
          amacıyla çerez (cookie) teknolojisinden yararlanır. Çerezler kişisel
          bilgilerinizi depolamaz; yalnızca tercihlerinizi hatırlamak ve
          istatistiksel analiz yapmak için kullanılır. Tarayıcı ayarlarınızdan
          çerezleri dilediğiniz zaman devre dışı bırakabilirsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          4. Verilerin Saklanması ve Güvenliği
        </h2>
        <p>
          Kişisel verileriniz, yalnızca belirtilen amaçlar doğrultusunda ve
          yasal süre boyunca güvenli sunucularda saklanır. Eflatun Teknoloji,
          verilerinizi korumak için gerekli tüm teknik ve idari güvenlik
          önlemlerini uygular.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          5. Verilerin Paylaşımı
        </h2>
        <p>
          Kişisel verileriniz üçüncü kişilerle yalnızca hizmetin sağlanması
          amacıyla veya yasal zorunluluk durumunda paylaşılabilir. Bu kapsamda
          verileriniz, servis sağlayıcılarımız, muhasebe danışmanlarımız veya
          yetkili kamu kurumlarıyla sınırlı şekilde paylaşılır. Verileriniz
          hiçbir koşulda satılmaz veya izinsiz paylaşılmaz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          6. Haklarınız
        </h2>
        <p>
          KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
          işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme,
          işleme faaliyetlerine itiraz etme ve zararın giderilmesini talep etme
          hakkına sahipsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          7. İletişim ve Başvuru
        </h2>
        <p>
          Gizlilik politikamız hakkında sorularınız veya KVKK kapsamındaki
          başvurularınız için:
        </p>
        <p>
          <strong>Ramazan Karmış – Eflatun Teknoloji</strong>
          <br />
          <strong>Adres:</strong> {siteConfig.address}
          <br />
          <strong>E-posta:</strong>{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 underline"
          >
            {siteConfig.email}
          </a>
          <br />
          <strong>Telefon:</strong>{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-blue-600 underline"
          >
            {siteConfig.phoneDisplay || siteConfig.phone}
          </a>
          <br />
          <strong>Vergi No:</strong> {siteConfig.vkn} – Bolu Vergi Dairesi
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          8. Güncellemeler
        </h2>
        <p>
          Bu gizlilik politikası, mevzuat değişikliklerine veya hizmet kapsamına
          göre güncellenebilir. Güncel metin her zaman{" "}
          <a
            href="https://eflatunteknoloji.com/gizlilik-politikasi"
            className="text-blue-600 underline"
          >
            eflatunteknoloji.com/gizlilik-politikasi
          </a>{" "}
          adresinde yayımlanır.
        </p>

        <p className="mt-6">
          <strong>Eflatun Teknoloji</strong>, kullanıcılarının gizliliğini
          koruma taahhüdünü sürdürmekte ve tüm süreçlerinde şeffaflık ilkesiyle
          hareket etmektedir.
        </p>
      </div>
    </div>
  );
}
