"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
const wires = [
  {
    id: 1,
    title: "Heavy Rains Causes Flooding in Mumbai",
    tag: "Featured",
    source: "Reuters",
    beat: "Weather",
    time: "3M AGO",
    createdAt: 3,
  },
  {
    id: 2,
    title: "Cyclone Alert Issued in Coastal Areas",
    tag: "Breaking",
    source: "Reuters",
    beat: "Weather",
    time: "10M AGO",
    createdAt: 10,
  },
  {
    id: 3,
    title: "Stock Market Shows Recovery",
    tag: "Update",
    source: "Bloomberg",
    beat: "Economy",
    time: "1H AGO",
    createdAt: 60,
  },
];

const reporters = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: "Oliver Doe (Morning)",
  role: "Journalist",
  beats: "Politics • Economy",
  location: "NAVI MUMBAI",
  onsite: i === 0,
  workload: i === 0 ? 70 : 30,
  activeStories: "1/4 Active Stories",
  available: i !== 0,
}));

export default function Page() {
  const [selected, setSelected] = useState<number[]>([]);
  const [shift, setShift] = useState("Morning Shift");
  const router = useRouter();

  const [sort, setSort] = useState("Newest");
  const [tagFilter, setTagFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [beatFilter, setBeatFilter] = useState("All");
  const [searchReporter, setSearchReporter] = useState("");
  const toggleWire = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((w) => w !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleDragEnd = (event: any) => {
    const reporterId = event.over?.id;

    if (!reporterId) return;

    alert(`${selected.length} wires assigned to reporter ${reporterId}`);

    setSelected([]);
  };
  let filteredWires = [...wires];

  if (tagFilter !== "All") {
    filteredWires = filteredWires.filter((w) => w.tag === tagFilter);
  }

  if (sourceFilter !== "All") {
    filteredWires = filteredWires.filter((w) => w.source === sourceFilter);
  }

  if (beatFilter !== "All") {
    filteredWires = filteredWires.filter((w) => w.beat === beatFilter);
  }

  if (sort === "Newest") {
    filteredWires.sort((a, b) => a.createdAt - b.createdAt);
  }

  if (sort === "Oldest") {
    filteredWires.sort((a, b) => b.createdAt - a.createdAt);
  }

  const filteredReporters = reporters.filter((rep) =>
    rep.name.toLowerCase().includes(searchReporter.toLowerCase()),
  );
  reporters;
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-[#F6F6F6] w-[1100px] h-[720px] rounded-lg shadow-xl p-6">
          {/* HEADER */}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">User Box</h1>

            <button className="border border-[#E7E7E7] px-4 py-2 rounded text-sm" onClick={() => router.back()}>
              ← Return to Wire Feed
            </button>
          </div>

          {/* BODY */}

          <div className="grid grid-cols-3 gap-6 h-full">
            {/* WIRES */}

            <div className="col-span-2">
              {/* FILTERS */}

              <div className="flex gap-3 mb-4 text-sm">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>

                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                >
                  <option>All</option>
                  <option>Featured</option>
                  <option>Breaking</option>
                  <option>Update</option>
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                >
                  <option>All</option>
                  <option>Reuters</option>
                  <option>Bloomberg</option>
                </select>

                <select
                  value={beatFilter}
                  onChange={(e) => setBeatFilter(e.target.value)}
                  className="border border-[#E7E7E7] px-3 py-1 rounded"
                >
                  <option>All</option>
                  <option>Weather</option>
                  <option>Economy</option>
                </select>

                {selected.length > 0 && (
                  <button className="ml-auto bg-[#861212] text-white px-4 py-1 rounded">
                    Create Package
                  </button>
                )}
              </div>

              {/* WIRES LIST */}

              <div className="space-y-3 overflow-y-auto h-[600px]">
                {filteredWires.map((wire) => {
                  const checked = selected.includes(wire.id);

                  return (
                    <div
                      key={wire.id}
                      className={`bg-white border rounded-lg p-4 flex items-center justify-between cursor-pointer ${
                        checked ? "border-[#861212]" : "border-[#E7E7E7]"
                      }`}
                      onClick={() => toggleWire(wire.id)}
                      draggable={selected.length > 0}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          // onChange={() => toggleWire(wire.id)}
                        />

                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {wire.tag}
                        </span>

                        <div>
                          <p className="font-medium">{wire.title}</p>
                        </div>
                        {/* DRAG TOOLTIP */}
                      </div>

                      <div className="text-xs text-gray-500 flex gap-3">
                        <span>
                          SOURCE:{" "}
                          <span className="text-blue-600">{wire.source}</span>
                        </span>

                        <span>{wire.beat}</span>

                        <span>{wire.time}</span>
                      </div>
                      {checked && selected.length > 0 && (
                        <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
                          {selected.length} Wires — Drop on reporter
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REPORTERS PANEL */}

            <div className="bg-white border border-[#E7E7E7] rounded-lg p-4 overflow-y-auto">
              {/* SHIFT */}

              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="border border-[#E7E7E7] rounded px-3 py-2 w-full mb-3"
              >
                <option>Morning Shift</option>
                <option>Evening Shift</option>
                <option>Night Shift</option>
              </select>

              {/* SEARCH */}

              <input
                placeholder="Search Reporter"
                value={searchReporter}
                onChange={(e) => setSearchReporter(e.target.value)}
                className="border border-[#E7E7E7] rounded px-3 py-2 w-full mb-4"
              />

              {/* REPORTER LIST */}

              <div className="space-y-4">
                {filteredReporters.map((rep) => (
                  <div key={rep.id}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img
                          src="https://i.pravatar.cc/40"
                          className="w-8 h-8 rounded-full"
                        />

                        <div>
                          <p className="text-sm font-medium">{rep.name}</p>

                          <p className="text-xs text-gray-500">{rep.role}</p>

                          <p className="text-xs text-gray-400">{rep.beats}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">{rep.location}</p>

                        {rep.available ? (
                          <span className="text-xs text-green-600">
                            Available
                          </span>
                        ) : (
                          <span className="text-xs text-red-500">Onsite</span>
                        )}
                      </div>
                    </div>

                    {/* WORKLOAD BAR */}

                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded h-1.5">
                        <div
                          style={{ width: `${rep.workload}%` }}
                          className={`h-1.5 rounded ${
                            rep.workload > 50 ? "bg-red-500" : "bg-green-500"
                          }`}
                        />
                      </div>

                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {rep.activeStories}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
