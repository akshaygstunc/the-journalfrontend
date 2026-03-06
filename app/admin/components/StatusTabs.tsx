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
    <div className="flex flex-wrap gap-6 border-b-2 border-[#E7E7E7] pt-3 text-sm">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`${
            i === 0
              ? "text-[#861212] border-b-3 border-[#861212] font-bold"
              : "text-[#6D6D6D] border-b-3 border-[#E7E7E7]"
          } pb-2 px-4 cursor-pointer`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
