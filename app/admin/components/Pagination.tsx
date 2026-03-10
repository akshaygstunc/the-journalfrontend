"use client";

import { useState } from "react";

export default function Pagination({
  page,
  setPage,
  totalPages,
  perPage,
  setPerPage,
}: any) {
  const [goPage, setGoPage] = useState("");
const maxVisible = 5;

let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
let endPage = startPage + maxVisible - 1;

if (endPage > totalPages) {
  endPage = totalPages;
  startPage = Math.max(1, endPage - maxVisible + 1);
}

const pages = [];
for (let i = startPage; i <= endPage; i++) {
  pages.push(i);
}
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handleGo = () => {
    const p = Number(goPage);
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };
  return (
    <div className="flex justify-between items-center mt-8">

      {/* LEFT SIDE */}
      <div className="flex gap-2 items-center text-[#6D6D6D]">

        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="border px-3 py-1 rounded border-[#E7E7E7] disabled:opacity-40"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`border px-3 py-1 rounded border-[#E7E7E7] ${
              page === p ? "bg-gray-100 font-bold border-gray" : ""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="border px-3 py-1 rounded border-[#E7E7E7] disabled:opacity-40"
        >
          ›
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 items-center text-[#6D6D6D]">

        <div className="flex items-center gap-2">
          <span>Go to page:</span>

          <input
            type="number"
            min={1}
            max={totalPages}
            value={goPage}
            onChange={(e) => setGoPage(e.target.value)}
            className="border px-2 py-1 rounded w-16 border-[#E7E7E7]"
          />

          <button onClick={handleGo} className="border px-3 py-1 rounded border-[#E7E7E7]">
            Go
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Results per page:</span>

          <select
            value={perPage}
             onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1); // reset to first page
            }}
            className="border px-3 py-1 rounded border-[#E7E7E7]"
          >
            <option value={9}>10</option>
            <option value={18}>20</option>
            <option value={27}>30</option>
          </select>
        </div>

      </div>
    </div>
  );
}