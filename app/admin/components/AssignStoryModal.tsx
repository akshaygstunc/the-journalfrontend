"use client";

import { useUIStore } from "../lib/store/uiStore";


export default function AssignStoryModal() {
  const { assignOpen, closeAssign } = useUIStore();

  if (!assignOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">
          Assign Story
        </h2>

        <select className="w-full border rounded px-3 py-2 mb-4">
          <option>Select Reporter</option>
          <option>Oliver Queen</option>
          <option>Isabelle Conklin</option>
        </select>

        <select className="w-full border rounded px-3 py-2 mb-6">
          <option>Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div className="flex justify-end gap-4">
          <button onClick={closeAssign}>
            Cancel
          </button>

          <button className="bg-[#861212] text-white px-5 py-2 rounded">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}