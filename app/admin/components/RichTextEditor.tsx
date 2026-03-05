"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiImage,
  FiLink,
  FiList,
  FiMessageSquare,
} from "react-icons/fi";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="relative border border-gray-300 rounded-lg p-4 min-h-[260px] bg-white">

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[160px] outline-none" />

      {/* Floating Toolbar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white border rounded-lg shadow-md px-3 py-2 flex items-center gap-4 text-gray-600 text-sm">

        {/* TEXT */}
        <div className="flex items-center gap-2 border-r pr-3">
          <span className="text-xs text-gray-400">TEXT</span>

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiBold />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiItalic />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiUnderline />
          </button>
        </div>

        {/* INSERT */}
        <div className="flex items-center gap-2 border-r pr-3">
          <span className="text-xs text-gray-400">INSERT</span>

          <button className="p-1 hover:bg-gray-100 rounded">
            <FiImage />
          </button>

          <button className="p-1 hover:bg-gray-100 rounded">
            <FiLink />
          </button>
        </div>

        {/* STRUCTURE */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">STRUCTURE</span>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiList />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiMessageSquare />
          </button>
        </div>
      </div>
    </div>
  );
}