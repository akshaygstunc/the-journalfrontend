export default function Pagination() {
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex gap-2">
        {[1,2,3,4].map(p => (
          <button key={p} className="border px-3 py-1 rounded">
            {p}
          </button>
        ))}
      </div>

      <select className="border px-3 py-1 rounded">
        <option>10</option>
        <option>20</option>
      </select>
    </div>
  );
}