"use client";

import RichTextEditor from "../../components/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { slugify, z } from "zod";
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
  const [content, setContent] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [images, setImages] = useState<ArticleImage[]>([]);
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
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    immediatelyRender: false,
  });

  const title = watch("title");

  useEffect(() => {
    if (title) {
      setValue("slug", slugify(title, { lower: true, strict: true }));
    }
  }, [title]);
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft.mutate({
        title: watch("title"),
        slug: watch("slug"),
        location: watch("location"),
        date: watch("date"),
        category: watch("category"),
        tags: watch("tags"),
        content,
        images,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [content]);
  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/articles", data),
  });
  const saveDraft = useMutation({
    mutationFn: (data: any) => api.post("/articles/draft", data),
  });
  const onSubmit = (data: FormData) => {
    mutation.mutate({
      ...data,
      content,
      breaking,
    });
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
      <div className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                New Story{" "}
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  Draft
                </span>
              </h2>
            </div>

            <button
              type="submit"
              form="articleForm"
              className="flex items-center gap-2 bg-[#861212] text-white px-5 py-2 rounded-md"
            >
              <FiSend />
              Send To Desk
            </button>
          </div>

          {/* FORM */}
          <form
            id="articleForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Headline */}
            <input
              {...register("title")}
              className="w-full border rounded px-4 py-3 text-lg"
              placeholder="What happened?"
            />

            {/* Row inputs */}
            <div className="flex gap-3">
              <div className="flex items-center border px-3 py-2 rounded w-full">
                <FiMapPin className="mr-2 text-gray-400" />
                <input
                  {...register("location")}
                  placeholder="Where?"
                  className="outline-none w-full"
                />
              </div>

              <div className="flex items-center border px-3 py-2 rounded w-full">
                <FiCalendar className="mr-2 text-gray-400" />
                <input
                  {...register("date")}
                  placeholder="When?"
                  className="outline-none w-full"
                />
              </div>

              <div className="flex items-center border px-3 py-2 rounded w-full">
                <FiTag className="mr-2 text-gray-400" />
                <input
                  {...register("slug")}
                  placeholder="What's Slug?"
                  className="outline-none w-full"
                />
              </div>
            </div>

            {/* Sub headline */}
            <input
              {...register("subHeadline")}
              className="w-full border rounded px-4 py-2"
              placeholder="Add quick context"
            />

            {/* Editor */}
            <RichTextEditor value={content} onChange={setContent} />

            {selectedImages.length > 0 && (
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded text-sm">
                <span>{selectedImages.length} images selected</span>

                <button
                  onClick={() => {
                    const caption = prompt("Enter caption");
                    setImages((prev) =>
                      prev.map((i) => (i.selected ? { ...i, caption } : i)),
                    );
                  }}
                >
                  Add Caption
                </button>

                <button
                  onClick={() => {
                    const credit = prompt("Enter credit");
                    setImages((prev) =>
                      prev.map((i) => (i.selected ? { ...i, credit } : i)),
                    );
                  }}
                >
                  Give Credit
                </button>

                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((i) => !i.selected))
                  }
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
            {/* <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="h-28 w-full object-cover rounded"
                />
              ))}
            </div> */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative group border rounded overflow-hidden"
                >
                  <img src={img.preview} className="h-32 w-full object-cover" />

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
                    className="absolute top-2 left-2"
                  />

                  <button
                    onClick={() =>
                      setImages((prev) => prev.filter((i) => i.id !== img.id))
                    }
                    className="absolute top-2 right-2 bg-black/60 text-white px-1 rounded"
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
                    className="w-full border-t text-xs p-1"
                  />
                </div>
              ))}
            </div>
           
            {/* Extra fields */}
            <div className="space-y-3">
              <div className="flex items-center border rounded px-3 py-2">
                <FiImage className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Images"
                  className="w-full outline-none"
                />

                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  Drag & drop images here
                </div>
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FiMessageSquare className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Quote"
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FiHash className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Facts / Number"
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FiLink className="mr-2 text-gray-400" />
                <input placeholder="Source" className="w-full outline-none" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}

      <div className="hidden lg:block w-[340px] bg-white border-l p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("metadata")}
            className={`px-4 py-2 text-sm rounded-md border ${
              activeTab === "metadata"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200"
            }`}
          >
            Metadata
          </button>

          <button
            onClick={() => setActiveTab("discussion")}
            className={`px-4 py-2 text-sm rounded-md border ${
              activeTab === "discussion"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200"
            }`}
          >
            Discussion
          </button>
        </div>

        {/* METADATA PANEL */}
        {activeTab === "metadata" && (
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium block mb-3">
                Reported by
              </span>

              <div className="flex items-center justify-between mb-4">
                <span>Breaking News</span>

                <button
                  onClick={() => setBreaking(!breaking)}
                  className={`w-10 h-5 rounded-full p-1 ${
                    breaking ? "bg-[#861212]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition ${
                      breaking ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              <select
                {...register("category")}
                className="w-full border rounded px-3 py-2 mb-3"
              >
                <option>Select Category</option>
                <option>Politics</option>
                <option>Business</option>
                <option>World</option>
              </select>

              <select className="w-full border rounded px-3 py-2 mb-3">
                <option>Select Sub Category</option>
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
              />
            </div>

            {/* Stats */}
            <div className="text-sm space-y-2">
              <p>✔ Headline</p>
              <span>{headlineChars} Characters</span>

              <p>✔ Body</p>
              <span>{bodyChars} Characters</span>
            </div>

            {/* Checklist */}
            <div className="border-t pt-4 text-sm space-y-2">
              <p>{hasImage ? "✔" : "○"} Image</p>
              <p>{hasLocation ? "✔" : "○"} Where?</p>
              <p>{hasDate ? "✔" : "○"} When?</p>
              <p>{hasSlug ? "✔" : "○"} Slug</p>
            </div>
          </div>
        )}

        {/* DISCUSSION PANEL */}
        {activeTab === "discussion" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Discussion</h3>

            <div className="bg-gray-50 p-3 rounded text-sm">
              <strong>Editor</strong>
              <p>Can you add photos from the flooding scene?</p>
            </div>

            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Reply..."
            />

            <button className="bg-[#861212] text-white px-4 py-2 rounded text-sm">
              Send Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
