// export default function Pagination({
//   page,
//   setPage,
//   totalPages,
//   perPage,
//   setPerPage,
// }: any) {
//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   return (
//     <div className="flex justify-between items-center mt-8">
//       <div className="flex gap-2 text-[#6D6D6D]">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`border px-3 py-1 rounded ${
//               page === i + 1 ? "bg-gray-100" : ""
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <div className="flex gap-2 items-center text-[#6D6D6D]">
//         <span>Results per page:</span>
//         <select
//           value={perPage}
//           onChange={(e) => setPerPage(Number(e.target.value))}
//           className="border px-3 py-1 rounded border-[#E7E7E7]"
//         >
//           <option value={9}>10</option>
//           <option value={18}>20</option>
//         </select>
//       </div>
//     </div>
//   );
// }
"use client";

export default function Pagination({
  page,
  setPage,
  totalPages,
  perPage,
  setPerPage,
}: any) {

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-8">

      {/* LEFT SIDE */}
      <div className="flex gap-2 items-center text-[#6D6D6D]">

        <button
          onClick={handlePrev}
          className="border px-3 py-1 rounded border-[#E7E7E7]"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`border px-3 py-1 rounded border-[#E7E7E7] ${
              page === p ? "bg-gray-100" : ""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={handleNext}
          className="border px-3 py-1 rounded border-[#E7E7E7]"
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
            onChange={(e) => setPage(Number(e.target.value))}
            className="border px-2 py-1 rounded w-16 border-[#E7E7E7]"
          />

          <button className="border px-3 py-1 rounded border-[#E7E7E7]">
            Go
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Results per page:</span>

          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
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