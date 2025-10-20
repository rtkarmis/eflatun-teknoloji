import { MenuItem } from "@/types/common";

export const menuLinks: MenuItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetlerimiz", href: "/su-aritma-hizmetleri" },
  {
    label: "Ürünlerimiz",
    href: "/su-aritma-urunleri",
    subLinks: [
      {
        label: "Su Arıtma Cihazları",
        href: "/su-aritma-urunleri/su-aritma-cihazlari",
      },
      {
        label: "Su Arıtma Filtreleri",
        href: "/su-aritma-urunleri/su-aritma-filtreleri",
      },
      {
        label: "Su Arıtma Ekipmanları",
        href: "/su-aritma-urunleri/su-aritma-ekipmanlari",
      },
    ],
  },
  { label: "Hizmet Bölgelerimiz", href: "/hizmet-bolgeleri" },
  { label: "İletişim", href: "/iletisim" },
];
