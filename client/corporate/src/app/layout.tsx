import CookieBanner from "@/components/cookie/CookieBanner";
import Footer from "@/components/layout/Footer";
import MainWrapper from "@/components/layout/MainWrapper";
import Navbar from "@/components/layout/Navbar";
import GoogleScripts from "@/components/seo/GoogleScripts";
import SchemaLocalBusiness from "@/components/seo/SchemaLocalBusiness";
import SchemaSiteNavigation from "@/components/seo/SchemaSiteNavigation";
import { defaultMetadata } from "@/lib/seo";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/icons/icon.webp" type="image/webp" />
      </head>
      <body
        className={`${inter.className} bg-[#F0F5FA] text-gray-900`}
        style={{ minWidth: 0 }}
      >
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        <GoogleScripts />
        <CookieBanner />
        <SchemaLocalBusiness />
        <SchemaSiteNavigation />
      </body>
    </html>
  );
}
