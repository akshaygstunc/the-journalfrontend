// "use client";

"use client";

import { useState } from "react";
import { useUIStore } from "../lib/store/uiStore";
import ReporterSelect from "./ReporterSelect";


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
export default function AssignStoryModal() {
  const { assignOpen, closeAssign, selectedStory } = useUIStore();
const [selectedReporter, setSelectedReporter] = useState(reporters[0]);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[520px] bg-white shadow-xl z-50 transition-transform duration-300 ${
        assignOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-[#E7E7E7] p-4">
          <div>
            <h2 className="font-semibold text-lg">ASSIGN STORY</h2>

            <p className="text-xs text-gray-500">
              {selectedStory?.title} · {selectedStory?.source} · {selectedStory?.time}
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
              <button className="px-4 py-1 rounded-full bg-black text-white text-sm">
                High
              </button>

              <button className="px-4 py-1 rounded-full border text-sm">
                Medium
              </button>

              <button className="px-4 py-1 rounded-full border text-sm">
                Low
              </button>
            </div>
          </div>

          {/* ONSITE REPORTING */}
          <div>
            <label className="text-sm font-medium">Onsite Reporting</label>

            <div className="flex gap-6 mt-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="onsite" />
                Not Required
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="onsite" defaultChecked />
                Required
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="onsite" />
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
            {/* <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2">
              <option>Oliver Doe (Economy)</option>
              <option>Marcus Fischer (Economy)</option>
            </select> */}
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

              <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2">
                <option>Breaking</option>
                <option>Feature</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Beat</label>

              <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2">
                <option>Weather</option>
                <option>Economy</option>
              </select>
            </div>
          </div>

          {/* COVERAGE AREA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Coverage Area</label>

              <input
                placeholder="Navi Mumbai"
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deadline</label>

              <input
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
              rows={4}
              className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-2"
              placeholder="Add instructions..."
            />
          </div>

          {/* EXPECTED OUTCOME */}
          <div>
            <label className="text-sm font-medium">Expected Outcome</label>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <label className="flex items-center gap-2 border p-2 rounded">
                <input type="checkbox" defaultChecked />
                Text Story
              </label>

              <label className="flex items-center gap-2 border p-2 rounded">
                <input type="checkbox" defaultChecked />
                Photos
              </label>

              <label className="flex items-center gap-2 border p-2 rounded">
                <input type="checkbox" />
                Video
              </label>

              <label className="flex items-center gap-2 border p-2 rounded">
                <input type="checkbox" />
                Live Updates
              </label>

              <label className="flex items-center gap-2 border p-2 rounded">
                <input type="checkbox" defaultChecked />
                Quote Confirmation
              </label>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 border-t border-[#E7E7E7] p-4">
          <button onClick={closeAssign}>Cancel</button>

          <button className="bg-[#861212] text-white px-5 py-2 rounded">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

// import { useUIStore } from "../lib/store/uiStore";


// export default function AssignStoryModal() {
//   const { assignOpen, closeAssign } = useUIStore();

//   if (!assignOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6">
//         <h2 className="font-semibold text-lg mb-4">
//           Assign Story
//         </h2>

//         <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mb-4">
//           <option>Select Reporter</option>
//           <option>Oliver Queen</option>
//           <option>Isabelle Conklin</option>
//         </select>

//         <select className="w-full border border-[#E7E7E7] rounded px-3 py-2 mb-6">
//           <option>Priority</option>
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </select>

//         <div className="flex justify-end gap-4">
//           <button onClick={closeAssign}>
//             Cancel
//           </button>

//           <button className="bg-[#861212] text-white px-5 py-2 rounded">
//             Assign
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }