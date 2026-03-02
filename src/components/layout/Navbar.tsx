"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaSearch } from "react-icons/fa";
import day from "./../../../public/Day.png";
import { useState } from "react";

export default function Navbar() {
  const topics = [
  "Foreign Affairs",
  "Military Affairs",
  "Political Parties",
  "Ministry & Governance",
];

const [showTopics, setShowTopics] = useState(false);
const [selectedTopics, setSelectedTopics] = useState(["Foreign Affairs"]);
  const categories = [
    "World",
    "Politics",
    "Business",
    "Technology",
    "Sports",
    "Health",
    "Travel",
    "Magazine",
    "Opinion",
    "Art",
    "Style",
  ];

  const [activeCategory, setActiveCategory] = useState("Politics");
  const toggleTopic = (topic) => {
  setSelectedTopics((prev) =>
    prev.includes(topic)
      ? prev.filter((t) => t !== topic)
      : [...prev, topic]
  );
};

const clearAll = () => setSelectedTopics([]);
  return (
    <div className="border-b border-[#E7E7E7]">
      <div className="w-full mx-auto px-6">
        {/* Top line */}
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-4">
            <button className="text-xl">☰</button>
            <div className="flex gap-2 items-center border border-[#D1D1D1] rounded-md px-4 py-2 ">
              <FaSearch />
              <input
                placeholder="Search"
                className="w-16 border-none text-sm placeholder-[#212121]"
              />
            </div>
          </div>

          <h1 className="font-body font-bold text-[40px] text-[#861212] text-action tracking-wide">
            THE JOURNAL
          </h1>

          <div className="flex gap-3">
            <button className="border border-[#861212] bg-action text-[#861212] px-4 py-1 rounded-md text-buttonM font-button cursor-pointer">
              Login
            </button>
            <button className="bg-[#861212] text-white px-4 py-1 rounded-md text-buttonM font-button cursor-pointer">
              SignUp
            </button>
          </div>
        </div>

        {/* ROW 1: Date + Categories */}
        <div className="w-full flex justify-between items-center px-6 text-body border-y border-[#E7E7E7]">
          {/* Date */}
          <div className="flex items-center gap-2 text-label">
            <span>
              <Image src={day} alt="weather" />
            </span>
            <span className="font-body font-medium py-2 pr-4 ">
              <strong>Saturday,</strong> <br /> February 7, 2026
            </span>
          </div>
          <div className="w-0.5 border-l-[2.5px] border-[#D1D1D1] h-[50px]"></div>
          {/* Categories */}
          <nav className="w-[80%] flex justify-between">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`font-body pb-1 transition-colors duration-200
                  ${
                    cat === activeCategory
                      ? "text-[#861212] border-b-2 border-[#861212]"
                      : "text-[#6D6D6D] hover:text-[#861212]"
                  }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>

        {/* ROW 2: Sub navigation */}
        <div className="flex justify-center gap-10 p-4 text-body">
          <span className="font-semibold cursor-pointer hover:text-action">
            Latest
          </span>
          <span className="font-semibold cursor-pointer hover:text-action">
            Most Read
          </span>
          <span className="font-semibold cursor-pointer hover:text-action">
            Most Shared
          </span>
          <span className="font-semibold cursor-pointer flex items-center gap-1 hover:text-action">
            <div className="relative">
  <span
    onClick={() => setShowTopics(!showTopics)}
    className="font-semibold cursor-pointer flex items-center gap-1 hover:text-[#861212]"
  >
    Explore Topic <span className="text-xs">▾</span>
  </span>

  {showTopics && (
    <div className="absolute top-10 right-0 w-[280px] bg-white border border-[#E7E7E7] rounded-md shadow-lg p-4 z-50">
      <p className="text-xs text-[#6D6D6D] mb-3 uppercase">
        Explore by
      </p>

      {/* Topics */}
      <div className="space-y-3">
        {topics.map((topic) => {
          const active = selectedTopics.includes(topic);

          return (
            <div
              key={topic}
              onClick={() => toggleTopic(topic)}
              className="flex items-center gap-3 cursor-pointer"
            >
              {active ? (
                <FaCheckSquare className="text-[#861212] text-lg" />
              ) : (
                <div className="w-4 h-4 border border-[#D1D1D1] rounded-sm" />
              )}
              <span className="text-sm text-[#212121]">
                {topic}
              </span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={clearAll}
          className="text-[#861212] text-sm font-medium"
        >
          Clear All
        </button>

        <button
          onClick={() => setShowTopics(false)}
          className="bg-[#861212] text-white px-4 py-1 rounded-md text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>
          </span>
        </div>
      </div>
    </div>
  );
}
