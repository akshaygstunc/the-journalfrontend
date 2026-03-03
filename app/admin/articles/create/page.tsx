"use client";

import RichTextEditor from "../../components/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(5),
  subHeadline: z.string().optional(),
  category: z.string(),
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
    <div className="flex w-full h-full">
      {/* LEFT */}
      <div className="flex-1 bg-[#F8F8F8] min-h-screen py-10 px-4 lg:px-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            New Story
            <span className="text-xs bg-gray-200 rounded px-2 py-1 ml-2">
              Draft
            </span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              {...register("title")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="What happened?"
            />

            <input
              {...register("subHeadline")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Add quick context"
            />

            <RichTextEditor value={content} onChange={setContent} />

            <button
              type="submit"
              className="bg-[#861212] text-white px-6 py-2 rounded font-semibold"
            >
              Send To Desk
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:flex w-[340px] bg-white border-l p-6 flex-col">
        <span className="font-semibold mb-3">Breaking News</span>
        <button
          onClick={() => setBreaking(!breaking)}
          className="w-10 h-5 bg-gray-200 rounded-full p-1"
        >
          <div
            className={`w-4 h-4 rounded-full transition-all ${
              breaking ? "bg-[#861212] translate-x-5" : "bg-white"
            }`}
          />
        </button>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Discussion</h3>

          <div className="bg-gray-50 p-3 rounded mb-3 text-sm">
            <strong>Isabelle Conklin</strong>
            <p>Can you add photos from the flooding scene?</p>
          </div>

          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Reply..."
          />
        </div>
      </div>
    </div>
  );
}
