"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildPolicyBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";

export default function KvkkContent() {
  return (
    <div>
      <Breadcrumb items={buildPolicyBreadcrumb("KVKK Aydınlatma Metni")} />
      <PageTitle text="KVKK Aydınlatma Metni" />

      <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
        <p>
          <strong>Eflatun Teknoloji</strong> (“Şirket”) olarak kişisel
          verilerinizin korunmasına büyük önem veriyoruz. 6698 sayılı{" "}
          <strong>Kişisel Verilerin Korunması Kanunu</strong> (“KVKK”)
          kapsamında kişisel verileriniz, veri sorumlusu sıfatıyla{" "}
          <strong>Ramazan Karmış – Eflatun Teknoloji</strong> tarafından aşağıda
          açıklanan çerçevede işlenmektedir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          1. Veri Sorumlusu
        </h2>
        <p>
          <strong>Ramazan Karmış – Eflatun Teknoloji (Şahıs Şirketi)</strong>
          <br />
          <strong>Adres:</strong> {siteConfig.address}
          <br />
          <strong>E-posta:</strong> {siteConfig.email}
          <br />
          <strong>Telefon:</strong>{" "}
          {siteConfig.phoneDisplay || siteConfig.phone}
          <br />
          <strong>Vergi No:</strong> {siteConfig.vkn} – Bolu Vergi Dairesi
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          2. Kişisel Verilerin İşlenme Amaçları
        </h2>
        <p>Toplanan kişisel verileriniz, aşağıdaki amaçlarla işlenmektedir:</p>
        <ul>
          <li>Ürün ve hizmet taleplerinin karşılanması,</li>
          <li>Satış, montaj ve bakım hizmetlerinin yürütülmesi,</li>
          <li>Teknik destek ve garanti işlemlerinin sağlanması,</li>
          <li>
            Müşteri ilişkilerinin yönetimi ve hizmet kalitesinin artırılması,
          </li>
          <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
        </ul>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
        </h2>
        <p>
          Kişisel verileriniz; web sitemiz, iletişim formlarımız, e-posta,
          telefon, servis kayıt formları veya benzeri yöntemlerle toplanmakta
          olup KVKK’nın 5. ve 6. maddelerinde belirtilen hukuki sebepler
          kapsamında işlenmektedir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          4. Kişisel Verilerin Aktarılması
        </h2>
        <p>
          Kişisel verileriniz, hizmetin yürütülmesi amacıyla yalnızca gerekli
          olduğunda ve yasal sınırlara uygun biçimde; iş ortakları,
          tedarikçiler, muhasebe danışmanları veya yasal mercilerle
          paylaşılabilir. Eflatun Teknoloji hiçbir koşulda verilerinizi üçüncü
          kişilere satmaz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          5. Kişisel Verilerin Saklanma Süresi
        </h2>
        <p>
          Kişisel verileriniz, yasal süreler boyunca veya işleme amacının
          ortadan kalkmasına kadar güvenli bir şekilde saklanır. Süre sonunda,
          veriler şirket politikalarına uygun biçimde anonim hale getirilir veya
          imha edilir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          6. Veri Sahibi Olarak Haklarınız
        </h2>
        <p>
          KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
          işlenmediğini öğrenme, düzeltilmesini talep etme, silinmesini veya yok
          edilmesini isteme, işleme faaliyetlerine itiraz etme ve zararın
          giderilmesini talep etme hakkına sahipsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          7. Başvuru Yöntemi
        </h2>
        <p>
          KVKK kapsamındaki taleplerinizi, kimliğinizi doğrulayan belgelerle
          birlikte <strong>info@eflatunteknoloji.com</strong> adresine e-posta
          göndererek veya posta yoluyla yukarıdaki adrese ulaştırarak
          iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak
          sonuçlandırılır.
        </p>

        <p className="mt-6">
          <strong>Eflatun Teknoloji</strong>, kişisel verilerinizin gizliliğini
          ve bütünlüğünü korumayı taahhüt eder. Güvenliğiniz için gerekli tüm
          teknik ve idari önlemler alınmaktadır.
        </p>
      </div>
    </div>
  );
}
