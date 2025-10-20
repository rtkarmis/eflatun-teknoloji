import sitemap from "@/app/sitemap";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTitle from "@/components/ui/PageTitle";
import { buildSitemapBreadcrumb } from "@/lib/breadcrumbs";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";

export default async function SiteMapContent() {
  // 📥 sitemap.ts dosyasından direkt verileri çek
  const entries = await sitemap();

  // Ana domaini temizle
  const urls = entries.map((e) =>
    e.url.replace(siteConfig.siteUrl.replace(/\/$/, ""), "")
  );

  // 🔹 Kategorilere göre grupla
  const groups = {
    genel: urls.filter(
      (u) =>
        u === "/" || u.startsWith("/hakkimizda") || u.startsWith("/iletisim")
    ),
    urunKategorileri: urls.filter(
      (u) => u.startsWith("/su-aritma-urunleri/") && u.split("/").length === 3
    ),
    urunler: urls.filter(
      (u) => u.startsWith("/su-aritma-urunleri/") && u.split("/").length > 3
    ),
    hizmetler: urls.filter((u) => u.startsWith("/su-aritma-hizmetleri")),
    bolgeler: urls.filter((u) => u.startsWith("/hizmet-bolgeleri")),
    politikalar: urls.filter(
      (u) =>
        u.includes("cerez-politikasi") ||
        u.includes("gizlilik-politikasi") ||
        u.includes("kvkk-aydinlatma-metni")
    ),
  };

  const sections = [
    { title: "Genel Sayfalar", items: groups.genel },
    { title: "Ürün Kategorileri", items: groups.urunKategorileri },
    { title: "Ürünler", items: groups.urunler },
    { title: "Hizmetler", items: groups.hizmetler },
    { title: "Hizmet Bölgeleri", items: groups.bolgeler },
    { title: "Politikalar", items: groups.politikalar },
  ];

  return (
    <div>
      <Breadcrumb items={buildSitemapBreadcrumb()} />
      <PageTitle text="Eflatun Teknoloji Site Haritası" />
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Web sitemizde yer alan tüm sayfalar, ürün kategorileri, hizmetler ve
        politikalar burada listelenmiştir.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map(
          (section) =>
            section.items.length > 0 && (
              <div key={section.title}>
                <h2
                  className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2"
                  style={{ color: COLORS.secondary }}
                >
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.title === "Ürün Kategorileri" && (
                    <li key="/su-aritma-urunleri">
                      <Link
                        href="/su-aritma-urunleri"
                        className="text-sm text-gray-700 hover:text-blue-700 hover:underline"
                      >
                        Tüm Ürünler
                      </Link>
                    </li>
                  )}

                  {section.items.map((url) => {
                    const label = decodeURI(url.split("/").pop() || "")
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase());
                    return (
                      <li key={url}>
                        <Link
                          href={url}
                          className="text-sm text-gray-700 hover:text-blue-700 hover:underline"
                        >
                          {label || "Anasayfa"}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
}
