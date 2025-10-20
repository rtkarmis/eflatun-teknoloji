import dynamic from "next/dynamic";

// ✅ Framer Motion lazy load kullanılmaya devam eder ama header'lar preload edilir
const DesktopHeader = dynamic(() => import("./DesktopHeader"), {
  ssr: true,
  loading: () => <div className="h-16" />,
});
const MobileHeader = dynamic(() => import("./MobileHeader"), {
  ssr: true,
  loading: () => <div className="h-16" />,
});

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Masaüstü */}
        <div className="hidden md:flex w-full items-center justify-between">
          <DesktopHeader />
        </div>

        {/* Mobil */}
        <div className="flex md:hidden w-full items-center justify-between">
          <MobileHeader />
        </div>
      </div>
    </nav>
  );
}
