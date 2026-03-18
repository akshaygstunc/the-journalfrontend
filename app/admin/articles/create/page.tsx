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
  FiClock,
  FiUser,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
  FiUploadCloud,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiEye,
  FiSave,
} from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { createStory } from "@/src/services/news.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced schema with all required fields
const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subHeadline: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  slug: z.string().min(3, "Slug is required"),
  author: z.string().optional(),
  source: z.string().optional(),
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

// Category options with colors
const categoryOptions = [
  { value: "politics", label: "Politics", color: "#EF4444" },
  { value: "business", label: "Business", color: "#10B981" },
  { value: "world", label: "World", color: "#3B82F6" },
  { value: "technology", label: "Technology", color: "#8B5CF6" },
  { value: "sports", label: "Sports", color: "#F59E0B" },
  { value: "entertainment", label: "Entertainment", color: "#EC4899" },
];

const tagOptions = [
  { value: "economy", label: "Economy" },
  { value: "investment", label: "Investment" },
  { value: "stock", label: "Stock Market" },
  { value: "politics", label: "Politics" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "environment", label: "Environment" },
];

export default function CreateArticle() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [showImageMetadataModal, setShowImageMetadataModal] = useState(false);
  const [selectedImageForMetadata, setSelectedImageForMetadata] = useState<ArticleImage | null>(null);

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
      author: "Admin",
      source: "",
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

  const validateBeforeSubmit = (): boolean => {
    const errors: string[] = [];

    if (images.length === 0) {
      errors.push("Please upload at least one image");
    }

    images.forEach((img, index) => {
      if (!img.caption?.trim()) {
        errors.push(`Image ${index + 1} is missing a caption`);
      }
      if (!img.credit?.trim()) {
        errors.push(`Image ${index + 1} is missing credit information`);
      }
    });

    if (!content || content === "<p></p>" || content.trim() === "") {
      errors.push("Please add content to the story");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const onSubmit = async (data: FormData) => {
    setValidationErrors([]);

    if (!validateBeforeSubmit()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
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
          url: img.preview,
          caption: img.caption,
          credit: img.credit,
        })),
        author: data.author || "Admin",
        source: data.source || "",
        publishedAt: data.date,
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

  const handleImageMetadataUpdate = (imageId: string, field: "caption" | "credit", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, [field]: value } : img))
    );
  };

  const handleBulkMetadataUpdate = (field: "caption" | "credit", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.selected ? { ...img, [field]: value } : img))
    );
  };

  const removeSelectedImages = () => {
    setImages((prev) => prev.filter((img) => !img.selected));
  };

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

  const completionPercentage = [
    hasImage && allImagesHaveMetadata,
    hasCategory,
    hasLocation,
    hasDate,
    hasSlug,
    hasTags,
    content && content !== "<p></p>"
  ].filter(Boolean).length * 14.28; // 7 items total

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#861212] to-[#B91C1C] bg-clip-text text-transparent">
                Create New Story
              </h1>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center">
                <FiClock className="mr-1" /> Draft
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/admin/articles")}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="articleForm"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#861212] to-[#B91C1C] hover:shadow-lg hover:shadow-red-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Publish Story
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-[#861212] to-[#B91C1C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Validation Errors */}
        <AnimatePresence>
          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <FiAlertCircle className="text-xl" />
                <h3 className="font-semibold">Please fix the following errors:</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                    <FiXCircle className="flex-shrink-0" />
                    {error}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-1 flex">
              <button
                onClick={() => setActiveTab("write")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "write"
                    ? "bg-[#861212] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Write
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-[#861212] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Form Content */}
            {activeTab === "write" ? (
              <form
                id="articleForm"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Headline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("title")}
                    className={`w-full border rounded-lg px-4 py-3 text-lg ${
                      errors.title ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent transition-all`}
                    placeholder="Enter an attention-grabbing headline..."
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {headlineChars}/200 characters
                  </p>
                </div>

                {/* Key Details Grid */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Key Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212]">
                        <FiMapPin className="mr-2 text-gray-400" />
                        <input
                          {...register("location")}
                          placeholder="Location *"
                          className="outline-none w-full"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.location && (
                        <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212]">
                        <FiCalendar className="mr-2 text-gray-400" />
                        <input
                          {...register("date")}
                          type="date"
                          className="outline-none w-full"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212]">
                        <FiTag className="mr-2 text-gray-400" />
                        <input
                          {...register("slug")}
                          placeholder="URL Slug *"
                          className="outline-none w-full"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.slug && (
                        <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#861212]">
                        <FiUser className="mr-2 text-gray-400" />
                        <input
                          {...register("author")}
                          placeholder="Author"
                          className="outline-none w-full"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub headline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Headline <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    {...register("subHeadline")}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212]"
                    placeholder="Add a brief summary or context..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Story Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor value={content} onChange={setContent} />
                  {(!content || content === "<p></p>") && (
                    <p className="text-red-500 text-sm mt-1">Content is required</p>
                  )}
                </div>

                {/* Images Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Images <span className="text-red-500">*</span>
                    </label>
                    {selectedImages.length > 0 && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const caption = prompt("Enter caption for selected images");
                            if (caption) handleBulkMetadataUpdate("caption", caption);
                          }}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <FiEdit3 /> Add Caption
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const credit = prompt("Enter credit for selected images");
                            if (credit) handleBulkMetadataUpdate("credit", credit);
                          }}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <FiUser /> Add Credit
                        </button>
                        <button
                          type="button"
                          onClick={removeSelectedImages}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete ({selectedImages.length})
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Image Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {images.map((img) => (
                        <motion.div
                          key={img.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                            <Image
                              src={img.preview}
                              alt={img.caption || "Upload preview"}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Selection checkbox */}
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
                              className="absolute top-2 left-2 w-4 h-4 z-10 cursor-pointer"
                            />

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => setImages((prev) => prev.filter((i) => i.id !== img.id))}
                              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors z-10"
                            >
                              <FiXCircle className="w-4 h-4" />
                            </button>

                            {/* Metadata inputs */}
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <input
                                placeholder="Caption *"
                                value={img.caption}
                                onChange={(e) => handleImageMetadataUpdate(img.id, "caption", e.target.value)}
                                className={`w-full text-xs p-1 rounded mb-1 ${
                                  !img.caption ? "bg-red-100 border border-red-300" : "bg-white"
                                }`}
                              />
                              <input
                                placeholder="Credit *"
                                value={img.credit}
                                onChange={(e) => handleImageMetadataUpdate(img.id, "credit", e.target.value)}
                                className={`w-full text-xs p-1 rounded ${
                                  !img.credit ? "bg-red-100 border border-red-300" : "bg-white"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Status indicators */}
                          {(!img.caption || !img.credit) && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                              !
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Upload Area */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragActive
                        ? "border-[#861212] bg-red-50"
                        : "border-gray-300 hover:border-[#861212] hover:bg-gray-50"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input {...getInputProps()} disabled={isSubmitting} />
                    <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {isDragActive ? "Drop images here" : "Drag & drop images or click to browse"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, GIF (Max 10MB each)
                    </p>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                      <FiMessageSquare className="mr-2 text-gray-400" />
                      <input
                        placeholder="Add a quote (optional)"
                        className="w-full outline-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                      <FiHash className="mr-2 text-gray-400" />
                      <input
                        placeholder="Key fact or number (optional)"
                        className="w-full outline-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                      <FiGlobe className="mr-2 text-gray-400" />
                      <input
                        {...register("source")}
                        placeholder="Source URL (optional)"
                        className="w-full outline-none"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              // Preview Mode
              <div className="bg-white rounded-xl shadow-sm p-8 prose max-w-none">
                <h1 className="text-4xl font-bold mb-4">{watch("title") || "Untitled"}</h1>
                {watch("subHeadline") && (
                  <h2 className="text-xl text-gray-600 mb-6">{watch("subHeadline")}</h2>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                  <span>{watch("author") || "Admin"}</span>
                  <span>•</span>
                  <span>{watch("date") ? new Date(watch("date")).toLocaleDateString() : "Date not set"}</span>
                  <span>•</span>
                  <span>{watch("location") || "Location not set"}</span>
                </div>
                {images.length > 0 && (
                  <div className="mb-8">
                    <Image
                      src={images[0].preview}
                      alt={images[0].caption || "Featured image"}
                      width={800}
                      height={400}
                      className="rounded-lg object-cover w-full"
                    />
                    {images[0].caption && (
                      <p className="text-sm text-gray-500 mt-2">{images[0].caption} {images[0].credit && `- ${images[0].credit}`}</p>
                    )}
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: content || "<p>No content yet...</p>" }} />
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category")}
                className={`w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#861212] ${
                  errors.category ? "border-red-500" : "border-gray-200"
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Tags Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tags <span className="text-red-500">*</span>
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
                className="react-select"
                classNamePrefix="select"
                placeholder="Select tags..."
                isDisabled={isSubmitting}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: errors.tags ? "#EF4444" : "#E5E7EB",
                    borderRadius: "0.5rem",
                    padding: "0.25rem",
                  }),
                }}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
              )}
            </div>

            {/* Breaking News Toggle */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Breaking News</span>
                  <p className="text-xs text-gray-500 mt-1">Mark as urgent breaking story</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBreaking(!breaking)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    breaking ? "bg-[#861212]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      breaking ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Content Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Content Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Headline</span>
                  <span className="font-mono font-medium">{headlineChars} chars</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Body</span>
                  <span className="font-mono font-medium">{bodyChars} chars</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Images</span>
                  <span className="font-mono font-medium">{images.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reading time</span>
                  <span className="font-mono font-medium">{Math.max(1, Math.ceil(bodyChars / 1000))} min</span>
                </div>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Publishing Checklist</h3>
              <div className="space-y-2">
                {[
                  { label: "At least one image", valid: hasImage },
                  { label: "All images have caption & credit", valid: allImagesHaveMetadata },
                  { label: "Category selected", valid: hasCategory },
                  { label: "Location specified", valid: hasLocation },
                  { label: "Date set", valid: hasDate },
                  { label: "URL slug generated", valid: hasSlug },
                  { label: "At least one tag", valid: hasTags },
                  { label: "Content added", valid: content && content !== "<p></p>" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    {item.valid ? (
                      <FiCheckCircle className="text-green-500 w-5 h-5" />
                    ) : (
                      <FiXCircle className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">SEO Preview</h3>
              <div className="space-y-2">
                <p className="text-[#1a0dab] text-sm font-medium truncate">
                  {watch("title") || "Story Title"}
                </p>
                <p className="text-[#006621] text-xs truncate">
                  yourdomain.com/{watch("slug") || "story-slug"}
                </p>
                <p className="text-gray-600 text-xs line-clamp-2">
                  {watch("subHeadline") || "Story description will appear here..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Metadata Modal */}
      <AnimatePresence>
        {showImageMetadataModal && selectedImageForMetadata && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowImageMetadataModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Image Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caption *
                  </label>
                  <input
                    type="text"
                    value={selectedImageForMetadata.caption}
                    onChange={(e) => handleImageMetadataUpdate(selectedImageForMetadata.id, "caption", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212]"
                    placeholder="Enter image caption..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit *
                  </label>
                  <input
                    type="text"
                    value={selectedImageForMetadata.credit}
                    onChange={(e) => handleImageMetadataUpdate(selectedImageForMetadata.id, "credit", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#861212]"
                    placeholder="Enter credit information..."
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowImageMetadataModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowImageMetadataModal(false)}
                    className="px-4 py-2 bg-[#861212] text-white rounded-lg hover:bg-[#6a0e0e]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}