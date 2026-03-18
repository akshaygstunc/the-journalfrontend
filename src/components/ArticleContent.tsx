"use client";

import { useState } from "react";

export default function ArticleContent({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  // split paragraphs from dynamic content
  const paragraphs = content
    ?.split("\n")
    .filter((p) => p.trim() !== "");

  return (
    <div className="relative mb-8">
      
      {/* ARTICLE CONTENT */}
      <div
        className={`prose prose-lg max-w-none text-gray-800 transition-all duration-500 ${
          expanded ? "" : "max-h-[520px] overflow-hidden"
        }`}
      >
        {paragraphs.map((para: string, index: number) => {
          // Detect heading (example if CMS adds ## heading)
          if (para.startsWith("## ")) {
            return (
              <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                {para.replace("## ", "")}
              </h2>
            );
          }

          // Detect bullet list
          if (para.startsWith("- ")) {
            return (
              <ul key={index} className="list-disc pl-6 mb-4">
                <li>{para.replace("- ", "")}</li>
              </ul>
            );
          }

          // Normal paragraph
          return (
            <p key={index} className="mb-4">
              {para}
            </p>
          );
        })}
      </div>

      {/* FADE + BUTTON */}
      {!expanded && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center pb-6 pt-24 bg-gradient-to-t from-[#F9F6F3] via-[#F9F6F3]/80 to-transparent">
          <button
            onClick={() => setExpanded(true)}
            className="bg-[#8B1E1E] text-white px-6 py-2 rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}