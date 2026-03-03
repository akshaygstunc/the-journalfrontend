"use client";

import { useUIStore } from "../lib/store/uiStore";


export default function StoryPreviewDrawer() {
  const { previewOpen, closePreview, selectedStory } =
    useUIStore();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-125 bg-white shadow-xl transition-transform duration-300 z-50 ${
        previewOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="p-6 overflow-y-auto h-full">
        <button
          onClick={closePreview}
          className="text-gray-500 mb-4"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-3">
          {selectedStory?.title}
        </h2>

        <img
          src="/placeholder.jpg"
          className="w-full rounded mb-4"
        />

        <p className="text-sm text-gray-700 leading-6">
          Full story preview content goes here...
        </p>
      </div>
    </div>
  );
}