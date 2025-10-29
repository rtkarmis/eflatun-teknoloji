import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /management/
Disallow: /_next/
Disallow: /static/

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
Host: ${siteConfig.siteUrl.replace("https://", "")}
  `.trim();

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
