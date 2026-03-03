"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare, FaSearch } from "react-icons/fa";
import day from "./../../../public/Day.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import { FiGrid, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/article");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real auth later
  const topics = [
    "Foreign Affairs",
    "Military Affairs",
    "Political Parties",
    "Ministry & Governance",
  ];
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
  const [showTopics, setShowTopics] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Politics");
  const [selectedTopics, setSelectedTopics] = useState(["Foreign Affairs"]);
  const [sortBy, setSortBy] = useState("Latest");

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const clearAll = () => {
    setSelectedTopics([]);
    setSortBy("Latest");
  };

  // return (
  //   <div className="border-b border-[#E7E7E7]">
  //     <div className="w-full mx-auto px-6">
  //       {/* Top line */}
  //       <div className="flex items-center justify-between py-4 px-6 md:px-6">
  //         <div className="flex items-center gap-4">
  //           <button
  //             className="text-xl md:hidden"
  //             onClick={() => setMobileMenuOpen(true)}
  //           >
  //             <LuMenu />
  //           </button>
  //           <div className="flex gap-2 items-center border border-[#D1D1D1] rounded-md px-4 py-2 ">
  //             <FaSearch />
  //             <input
  //               placeholder="Search"
  //               className="w-16 border-none text-sm placeholder-[#212121]"
  //             />
  //           </div>
  //         </div>

  //         <h1 className="font-body font-bold text-[40px] md-text-[30px] text-[#861212] text-action tracking-wide">
  //           THE JOURNAL
  //         </h1>

  //         <div className="flex gap-3">
  //           <button className="border border-[#861212] bg-action text-[#861212] px-4 py-1 rounded-md text-buttonM font-button cursor-pointer">
  //             Login
  //           </button>
  //           <button className="bg-[#861212] text-white px-4 py-1 rounded-md text-buttonM font-button cursor-pointer">
  //             SignUp
  //           </button>
  //         </div>
  //       </div>

  //       {/* list bar */}
  //       <div className="hidden md:block">
  //         <>
  //           {/* ROW 1: Date + Categories */}
  //           <div className="w-full flex justify-between items-center px-6 text-body border-y border-[#E7E7E7]">
  //             {/* Date */}
  //             <div className="flex items-center gap-2 text-label">
  //               <span>
  //                 <Image src={day} alt="weather" />
  //               </span>
  //               <span className="font-body font-medium py-2 pr-4 ">
  //                 <strong>Saturday,</strong> <br /> February 7, 2026
  //               </span>
  //             </div>
  //             <div className="w-0.5 border-l-[2.5px] border-[#D1D1D1] h-12.5"></div>
  //             {/* Categories */}
  //             <nav className="w-[80%] flex justify-between">
  //               {categories.map((cat) => (
  //                 <Link
  //                   key={cat}
  //                   href={`/category/${cat.toLowerCase()}`}
  //                   onClick={() => setActiveCategory(cat)}
  //                   className={`font-body pb-1 transition-colors duration-200
  //                 ${
  //                   cat === activeCategory
  //                     ? "text-[#861212] border-b-2 border-[#861212]"
  //                     : "text-[#6D6D6D] hover:text-[#861212]"
  //                 }`}
  //                 >
  //                   {cat}
  //                 </Link>
  //               ))}
  //             </nav>
  //           </div>

  //           {/* ROW 2: Sub navigation */}
  //           <div className="flex justify-center gap-10 p-4 text-body">
  //             <span className="font-semibold cursor-pointer hover:text-action">
  //               Latest
  //             </span>
  //             <span className="font-semibold cursor-pointer hover:text-action">
  //               Most Read
  //             </span>
  //             <span className="font-semibold cursor-pointer hover:text-action">
  //               Most Shared
  //             </span>
  //             <span className="font-semibold cursor-pointer flex items-center gap-1 hover:text-action">
  //               <div className="relative">
  //                 <span
  //                   onClick={() => setShowTopics(!showTopics)}
  //                   className="font-semibold cursor-pointer flex items-center gap-1 hover:text-[#861212]"
  //                 >
  //                   Explore Topic <span className="text-xs">▾</span>
  //                 </span>

  //                 {showTopics && (
  //                   <div className="absolute top-10 right-0 w-70 bg-white border border-[#E7E7E7] rounded-md shadow-lg p-4 z-50">
  //                     <p className="text-xs text-[#6D6D6D] mb-3 uppercase">
  //                       Explore by
  //                     </p>

  //                     {/* Topics */}
  //                     <div className="space-y-3">
  //                       {topics.map((topic) => {
  //                         const active = selectedTopics.includes(topic);

  //                         return (
  //                           <div
  //                             key={topic}
  //                             onClick={() => toggleTopic(topic)}
  //                             className="flex items-center gap-3 cursor-pointer"
  //                           >
  //                             {active ? (
  //                               <FaCheckSquare className="text-[#861212] text-lg" />
  //                             ) : (
  //                               <div className="w-4 h-4 border border-[#D1D1D1] rounded-sm" />
  //                             )}
  //                             <span className="text-sm text-[#212121]">
  //                               {topic}
  //                             </span>
  //                           </div>
  //                         );
  //                       })}
  //                     </div>

  //                     {/* Actions */}
  //                     <div className="flex justify-between items-center mt-6">
  //                       <button
  //                         onClick={clearAll}
  //                         className="text-[#861212] text-sm font-medium"
  //                       >
  //                         Clear All
  //                       </button>

  //                       <button
  //                         onClick={() => setShowTopics(false)}
  //                         className="bg-[#861212] text-white px-4 py-1 rounded-md text-sm"
  //                       >
  //                         Apply
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </span>
  //           </div>
  //         </>
  //       </div>

  //       {/* Mobile Overlay */}
  //       {mobileMenuOpen && (
  //         <div
  //           className="fixed inset-0 bg-black/40 z-40 md:hidden"
  //           onClick={() => setMobileMenuOpen(false)}
  //         />
  //       )}

  //       {/* Mobile Sidebar */}
  //       <div
  //         className={`fixed top-0 left-0 h-full w-70 bg-white z-50 transform transition-transform duration-300 md:hidden
  // ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
  //       >
  //         {/* Header */}
  //         <div className="flex items-center justify-between px-5 py-4 border-b">
  //           <span className="font-bold text-[#861212]">THE JOURNAL</span>
  //           <button onClick={() => setMobileMenuOpen(false)}>✕</button>
  //         </div>

  //         {/* Auth Section */}
  //         <div className="px-5 py-4 border-b space-y-3">
  //           {!isLoggedIn ? (
  //             <>
  //               <button className="w-full border border-[#861212] text-[#861212] py-2 rounded-md">
  //                 Login
  //               </button>
  //               <button className="w-full bg-[#861212] text-white py-2 rounded-md">
  //                 Sign Up
  //               </button>
  //             </>
  //           ) : (
  //             <button
  //               onClick={() => setIsLoggedIn(false)}
  //               className="w-full bg-red-500 text-white py-2 rounded-md"
  //             >
  //               Logout
  //             </button>
  //           )}
  //         </div>

  //         {/* Categories */}
  //         <div className="px-5 py-4 border-b">
  //           <p className="text-xs uppercase text-[#6D6D6D] mb-3">Categories</p>
  //           <ul className="space-y-3">
  //             {categories.map((cat) => (
  //               <li
  //                 key={cat}
  //                 className={`text-sm cursor-pointer ${
  //                   activeCategory === cat
  //                     ? "text-[#861212] font-semibold"
  //                     : "text-[#212121]"
  //                 }`}
  //                 onClick={() => {
  //                   setActiveCategory(cat);
  //                   setMobileMenuOpen(false);
  //                 }}
  //               >
  //                 {cat}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Sub Navigation */}
  //         <div className="px-5 py-4 border-b">
  //           <p className="text-xs uppercase text-[#6D6D6D] mb-3">Browse</p>
  //           <div className="space-y-3 text-sm">
  //             <div className="cursor-pointer">Latest</div>
  //             <div className="cursor-pointer">Most Read</div>
  //             <div className="cursor-pointer">Most Shared</div>
  //           </div>
  //         </div>

  //         {/* Explore Topics */}
  //         <div className="px-5 py-4">
  //           <p className="text-xs uppercase text-[#6D6D6D] mb-3">
  //             Explore Topics
  //           </p>
  //           <div className="space-y-3">
  //             {topics.map((topic) => {
  //               const active = selectedTopics.includes(topic);

  //               return (
  //                 <div
  //                   key={topic}
  //                   onClick={() => toggleTopic(topic)}
  //                   className="flex items-center gap-3 cursor-pointer"
  //                 >
  //                   {active ? (
  //                     <FaCheckSquare className="text-[#861212]" />
  //                   ) : (
  //                     <div className="w-4 h-4 border border-[#D1D1D1] rounded-sm" />
  //                   )}
  //                   <span className="text-sm">{topic}</span>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       </div>
  //       {isArticlePage && (
  //         <div className="px-6 py-6 border-t border-[#E7E7E7]">
  //           <div className="flex items-center gap-2 text-[14px] leading-5 text-gray-500 hover:text-gray-700 cursor-pointer max-w-121">
  //             <span className="text-[16px] leading-none">←</span>
  //             <span className="truncate">
  //               Gen Z toppled an autocrat - but old guard tipped to win...
  //             </span>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="border-b border-[#E7E7E7]">
      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden">
        {/* TOP ROW */}
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)}>
            <LuMenu size={22} />
          </button>

          <h1 className="text-[24px] font-bold text-[#861212] tracking-wide">
            THE JOURNAL
          </h1>

          <FiSearch size={22} />
        </div>

        {/* SECOND ROW */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E7E7E7]">
          {/* Weather */}
          <div className="flex items-center gap-2 text-sm">
            <Image src={day} alt="weather" width={20} />
            <div>
              <div className="font-semibold">Saturday</div>
              <div className="text-xs text-gray-500">February 7, 2026</div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-6 text-sm">
            <span className="font-semibold text-[#861212]">Politics</span>
            <span>Business</span>
          </div>

          {/* Grid Icon */}
          <button onClick={() => setMobileFilterOpen(true)}>
            <FiGrid size={20} />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR (UNCHANGED) ================= */}
      <div className="hidden md:block w-full mx-auto px-6">
        {/* Top line */}
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex gap-2 items-center border border-[#D1D1D1] rounded-md px-4 py-2 ">
            <FaSearch />
            <input
              placeholder="Search"
              className="w-16 border-none text-sm placeholder-[#212121]"
            />
          </div>

          <h1 className="font-bold text-[40px] text-[#861212] tracking-wide">
            THE JOURNAL
          </h1>

          <div className="flex gap-3">
            <button className="border border-[#861212] text-[#861212] px-4 py-1 rounded-md">
              Login
            </button>
            <button className="bg-[#861212] text-white px-4 py-1 rounded-md">
              SignUp
            </button>
          </div>
        </div>
        {/* list bar */}
        <div className="hidden md:block">
          <>
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
              <div className="w-0.5 border-l-[2.5px] border-[#D1D1D1] h-12.5"></div>
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
                    <div className="absolute top-10 right-0 w-70 bg-white border border-[#E7E7E7] rounded-md shadow-lg p-4 z-50">
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
          </>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <span className="font-bold text-[#861212]">THE JOURNAL</span>
          <button onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>

        <div className="px-5 py-4 space-y-3">
          {!isLoggedIn ? (
            <>
              <button className="w-full border border-[#861212] py-2 rounded-md">
                Login
              </button>
              <button className="w-full bg-[#861212] text-white py-2 rounded-md">
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER PANEL ================= */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileFilterOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[360px] bg-[#F3F1EE] z-50 transform transition-transform duration-300 md:hidden ${
          mobileFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full">
          {/* LEFT COLUMN */}
          <div className="w-1/2 bg-[#F3F1EE] p-4 space-y-4">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer text-sm ${
                  activeCategory === cat
                    ? "text-[#861212] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-1/2 bg-white p-4 relative">
            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 mb-3">Sort By</p>

              <div
                onClick={() => setSortBy("Latest")}
                className="flex items-center gap-2 text-sm text-[#861212]"
              >
                ✓ Latest
              </div>

              <div
                onClick={() => setSortBy("Trending")}
                className="text-sm mt-3"
              >
                Trending
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-500 mb-3">Filter By</p>

              <div className="space-y-3 text-sm">
                {topics.map((topic) => (
                  <div
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`cursor-pointer ${
                      selectedTopics.includes(topic) ? "text-[#861212]" : ""
                    }`}
                  >
                    {selectedTopics.includes(topic) && "✓ "}
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="absolute bottom-0 left-0 right-0 border-t p-4 flex justify-between bg-white">
              <button onClick={clearAll} className="text-[#861212]">
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-[#861212] font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE BAR */}
      {isArticlePage && (
        <div className="px-6 py-6 border-t border-[#E7E7E7]">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            ← Back to article
          </div>
        </div>
      )}
    </div>
  );
}
