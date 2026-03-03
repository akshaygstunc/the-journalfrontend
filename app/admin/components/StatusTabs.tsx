"use client";

const tabs = [
  "Upcoming",
  "Assigned",
  "Field",
  "Desk Review",
  "Digital Edit",
  "Copy Edit",
  "Ready to Publish",
];

export default function StatusTabs() {
  return (
    <div className="flex flex-wrap gap-6 border-b pb-3 text-sm">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`${
            i === 0
              ? "text-[#861212] border-b-2 border-[#861212]"
              : "text-gray-500"
          } pb-2`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}