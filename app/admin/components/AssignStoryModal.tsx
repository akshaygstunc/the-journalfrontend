"use client";

import { useState } from "react";
import { useUIStore } from "../lib/store/uiStore";
import ReporterSelect from "./ReporterSelect";
import { createStory } from "@/src/services/story.service";

const reporters = [
  {
    id: 1,
    name: "Oliver Doe",
    location: "NAVI MUMBAI",
    beat: "ECONOMY",
    stories: "ACTIVE STORIES",
    status: "Available",
    avatar: "/avatar.png",
  },
  {
    id: 2,
    name: "Oliver Doe",
    location: "NAVI MUMBAI",
    beat: "ECONOMY",
    stories: "ACTIVE STORIES",
    status: "Available",
    avatar: "/avatar.png",
  },
  {
    id: 3,
    name: "Isabelle Conklin",
    location: "ANDHERI",
    beat: "ECONOMY",
    stories: "3 ACTIVE STORIES",
    status: "Busy",
    avatar: "/avatar.png",
  },
];

export default function AssignStoryModal({ reload }: any) {
  const { assignOpen, closeAssign, selectedStory } = useUIStore();

  const [selectedReporter, setSelectedReporter] = useState(reporters[0]);

  const [priority, setPriority] = useState("high");
  const [onsiteReporting, setOnsiteReporting] = useState("required");
  const [storyType, setStoryType] = useState("breaking");
  const [beat, setBeat] = useState("economy");
  const [coverageArea, setCoverageArea] = useState("");
  const [deadline, setDeadline] = useState("");
  const [instructions, setInstructions] = useState("");

  const [expectedOutcome, setExpectedOutcome] = useState([
    "Text Story",
    "Photos",
  ]);

  const toggleOutcome = (item: string) => {
    if (expectedOutcome.includes(item)) {
      setExpectedOutcome(expectedOutcome.filter((i) => i !== item));
    } else {
      setExpectedOutcome([...expectedOutcome, item]);
    }
  };

const handleAssign = async () => {
  try {

    const payload = {
      newsId: selectedStory?.id,
      title: selectedStory?.title,
      source: selectedStory?.source,
      reporter: selectedReporter.name,
      backupReporter: "",
      priority,
      onsiteReporting,
      storyType,
      beat,
      coverageArea: coverageArea || selectedReporter.location,
      instructions,
      expectedOutcome,
      deadline: deadline ? new Date(deadline) : null
    };

    await createStory(payload);

    reload(); // ✅ THIS REFRESHES COVERAGE LIST

    closeAssign();

  } catch (err) {
    console.error("Assign Story Error", err);
  }
};
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[520px] bg-white shadow-xl z-50 transition-transform duration-300 ${
        assignOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {" "}
      <div className="h-full overflow-y-auto">
        ```
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-[#E7E7E7] p-4">
          <div>
            <h2 className="font-semibold text-lg">ASSIGN STORY</h2>

            <p className="text-xs text-gray-500">
              {selectedStory?.title} · {selectedStory?.source} ·{" "}
              {selectedStory?.time}
            </p>
          </div>

          <button onClick={closeAssign}>✕</button>
        </div>
        {/* FORM */}
        <div className="p-6 space-y-6">
          {/* PRIORITY */}
          <div>
            <label className="text-sm font-medium">Priority</label>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setPriority("high")}
                className="px-4 py-1 rounded-full bg-black text-white text-sm"
              >
                High
              </button>

              <button
                onClick={() => setPriority("medium")}
                className="px-4 py-1 rounded-full border text-sm"
              >
                Medium
              </button>

              <button
                onClick={() => setPriority("low")}
                className="px-4 py-1 rounded-full border text-sm"
              >
                Low
              </button>
            </div>
          </div>

          {/* ONSITE REPORTING */}
          <div>
            <label className="text-sm font-medium">Onsite Reporting</label>

            <div className="flex gap-6 mt-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onsite"
                  checked={onsiteReporting === "not_required"}
                  onChange={() => setOnsiteReporting("not_required")}
                />
                Not Required
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onsite"
                  checked={onsiteReporting === "required"}
                  onChange={() => setOnsiteReporting("required")}
                />
                Required
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onsite"
                  checked={onsiteReporting === "maybe"}
                  onChange={() => setOnsiteReporting("maybe")}
                />
                Maybe
              </label>
            </div>
          </div>

          {/* REPORTER */}
          <div>
            <label className="text-sm font-medium">Reporter</label>

            <ReporterSelect
              reporters={reporters}
              selected={selectedReporter}
              setSelected={setSelectedReporter}
            />
          </div>

          {/* BACKUP REPORTER */}
          <div>
            <label className="text-sm font-medium">Backup Reporter</label>

            <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2">
              <option>Marcus Fischer (Economy)</option>
            </select>
          </div>

          {/* STORY TITLE */}
          <div>
            <label className="text-sm font-medium">Story Title</label>

            <input
              defaultValue={selectedStory?.title}
              className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
            />
          </div>

          {/* STORY TYPE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Story Type</label>

              <select
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              >
                <option value="breaking">Breaking</option>
                <option value="feature">Feature</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Beat</label>

              <select
                value={beat}
                onChange={(e) => setBeat(e.target.value)}
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              >
                <option value="weather">Weather</option>
                <option value="economy">Economy</option>
              </select>
            </div>
          </div>

          {/* COVERAGE AREA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Coverage Area</label>

              <input
                value={coverageArea}
                onChange={(e) => setCoverageArea(e.target.value)}
                placeholder="Navi Mumbai"
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deadline</label>

              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Today, 12:00 PM"
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              />
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div>
            <label className="text-sm font-medium">
              Instructions (What Should Reporter Do?)
            </label>

            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              placeholder="Add instructions..."
            />
          </div>

          {/* EXPECTED OUTCOME */}
          <div>
            <label className="text-sm font-medium">Expected Outcome</label>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              {[
                "Text Story",
                "Photos",
                "Video",
                "Live Updates",
                "Quote Confirmation",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={expectedOutcome.includes(item)}
                    onChange={() => toggleOutcome(item)}
                  />

                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex justify-end gap-4 border-t border-[#E7E7E7] p-4">
          <button onClick={closeAssign}>Cancel</button>

          <button
            onClick={handleAssign}
            className="bg-[#861212] text-white px-5 py-2 rounded"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
