"use client";

import AssignStoryModal from "../components/AssignStoryModal";
import StatusTabs from "../components/StatusTabs";
import StoryCard from "../components/StoryCard";
import StoryPreviewDrawer from "../components/StoryPreviewDrawer";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuGrid2X2 } from "react-icons/lu";
import { useUIStore } from "../lib/store/uiStore";
import Pagination from "../components/Pagination";
// import AssignStoryModal from "../components/AssignStoryModal";

const mockStories = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Heavy Rains Causes Flooding in Mumbai",
  description: "Flooding reported in mumbai and expected to worsen even more",
  source: "REUTERS",
  time: "3M AGO",
  tag: ["featured", "breaking", "update"][i % 3],
}));

export default function CoveragePage() {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [active, setActive] = useState("active");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const totalPages = Math.ceil(mockStories.length / perPage);

  const paginatedStories = mockStories.slice(
    (page - 1) * perPage,
    page * perPage,
  );
  return (
    <>
      <div className="flex justify-between items-center border-b p-4 bg-[#F6F6F6] border-[#E7E7E7]">
        <h1 className="text-3xl font-semibold mb-2">Coverage</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-md cursor-pointer"
            onClick={() => router.push("/admin/articles/user-box")}
          >Open User Box</button>

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
      </div>
      <div className="bg-[#F6F6F6] min-h-screen p-6">
        <StatusTabs />
        {/* ACTIVE INACTIVE */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="">
            <button
              onClick={() => setActive("active")}
              className={`px-4 py-1 rounded cursor-pointer ${
                active === "active"
                  ? "bg-white border border-[#E5E5E5]"
                  : "text-gray-500 border-none"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setActive("inactive")}
              className={`px-4 py-1 rounded cursor-pointer ${
                active === "inactive"
                  ? "bg-white border border-[#E5E5E5]"
                  : "text-gray-500 border-none"
              }`}
            >
              Inactive
            </button>
          </div>

          <div className="flex gap-3 items-center mt-4">
            <span className="text-[#6D6D6D]">Sort By</span>
            <input
              placeholder="Search here..."
              className="border  rounded border-[#E7E7E7] px-4 py-2 w-64"
            />
            <select className="border px-3 py-2 rounded border-[#E7E7E7]">
              <option>Newest</option>
              <option>Oldest</option>
            </select>

            <button className="border px-4 py-2 rounded border-[#E7E7E7]">Filter</button>

            <button
              onClick={() => setView(view === "grid" ? "table" : "grid")}
              className="border px-4 py-3 rounded border-[#E7E7E7]"
            >
              <LuGrid2X2 />
            </button>
          </div>
        </div>
        {/* VIEW SWITCH */}
        {view === "grid" ? (
          <GridView stories={paginatedStories} />
        ) : (
          <TableView stories={paginatedStories} />
        )}

        <StoryPreviewDrawer />
        
        <AssignStoryModal />
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </div>
    </>
  );
}
function Tag({ type }: { type: string }) {
  const styles: any = {
    featured: "bg-[#1ABCFE21] text-[#1791C3] font-semibold",
    breaking: "bg-[#FFE2E0] text-[#B3261E] font-semibold",
    update: "bg-[#A259FF21] text-[#A259FF] font-semibold",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-xl ${styles[type]}`}>
      {type}
    </span>
  );
}
function GridView({ stories }: any) {
  const { handlePreview, handleAssign, handleIgnore } = useStoryActions();

  return (
    <div className="grid grid-cols-3 gap-6">
      {stories.map((story: any) => (
        <div
          key={story.id}
          className="bg-white border border-[#E2E8F0] p-4 rounded-xl"
          onClick={() => handlePreview(story)}
        >
          <Tag type={story.tag} />

          <h3 className="mt-3 text-[18px] font-semibold text-[#212121]">
            {story.title}
          </h3>

          <p className="text-md text-[#6D6D6D] mt-2">{story.description}</p>

          <div className="text-xs mt-3 flex gap-2">
            <span className="text-[#0727CC] font-medium border-r pr-2 border-[#E7E7E7]">
              SOURCE: {story.source}
            </span>

            <span className="text-gray-400">{story.time}</span>
          </div>

          <div className="flex justify-end gap-3 mt-4 text-sm border-t pt-4 border-[#E7E7E7]">
            <button className="text-gray-500" onClick={(e) => handleIgnore(e)}>
              Ignore
            </button>

            <button
              className="border border-[#E7E7E7] px-3 py-1 rounded-md"
              onClick={(e) => handleAssign(e, story)}
            >
              Assign
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableView({ stories }: any) {
  const { handlePreview, handleAssign, handleIgnore } = useStoryActions();

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4 font-medium">Wire Title</th>
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Beat</th>
            <th className="p-4 font-medium">Deadline</th>
            <th className="p-4 font-medium">Source</th>
            <th className="p-4 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {stories.map((story: any) => (
            <tr key={story.id} className="border-t border-[#E7E7E7]">
              <td
                className="p-3 text-[#212121] font-semibold"
                onClick={() => handlePreview(story)}
              >
                {story.title}
              </td>

              <td>
                <Tag type={story.tag} />
              </td>

              <td className="text-[#6D6D6D]">Economy</td>

              <td className="text-[#6D6D6D]">Today</td>

              <td className="text-[#6D6D6D]">Reuters News Wire</td>

              <td>
                <button
                  className="text-gray-500 px-4"
                  onClick={(e) => handleIgnore(e)}
                >
                  Ignore
                </button>

                <button
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                  onClick={(e) => handleAssign(e, story)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function useStoryActions() {
  const { openPreview, openAssign } = useUIStore();

  const handlePreview = (story: any) => {
    openPreview(story);
  };

  const handleAssign = (e: React.MouseEvent<HTMLButtonElement>, story: any) => {
    e.stopPropagation();
    openAssign(story);
  };

  const handleIgnore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Story ignored");
  };

  return { handlePreview, handleAssign, handleIgnore };
}
