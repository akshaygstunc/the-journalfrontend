// components/Skeleton.tsx
// Reusable skeleton shimmer loader for the admin dashboard

import React from "react";

/* ─── Base shimmer primitive ─── */
interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  const roundedMap = {
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${roundedMap[rounded]} ${className}`}
    >
      {/* shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}



/* ─── KPI Card skeleton ─── */
export function DashboardCardSkeleton() {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-5 space-y-3">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}

/* ─── Weekly Traffic chart skeleton ─── */
export function ChartSkeleton() {
  return (
    <div className="lg:col-span-2 bg-white border border-[#E7E7E7] rounded-lg p-6">
      <Skeleton className="h-4 w-32 mb-6" />
      {/* fake bar columns */}
      <div className="flex items-end gap-3 h-[300px] px-2">
        {[65, 90, 45, 80, 100, 60, 75].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${h}%` } as React.CSSProperties}
            rounded="sm"
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Quick Access skeleton ─── */
export function QuickAccessSkeleton() {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-6 space-y-3">
      <Skeleton className="h-4 w-28 mb-4" />
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

/* ─── Recent News table skeleton ─── */
export function RecentNewsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">
      {/* header */}
      <div className="p-6 border-b border-[#E7E7E7]">
        <Skeleton className="h-4 w-32" />
      </div>

      {/* column headers */}
      <div className="bg-gray-50 grid grid-cols-3 px-4 py-3 gap-4">
        {["w-16", "w-12", "w-20"].map((w, i) => (
          <Skeleton key={i} className={`h-3 ${w}`} />
        ))}
      </div>

      {/* rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-3 px-4 py-4 gap-4 border-t border-[#E7E7E7]"
        >
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

/* ─── Full Dashboard skeleton (drop-in replacement) ─── */
export function DashboardSkeleton() {
  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-9 w-40" rounded="md" />
        <Skeleton className="h-10 w-36" rounded="md" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <DashboardCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartSkeleton />
        <QuickAccessSkeleton />
      </div>

      {/* Recent News */}
      <RecentNewsSkeleton rows={5} />
    </div>
  );
}


 
/* ─────────────────────────────────────────────
   HERO SECTION  (2/3 big image + 1/3 side list)
───────────────────────────────────────────────*/
export function HeroSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10">
      {/* hero image + text */}
      <div className="lg:col-span-2 px-4 lg:px-0 space-y-4">
        <Skeleton className="w-full h-[526px]" rounded="md" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-3 w-48" />
        <div className="pt-3 border-t border-[#D1D1D1] space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
 
      {/* side news — 3 items */}
      <div className="space-y-8 px-4 lg:px-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="pb-6 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-40 border-b border-[#D1D1D1] pb-2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   SECTION HEADER  (matches <SectionHeader />)
───────────────────────────────────────────────*/
export function SectionHeaderSkeleton() {
  return <Skeleton className="h-6 w-40 mb-2" rounded="sm" />;
}
 
/* ─────────────────────────────────────────────
   MOST WATCHED  (4-col grid, image + badge + title)
───────────────────────────────────────────────*/
export function MostWatchedSkeleton() {
  return (
    <div className="px-4 lg:px-0">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 lg:flex-col">
            {/* thumbnail */}
            <div className="w-[110px] h-[110px] lg:w-full lg:h-[200px] flex-shrink-0">
              <Skeleton className="w-full h-full" rounded="md" />
            </div>
            {/* badge + title */}
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-5 w-16" rounded="full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   TRENDING / EXPLORE  shared sub-pieces
───────────────────────────────────────────────*/
 
/** Big 2/3-width main article */
function MainArticleSkeleton() {
  return (
    <div className="col-span-2 space-y-4">
      <Skeleton className="w-full h-[340px]" rounded="md" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-3 w-48" />
      <div className="pt-3 border-t border-[#D1D1D1] space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
 
/** 1/3-width side list — n items */
function SideListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="pb-6 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-3 w-40 border-b border-[#D1D1D1] pb-2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}
 
/** 4-col grid (image + title + meta + excerpt) */
function FourColGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4 lg:flex-col">
          <div className="w-[110px] h-[110px] lg:w-full lg:h-[180px] flex-shrink-0">
            <Skeleton className="w-full h-full" rounded="md" />
          </div>
          <div className="flex flex-col gap-2 flex-1 lg:mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   TRENDING NEWS SECTION
───────────────────────────────────────────────*/
export function TrendingSkeleton() {
  return (
    <div className="px-4 lg:px-0 w-full">
      <SectionHeaderSkeleton />
      {/* main + side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
        <MainArticleSkeleton />
        <SideListSkeleton items={4} />
      </div>
      {/* bottom 4-col grid */}
      <FourColGridSkeleton />
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   EXPLORE MORE SECTION
───────────────────────────────────────────────*/
export function ExploreSkeleton() {
  return (
    <div className="px-4 lg:px-0 w-full">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mt-8">
        <MainArticleSkeleton />
        <SideListSkeleton items={3} />
      </div>
      <FourColGridSkeleton />
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   ALSO IN NEWS  (2-col list, title + meta + excerpt)
───────────────────────────────────────────────*/
export function AlsoInNewsSkeleton() {
  return (
    <div className="pb-20 px-4 lg:px-0">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="pb-4 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-3 w-56 border-b border-[#D1D1D1] pb-2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ─────────────────────────────────────────────
   FULL HOME PAGE SKELETON  ← use this one
───────────────────────────────────────────────*/
export function HomePageSkeleton() {
  return (
    <div className="bg-[#f5f5f5a9] min-h-screen font-sans">
      <div className="w-full mx-auto mt-12 space-y-20">
        <HeroSkeleton />
        <MostWatchedSkeleton />
        <TrendingSkeleton />
        <ExploreSkeleton />
        <AlsoInNewsSkeleton />
      </div>
    </div>
  );
}