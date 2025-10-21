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
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong> (“Şirket”)
          olarak kişisel verilerinizin gizliliğini ve güvenliğini en üst düzeyde
          korumayı ilke edindik. 6698 sayılı{" "}
          <strong>Kişisel Verilerin Korunması Kanunu (KVKK)</strong> uyarınca,
          kişisel verileriniz aşağıda belirtilen esaslar çerçevesinde
          işlenmektedir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          1. Veri Sorumlusu
        </h2>
        <p>
          <strong>Eflatun Teknoloji Su Arıtma Sistemleri</strong>
          <br />
          <strong>Adres:</strong> {siteConfig.address}
          <br />
          <strong>E-posta:</strong> {siteConfig.email}
          <br />
          <strong>Telefon:</strong>{" "}
          {siteConfig.phoneDisplay || siteConfig.phone}
          <br />
          <strong>Vergi Dairesi:</strong> Bolu Vergi Dairesi
        </p>
        <p>
          Şirketimiz, faaliyetlerini ilgili tüm yasal düzenlemelere ve KVKK
          hükümlerine uygun biçimde yürütmektedir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          2. Kişisel Verilerin İşlenme Amaçları
        </h2>
        <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul>
          <li>Ürün ve hizmetlerin sunulması, kurulumu ve teknik desteği,</li>
          <li>
            Müşteri taleplerinin karşılanması ve memnuniyetinin artırılması,
          </li>
          <li>Satış, faturalandırma ve garanti süreçlerinin yürütülmesi,</li>
          <li>Hizmet kalitesinin ölçülmesi ve geliştirilmesi,</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
        </ul>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
        </h2>
        <p>
          Kişisel verileriniz; web sitemiz, iletişim formlarımız, çağrı merkezi,
          e-posta veya servis süreçleri aracılığıyla toplanmaktadır. Bu veriler,
          KVKK’nın 5. ve 6. maddelerinde belirtilen “sözleşmenin ifası”, “hukuki
          yükümlülüklerin yerine getirilmesi” ve “meşru menfaat” hükümleri
          çerçevesinde işlenmektedir.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          4. Kişisel Verilerin Aktarılması
        </h2>
        <p>
          Kişisel verileriniz, yalnızca hizmetin yürütülmesi için gerekli olduğu
          durumlarda ve yasal sınırlara uygun biçimde; tedarikçiler, iş
          ortakları, mali danışmanlar veya yetkili kamu kurumlarıyla
          paylaşılabilir. <strong>Eflatun Teknoloji</strong>, hiçbir koşulda
          verilerinizi üçüncü şahıslara satmaz veya izinsiz şekilde aktarmaz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          5. Kişisel Verilerin Saklanma Süresi
        </h2>
        <p>
          Kişisel verileriniz, ilgili mevzuatta öngörülen süre boyunca veya
          işleme amacının ortadan kalkmasına kadar güvenli bir şekilde
          saklanmaktadır. Süre sonunda veriler, anonim hale getirilerek veya
          güvenli biçimde imha edilerek sistemlerimizden kaldırılır.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          6. Veri Sahibi Olarak Haklarınız
        </h2>
        <p>
          KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
          işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme,
          işleme faaliyetlerine itiraz etme ve uğranılan zararın giderilmesini
          isteme haklarına sahipsiniz.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          7. Başvuru Yöntemi
        </h2>
        <p>
          KVKK kapsamındaki taleplerinizi kimliğinizi doğrulayan belgelerle
          birlikte{" "}
          <strong>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[#007F8C] hover:underline"
            >
              {siteConfig.email}
            </a>
          </strong>{" "}
          adresine e-posta göndererek veya yazılı olarak {siteConfig.address}{" "}
          adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz
          olarak sonuçlandırılmaktadır.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-2"
          style={{ color: COLORS.secondary }}
        >
          8. Güvenlik Taahhüdü
        </h2>
        <p>
          <strong>Eflatun Teknoloji</strong>, kişisel verilerinizin gizliliğini,
          bütünlüğünü ve erişilebilirliğini korumak amacıyla gerekli tüm teknik
          ve idari tedbirleri almaktadır. Veri güvenliği politikalarımız, ulusal
          ve uluslararası standartlara uygun şekilde sürekli geliştirilmektedir.
        </p>

        <div className="mt-10 text-sm text-gray-500 border-t pt-4 text-center">
          <p>
            <strong>Son Güncelleme Tarihi:</strong> 21 Ekim 2025
          </p>
          <p>
            Bu aydınlatma metni, yasal gereklilikler ve operasyonel süreçlerdeki
            değişiklikler doğrultusunda düzenli olarak güncellenmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
