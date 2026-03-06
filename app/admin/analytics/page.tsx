"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#861212", "#C04A4A", "#E6A0A0", "#F5D6D6"];

const viewsData = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1900 },
  { day: "Wed", views: 800 },
  { day: "Thu", views: 2400 },
  { day: "Fri", views: 3000 },
  { day: "Sat", views: 1700 },
  { day: "Sun", views: 2200 },
];

const categoryData = [
  { name: "Economy", value: 400 },
  { name: "Politics", value: 300 },
  { name: "Sports", value: 200 },
  { name: "Technology", value: 150 },
];

const authorData = [
  { name: "Marcus Chan", articles: 12 },
  { name: "Jennifer Fischer", articles: 9 },
  { name: "Oliver Doe", articles: 6 },
  { name: "Isabelle Conklin", articles: 4 },
];

const topArticles = [
  {
    title: "The Future of Sustainable Urban Development",
    views: "24,302",
    category: "Economy",
  },
  {
    title: "Gen Z Political Movement Expands",
    views: "18,210",
    category: "Politics",
  },
  {
    title: "Global Tech Investment Surges",
    views: "14,509",
    category: "Technology",
  },
];

export default function AdminAnalytics() {
  const [range, setRange] = useState("7d");

  const kpis = useMemo(
    () => [
      { label: "Total Views", value: "124,392" },
      { label: "Articles Published", value: "482" },
      { label: "Active Reporters", value: "24" },
      { label: "Avg Engagement", value: "3.2 min" },
    ],
    []
  );

  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Analytics
        </h1>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-[#E7E7E7] rounded px-3 py-2"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-[#E7E7E7] rounded-lg p-5"
          >
            <p className="text-sm text-[#6D6D6D]">{kpi.label}</p>

            <h2 className="text-2xl font-semibold mt-2 text-[#861212]">
              {kpi.value}
            </h2>
          </div>
        ))}

      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* VIEWS TREND */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">

          <h3 className="font-semibold mb-4">
            Views Trend
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#861212"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* CATEGORY DISTRIBUTION */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">

          <h3 className="font-semibold mb-4">
            Articles by Category
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* AUTHOR PERFORMANCE */}
      <div className="bg-white border border-[#E7E7E7] rounded-lg p-6 mb-6">

        <h3 className="font-semibold mb-4">
          Author Performance
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={authorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="articles" fill="#861212" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* TOP ARTICLES TABLE */}
      <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">

        <div className="p-6 border-b border-[#E7E7E7]">
          <h3 className="font-semibold">
            Top Performing Articles
          </h3>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left">

            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Views</th>
            </tr>

          </thead>

          <tbody>

            {topArticles.map((article, i) => (

              <tr
                key={i}
                className="border-t border-[#E7E7E7]"
              >

                <td className="p-4 font-medium">
                  {article.title}
                </td>

                <td className="p-4 text-[#6D6D6D]">
                  {article.category}
                </td>

                <td className="p-4 text-[#861212] font-semibold">
                  {article.views}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}