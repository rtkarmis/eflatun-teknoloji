"use client";

import { menuLinks } from "@/data/menu";
import { COLORS } from "@/lib/constants";
import { siteConfig } from "@/lib/seo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Logo from "../ui/Logo";

export default function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // 🧭 Scroll kilitleme
  useEffect(() => {
    const doc = document.documentElement;
    const body = document.body;

    if (sidebarOpen) {
      // Preserve current scroll position
      const scrollY = window.scrollY || window.pageYOffset;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.overflow = "hidden";
      // store the scroll position on the html element for restoration
      doc.style.setProperty("--sidebar-scroll-y", String(scrollY));
    } else {
      // Restore
      const stored =
        parseInt(doc.style.getPropertyValue("--sidebar-scroll-y") || "0", 10) ||
        0;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, stored);
      doc.style.removeProperty("--sidebar-scroll-y");
    }

    return () => {
      // cleanup in case component unmounts while locked
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      doc.style.removeProperty("--sidebar-scroll-y");
    };
  }, [sidebarOpen]);

  const toggleMenu = (label: string) =>
    setOpenMenu((prev) => (prev === label ? null : label));

  return (
    <div className="flex items-center justify-between w-full h-16 relative">
      {/* 🔹 Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Logo width={120} height={67} />
      </div>

      {/* 🔹 Menü Butonu */}
      <button
        aria-label={sidebarOpen ? "Menüyü Kapat" : "Menüyü Aç"}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="ml-auto z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* 🔹 Sidebar Menü */}
      {sidebarOpen && (
        <aside
          className="fixed right-0 w-full max-w-sm bg-white z-40 shadow-2xl flex flex-col"
          style={{
            height: "calc(100vh - (var(--spacing) * 16))",
            top: "calc((var(--spacing) * 16))",
          }}
        >
          {/* Menü Listesi */}
          <div className="overflow-y-auto py-4 px-6 flex-1">
            {menuLinks.map((link) => (
              <div key={link.href} className="mb-2">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className="w-full text-left py-3 text-gray-800 text-base font-medium hover:text-blue-700 flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <FiChevronDown
                        size={18}
                        className={`ml-2 transition-transform ${
                          openMenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openMenu === link.label && (
                      <ul className="ml-3 mt-1 border-l border-gray-200 pl-3 space-y-1">
                        {link.subLinks.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className="block py-3 text-gray-800 text-base font-medium hover:text-blue-700 transition"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-gray-100 p-4">
            <Link
              href={`tel:${siteConfig.phone}`}
              onClick={() => setSidebarOpen(false)}
              className="block text-center px-4 py-3 rounded-md font-semibold text-white shadow-md transition"
              style={{
                background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
              }}
            >
              Hemen Ara
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
