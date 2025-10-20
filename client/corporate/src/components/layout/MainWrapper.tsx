"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Treat root path exactly as homepage
  const isHome = pathname === "/" || pathname === "" || pathname === undefined;

  const className = isHome ? undefined : "max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12";

  return <main className={className}>{children}</main>;
}
