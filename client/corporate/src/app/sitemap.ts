import { siteConfig } from "@/lib/seo";
import { MetadataRoute } from "next";

// Local data imports to enumerate all existing screens/pages
import { productCategories, products } from "@/data/products";
import { serviceAreas } from "@/data/service-areas";
import { services } from "@/data/services";

export const dynamic = "force-static";

type ChangeFreq =
  | "monthly"
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "yearly"
  | "never";

type SitemapEntryLike = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: ChangeFreq;
  priority?: number;
  alternates?: { href: string; hrefLang?: string }[];
  images?: string[];
};

function makeEntry(
  path: string,
  opts?: Partial<SitemapEntryLike>
): SitemapEntryLike {
  return {
    url: `${siteConfig.siteUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`,
    lastModified: opts?.lastModified ?? new Date(),
    changeFrequency: opts?.changeFrequency ?? "monthly",
    priority: opts?.priority ?? 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static top-level pages
  const staticPaths = [
    "",
    "hakkimizda",
    "iletisim",
    "cerez-politikasi",
    "gizlilik-politikasi",
    "kvkk-aydinlatma-metni",
    "su-aritma-urunleri",
    "su-aritma-hizmetleri",
    "hizmet-bolgeleri",
  ];

  const staticRoutes = staticPaths.map((p) =>
    makeEntry(p, { priority: p === "" ? 1.0 : 0.8 })
  );

  // Product category pages
  const categoryRoutes = productCategories.map((cat) =>
    makeEntry(`/su-aritma-urunleri/${cat.slug}`, { priority: 0.8 })
  );

  // Product detail pages
  const productRoutes = products.map((prd) => {
    // product.category contains the category slug
    const path = `/su-aritma-urunleri/${prd.category}/${prd.slug}`;
    return makeEntry(path, { priority: 0.7 });
  });

  // Services
  const serviceRoutes = services.map((s) =>
    makeEntry(`/su-aritma-hizmetleri/${s.slug}`, { priority: 0.75 })
  );

  // Service areas
  const serviceAreaRoutes = serviceAreas.map((a) =>
    makeEntry(`/hizmet-bolgeleri/${a.slug}`, { priority: 0.75 })
  );

  const entries = [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...serviceAreaRoutes,
  ];

  // Next's MetadataRoute.Sitemap entry types include a more specific `alternates` shape.
  // Cast here to satisfy the compiler since our entries include the canonical fields used by Next.
  return entries as unknown as MetadataRoute.Sitemap;
}
