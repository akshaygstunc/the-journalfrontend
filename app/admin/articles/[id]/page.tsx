"use client";
 
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { getCoverage } from "@/src/services/news.service";
import { usePathname } from "next/navigation";
 
const articles = [
  {
    id: 1,
    title: "The Future of Sustainable Urban Development",
    revisions: 3,
    category: "Economy",
    status: "Published",
    publishDate: "Today",
    time: "2h ago",
    views: "24,302",
    author: "Marcus Chan",
    role: "Copy Editor",
    source: "Reuters News Wire",
  },
  {
    id: 2,
    title: "The Future of Sustainable Urban Development",
    revisions: 3,
    category: "Economy",
    status: "Draft",
    publishDate: "Today",
    time: "2h ago",
    views: "24,302",
    author: "Marcus Chan",
    role: "Copy Editor",
    source: "Associated Press (AP)",
  },
  {
    id: 3,
    title: "The Future of Sustainable Urban Development",
    revisions: 3,
    category: "Economy",
    status: "Published",
    publishDate: "24/10/2024",
    time: "3:00 pm",
    views: "24,302",
    author: "Marcus Chan",
    role: "Copy Editor",
    source: "Press Information Bureau (PIB)",
  },
  {
    id: 4,
    title: "The Future of Sustainable Urban Development",
    revisions: 3,
    category: "Sports",
    status: "Published",
    publishDate: "24/10/2024",
    time: "3:21 pm",
    views: "4,50,302",
    author: "Jennifer Fischer",
    role: "Copy Editor",
    source: "Ministry of Finance Briefing",
  },
];
 
export default function Page() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
 

const pathname = usePathname();

const mode = pathname.includes("working-stories")
  ? "working"
  : pathname.includes("published")
  ? "published"
  : null;

useEffect(() => {
  loadArticles(mode);
}, [mode]);

const loadArticles = async (mode: string | null) => {
  try {
    setLoading(true);

    const data = await getCoverage("published");

    let filtered = data;

    if (mode === "working") {
      filtered = data.filter(
        (item: any) => item.source?.toLowerCase() === "manual"
      );
    }

    if (mode === "published") {
      filtered = data.filter(
        (item: any) => item.status?.toLowerCase() === "published"
      );
    }

    const formatted = filtered.map((item: any) => ({
      id: item._id,
      title: item.title,
      category: item.category,
      status: item.status,
      publishDate: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString()
        : "-",
      time: item.publishedAt
        ? new Date(item.publishedAt).toLocaleTimeString()
        : "-",
      views: item.views || 0,
      author: item.author || "Admin",
      source: item.source,
      revisions: item.revisions || 0,
    }));

    setArticles(formatted);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  const totalPages = Math.ceil(articles.length / perPage);
 
  const paginatedData = articles.slice((page - 1) * perPage, page * perPage);
  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen">
      {/* FILTER BAR */}
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search here..."
          className="border border-[#E7E7E7] rounded px-4 py-2 w-64"
        />
 
        <div className="flex gap-3">
          <select className="border border-[#E7E7E7] rounded px-3 py-2">
            <option>Date</option>
          </select>
 
          <select className="border border-[#E7E7E7] rounded px-3 py-2">
            <option>Category</option>
          </select>
 
          <select className="border border-[#E7E7E7] rounded px-3 py-2">
            <option>Status</option>
          </select>
 
          <select className="border border-[#E7E7E7] rounded px-3 py-2">
            <option>Author</option>
          </select>
 
          <button className="border border-[#E7E7E7] px-4 py-2 rounded">
            Clear filters
          </button>
        </div>
      </div>
 
      {/* TABLE */}
      <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">
                <input type="checkbox" />
              </th>
 
              <th className="p-4">Title</th>
 
              <th className="p-4">Title</th>
 
              <th className="p-4">Status</th>
 
              <th className="p-4">Publish Date</th>
 
              <th className="p-4">Views</th>
 
              <th className="p-4">Author</th>
 
              <th className="p-4">Source</th>
            </tr>
          </thead>
 
          <tbody>
            {paginatedData.map((article) => (
              <tr key={article.id} className="border-t border-[#E7E7E7]">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
 
                {/* TITLE */}
                <td className="p-4">
                  <p className="font-medium text-[#212121]">{article.title}</p>
 
                  <p className="text-xs text-gray-500">
                    {article.revisions} Revisions
                  </p>
                </td>
 
                {/* CATEGORY */}
                <td className="text-gray-600">{article.category}</td>
 
                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      article.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
 
                {/* DATE */}
                <td className="text-gray-600">
                  <p>{article.publishDate}</p>
 
                  <p className="text-xs text-gray-400">{article.time}</p>
                </td>
 
                {/* VIEWS */}
                <td className="text-green-700 font-medium">{article.views}</td>
 
                {/* AUTHOR */}
                <td>
                  <p className="font-medium">{article.author}</p>
 
                  <p className="text-xs text-gray-500">{article.role}</p>
                </td>
 
                {/* SOURCE */}
                <td className="text-gray-600">{article.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* PAGINATION */}
 
      <div className="flex justify-between items-center mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
}