"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useUIStore } from "../lib/store/uiStore";
import { updateStory } from "@/src/services/news.service";
import toast from "react-hot-toast";

export default function EditStoryModal({ reload }: { reload: () => void }) {
  // 🔴 FIXED: Use correct variable names from store
  const { editOpen, closeEdit, selectedStory } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    category: "",
    source: "",
    tags: "",
    quote: "",
    facts: "",
    breaking: false,
    imageCaption: "",
    imageCredit: "",
    location: "",
    status: "",
  });

  // Populate form when story changes
  useEffect(() => {
    if (selectedStory) {
      console.log("Editing story:", selectedStory);
      setFormData({
        title: selectedStory.title || "",
        summary: selectedStory.description || selectedStory.summary || "", // Handle both
        content: selectedStory.content || "",
        image: selectedStory.image || "",
        category: selectedStory.category || "",
        source: selectedStory.source || "",
        tags: selectedStory.tags?.join(", ") || "",
        quote: selectedStory.quote || "",
        facts: selectedStory.facts || "",
        breaking: selectedStory.breaking || false,
        imageCaption: selectedStory.imageCaption || "",
        imageCredit: selectedStory.imageCredit || "",
        location: selectedStory.location || "",
        status: selectedStory.status || "upcoming",
      });
    }
  }, [selectedStory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStory?.id) {
      toast.error("No story selected");
      return;
    }

    setLoading(true);
    try {
      // Tags ko array mein convert karo
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await updateStory(selectedStory.id, {
        ...formData,
        tags: tagsArray,
      });

      toast.success("Story updated successfully!");
      closeEdit();
      reload();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update story");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 FIXED: Use editOpen instead of isEditOpen
  if (!editOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Edit Story</h2>
          <button
            onClick={closeEdit}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select category</option>
                <option value="world">World</option>
                <option value="politics">Politics</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="art">Art</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Image */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div> */}

          {/* Image Caption & Credit */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image Caption</label>
              <input
                type="text"
                name="imageCaption"
                value={formData.imageCaption}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Credit</label>
              <input
                type="text"
                name="imageCredit"
                value={formData.imageCredit}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div> */}

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full border rounded-lg px-4 py-2 font-mono text-sm"
            />
          </div>

          {/* Tags & Quote */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="politics, election, 2026"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quote</label>
              <input
                type="text"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div> */}

          {/* Facts & Breaking */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facts</label>
              <textarea
                name="facts"
                value={formData.facts}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium">Breaking News?</label>
              <input
                type="checkbox"
                name="breaking"
                checked={formData.breaking}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </div>
          </div> */}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="upcoming">Upcoming</option>
              <option value="assigned">Assigned</option>
              <option value="field">Field</option>
              <option value="desk_review">Desk Review</option>
              <option value="copy_edit">Copy Edit</option>
              <option value="digital_edit">Digital Edit</option>
              <option value="ready_to_publish">Ready to Publish</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={closeEdit}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#861212] text-white rounded-lg hover:bg-[#6d0f0f] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}