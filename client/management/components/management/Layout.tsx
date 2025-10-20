import React from "react";
import dynamic from "next/dynamic";

const MobileLayout = dynamic(() => import("./MobileLayout"), { ssr: false });
const DesktopLayout = dynamic(() => import("./DesktopLayout"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  return <DesktopLayout>{children}</DesktopLayout>;
}
