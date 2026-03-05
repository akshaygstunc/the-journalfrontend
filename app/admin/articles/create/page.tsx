"use client";

import RichTextEditor from "../../components/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { useState } from "react";
import { z } from "zod";

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

const schema = z.object({
  title: z.string().min(5),
  subHeadline: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  slug: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateArticle() {
  const [content, setContent] = useState("");
  const [breaking, setBreaking] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/articles", data),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      ...data,
      content,
      breaking,
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-[#F4F4F4]">
      {/* LEFT CONTENT */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">New Story</h2>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                Draft
              </span>
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

            {/* Extra fields */}
            <div className="space-y-3">

              <div className="flex items-center border rounded px-3 py-2">
                <FiImage className="mr-2 text-gray-400" />
                <input placeholder="Add Images" className="w-full outline-none" />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FiMessageSquare className="mr-2 text-gray-400" />
                <input placeholder="Add Quote" className="w-full outline-none" />
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
        <div className="space-y-6">

          {/* Metadata */}
          <div>
            <h3 className="font-semibold mb-3">Metadata</h3>

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

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-200 text-sm rounded">
                Economy
              </span>
              <span className="px-2 py-1 bg-gray-200 text-sm rounded">
                Investment
              </span>
              <span className="px-2 py-1 bg-gray-200 text-sm rounded">
                Stock
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="border-t pt-4 text-sm space-y-2">
            <p>✔ Headline</p>
            <p>✔ Image</p>
            <p>✔ Body</p>
            <p>✔ Where?</p>
            <p>✔ When?</p>
            <p>✔ Slug?</p>
          </div>

        </div>
      </div>
    </div>
  );
}