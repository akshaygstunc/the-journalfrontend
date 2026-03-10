"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      toast.error("Invalid username or password");
      return;
    }

    toast.success(`Logged in as ${data.role}`);
    router.push("/admin");

  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F3]">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-10 border border-gray-200">

        <h1 className="text-3xl font-bold text-center mb-2">
          The Journal
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Admin Dashboard Login
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#862121] hover:bg-[#6f1a1a] text-white py-2 rounded-md font-medium"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}