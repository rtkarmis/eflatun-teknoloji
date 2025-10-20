"use client";
export const ReviewsSkeleton = () => {
  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x px-2 scrollbar-hide"
      role="status"
      aria-live="polite"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="snap-center flex-shrink-0 w-[85%] sm:w-[45%] md:w-[32%] bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="w-28 h-3 bg-gray-200 rounded" />
              <div className="w-20 h-3 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-24 h-3 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-2/3 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
