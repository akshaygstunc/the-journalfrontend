// CommentsSection.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export default function CommentsSection() {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[28px] leading-7 text-[#2F2F2F] tracking-[-0.02em] font-bold">
          Comments <span>(410)</span>
        </h3>

        <div className="flex gap-3 text-sm">
          <button className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
            Latest ▾
          </button>
          <button className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
            Top ▾
          </button>
        </div>
      </div>

      {/* Add Comment */}
      <div className="flex items-start gap-4 mb-12">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="flex-1">
          <input
            placeholder="Add a comment..."
            className="w-full border-b border-gray-300 pb-3 text-sm focus:outline-none focus:border-[#8B1C1C] bg-transparent"
          />
          <div className="flex justify-end mt-3">
            <button className="bg-[#8B1C1C] text-white text-xs px-4 py-2 rounded-full hover:bg-[#6b1515]">
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="border-t border-gray-300 pt-10">
        {/* Comment Header */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>

          <div className="flex-1">
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-[15px]">
                Isabelle Conklin
              </span>
              <span className="text-xs text-gray-500">18 Jan 2025</span>
            </div>

            <p className="text-[15px] leading-[1.7] text-[#333]">
              As someone in my early 20s, this hits hard. We want change, but
              the system doesn't feel designed for us to participate
              meaningfully.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-8 mt-4 text-lg text-gray-600">
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setReaction(reaction === "like" ? null : "like")}
              >
                {reaction === "like" ? (
                  <AiFillLike className="text-[#8B1C1C]" />
                ) : (
                  <AiOutlineLike />
                )}
                <span className="text-xs">8.2k</span>
              </span>
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  setReaction(reaction === "dislike" ? null : "dislike")
                }
              >
                {reaction === "dislike" ? (
                  <AiFillDislike className="text-gray-800" />
                ) : (
                  <AiOutlineDislike />
                )}
                <span className="text-xs">89</span>
              </span>
              <span className="text-[#8B1C1C] cursor-pointer hover:underline">
                Reply
              </span>
            </div>

            {/* Reply */}
            <div className="mt-8 ml-12 border-l-2 border-gray-200 pl-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>

                <div className="flex-1">
                  <div className="flex flex-col mb-1">
                    <span className="font-semibold text-[14px]">John Doe</span>
                    <span className="text-xs text-gray-500">18 Jan 2025</span>
                  </div>

                  <p className="text-[14px] leading-[1.7] text-[#333]">
                    Exactly! The system is designed to keep young people out. We
                    need structural change, not just protests.
                  </p>

                  <div className="flex items-center gap-8 mt-4 text-lg text-gray-600">
                    <span
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        setReaction(reaction === "like" ? null : "like")
                      }
                    >
                      {reaction === "like" ? (
                        <AiFillLike className="text-[#8B1C1C]" />
                      ) : (
                        <AiOutlineLike />
                      )}
                      <span className="text-xs">8.2k</span>
                    </span>
                    <span
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        setReaction(reaction === "dislike" ? null : "dislike")
                      }
                    >
                      {reaction === "dislike" ? (
                        <AiFillDislike className="text-gray-800" />
                      ) : (
                        <AiOutlineDislike />
                      )}
                      <span className="text-xs">89</span>
                    </span>
                    <span className="text-[#8B1C1C] cursor-pointer hover:underline">
                      Reply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Comment */}
      <div className="border-t border-gray-300 mt-10 pt-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-[15px]">Michael Chen</span>
              <span className="text-xs text-gray-500">17 Jan 2025</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#333]">
              Great analysis. The gap between street politics and institutional
              power is exactly why we see this pattern repeating across
              countries.
            </p>
            <div className="flex items-center gap-8 mt-4 text-lg text-gray-600">
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setReaction(reaction === "like" ? null : "like")}
              >
                {reaction === "like" ? (
                  <AiFillLike className="text-[#8B1C1C]" />
                ) : (
                  <AiOutlineLike />
                )}
                <span className="text-xs">8.2k</span>
              </span>
              <span
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  setReaction(reaction === "dislike" ? null : "dislike")
                }
              >
                {reaction === "dislike" ? (
                  <AiFillDislike className="text-gray-800" />
                ) : (
                  <AiOutlineDislike />
                )}
                <span className="text-xs">89</span>
              </span>
              <span className="text-[#8B1C1C] cursor-pointer hover:underline">
                Reply
              </span>
            </div>
            {/* View More */}
            <div className="mt-6 text-sm text-[#8B1C1C] cursor-pointer hover:underline font-medium">
              View 74 more replies →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
