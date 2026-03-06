"use client";

import RichTextEditor from "../../components/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { z } from "zod";
import Select from "react-select";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  FiMapPin,
  FiCalendar,
  FiTag,
  FiImage,
  FiMessageSquare,
  FiHash,
  FiLink,
  FiSend,
} from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createStory, saveDraft } from "@/src/services/news.service";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(5),
  subHeadline: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  slug: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type ArticleImage = {
  id: string;
  file: File;
  preview: string;
  caption?: string;
  credit?: string;
  selected?: boolean;
};
type Comment = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

export default function CreateArticle() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const selectedImages = images.filter((i) => i.selected);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<"metadata" | "discussion">(
    "metadata",
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        caption: "",
        credit: "",
        selected: false,
      }));

      setImages((prev) => [...prev, ...files]);
    },
  });

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const title = watch("title");

  useEffect(() => {
    if (title) {
      setValue("slug", slugify(title, { lower: true, strict: true }));
    }
  }, [title, setValue]);
const values = watch();

useEffect(() => {
  const interval = setInterval(async () => {
    if (!values.title && !content) return;

    setIsSavingDraft(true);

    try {
      await saveDraft({
        title: values.title || "Untitled Draft",
        slug:
          values.slug ||
          slugify(values.title || "untitled-draft", {
            lower: true,
            strict: true,
          }),
        summary: values.subHeadline || "",
        content: content || "",
        category: values.category || "",
        location: values.location || "",
        tags: values.tags || [],
        image: images?.[0]?.preview || "",
        imageCaption: images?.[0]?.caption || "",
        imageCredit: images?.[0]?.credit || "",
        breaking: breaking,
      });

      setLastSaved(new Date());
    } catch (err) {
      console.log("Draft save error", err);
    } finally {
      setIsSavingDraft(false);
    }
  }, 10000);

  return () => clearInterval(interval);
}, [values, content, images, breaking]);
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug || slugify(data.title, { lower: true, strict: true }),
        summary: data.subHeadline || "",
        content: content,
        category: data.category || "",
        location: data.location || "",
        tags: data.tags || [],
        breaking: breaking,
        image: images?.[0]?.preview || "",
        imageCaption: images?.[0]?.caption || "",
        imageCredit: images?.[0]?.credit || "",
        author: "admin",
        publishedAt: data.date || new Date().toISOString(),
      };

      await createStory(payload);
      router.push("/admin/articles");
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tagOptions = [
    { value: "economy", label: "Economy" },
    { value: "investment", label: "Investment" },
    { value: "stock", label: "Stock" },
  ];

  const bodyText = content.replace(/<[^>]+>/g, "");

  const headlineChars = watch("title")?.length || 0;
  const bodyChars = bodyText.length;
  const hasImage = images.length > 0;
  const hasLocation = !!watch("location");
  const hasDate = !!watch("date");
  const hasSlug = !!watch("slug");

  return (
    <div className="flex w-full min-h-screen bg-[#F4F4F4]">
      {/* LEFT CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 bg-white p-6 border-b border-[#E7E7E7]">
          <div>
            <h2 className="text-xl font-semibold">
              New Story{" "}
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                Draft
              </span>
            </h2>
            {lastSaved && (
              <p className="text-xs text-gray-500 mt-1">
                Last saved: {lastSaved.toLocaleTimeString()}
                {isSavingDraft && " (saving...)"}
              </p>
            )}
          </div>

          <button
            type="submit"
            form="articleForm"
            disabled={isSubmitting}
            className={`flex items-center gap-2 bg-[#861212] text-white px-5 py-2 rounded-md ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#6a0e0e]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <FiSend />
                Send To Desk
              </>
            )}
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          {/* FORM */}
          <form
            id="articleForm"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {/* Headline */}
            <input
              {...register("title")}
              className="w-full border rounded px-4 py-3 text-lg border-[#E7E7E7] focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
              placeholder="What happened?"
              disabled={isSubmitting}
            />

            {/* Row inputs */}
            <div className="flex gap-3">
              <div className="flex items-center border border-[#E7E7E7] px-3 py-2 rounded w-full focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiMapPin className="mr-2 text-gray-400" />
                <input
                  {...register("location")}
                  placeholder="Where?"
                  className="outline-none w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center border border-[#E7E7E7] px-3 py-2 rounded w-full focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiCalendar className="mr-2 text-gray-400" />
                <input
                  {...register("date")}
                  type="date"
                  placeholder="When?"
                  className="outline-none w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center border border-[#E7E7E7] px-3 py-2 rounded w-full focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiTag className="mr-2 text-gray-400" />
                <input
                  {...register("slug")}
                  placeholder="What's Slug?"
                  className="outline-none w-full"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Sub headline */}
            <input
              {...register("subHeadline")}
              className="w-full border border-[#E7E7E7] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
              placeholder="Add quick context"
              disabled={isSubmitting}
            />

            {/* Editor */}
            <RichTextEditor value={content} onChange={setContent} />

            {selectedImages.length > 0 && (
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded text-sm">
                <span>{selectedImages.length} images selected</span>

                <button
                  type="button"
                  onClick={() => {
                    const caption = prompt("Enter caption");
                    if (caption !== null) {
                      setImages((prev) =>
                        prev.map((i) => (i.selected ? { ...i, caption } : i)),
                      );
                    }
                  }}
                  className="text-[#861212] hover:underline"
                  disabled={isSubmitting}
                >
                  Add Caption
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const credit = prompt("Enter credit");
                    if (credit !== null) {
                      setImages((prev) =>
                        prev.map((i) => (i.selected ? { ...i, credit } : i)),
                      );
                    }
                  }}
                  className="text-[#861212] hover:underline"
                  disabled={isSubmitting}
                >
                  Give Credit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((i) => !i.selected))
                  }
                  className="text-red-600 hover:underline"
                  disabled={isSubmitting}
                >
                  Delete Selected
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative group border border-[#E7E7E7] rounded overflow-hidden"
                >
                  <img
                    src={img.preview}
                    className="h-32 w-full object-cover"
                    alt={img.caption || "Upload preview"}
                  />

                  <input
                    type="checkbox"
                    checked={img.selected}
                    onChange={() =>
                      setImages((prev) =>
                        prev.map((i) =>
                          i.id === img.id ? { ...i, selected: !i.selected } : i,
                        ),
                      )
                    }
                    className="absolute top-2 left-2 w-4 h-4 cursor-pointer"
                    disabled={isSubmitting}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((i) => i.id !== img.id))
                    }
                    className="absolute top-2 right-2 bg-black/60 text-white px-1.5 py-0.5 rounded text-xs hover:bg-black/80"
                    disabled={isSubmitting}
                  >
                    ✕
                  </button>

                  <input
                    placeholder="Caption"
                    value={img.caption}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((i) =>
                          i.id === img.id
                            ? { ...i, caption: e.target.value }
                            : i,
                        ),
                      )
                    }
                    className="w-full border-t text-xs p-1 focus:outline-none focus:ring-1 focus:ring-[#861212]"
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>

            {/* Extra fields */}
            <div className="space-y-3">
              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiImage className="mr-2 text-gray-400" />
                <input
                  placeholder="Image Credit (optional)"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                  onChange={(e) => {
                    if (images.length > 0) {
                      setImages((prev) =>
                        prev.map((img, index) =>
                          index === 0
                            ? { ...img, credit: e.target.value }
                            : img,
                        ),
                      );
                    }
                  }}
                />
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-[#b8b4b4] p-6 rounded-lg text-center cursor-pointer hover:border-[#861212] transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input {...getInputProps()} disabled={isSubmitting} />
                <FiImage className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Drag & drop images here, or click to select
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported: JPG, PNG, GIF
                </p>
              </div>

              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiMessageSquare className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Quote"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiHash className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Facts / Number"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212] focus-within:border-transparent">
                <FiLink className="mr-2 text-gray-400" />
                <input
                  placeholder="Source URL"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:block w-[340px] bg-white border-l border-[#E7E7E7]">
        {/* Tabs */}
        <div className="flex gap-2 p-6 border-b border-[#E7E7E7]">
          <button
            type="button"
            onClick={() => setActiveTab("metadata")}
            className={`px-4 py-2 text-sm rounded-md border transition-colors ${
              activeTab === "metadata"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            disabled={isSubmitting}
          >
            Metadata
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("discussion")}
            className={`px-4 py-2 text-sm rounded-md border transition-colors ${
              activeTab === "discussion"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            disabled={isSubmitting}
          >
            Discussion
          </button>
        </div>

        {/* METADATA PANEL */}
        {activeTab === "metadata" && (
          <div className="space-y-6 p-6">
            <div>
              <span className="text-sm font-medium block mb-3">
                Story Settings
              </span>

              <div className="flex items-center justify-between mb-4 p-3 border border-[#E7E7E7] rounded-xl">
                <span className="text-sm">Breaking News</span>

                <button
                  type="button"
                  onClick={() => setBreaking(!breaking)}
                  className={`w-10 h-5 rounded-full p-px transition-colors ${
                    breaking ? "bg-[#861212]" : "bg-gray-300"
                  }`}
                  disabled={isSubmitting}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      breaking ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              <select
                {...register("category")}
                className="w-full border border-[#E7E7E7] rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                <option value="politics">Politics</option>
                <option value="business">Business</option>
                <option value="world">World</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="entertainment">Entertainment</option>
              </select>

              <select
                className="w-full border border-[#E7E7E7] rounded-xl px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select Sub Category</option>
                <option value="local">Local</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>

              <Select
                isMulti
                options={tagOptions}
                onChange={(selected) =>
                  setValue(
                    "tags",
                    selected.map((s) => s.value),
                  )
                }
                className="rounded-xl"
                placeholder="Select tags..."
                isDisabled={isSubmitting}
              />
            </div>

            {/* Stats */}
            <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-xl">
              <p className="font-medium">Content Stats</p>
              <div className="flex justify-between">
                <span>Headline:</span>
                <span className="font-mono">{headlineChars} chars</span>
              </div>
              <div className="flex justify-between">
                <span>Body:</span>
                <span className="font-mono">{bodyChars} chars</span>
              </div>
              <div className="flex justify-between">
                <span>Images:</span>
                <span className="font-mono">{images.length}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="border-t border-[#E7E7E7] pt-4">
              <p className="text-sm font-medium mb-3">Required Items</p>
              <div className="text-sm space-y-2">
                <p className={hasImage ? "text-green-600" : "text-gray-500"}>
                  {hasImage ? "✔" : "○"} Image
                </p>
                <p className={hasLocation ? "text-green-600" : "text-gray-500"}>
                  {hasLocation ? "✔" : "○"} Location
                </p>
                <p className={hasDate ? "text-green-600" : "text-gray-500"}>
                  {hasDate ? "✔" : "○"} Date
                </p>
                <p className={hasSlug ? "text-green-600" : "text-gray-500"}>
                  {hasSlug ? "✔" : "○"} Slug
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DISCUSSION PANEL */}
        {activeTab === "discussion" && (
          <div className="space-y-4 p-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#861212] rounded-full flex items-center justify-center text-white text-xs">
                  E
                </div>
                <strong className="text-sm">Editor</strong>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm">
                Can you add photos from the flooding scene?
              </p>
            </div>

            <textarea
              className="w-full border border-[#E7E7E7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
              placeholder="Write a reply..."
              rows={4}
              disabled={isSubmitting}
            />

            <button
              type="button"
              className="w-full bg-[#861212] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#6a0e0e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Send Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
