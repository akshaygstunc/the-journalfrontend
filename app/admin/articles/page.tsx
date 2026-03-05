"use client";

import AssignStoryModal from "../components/AssignStoryModal";
import StatusTabs from "../components/StatusTabs";
import StoryCard from "../components/StoryCard";
import StoryPreviewDrawer from "../components/StoryPreviewDrawer";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import AssignStoryModal from "../components/AssignStoryModal";

const mockStories = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Heavy Rains Causes Flooding in Mumbai",
  description: "Flooding reported in mumbai and expected to worsen even more",
  source: "REUTERS",
  type: i % 2 === 0 ? "Breaking" : "Update",
}));

export default function CoveragePage() {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [active, setActive] = useState("active");
  return (
    <>
      <div className="flex justify-between items-center border-b p-4 bg-[F8F8F8] border-[#E7E7E7]">
        <h1 className="text-3xl font-semibold mb-2">Coverage</h1>
        <button
          type="submit"
          form="articleForm"
           onClick={() => router.push("/admin/articles/create")}
          className="flex items-center gap-2 bg-[#861212] text-white px-5 py-2 rounded-md"
        >
          <IoAddOutline className="w-6.25 h-6.25 text-white" />
          Create Story
        </button>
      </div>
    <div className="bg-[#F8F8F8] min-h-screen p-6">

      <StatusTabs />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {mockStories.map((story) => (
          <StoryCard key={story.id} article={story} />
        ))}
      </div>

      <StoryPreviewDrawer />
      <AssignStoryModal />
    </div>
    </>
  );
}
