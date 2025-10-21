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

      <p className="mb-4">
        Bu web sitesi, kullanıcı deneyimini geliştirmek, ziyaret
        istatistiklerini analiz etmek ve reklam performansını ölçmek amacıyla
        çerezler (cookies) kullanmaktadır. Bu politika, hangi tür çerezlerin
        kullanıldığını, bunların ne amaçla işlendiğini ve çerez tercihlerinizi
        nasıl yönetebileceğinizi açıklar.
      </p>

      <h2
        className="text-xl font-semibold mt-8 mb-2"
        style={{ color: COLORS.secondary }}
      >
        1. Çerez Nedir?
      </h2>
      <p className="mb-4">
        Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza
        gönderilen küçük metin dosyalarıdır. Bu dosyalar, tercihlerinizi
        hatırlamak, web sitesinin çalışmasını sağlamak veya site performansını
        analiz etmek için kullanılır.
      </p>

      <h2
        className="text-xl font-semibold mt-8 mb-2"
        style={{ color: COLORS.secondary }}
      >
        2. Kullanılan Çerez Türleri
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevleri için
          gereklidir. Bu çerezler devre dışı bırakılamaz.
        </li>
        <li>
          <strong>Analitik Çerezler:</strong> Web sitesinin nasıl kullanıldığını
          anlamak ve iyileştirmek için anonim istatistikler toplar.
        </li>
        <li>
          <strong>Reklam Çerezleri:</strong> Google Ads gibi platformlar
          aracılığıyla reklam performansını ölçmek ve ilgilerinize uygun içerik
          sunmak için kullanılır.
        </li>
      </ul>

      <h2
        className="text-xl font-semibold mt-8 mb-2"
        style={{ color: COLORS.secondary }}
      >
        3. Çerezleri Yönetme
      </h2>
      <p className="mb-4">
        Çerezleri kabul etmek veya reddetmek tamamen sizin tercihinizdir.
        Tarayıcı ayarlarınızdan mevcut çerezleri silebilir veya yeni çerezlerin
        oluşturulmasını engelleyebilirsiniz. Ancak bazı çerezleri devre dışı
        bırakmak, sitenin doğru çalışmasını engelleyebilir.
      </p>

      <h2
        className="text-xl font-semibold mt-8 mb-2"
        style={{ color: COLORS.secondary }}
      >
        4. Üçüncü Taraf Çerezleri
      </h2>
      <p className="mb-4">
        Google Analytics ve Google Ads hizmetleri aracılığıyla üçüncü taraf
        çerezleri kullanılabilir. Bu çerezler anonim bilgiler toplar ve
        kullanıcı kimliğiyle ilişkilendirilmez. Detaylı bilgi için{" "}
        <a
          href="https://policies.google.com/technologies/cookies?hl=tr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Google Çerez Politikası
        </a>{" "}
        sayfasını ziyaret edebilirsiniz.
      </p>

      <h2
        className="text-xl font-semibold mt-8 mb-2"
        style={{ color: COLORS.secondary }}
      >
        5. İletişim
      </h2>
      <p className="mb-4">
        Çerez politikamız veya kişisel verilerinizin işlenmesi hakkında
        sorularınız için bizimle{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-blue-600 hover:underline"
        >
          {siteConfig.email}
        </a>{" "}
        adresinden iletişime geçebilirsiniz.
      </p>

      <p className="text-sm text-gray-600 mt-8">
        © {new Date().getFullYear()} Eflatun Teknoloji - Tüm hakları saklıdır.
      </p>
    </div>
  );
}
