import Link from "next/link";

export default function Navbar() {
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

   const activeCategory = "Politics";
  return (
    <div className="border-b bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Top line */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button className="text-xl">☰</button>
            <input
              placeholder="Search"
              className="border rounded-md px-4 py-1 text-sm"
            />
          </div>

          <h1 className="font-body font-bold text-[32px] text-[#861212] text-action tracking-wide">
            THE JOURNAL
          </h1>

          <div className="flex gap-3">
            <button className="border border-[#861212] bg-action text-[#861212] px-4 py-1 rounded-md text-buttonM font-button">
              Login
            </button>
            <button className="bg-[#861212] text-white px-4 py-1 rounded-md text-buttonM font-button">
              SignUp
            </button>
          </div>
        </div>

{/* ROW 1: Date + Categories */}
        <div className="flex items-center justify-between py-3 text-bodyM border-b">

          {/* Date */}
          <div className="flex items-center gap-2 text-label">
            <span>☀️</span>
            <span className="font-body font-medium">
              Saturday, February 7, 2026
            </span>
          </div>
        {/* Categories */}
          <nav className="flex gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className={`font-body pb-1 transition-colors
                  ${
                    cat === activeCategory
                      ? "text-action border-b-2 border-action"
                      : "text-heading hover:text-action"
                  }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>

        {/* ROW 2: Sub navigation */}
        <div className="flex justify-center gap-10 py-3 text-bodyM">
          <span className="font-body cursor-pointer hover:text-action">
            Latest
          </span>
          <span className="font-body cursor-pointer hover:text-action">
            Most Read
          </span>
          <span className="font-body cursor-pointer hover:text-action">
            Most Shared
          </span>
          <span className="font-body cursor-pointer flex items-center gap-1 hover:text-action">
            Explore Topic <span className="text-xs">▾</span>
          </span>
      </div>
      </div>
    </div>
  );
}
