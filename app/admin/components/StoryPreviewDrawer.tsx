// "use client";

"use client";

import { useState } from "react";
import { useUIStore } from "../lib/store/uiStore";

export default function StoryPreviewDrawer() {
  const { previewOpen, closePreview, selectedStory, openAssign } = useUIStore();
  const imageSrc = selectedStory?.raw?.image?.trim() || "/placeholder.jpg";
  const [expanded, setExpanded] = useState(false);
  if (!selectedStory) return null;
  console.log("Selected Story Image:", selectedStory);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-125 bg-white shadow-xl transition-transform duration-300 z-50 ${
        previewOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 overflow-y-auto h-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-500">
            STORY VIEW
          </span>

          <div className="flex items-center gap-4 text-sm">
            {/* <button
              className="text-gray-600"
              onClick={() => openAssign(selectedStory)}
            >
              Assign
            </button>

            <button className="text-gray-600">
              Next →
            </button> */}

            <button onClick={closePreview} className="text-gray-500">
              ✕
            </button>
          </div>
        </div>

        {/* JOURNAL BRAND */}
        <div className="text-center text-[#8B1A1A] font-bold text-xl mb-6">
          SOPHIE MEDIA
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold leading-snug text-[#212121]">
          {selectedStory.title}
        </h1>

        {/* META */}
        <div className="text-xs text-gray-500 mt-2 flex gap-3">
          <span>{selectedStory.source}</span>
          <span>{selectedStory.time}</span>
          <span>4 Min Read</span>
        </div>

        {/* IMAGE */}

        <img
          src={imageSrc}
          alt={selectedStory.title}
          className="w-full rounded mt-6"
        />

        {/* ARTICLE BODY */}
        <div className="mt-6">
          <div
            className={`text-sm text-gray-700 leading-7 ${
              expanded ? "" : "line-clamp-8"
            }`}
            dangerouslySetInnerHTML={{
              __html: selectedStory.content || "<p>No Description</p>",
            }}
          />

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#861212] text-sm font-medium mt-2"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
}

// import { useUIStore } from "../lib/store/uiStore";

// export default function StoryPreviewDrawer() {
//   const { previewOpen, closePreview, selectedStory } = useUIStore();

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full md:w-125 bg-white shadow-xl transition-transform duration-300 z-50 ${
//         previewOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="p-6 overflow-y-auto h-full">
//         <button onClick={closePreview} className="text-gray-500 mb-4">
//           ✕
//         </button>

//         <h2 className="text-xl font-semibold mb-3">{selectedStory?.title}</h2>
//         <p className="text-sm text-gray-500 mt-3">
//           {selectedStory?.description}
//         </p>
//         <img src="/placeholder.jpg" className="w-full rounded mb-4" />
//         <button className="border px-3 py-2 rounded">Send to Desk</button>

//         <button className="border px-3 py-2 rounded">Copy Edit</button>

//         <button className="border px-3 py-2 rounded">Publish</button>
//         <p className="text-sm text-gray-700 leading-6">
//           Full story preview content goes here...
//         </p>
//       </div>
//     </div>
//   );
// }
