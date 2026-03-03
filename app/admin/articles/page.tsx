"use client";

import AssignStoryModal from "../components/AssignStoryModal";
import StatusTabs from "../components/StatusTabs";
import StoryCard from "../components/StoryCard";
import StoryPreviewDrawer from "../components/StoryPreviewDrawer";
// import AssignStoryModal from "../components/AssignStoryModal";

const mockStories = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Heavy Rains Causes Flooding in Mumbai",
  description:
    "Flooding reported in mumbai and expected to worsen even more",
  source: "REUTERS",
  type: i % 2 === 0 ? "Breaking" : "Update",
}));

export default function CoveragePage() {
  return (
    <div className="bg-[#F8F8F8] min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Coverage
      </h1>

      <StatusTabs />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {mockStories.map((story) => (
          <StoryCard key={story.id} article={story} />
        ))}
      </div>

      <StoryPreviewDrawer />
      <AssignStoryModal />
    </div>
  );
}