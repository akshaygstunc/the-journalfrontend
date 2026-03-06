"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "The Journal",
    defaultAuthor: "Marcus Chan",
    autoSave: true,
    notifications: true,
    commentsEnabled: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saving settings", settings);
  };

  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Settings</h1>

        <button
          onClick={handleSave}
          className="bg-[#861212] text-white px-6 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* GENERAL SETTINGS */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#6D6D6D]">Site Name</label>

              <input
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-[#6D6D6D]">
                Default Author
              </label>

              <input
                name="defaultAuthor"
                value={settings.defaultAuthor}
                onChange={handleChange}
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-1"
              />
            </div>
          </div>
        </div>

        {/* EDITORIAL WORKFLOW */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Editorial Workflow</h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between">
              <span className="text-sm">Auto Save Drafts</span>

              <input
                type="checkbox"
                name="autoSave"
                checked={settings.autoSave}
                onChange={handleChange}
                accentColor="#861212"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm">Enable Comments</span>

              <input
                type="checkbox"
                name="commentsEnabled"
                checked={settings.commentsEnabled}
                onChange={handleChange}
                accentColor="#861212"
              />
            </label>

          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>

          <label className="flex items-center justify-between">
            <span className="text-sm">Email Notifications</span>

            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              accentColor="#861212"
            />
          </label>
        </div>

        {/* INTEGRATIONS */}
        <div className="bg-white border border-[#E7E7E7] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Integrations</h2>

          <div className="space-y-4">

            <div>
              <label className="text-sm text-[#6D6D6D]">
                News API Key
              </label>

              <input
                placeholder="Enter API Key"
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-[#6D6D6D]">
                Webhook URL
              </label>

              <input
                placeholder="https://example.com/webhook"
                className="w-full border border-[#E7E7E7] rounded px-3 py-2 mt-1"
              />
            </div>

          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white border border-[#861212] rounded-lg p-6 col-span-full">

          <h2 className="text-lg font-semibold text-[#861212] mb-4">
            Danger Zone
          </h2>

          <div className="flex justify-between items-center">

            <p className="text-sm text-gray-600">
              Reset all CMS settings to default values.
            </p>

            <button className="bg-[#861212] text-white px-4 py-2 rounded">
              Reset Settings
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}