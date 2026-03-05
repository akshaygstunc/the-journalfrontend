"use client";
import React from "react";
import { useState } from "react";
import { LuGrid2X2 } from "react-icons/lu";

const stories = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: "Heavy Rains Causes Flooding in Mumbai",
  description: "Flooding reported in mumbai and expected to worsen even more",
  source: "Reuters",
  time: "3M AGO",
  tag: ["featured", "breaking", "update"][i % 3],
}));

export default function page() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [active, setActive] = useState("active");

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#212121]">Coverage</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-md">Open User Box</button>

          <button className="px-4 py-2 bg-red-700 text-white rounded-md">
            + Create Story
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b pb-3 mb-4 text-sm">
        {[
          "Upcoming",
          "Assigned",
          "Field",
          "Desk Review",
          "Digital Edit",
          "Copy Edit",
          "Ready to Publish",
        ].map((tab, i) => (
          <button
            key={i}
            className={`pb-2 ${
              i === 0
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ACTIVE INACTIVE */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>

        <button
          onClick={() => setActive("active")}
          className={`px-4 py-1 rounded ${
            active === "active" ? "bg-white border border-[#E5E5E5]" : "text-gray-500 border-none"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setActive("inactive")}
          className={`px-4 py-1 rounded ${
            active === "inactive" ?  "bg-white border border-[#E5E5E5]" : "text-gray-500 border-none"
          }`}
        >
          Inactive
        </button>
        </div>

        <div className="flex gap-3 items-center">
          <span>Sort By</span>
          <input
            placeholder="Search here..."
            className="border border-[#E2E8F0] rounded-md px-4 py-2 w-64"
          />
          <select className="border px-3 py-2 rounded-md">
            <option>Newest</option>
            <option>Oldest</option>
          </select>

          <button className="border px-4 py-2 rounded-md">Filter</button>

          <button
            onClick={() => setView(view === "grid" ? "table" : "grid")}
            className="border px-4 py-2 rounded-md"
          >
            <LuGrid2X2 />
          </button>
        </div>
      </div>

      {/* VIEW SWITCH */}
      {view === "grid" ? (
        <GridView stories={stories} />
      ) : (
        <TableView stories={stories} />
      )}

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-8 text-sm">
        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded">1</button>
          <button className="border px-3 py-1 rounded">2</button>
          <button className="border px-3 py-1 rounded">3</button>
          <button className="border px-3 py-1 rounded">...</button>
          <button className="border px-3 py-1 rounded">10</button>
        </div>

        <div className="flex gap-3 items-center">
          <span>Results per page:</span>
          <select className="border rounded px-2 py-1">
            <option>10</option>
            <option>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Tag({ type }: { type: string }) {
  const styles: any = {
    featured: "bg-[#1ABCFE21] text-[#1791C3]",
    breaking: "bg-[#FFE2E0] text-[#B3261E]",
    update: "bg-[#A259FF21] text-[#A259FF]",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles[type]}`}>{type}</span>
  );
}

function GridView({ stories }: any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stories.map((story: any) => (
        <div
          key={story.id}
          className="bg-white border border-[#E2E8F0] p-4 rounded-lg"
        >
          <Tag type={story.tag} />

          <h3 className="mt-3 font-semibold text-[#212121]">{story.title}</h3>

          <p className="text-sm text-[#6D6D6D] mt-2">{story.description}</p>

          <div className="text-xs mt-3 flex gap-2">
            <span className="text-[#0727CC] font-medium">
              SOURCE: {story.source}
            </span>

            <span className="text-gray-400">{story.time}</span>
          </div>

          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button className="text-gray-500">Ignore</button>

            <button className="border px-3 py-1 rounded-md">Assign</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableView({ stories }: any) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Wire Title</th>
            <th>Type</th>
            <th>Beat</th>
            <th>Deadline</th>
            <th>Source</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {stories.map((story: any) => (
            <tr key={story.id} className="border-t">
              <td className="p-3 text-[#212121]">{story.title}</td>

              <td>
                <Tag type={story.tag} />
              </td>

              <td className="text-[#6D6D6D]">Economy</td>

              <td className="text-[#6D6D6D]">Today</td>

              <td className="text-[#6D6D6D]">Reuters News Wire</td>

              <td>
                <button className="border px-3 py-1 rounded">Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
