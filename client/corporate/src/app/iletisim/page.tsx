import SchemaContact from "@/components/seo/contact/SchemaContact";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";
import { buildContactBreadcrumb } from "@/lib/breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";
export const metadata = generatePageMetadata({
  title: "İletişim",
  description:
    "Eflatun Teknoloji Su Arıtma Sistemleri — Bolu ve çevresinde su arıtma satışı, montajı ve bakımı için bize ulaşın. Telefon, e-posta ve adres bilgileri burada.",
  slug: "iletisim",
});
export const dynamic = "force-static";
export default function ContactPage() {
  return (
    <>
      <SchemaContact />
      <SchemaBreadcrumb items={buildContactBreadcrumb()} />
      <ContactContent />
    </>
  );
}
