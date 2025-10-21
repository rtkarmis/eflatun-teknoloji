"use client";

import Link from "next/link";
import React from "react";

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${it.label}-${idx}`} className="flex items-center">
              {!isLast && it.href ? (
                <Link
                  href={it.href}
                  className="hover:underline touch-target pointer-target text-gray-600"
                >
                  {it.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "text-gray-900 font-medium" : "text-gray-600"
                  }
                >
                  {it.label}
                </span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
