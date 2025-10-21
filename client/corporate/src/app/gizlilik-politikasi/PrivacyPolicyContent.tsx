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
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong> (“Şirket”)
          olarak, kullanıcılarımızın gizliliğini ve kişisel verilerinin
          korunmasını en yüksek öncelik olarak görmekteyiz. Bu gizlilik
          politikası,{" "}
          <a
            href="https://eflatunteknoloji.com"
            className="text-[#007F8C] hover:underline"
          >
            eflatunteknoloji.com
          </a>{" "}
          adresli web sitemizi ziyaret eden kullanıcıların verilerinin nasıl
          toplandığını, işlendiğini ve korunduğunu açıklamaktadır.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          1. Toplanan Bilgiler
        </h2>
        <p>
          Web sitemizi ziyaret ettiğinizde veya iletişim formlarını
          doldurduğunuzda; ad, soyad, telefon numarası, e-posta adresi, konum
          bilgisi gibi kişisel veriler toplanabilir. Ayrıca, çerez (cookie)
          teknolojisi aracılığıyla anonim ziyaretçi verileri (IP adresi,
          tarayıcı türü, ziyaret edilen sayfalar gibi) analiz amaçlı olarak
          işlenebilir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          2. Verilerin Kullanım Amaçları
        </h2>
        <ul>
          <li>Ürün ve hizmet taleplerinizi değerlendirmek ve yanıtlamak,</li>
          <li>Satış, kurulum ve servis süreçlerini yürütmek,</li>
          <li>Teknik destek ve garanti hizmetlerini sağlamak,</li>
          <li>
            Web sitesi performansını ve kullanıcı deneyimini iyileştirmek,
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
          Sitemiz, kullanıcı deneyimini geliştirmek ve site performansını analiz
          etmek amacıyla çerezlerden faydalanmaktadır. Çerezler kişisel
          bilgilerinizi doğrudan depolamaz; yalnızca tercihlerinizi hatırlamak
          ve istatistiksel analiz yapmak için kullanılır. Tarayıcı ayarlarınız
          üzerinden çerezleri dilediğiniz zaman devre dışı bırakabilirsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          4. Verilerin Saklanması ve Güvenliği
        </h2>
        <p>
          Kişisel verileriniz, yalnızca belirtilen amaçlar doğrultusunda ve
          yasal süre boyunca güvenli sistemlerde saklanır.{" "}
          <strong>Eflatun Teknoloji</strong>, kişisel verilerinizin güvenliğini
          sağlamak amacıyla ulusal ve uluslararası güvenlik standartlarına uygun
          teknik ve idari önlemleri uygular.
        </p>
        <p>
          Kişisel verilerinizin işlenmesi, saklanması ve korunmasına ilişkin
          ayrıntılı bilgilere{" "}
          <a
            href="/kvkk-aydinlatma-metni"
            className="text-[#007F8C] font-medium hover:underline"
          >
            KVKK Aydınlatma Metni
          </a>{" "}
          sayfamızdan ulaşabilirsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          5. Verilerin Paylaşımı
        </h2>
        <p>
          Kişisel verileriniz, yalnızca hizmetlerin yürütülmesi veya yasal
          yükümlülüklerin yerine getirilmesi amacıyla; tedarikçiler,
          danışmanlar, iş ortakları veya yetkili kamu kurumlarıyla sınırlı
          şekilde paylaşılabilir. Verileriniz hiçbir koşulda üçüncü şahıslara
          satılmaz veya izinsiz olarak aktarılmaz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          6. Haklarınız
        </h2>
        <p>
          KVKK’nın 11. maddesi uyarınca, kişisel verilerinizin işlenip
          işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme,
          işleme faaliyetlerine itiraz etme ve uğradığınız zararın giderilmesini
          isteme hakkına sahipsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          7. İletişim ve Başvuru
        </h2>
        <p>
          Gizlilik politikamız veya KVKK kapsamındaki talepleriniz için bizimle
          iletişime geçebilirsiniz:
        </p>
        <p>
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong>
          <br />
          <strong>Adres:</strong> {siteConfig.address}
          <br />
          <strong>E-posta:</strong>{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[#007F8C] hover:underline"
          >
            {siteConfig.email}
          </a>
          <br />
          <strong>Telefon:</strong>{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-[#007F8C] hover:underline"
          >
            {siteConfig.phoneDisplay || siteConfig.phone}
          </a>
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          8. Güncellemeler
        </h2>
        <p>
          Bu gizlilik politikası, yasal gereklilikler veya hizmet kapsamındaki
          değişikliklere bağlı olarak düzenli şekilde güncellenebilir. Güncel
          sürüm her zaman{" "}
          <a
            href="https://eflatunteknoloji.com/gizlilik-politikasi"
            className="text-[#007F8C] hover:underline"
          >
            eflatunteknoloji.com/gizlilik-politikasi
          </a>{" "}
          adresinde yayınlanır.
        </p>

        <p className="mt-6">
          <strong>Eflatun Teknoloji</strong>, kullanıcı gizliliğini koruma
          konusundaki taahhüdünü sürdürmekte ve tüm faaliyetlerinde şeffaflık
          ilkesini benimsemektedir.
        </p>

        <div className="mt-10 text-sm text-gray-500 border-t pt-4 text-center">
          <p>
            <strong>Son Güncelleme Tarihi:</strong> 21 Ekim 2025
          </p>
          <p>
            Bu gizlilik politikası, yasal gereklilikler ve teknolojik gelişmeler
            doğrultusunda düzenli olarak gözden geçirilmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
