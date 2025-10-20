"use client";
import dynamic from "next/dynamic";

const SchemaServiceGroup = dynamic(
  () => import("@/components/seo/service/SchemaServiceGroup"),
  { ssr: false }
);

export default function ClientSchemaServiceGroup() {
  return <SchemaServiceGroup />;
}
