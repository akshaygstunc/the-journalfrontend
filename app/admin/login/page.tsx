"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F3]">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-center text-[#000] mb-2">
          The Journal
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Admin Dashboard Login
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#862121]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#862121] hover:bg-[#6f1a1a] text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}