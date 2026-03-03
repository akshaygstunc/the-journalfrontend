"use client";

import { useState } from "react";

export default function ImageGrid() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((img) => (
          <div
            key={img}
            onClick={() => toggle(img)}
            className={`relative border rounded cursor-pointer ${
              selected.includes(img)
                ? "ring-2 ring-[#861212]"
                : ""
            }`}
          >
            <img
              src="/placeholder.jpg"
              className="w-full h-32 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex gap-4 text-sm">
          <span>{selected.length} images selected</span>
          <button>Add Caption</button>
          <button>Give Credit</button>
          <button className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
}