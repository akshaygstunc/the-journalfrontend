"use client";

import AssignStoryModal from "../components/AssignStoryModal";
import StatusTabs from "../components/StatusTabs";
import StoryPreviewDrawer from "../components/StoryPreviewDrawer";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LuGrid2X2 } from "react-icons/lu";
import { useUIStore } from "../lib/store/uiStore";
import Pagination from "../components/Pagination";
import {
  getCoverage,
  ignoreStory,
  updateStatus,
} from "@/src/services/news.service";
import EditStoryModal from "../components/EditStoryModal";

export default function CoveragePage() {
  const router = useRouter();

  const [stories, setStories] = useState<any[]>([]);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [active, setActive] = useState("active");
  const [status, setStatus] = useState("upcoming");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadStories();
  }, [status]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await getCoverage(status);

      const formatted = data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.summary || "",
        content: item.content || "",
        source: item.source,
        time: new Date(item.createdAt).toLocaleDateString(),
        tag: "breaking",
        raw: item,
      }));

      setStories(formatted);
    } catch (err) {
      console.error("Coverage fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(stories.length / perPage);
  const paginatedStories = stories.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="flex justify-between items-center border-b p-4 bg-[#F6F6F6] border-[#E7E7E7]">
        <h1 className="text-3xl font-semibold mb-2">Coverage</h1>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 border rounded-md cursor-pointer"
            onClick={() => router.push("/admin/articles/user-box")}
          >
            Open User Box
          </button>

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
        <StatusTabs status={status} setStatus={setStatus} />
        
        {/* ACTIVE INACTIVE */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
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
              className="border rounded border-[#E7E7E7] px-4 py-2 w-64"
            />
            <select className="border px-3 py-2 rounded border-[#E7E7E7]">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button className="border px-4 py-2 rounded border-[#E7E7E7]">
              Filter
            </button>
            <button
              onClick={() => setView(view === "grid" ? "table" : "grid")}
              className="border px-4 py-3 rounded border-[#E7E7E7]"
            >
              <LuGrid2X2 />
            </button>
          </div>
        </div>

        {/* VIEW SWITCH */}
        {loading ? (
          <GridSkeleton />
        ) : view === "grid" ? (
          <GridView
            stories={paginatedStories}
            reload={loadStories}
            status={status}
          />
        ) : (
          <TableView
            stories={paginatedStories}
            reload={loadStories}
            status={status}
          />
        )}
        
        <StoryPreviewDrawer />
        <AssignStoryModal reload={loadStories} />
        <EditStoryModal reload={loadStories} />
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

// Tag Component
function Tag({ type }: { type: string }) {
  const styles: any = {
    featured: "bg-[#1ABCFE21] text-[#1791C3] font-semibold",
    breaking: "bg-[#FFE2E0] text-[#B3261E] font-semibold",
    update: "bg-[#A259FF21] text-[#A259FF] font-semibold",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-xl ${styles[type] || styles.breaking}`}>
      {type}
    </span>
  );
}

// Grid View
function GridView({ stories, reload, status }: any) {
  const { handlePreview, handleAssign, handleIgnore, moveStatus, handleEdit } =
    useStoryActions(reload);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story: any) => (
        <div
          key={story.id}
          className="bg-white border border-[#E2E8F0] p-4 rounded-xl flex flex-col justify-between min-h-[200px] hover:shadow-md transition"
        >
          {/* Clickable preview area */}
          <div 
            className="cursor-pointer"
            onClick={() => handlePreview(story)}
          >
            <Tag type={story.tag} />
            <h3 className="mt-3 text-[18px] font-semibold text-[#212121] line-clamp-2 break-words">
              {story.title}
            </h3>
            <p className="text-sm text-[#6D6D6D] mt-2 line-clamp-2 break-words">
              {story.description || "No Summary"}
            </p>
            <div className="text-xs mt-3 flex gap-2">
              <span className="text-[#0727CC] font-medium border-r pr-2 border-[#E7E7E7]">
                SOURCE: {story.source}
              </span>
              <span className="text-gray-400">{story.time}</span>
            </div>
          </div>

          {/* Button container */}
          <div 
            className="flex justify-end gap-3 mt-4 text-sm border-t pt-3 border-[#E7E7E7]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* EDIT BUTTON - Always visible */}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleEdit(story);
              }}
            >
              Edit
            </button>

            {/* Status based buttons */}
            {status === "upcoming" && (
              <>
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleIgnore(e, story);
                  }}
                >
                  Ignore
                </button>
                {/* <button
                  type="button"
                  className="border px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAssign(e, story);
                  }}
                >
                  Assign
                </button> */}
                 <button
    type="button"
    className="border px-3 py-1 rounded bg-green-100"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      moveStatus(e, story, "published");
    }}
  >
    Publish
  </button>
              </>
            )}

            {status === "assigned" && (
              <button
                type="button"
                className="border px-3 py-1 rounded bg-blue-50"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveStatus(e, story, "desk_review");
                }}
              >
                Desk Review
              </button>
            )}

            {status === "desk_review" && (
              <button
                type="button"
                className="border px-3 py-1 rounded bg-purple-50"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveStatus(e, story, "copy_edit");
                }}
              >
                Copy Edit
              </button>
            )}

            {status === "copy_edit" && (
              <button
                type="button"
                className="border px-3 py-1 rounded bg-green-50"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveStatus(e, story, "ready_to_publish");
                }}
              >
                Ready to Publish
              </button>
            )}

            {status === "ready_to_publish" && (
              <button
                type="button"
                className="border px-3 py-1 rounded bg-green-100"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  moveStatus(e, story, "published");
                }}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Table View
function TableView({ stories, reload }: any) {
  const { handlePreview, handleAssign, handleIgnore, moveStatus, handleEdit } =
    useStoryActions(reload);
    
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
                className="p-3 text-[#212121] font-semibold cursor-pointer"
                onClick={() => handlePreview(story)}
              >
                {story.title}
              </td>

              <td>
                <Tag type={story.tag} />
              </td>

              <td className="text-[#6D6D6D]">Economy</td>
              <td className="text-[#6D6D6D]">Today</td>
              <td className="text-[#6D6D6D]">{story.source}</td>

              <td className="flex gap-2 items-center">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEdit(story);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleIgnore(e, story);
                  }}
                >
                  Ignore
                </button>

                <button
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAssign(e, story);
                  }}
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

// Custom Hook for Actions
function useStoryActions(reload: any) {
  const { openPreview, openAssign, openEdit } = useUIStore();

  const handlePreview = (story: any) => {
    openPreview(story);
  };

  const handleEdit = (story: any) => {
    console.log("✏️ Edit clicked for:", story.title);
    openEdit(story);
  };

  const handleAssign = (e: React.MouseEvent<HTMLButtonElement>, story: any) => {
    e.stopPropagation();
    e.preventDefault();
    openAssign(story);
  };

  const handleIgnore = async (
    e: React.MouseEvent<HTMLButtonElement>,
    story: any,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await ignoreStory(story.id);
      reload();
    } catch (err) {
      console.error("Ignore error", err);
    }
  };

  const moveStatus = async (
    e: React.MouseEvent<HTMLButtonElement>,
    story: any,
    nextStatus: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await updateStatus(story.id, nextStatus);
      reload();
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  return {
    handlePreview,
    handleAssign,
    handleIgnore,
    moveStatus,
    handleEdit,
  };
}

// Loading Skeleton
function GridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-[#E2E8F0] p-4 rounded-xl animate-pulse"
        >
          <div className="w-16 h-5 bg-gray-200 rounded mb-3"></div>
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="flex justify-between mt-4">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}