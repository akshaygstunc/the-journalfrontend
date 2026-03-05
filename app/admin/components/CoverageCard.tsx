export default function CoverageCard() {
  return (
    <div className="flex gap-3 items-center">
      <select className="border rounded px-3 py-2">
        <option>Source</option>
        <option>Reuters</option>
        <option>AP</option>
      </select>

      <select className="border rounded px-3 py-2">
        <option>Beat</option>
        <option>Politics</option>
        <option>Economy</option>
      </select>

      <select className="border rounded px-3 py-2">
        <option>Priority</option>
        <option>High</option>
        <option>Low</option>
      </select>
    </div>
  );
}