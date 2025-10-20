"use client";

import { menuLinks } from "@/data/menu";
import { MenuItem } from "@/types/common";

export default function SchemaSiteNavigation() {
  const flattenLinks = (links: MenuItem[]): MenuItem[] => {
    return links.flatMap((link: MenuItem): MenuItem[] => {
      const base: MenuItem = { label: link.label, href: link.href };
      if (link.subLinks) {
        return [base, ...flattenLinks(link.subLinks)];
      }
      return [base];
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: flattenLinks(menuLinks).map(
      (link: MenuItem, index: number) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: link.label,
        url: `https://eflatunteknoloji.com${link.href ?? ""}`,
      })
    ),
  };

  return (
    <script
      id="schema-site-navigation"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
