"use client";

import RichTextEditor from "../../components/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { z } from "zod";
import Select from "react-select";
import {
  FiMapPin,
  FiCalendar,
  FiTag,
  FiImage,
  FiMessageSquare,
  FiHash,
  FiLink,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { createStory } from "@/src/services/news.service"; // Remove saveDraft import
import { useRouter } from "next/navigation";

// Enhanced schema with all required fields
const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subHeadline: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  slug: z.string().min(3, "Slug is required"),
});

type FormData = z.infer<typeof schema>;

type ArticleImage = {
  id: string;
  file: File;
  preview: string;
  caption: string;
  credit: string;
  selected?: boolean;
};

export default function CreateArticle() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  });

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

  const title = watch("title");
  const selectedImages = images.filter((i) => i.selected);

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setValue("slug", slugify(title, { lower: true, strict: true }));
    }
  }, [title, setValue]);

  // REMOVED: Auto-save useEffect completely

  // Validation before submission
  const validateBeforeSubmit = (): boolean => {
    const errors: string[] = [];

    // Check images
    if (images.length === 0) {
      errors.push("Please upload at least one image");
    }

    // Check each image has caption and credit
    images.forEach((img, index) => {
      if (!img.caption?.trim()) {
        errors.push(`Image ${index + 1} is missing a caption`);
      }
      if (!img.credit?.trim()) {
        errors.push(`Image ${index + 1} is missing credit information`);
      }
    });

    // Check content
    if (!content || content === "<p></p>") {
      errors.push("Please add content to the story");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const onSubmit = async (data: FormData) => {
    // Clear previous errors
    setValidationErrors([]);

    // Run validation
    if (!validateBeforeSubmit()) {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload matching backend structure exactly
      const payload = {
        title: data.title,
        slug: data.slug || slugify(data.title, { lower: true, strict: true }),
        summary: data.subHeadline || "",
        content: content,
        category: data.category,
        location: data.location,
        tags: data.tags,
        breaking: breaking,
        images: images.map((img) => ({
          url: img.preview, // Note: This should be the uploaded URL, not preview
          caption: img.caption,
          credit: img.credit,
        })),
        author: "admin",
        publishedAt: data.date,
      };

      console.log("Submitting payload:", payload); // For debugging
      await createStory(payload);
      
      // Success - redirect
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
    { value: "politics", label: "Politics" },
    { value: "technology", label: "Technology" },
  ];

  // Calculate completion stats
  const bodyText = content.replace(/<[^>]+>/g, "");
  const headlineChars = watch("title")?.length || 0;
  const bodyChars = bodyText.length;
  const hasImage = images.length > 0;
  const allImagesHaveMetadata = images.every(img => img.caption && img.credit);
  const hasLocation = !!watch("location");
  const hasDate = !!watch("date");
  const hasSlug = !!watch("slug");
  const hasCategory = !!watch("category");
  const hasTags = (watch("tags")?.length || 0) > 0;

  return (
    // ... JSX remains exactly the same ...
    <div className="flex w-full min-h-screen bg-[#F4F4F4]">
      {/* LEFT CONTENT */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-6 border-b border-[#E7E7E7]">
          <div>
            <h2 className="text-xl font-semibold">
              New Story{" "}
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                Draft
              </span>
            </h2>
            {/* REMOVED: Last saved indicator */}
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

        {/* Validation Errors Banner */}
        {validationErrors.length > 0 && (
          <div className="max-w-4xl mx-auto mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <FiAlertCircle className="text-lg" />
              <h3 className="font-semibold">Please fix the following errors:</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <form
            id="articleForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Headline with error */}
            <div>
              <input
                {...register("title")}
                className={`w-full border rounded px-4 py-3 text-lg ${
                  errors.title ? "border-red-500" : "border-[#E7E7E7]"
                } focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent`}
                placeholder="What happened? *"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Row inputs */}
            <div className="flex gap-3">
              <div className="flex-1">
                <div className={`flex items-center border ${
                  errors.location ? "border-red-500" : "border-[#E7E7E7]"
                } px-3 py-2 rounded focus-within:ring-2 focus-within:ring-[#861212]`}>
                  <FiMapPin className="mr-2 text-gray-400" />
                  <input
                    {...register("location")}
                    placeholder="Where? *"
                    className="outline-none w-full"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div className="flex-1">
                <div className={`flex items-center border ${
                  errors.date ? "border-red-500" : "border-[#E7E7E7]"
                } px-3 py-2 rounded focus-within:ring-2 focus-within:ring-[#861212]`}>
                  <FiCalendar className="mr-2 text-gray-400" />
                  <input
                    {...register("date")}
                    type="date"
                    placeholder="When? *"
                    className="outline-none w-full"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>

              <div className="flex-1">
                <div className={`flex items-center border ${
                  errors.slug ? "border-red-500" : "border-[#E7E7E7]"
                } px-3 py-2 rounded focus-within:ring-2 focus-within:ring-[#861212]`}>
                  <FiTag className="mr-2 text-gray-400" />
                  <input
                    {...register("slug")}
                    placeholder="Slug *"
                    className="outline-none w-full"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            {/* Sub headline */}
            <input
              {...register("subHeadline")}
              className="w-full border border-[#E7E7E7] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212]"
              placeholder="Add quick context (optional)"
              disabled={isSubmitting}
            />

            {/* Content Editor */}
            <div>
              <RichTextEditor value={content} onChange={setContent} />
              {!content || content === "<p></p>" ? (
                <p className="text-red-500 text-sm mt-1">Content is required</p>
              ) : null}
            </div>

            {/* Image Selection Controls */}
            {selectedImages.length > 0 && (
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded text-sm">
                <span>{selectedImages.length} images selected</span>
                <button
                  type="button"
                  onClick={() => {
                    const caption = prompt("Enter caption for selected images");
                    if (caption !== null) {
                      setImages((prev) =>
                        prev.map((i) => (i.selected ? { ...i, caption } : i))
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
                    const credit = prompt("Enter credit for selected images");
                    if (credit !== null) {
                      setImages((prev) =>
                        prev.map((i) => (i.selected ? { ...i, credit } : i))
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

            {/* Image Grid */}
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
                          i.id === img.id ? { ...i, selected: !i.selected } : i
                        )
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
                    placeholder="Caption *"
                    value={img.caption}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((i) =>
                          i.id === img.id ? { ...i, caption: e.target.value } : i
                        )
                      )
                    }
                    className={`w-full border-t text-xs p-1 focus:outline-none focus:ring-1 focus:ring-[#861212] ${
                      !img.caption ? "border-red-300 bg-red-50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  <input
                    placeholder="Credit *"
                    value={img.credit}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((i) =>
                          i.id === img.id ? { ...i, credit: e.target.value } : i
                        )
                      )
                    }
                    className={`w-full border-t text-xs p-1 focus:outline-none focus:ring-1 focus:ring-[#861212] ${
                      !img.credit ? "border-red-300 bg-red-50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>

            {/* Image Upload */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-[#b8b4b4] p-6 rounded-lg text-center cursor-pointer hover:border-[#861212] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input {...getInputProps()} disabled={isSubmitting} />
              <FiImage className="mx-auto text-3xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drag & drop images here, or click to select *
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported: JPG, PNG, GIF (Caption and Credit required for each)
              </p>
            </div>

            {/* Extra optional fields */}
            <div className="space-y-3">
              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2">
                <FiMessageSquare className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Quote (optional)"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2">
                <FiHash className="mr-2 text-gray-400" />
                <input
                  placeholder="Add Facts / Number (optional)"
                  className="w-full outline-none"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex items-center border border-[#E7E7E7] rounded px-3 py-2">
                <FiLink className="mr-2 text-gray-400" />
                <input
                  placeholder="Source URL (optional)"
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
        <div className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium block mb-3">
              Category *
            </label>
            <select
              {...register("category")}
              className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212] ${
                errors.category ? "border-red-500" : "border-[#E7E7E7]"
              }`}
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Tags Selection */}
          <div>
            <label className="text-sm font-medium block mb-3">
              Tags *
            </label>
            <Select
              isMulti
              options={tagOptions}
              onChange={(selected) =>
                setValue(
                  "tags",
                  selected.map((s) => s.value),
                  { shouldValidate: true }
                )
              }
              className={`rounded-xl ${errors.tags ? "border-red-500" : ""}`}
              placeholder="Select tags..."
              isDisabled={isSubmitting}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* Breaking News Toggle */}
          <div className="flex items-center justify-between p-3 border border-[#E7E7E7] rounded-xl">
            <span className="text-sm font-medium">Breaking News</span>
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

          {/* Content Stats */}
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

          {/* Validation Checklist */}
          <div className="border-t border-[#E7E7E7] pt-4">
            <p className="text-sm font-medium mb-3">Required Items Checklist</p>
            <div className="text-sm space-y-2">
              <p className={hasImage ? "text-green-600" : "text-red-500"}>
                {hasImage ? "✔" : "○"} At least one image
              </p>
              <p className={allImagesHaveMetadata ? "text-green-600" : "text-red-500"}>
                {allImagesHaveMetadata ? "✔" : "○"} All images have caption & credit
              </p>
              <p className={hasCategory ? "text-green-600" : "text-red-500"}>
                {hasCategory ? "✔" : "○"} Category selected
              </p>
              <p className={hasLocation ? "text-green-600" : "text-red-500"}>
                {hasLocation ? "✔" : "○"} Location
              </p>
              <p className={hasDate ? "text-green-600" : "text-red-500"}>
                {hasDate ? "✔" : "○"} Date
              </p>
              <p className={hasSlug ? "text-green-600" : "text-red-500"}>
                {hasSlug ? "✔" : "○"} Slug
              </p>
              <p className={hasTags ? "text-green-600" : "text-red-500"}>
                {hasTags ? "✔" : "○"} At least one tag
              </p>
              <p className={content && content !== "<p></p>" ? "text-green-600" : "text-red-500"}>
                {content && content !== "<p></p>" ? "✔" : "○"} Content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}