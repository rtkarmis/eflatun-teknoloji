"use client";
import { menuLinks } from "@/data/menu";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import Logo from "../ui/Logo";

const DesktopHeader = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <div className="w-full grid grid-cols-[auto_1fr_auto] items-center">
      {/* 🔹 Logo */}
      <div className="flex items-center shrink-0">
        <Logo priority width={160} height={90} />
      </div>

      {/* 🔹 Menü */}
      <div className="hidden lg:flex items-center justify-center space-x-8 px-4 relative">
        {menuLinks.map((link) => {
          const hasSubLinks = link.subLinks && link.subLinks.length > 0;

          return (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  activeMenu === link.label
                    ? "text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                {hasSubLinks && (
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${
                      activeMenu === link.label
                        ? "rotate-180 text-blue-600"
                        : ""
                    }`}
                  />
                )}
              </Link>

              {/* Alt Menü */}
              {hasSubLinks && activeMenu === link.label && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 transition-all">
                  <ul className="py-2">
                    {link.subLinks?.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔹 CTA */}
      <div className="flex items-center justify-end">
        <Link
          href={`tel:${siteConfig.phone}`}
          className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
          style={{ color: COLORS.text }}
        >
          Teklif Al
        </Link>
      </div>
    </div>
  );
};

export default DesktopHeader;
