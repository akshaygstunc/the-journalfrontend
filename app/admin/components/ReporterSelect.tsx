"use client";

import { useState } from "react";

export default function ReporterSelect({ reporters, selected, setSelected }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      
      {/* SELECT BOX */}
      <div
        className="w-full border border-[#E7E7E7] rounded px-3 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <img
            src={selected?.avatar}
            className="w-7 h-7 rounded-full"
          />

          <span className="text-sm">
            {selected?.name} ({selected?.beat})
          </span>
        </div>

        <span>⌄</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-[#E7E7E7] rounded shadow-lg z-50">

          {reporters.map((rep: any) => (
            <div
              key={rep.id}
              onClick={() => {
                setSelected(rep);
                setOpen(false);
              }}
              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
            >
              
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={selected?.id === rep.id}
                  readOnly
                />

                <img
                  src={rep.avatar}
                  className="w-9 h-9 rounded-full"
                />

                <div className="text-sm">
                  <p className="font-medium">{rep.name}</p>

                  <p className="text-xs text-gray-500">
                    {rep.location} • {rep.beat} • {rep.stories}
                  </p>
                </div>

              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  rep.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {rep.status}
              </span>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}