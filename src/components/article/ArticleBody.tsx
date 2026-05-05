// ArticleBody.tsx
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ArticleHeroSlider from "./ArticleHeroSlider";
import { Skeleton } from "../Skeleton";


/* ─────────────────────────────────────────────
   ARTICLE SKELETON
───────────────────────────────────────────────*/
function ArticleBodySkeleton() {
  return (
    <div>
      {/* Hero Slider placeholder */}
      <Skeleton className="w-full h-[480px]" rounded="md" />
 
      <div className="space-y-7 mt-8">
        {/* Paragraph lines */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
 
        {/* H2 heading */}
        <Skeleton className="h-7 w-72 mt-12" rounded="sm" />
 
        {/* Short paragraph */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
 
        {/* Blockquote */}
        <div className="border-l-4 border-[#8B1C1C] pl-6 py-2 my-8 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>
 
        {/* Bullet list */}
        <div className="pl-6 space-y-3">
          {["w-48", "w-64", "w-56"].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-2 w-2 flex-shrink-0" rounded="full" />
              <Skeleton className={`h-4 ${w}`} />
            </div>
          ))}
        </div>
 
        {/* More paragraph lines */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </div>
 
        {/* Continue Reading button placeholder */}
        <div className="flex justify-center mt-12">
          <Skeleton className="h-11 w-44" rounded="full" />
        </div>
      </div>
 
      {/* Divider */}
      <div className="border-b border-gray-300 mt-16" />
    </div>
  );
}
export default function ArticleBody() {
  const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
  const hiddenRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // Replace with your real data-fetch signal — this simulates a short load
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (expanded && hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [expanded]);


  if (loading) return <ArticleBodySkeleton />;
  return (
    <div>
      {/* Hero Image */}
      <ArticleHeroSlider />

      {/* Content Wrapper */}
      <div className="relative">
        <div
          className={`transition-all duration-700 ease-in-out ${
            expanded ? "max-h-[2000px]" : "max-h-[580px]"
          } overflow-hidden`}
        >
          <div className="space-y-7 text-[17px] leading-[1.8] text-[#2F2F2F]">
            <p>
              When thousands of young Bangladeshis poured onto the streets last
              year, the moment felt unmistakably historic. Students, first-time
              voters, and digitally native activists — many of them Gen Z —
              challenged a political order that had seemed immovable for
              decades. Their protests were not driven by a single leader or
              party banner, but by a shared frustration with authoritarian
              governance, corruption, and shrinking economic opportunity.<br/><br/> For a
              brief moment, the country appeared to be turning a page.<br/><br/> The
              youth-led movement succeeded in something rare: it broke the aura
              of inevitability around power. An autocratic figure who had
              dominated the political landscape was forced to step aside, and
              public debate widened almost overnight. Yet as Bangladesh moves
              toward another national election, the gap between protest politics
              and electoral reality has become increasingly clear.
            </p>

            <h2 className="text-[28px] font-semibold mt-12 mb-4">
              From Protest Energy to Political Power
            </h2>

            <p>
              Street mobilization and ballot-box success are not the same thing
              — and Bangladesh is a case study in that difference.
            </p>

            {/* Blockquote style */}
            <div className="border-l-4 border-[#8B1C1C] pl-6 py-2 my-8">
              <p className="text-lg italic text-gray-700">
                "The youth movement remains politically influential, but
                structurally weak."
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-3 my-6">
              <li>"We don't trust the parties."</li>
              <li>"The system doesn't represent us."</li>
              <li>"Protests are the only language that works."</li>
            </ul>

            {/* Hidden Content */}
            <div ref={hiddenRef} className="space-y-7">
              <p>
                This reluctance has left the youth movement politically
                influential, but structurally weak.
              </p>

              <p>
                Meanwhile, the country's established political actors have not
                stood still. The old guard retains significant advantages in
                networks and financing.
              </p>

              <p>
                As Bangladesh moves toward another national election, the gap
                between protest politics and electoral reality becomes clear.
              </p>
            </div>
          </div>
        </div>

        {/* Gradient Fade */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#f4f1ec] to-transparent pointer-events-none" />
        )}
      </div>

      {/* Continue Button */}
      {!expanded && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setExpanded(true)}
            className="bg-[#8B1C1C] text-white text-[14px] font-medium px-7 py-3 rounded-full hover:bg-[#6b1515] transition shadow-sm"
          >
            Continue Reading
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="border-b border-gray-300 mt-16"></div>
    </div>
  );
}
