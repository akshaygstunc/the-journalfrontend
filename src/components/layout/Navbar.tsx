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

          <h1 className="font-heading font-bold text-[28px] text-[#861212] text-action tracking-wide">
            THE JOURNAL
          </h1>

          <div className="flex gap-3">
            <button className="border border-action text-action px-4 py-1 rounded-md text-buttonM font-button">
              Login
            </button>
            <button className="bg-action text-white px-4 py-1 rounded-md text-buttonM font-button">
              SignUp
            </button>
          </div>
        </div>

        {/* Category nav */}
      <div className="flex items-center gap-6 text-bodyM py-3">
  {categories.map((cat) => {
    const slug = cat.toLowerCase();
    return (
      <Link
        key={cat}
        href={`/category/${slug}`}
        className="font-body hover:text-action"
      >
        {cat}
      </Link>
    );
  })}
</div>
        {/* Sub menu */}
        <div className="flex gap-8 text-bodyM py-3 border-t">
          <span className="font-body">Latest</span>
          <span className="font-body">Most Read</span>
          <span className="font-body">Most Shared</span>
          <span className="font-body">Explore Topic ▾</span>
        </div>

      </div>
    </div>
  );
}
