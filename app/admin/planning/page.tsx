"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const planningData = [
  {
    id: "1",
    title: "World Cup Roundup",
    date: "2026-03-03",
    category: "Sports",
    reporter: "Jessica",
    status: "scheduled",
  },
  {
    id: "2",
    title: "G20 Sherpa Talks",
    date: "2026-03-04",
    category: "Politics",
    reporter: "Oliver",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Budget Planning Meeting",
    date: "2026-03-05",
    category: "Economy",
    reporter: "Marcus",
    status: "recurring",
  },
  {
    id: "4",
    title: "Election Pitch",
    date: "2026-03-06",
    category: "Politics",
    reporter: "Oliver",
    status: "pitch",
  },
];

export default function Page() {

  const [tab, setTab] = useState("scheduled");
  const [view, setView] = useState("dayGridMonth");
  const [search, setSearch] = useState("");

  /* FILTER DATA BY TAB */

  const filteredEvents = planningData.filter((event) => {

    if (tab === "scheduled") return event.status === "scheduled";
    if (tab === "recurring") return event.status === "recurring";
    if (tab === "pitches") return event.status === "pitch";
    if (tab === "unscheduled") return !event.date;
    if (tab === "overview") return true;

    return true;

  }).filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  /* EVENT CARD DESIGN */

  const renderEvent = (info: any) => {

    const category = info.event.extendedProps.category;
    const reporter = info.event.extendedProps.reporter;

    const borderColor =
      category === "Sports"
        ? "#F97316"
        : category === "Politics"
        ? "#22C55E"
        : "#6366F1";

    return (

      <div
        className="p-2 text-xs rounded"
        style={{
          background: "#F5F5F5",
          borderLeft: `3px solid ${borderColor}`,
        }}
      >
        <div className="font-medium">{category}</div>
        <div>{info.event.title}</div>
        <div className="text-gray-500">{reporter} +2</div>
      </div>

    );
  };

  return (

    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Planning
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E7E7E7] rounded px-4 py-2"
          />

          <button className="bg-[#861212] text-white px-4 py-2 rounded">
            + Create Planning
          </button>

        </div>

      </div>

      {/* TABS */}

      <div className="flex gap-6 border-b border-[#E7E7E7] mb-6 text-sm">

        {[
          "overview",
          "unscheduled",
          "scheduled",
          "recurring",
          "pitches",
        ].map((t) => (

          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 capitalize ${
              tab === t
                ? "border-b-2 border-[#861212] text-[#861212]"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>

        ))}

      </div>

      {/* CALENDAR CONTROLS */}

      <div className="flex justify-between items-center mb-4">

        <div className="flex gap-2">

          <button
            onClick={() => setView("dayGridMonth")}
            className="border border-[#E7E7E7] px-3 py-1 rounded"
          >
            Month
          </button>

          <button
            onClick={() => setView("timeGridWeek")}
            className="border border-[#E7E7E7] px-3 py-1 rounded"
          >
            Week
          </button>

          <button
            onClick={() => setView("timeGridDay")}
            className="border border-[#E7E7E7] px-3 py-1 rounded"
          >
            Day
          </button>

          <button
            onClick={() => setView("listWeek")}
            className="border border-[#E7E7E7] px-3 py-1 rounded"
          >
            List
          </button>

        </div>

        <button className="border border-[#E7E7E7] px-4 py-1 rounded text-sm">
          Filter
        </button>

      </div>

      {/* CALENDAR */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg p-4">

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView={view}
          headerToolbar={false}
          events={filteredEvents}
          eventContent={renderEvent}
          editable
          selectable
          height="650px"
        />

      </div>

    </div>

  );
}