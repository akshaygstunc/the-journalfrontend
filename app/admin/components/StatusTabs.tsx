"use client";

const tabs = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Assigned", value: "assigned" },
  { label: "Field", value: "field" },
  { label: "Desk Review", value: "desk_review" },
  { label: "Digital Edit", value: "digital_edit" },
  { label: "Copy Edit", value: "copy_edit" },
  { label: "Ready to Publish", value: "ready_to_publish" },
];

export default function StatusTabs({ status, setStatus }: any) {
  return (
    <div className="flex flex-wrap gap-6 border-b-2 border-[#E7E7E7] pt-3 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setStatus(tab.value)}
          className={`pb-2 px-4 cursor-pointer ${
            status === tab.value
              ? "text-[#861212] border-b-3 border-[#861212] font-bold"
              : "text-[#6D6D6D] border-b-3 border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}