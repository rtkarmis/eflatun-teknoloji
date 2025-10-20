import Link from "next/link";
import {
  FiUsers,
  FiBox,
  FiTruck,
  FiMenu,
  FiHome,
  FiSettings,
} from "react-icons/fi";
import cn from "classnames";

import React, { useState } from "react";
import { useEffect, useState as useStateReact } from "react";
import { useRouter } from "next/router";
import { useUIConfig } from "@/lib/ui-config";

const sidebarBaseStyle: React.CSSProperties = {
  background: "#181C2A",
  color: "#fff",
  height: "100vh",
  padding: "24px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
  fontWeight: 600,
  fontSize: "1.1rem",
  boxShadow: "2px 0 16px rgba(0,0,0,0.08)",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 99,
  transition: "width 0.2s",
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  transition: "background 0.2s",
  margin: "0 0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "1.2rem",
  justifyContent: "flex-start",
  width: "100%",
};

const linkActiveStyle = {
  background: "#23263A",
};

const menuItems = [
  { href: "/", icon: <FiHome />, name: "Dashboard" },
  { href: "/customers", icon: <FiUsers />, name: "Müşteriler" },
  { href: "/suppliers", icon: <FiTruck />, name: "Tedarikçiler" },
  { href: "/products", icon: <FiBox />, name: "Ürünler" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const router = useRouter();
  const { sidebarIconSize, sidebarBg, iconColor, textColor } = useUIConfig();
  const [isMobile, setIsMobile] = useStateReact(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Bottom navigation (footer) - tam genişlik, boş alan yok
    return (
      <nav
        className="fixed bottom-0 left-0 w-full flex bg-[#181C2A] z-[100] shadow-2xl border-t border-[#23263A] md:hidden"
        style={{ height: 56 }}
      >
        {menuItems.map((item) => {
          const isActive = router.pathname === item.href || router.pathname.startsWith(item.href + "/");
          return (
            <Link href={item.href} key={item.name} style={{ flex: 1, textAlign: "center", textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 56,
                  color: isActive ? "#eb1b14ff" : "#fff",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  position: "relative",
                  transition: "color 0.2s",
                  width: '100%',
                }}
              >
                {React.cloneElement(item.icon, {
                  size: 22,
                  style: {
                    color: isActive ? "#eb1b14ff" : "#fff",
                    marginBottom: 1,
                  },
                })}
                <span style={{ fontSize: 12 }}>{item.name}</span>
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      width: 20,
                      height: 2,
                      background: "#eb1b14ff",
                      borderRadius: 2,
                    }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "flex flex-col h-full shadow-lg",
        open ? "w-[220px]" : "w-[72px]"
      )}
      style={{
        transition: "width 0.2s",
        minWidth: open ? "220px" : "72px",
        maxWidth: open ? "220px" : "72px",
        background: sidebarBg,
        color: textColor,
      }}
    >
      {/* Logo kaldırıldı, sadece metin */}
      <div
        onClick={() => router.push("/")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          height: 64,
          fontWeight: 700,
          fontSize: open ? 22 : 20,
          letterSpacing: 1,
          paddingLeft: open ? 24 : 0,
          paddingRight: 0,
          userSelect: "none",
          transition: "all 0.2s",
        }}
      >
        {open ? "MYY Software" : "MYY"}
      </div>

      {/* Düz menü listesi */}
      <div style={{ width: "100%" }}>
        {menuItems.map((item) => {
          // Aktiflik: tam eşleşme veya detay/ekleme/güncelleme gibi alt path'lerde de aktif olsun
          const isActive = router.pathname === item.href || router.pathname.startsWith(item.href + "/");
          return (
            <Link
              href={item.href}
              key={item.name}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: open ? "flex-start" : "center",
                  gap: open ? 16 : 0,
                  padding: open ? "12px 36px" : "12px 0",
                  cursor: "pointer",
                  fontSize: 16,
                  width: "100%",
                  transition: "background 0.2s",
                  background:  sidebarBg,
                  position: "relative",
                  color: isActive ? "#eb1b14ff" : iconColor,
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {React.cloneElement(item.icon, {
                  size: sidebarIconSize,
                  style: {
                    color: isActive ? "#eb1b14ff" : iconColor,
                    minWidth: sidebarIconSize,
                    minHeight: sidebarIconSize,
                    display: "block",
                    margin: open ? "0" : "0 auto",
                  },
                })}
                {open && <span>{item.name}</span>}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: "#0070f3",
                      borderRadius: "4px 0 0 4px",
                    }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
