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
      <div className="flex gap-2 text-[#6D6D6D]">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`border px-3 py-1 rounded ${
              page === i + 1 ? "bg-gray-100" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center text-[#6D6D6D]">
        <span>Results per page:</span>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border px-3 py-1 rounded border-[#E7E7E7]"
        >
          <option value={9}>10</option>
          <option value={18}>20</option>
        </select>
      </div>
    </div>
  );
}
