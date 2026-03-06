"use client";

import { useEffect, useRef, useState } from "react";

export default function AdminMediaLibrary() {

  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fileInput = useRef<HTMLInputElement>(null);

  /* FETCH MEDIA */

  const fetchMedia = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/media");
      const data = await res.json();

      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* UPLOAD MEDIA */

  const handleUpload = async (e: any) => {

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      fetchMedia();

    } catch (err) {
      console.error(err);
    }
  };

  /* DELETE MEDIA */

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this media?")) return;

    try {

      await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      setMedia(media.filter((m) => m._id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  /* COPY URL */

  const copyUrl = (url: string) => {

    navigator.clipboard.writeText(url);
    alert("URL copied");

  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* FILTER MEDIA */

  const filtered = media.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Media Library
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E7E7E7] rounded px-4 py-2"
          />

          <button
            onClick={() => fileInput.current?.click()}
            className="bg-[#861212] text-white px-4 py-2 rounded"
          >
            Upload
          </button>

        </div>

        <input
          type="file"
          hidden
          ref={fileInput}
          onChange={handleUpload}
        />

      </div>

      {/* MEDIA GRID */}

      <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">

        {loading ? (

          <p className="text-gray-500">
            Loading media...
          </p>

        ) : filtered.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

    <img
      src="/empty-media.svg"
      className="w-48 mb-6 opacity-80"
    />

    <h2 className="text-lg font-semibold text-[#212121] mb-2">
      Your media library is empty
    </h2>

    <p className="text-sm text-[#6D6D6D] mb-6 max-w-sm">
      Upload images, videos, or documents to start building your newsroom media library.
    </p>

    <button
      onClick={() => fileInput.current?.click()}
      className="bg-[#861212] text-white px-5 py-2 rounded-md"
    >
      Upload Media
    </button>

  </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {filtered.map((item) => (

              <div
                key={item._id}
                className="border border-[#E7E7E7] rounded p-2 group"
              >

                {/* IMAGE */}

                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-28 object-cover rounded"
                />

                {/* NAME */}

                <p className="text-xs mt-2 truncate">
                  {item.name}
                </p>

                {/* ACTIONS */}

                <div className="flex justify-between mt-2 text-xs">

                  <button
                    onClick={() => copyUrl(item.url)}
                    className="text-[#861212]"
                  >
                    Copy URL
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}