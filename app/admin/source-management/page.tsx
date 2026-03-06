"use client";

import { useEffect, useState } from "react";

export default function AdminSourceManagement() {

  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    url: "",
    type: "rss",
  });

  /* FETCH SOURCES */

  const fetchSources = async () => {

    try {

      setLoading(true);

      const res = await fetch("/api/sources");
      const data = await res.json();

      setSources(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  /* ADD SOURCE */

  const addSource = async () => {

    if (!form.name || !form.url) return;

    try {

      await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ name: "", url: "", type: "rss" });

      fetchSources();

    } catch (err) {
      console.error(err);
    }

  };

  /* DELETE SOURCE */

  const deleteSource = async (id: string) => {

    if (!confirm("Delete this source?")) return;

    try {

      await fetch(`/api/sources/${id}`, {
        method: "DELETE",
      });

      setSources(sources.filter((s) => s._id !== id));

    } catch (err) {
      console.error(err);
    }

  };

  /* TOGGLE SOURCE */

  const toggleSource = async (source: any) => {

    try {

      await fetch(`/api/sources/${source._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active: !source.active,
        }),
      });

      fetchSources();

    } catch (err) {
      console.error(err);
    }

  };

  /* SCRAPE SOURCE */

  const fetchNews = async (id: string) => {

    try {

      await fetch(`/api/sources/${id}/fetch`, {
        method: "POST",
      });

      alert("News fetched successfully");

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchSources();
  }, []);

  const filtered = sources.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Source Management
        </h1>

        <input
          placeholder="Search sources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#E7E7E7] rounded px-4 py-2"
        />

      </div>


      {/* ADD SOURCE */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg p-6 mb-6">

        <h2 className="font-semibold mb-4">
          Add News Source
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            placeholder="Source Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          />

          <input
            placeholder="RSS / API URL"
            value={form.url}
            onChange={(e) =>
              setForm({ ...form, url: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border border-[#E7E7E7] rounded px-3 py-2"
          >

            <option value="rss">RSS</option>
            <option value="api">API</option>

          </select>

          <button
            onClick={addSource}
            className="bg-[#861212] text-white rounded px-4 py-2"
          >
            Add Source
          </button>

        </div>

      </div>


      {/* SOURCES TABLE */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-left">

            <tr>

              <th className="p-4">Source</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">URL</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Loading sources...
                </td>
              </tr>

            ) : filtered.length === 0 ? (

              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No sources added yet
                </td>
              </tr>

            ) : (

              filtered.map((source) => (

                <tr
                  key={source._id}
                  className="border-t border-[#E7E7E7]"
                >

                  <td className="p-4 font-medium">
                    {source.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {source.type}
                  </td>

                  <td className="p-4">

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        source.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {source.active ? "Active" : "Disabled"}
                    </span>

                  </td>

                  <td className="p-4 text-gray-600 truncate max-w-xs">
                    {source.url}
                  </td>

                  <td className="p-4 flex gap-3 text-xs">

                    <button
                      onClick={() => fetchNews(source._id)}
                      className="text-[#861212]"
                    >
                      Fetch
                    </button>

                    <button
                      onClick={() => toggleSource(source)}
                      className="text-blue-600"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteSource(source._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}