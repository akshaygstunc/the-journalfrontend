"use client";

import { useUIStore } from "../lib/store/uiStore";


export default function StoryCard({ article }: any) {
  const { openPreview, openAssign } = useUIStore();

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition">
      <span className="text-xs px-2 py-1 rounded bg-red-100 text-[#861212] font-semibold">
        {article.type}
      </span>

      <h3
        onClick={() => openPreview(article)}
        className="font-semibold mt-3 cursor-pointer"
      >
        {article.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {article.description}
      </p>

      <div className="flex justify-between items-center mt-5">
        <span className="text-xs text-gray-400">
          SOURCE: {article.source}
        </span>

        <div className="flex gap-3">
          <button className="text-sm text-gray-400">
            Ignore
          </button>

          <button
            onClick={() => openAssign(article)}
            className="border px-3 py-1 rounded text-sm"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}