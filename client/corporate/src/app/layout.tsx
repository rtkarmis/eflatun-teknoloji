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

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ✅ fontDisplay burada
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <head>
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link rel="preload" as="style" href="/_next/static/css/app.css" />
        <link
          rel="preconnect"
          href="https://maps.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />

        <noscript
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              '<link rel="stylesheet" href="/_next/static/css/app.css" />',
          }}
        />
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
