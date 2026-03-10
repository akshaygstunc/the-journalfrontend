"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const trafficData = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 2100 },
  { day: "Wed", views: 800 },
  { day: "Thu", views: 2600 },
  { day: "Fri", views: 3100 },
  { day: "Sat", views: 1700 },
  { day: "Sun", views: 2200 },
];

const quickLinks = [
  { name: "Articles", href: "/admin/articles" },
  { name: "Media Library", href: "/admin/media-library" },
  { name: "Source Management", href: "/admin/source-management" },
  { name: "User Roles", href: "/admin/user-roles" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminDashboard() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <Link
          href="/admin/articles/create"
          className="bg-[#861212] text-white px-5 py-2 rounded-md flex gap-2 items-center"
        >
         <RiAddLine /> Create Story
        </Link>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <DashboardCard
          title="Total Articles"
          value="482"
        />

        <DashboardCard
          title="Active Reporters"
          value="24"
        />

        <DashboardCard
          title="Total Views"
          value="124K"
        />

        <DashboardCard
          title="Pending Reviews"
          value="12"
        />

      </div>

      {/* CHART + QUICK LINKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* TRAFFIC CHART */}
        <div className="lg:col-span-2 bg-white border border-[#E7E7E7] rounded-lg p-6">

          <h2 className="font-semibold mb-4">
            Weekly Traffic
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
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

        {/* QUICK NAVIGATION */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">

          <h2 className="font-semibold mb-4">
            Quick Access
          </h2>

          <div className="space-y-3">

            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border border-[#E7E7E7] rounded px-4 py-2 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}

          </div>

        </div>

      </div>

      {/* RECENT ARTICLES */}
      <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">

        <div className="p-6 border-b border-[#E7E7E7]">

          <h2 className="font-semibold">
            Recent News
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left">

            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Source</th>
              <th className="p-4">Published</th>
            </tr>

          </thead>

          <tbody>

            {news.slice(0, 5).map((item: any, index) => (

              <tr
                key={index}
                className="border-t border-[#E7E7E7]"
              >

                <td className="p-4 font-medium">
                  {item.title}
                </td>

                <td className="p-4 text-[#6D6D6D]">
                  {item.source || "Wire"}
                </td>

                <td className="p-4 text-[#6D6D6D]">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString()
                    : "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* Dashboard Card */

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-[#E7E7E7] rounded-lg p-5">

      <p className="text-sm text-[#6D6D6D]">
        {title}
      </p>

      <h2 className="text-2xl font-semibold text-[#861212] mt-2">
        {value}
      </h2>

    </div>
  );
}