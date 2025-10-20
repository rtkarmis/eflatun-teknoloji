// src/components/ui/ContactSkeleton.tsx
"use client";

export default function ContactSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 animate-pulse flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 bg-gray-200 rounded-full mb-4"></div>
          <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-3 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
}
