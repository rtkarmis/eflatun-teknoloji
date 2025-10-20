// src/seo/SchemaLocalBusiness.tsx
"use client";

import React from "react";
import Script from "next/script";
import { getLocalBusinessSchema } from "@/lib/seo";

export default function SchemaLocalBusiness() {
  const schema = getLocalBusinessSchema();

  return (
    <Script
      id="schema-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
