"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildPolicyBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";

export default function CookiePolicyContent() {
  return (
    <div>
      <Breadcrumb items={buildPolicyBreadcrumb("Çerez Politikası")} />
      <PageTitle text="Çerez Politikası" />

      <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
        <p>
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong> olarak, web
          sitemizde sizlere daha iyi bir deneyim sunmak, site performansını
          ölçmek ve reklam içeriklerini optimize etmek amacıyla çerezlerden
          (cookies) yararlanıyoruz. Bu politika, kullanılan çerez türlerini, bu
          çerezlerin ne amaçla işlendiğini ve tercihlerinizi nasıl
          yönetebileceğinizi açıklar.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          1. Çerez Nedir?
        </h2>
        <p>
          Çerezler, ziyaret ettiğiniz web siteleri tarafından cihazınıza
          kaydedilen küçük metin dosyalarıdır. Bu dosyalar sayesinde web
          siteleri tercihlerinizi hatırlayabilir, oturumlarınızı sürdürebilir ve
          size özel bir deneyim sunabilir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          2. Kullanılan Çerez Türleri
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerinin
            çalışabilmesi için gereklidir. Örneğin, oturum açma ve güvenlik
            ayarlarının korunması bu çerezler sayesinde olur. Bu çerezlerin
            devre dışı bırakılması sitenin çalışmasını engelleyebilir.
          </li>
          <li>
            <strong>Performans ve Analitik Çerezleri:</strong> Web sitemizin
            nasıl kullanıldığını anonim olarak analiz eder. Bu sayede site
            hızını, tasarımını ve kullanıcı deneyimini geliştirebiliriz.
          </li>
          <li>
            <strong>Reklam ve Hedefleme Çerezleri:</strong> İlgi alanlarınıza
            uygun reklamlar sunmak ve Google Ads gibi platformlar üzerinden
            kampanya performansını ölçmek amacıyla kullanılır. Bu çerezler
            anonim istatistiksel bilgiler toplar.
          </li>
          <li>
            <strong>İşlevsel Çerezler:</strong> Tercih ettiğiniz dil, konum veya
            sayfa düzeni gibi kişisel ayarları hatırlamak için kullanılır.
          </li>
        </ul>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          3. Çerezleri Yönetme
        </h2>
        <p>
          Çerezleri kabul etmek veya reddetmek tamamen sizin tercihinizdir.
          Tarayıcınızın ayarlarından çerezleri yönetebilir, mevcut çerezleri
          silebilir veya yeni çerezlerin yüklenmesini engelleyebilirsiniz.
          Ancak, zorunlu çerezleri devre dışı bırakmak web sitesinin bazı
          bölümlerinin düzgün çalışmamasına neden olabilir.
        </p>
        <p>
          En sık kullanılan tarayıcılar için çerez yönetimi yönergelerine şu
          bağlantılardan ulaşabilirsiniz:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007F8C] hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/tr/kb/cerezleri-silme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007F8C] hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/tr-tr/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007F8C] hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007F8C] hover:underline"
            >
              Safari
            </a>
          </li>
        </ul>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          4. Üçüncü Taraf Çerezleri
        </h2>
        <p>
          Web sitemiz, kullanıcı davranışlarını anlamak ve reklam
          kampanyalarının etkinliğini ölçmek amacıyla{" "}
          <strong>Google Analytics</strong> ve <strong>Google Ads</strong> gibi
          üçüncü taraf hizmetlerinden yararlanabilir. Bu hizmetler anonim
          veriler toplar ve kullanıcı kimliğiyle doğrudan ilişkilendirilmez.
        </p>
        <p>
          Google tarafından kullanılan çerezler hakkında detaylı bilgi için{" "}
          <a
            href="https://policies.google.com/technologies/cookies?hl=tr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#007F8C] hover:underline"
          >
            Google Çerez Politikası
          </a>{" "}
          sayfasını ziyaret edebilirsiniz.
        </p>
        <p>
          Kişisel verilerinizin çerezler yoluyla nasıl işlendiği hakkında daha
          fazla bilgi için{" "}
          <a
            href="/kvkk-aydinlatma-metni"
            className="text-[#007F8C] font-medium hover:underline"
          >
            KVKK Aydınlatma Metni
          </a>{" "}
          sayfamızı inceleyebilirsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          5. İletişim
        </h2>
        <p>
          Çerez politikamız veya kişisel verilerinizin işlenmesiyle ilgili
          sorularınız için bizimle{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[#007F8C] hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          adresinden iletişime geçebilirsiniz.
        </p>

        <div className="mt-10 text-sm text-gray-500 border-t pt-4 text-center">
          <p>
            <strong>Son Güncelleme Tarihi:</strong> 21 Ekim 2025
          </p>
          <p>
            Bu çerez politikası, yasal gereklilikler ve teknolojik gelişmeler
            doğrultusunda düzenli olarak güncellenmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
