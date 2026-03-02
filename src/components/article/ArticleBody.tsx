// ArticleBody.tsx
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ArticleHeroSlider from "./ArticleHeroSlider";
export default function ArticleBody() {
  const [expanded, setExpanded] = useState(false);
  const hiddenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expanded && hiddenRef.current) {
      hiddenRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [expanded]);

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
