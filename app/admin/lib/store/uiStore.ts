"use client";

import { create } from "zustand";

interface UIState {
  // Preview
  previewOpen: boolean;
  // Assign
  assignOpen: boolean;
  // Edit
  editOpen: boolean;
  // Selected Story (common for all)
  selectedStory: any | null;

  // Preview functions
  openPreview: (story: any) => void;
  closePreview: () => void;

  // Assign functions
  openAssign: (story: any) => void;
  closeAssign: () => void;

  // Edit functions
  openEdit: (story: any) => void;
  closeEdit: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial states
  previewOpen: false,
  assignOpen: false,
  editOpen: false,
  selectedStory: null,

  // Preview functions
  openPreview: (story) =>
    set({ previewOpen: true, selectedStory: story, assignOpen: false, editOpen: false }),

  closePreview: () =>
    set({ previewOpen: false, selectedStory: null }),

  // Assign functions
  openAssign: (story) =>
    set({ assignOpen: true, selectedStory: story, previewOpen: false, editOpen: false }),

  closeAssign: () =>
    set({ assignOpen: false, selectedStory: null }),

  // Edit functions
  openEdit: (story) => {
    console.log("📂 Opening edit modal for:", story?.title);
    set({ editOpen: true, selectedStory: story, previewOpen: false, assignOpen: false });
  },

  closeEdit: () =>
    set({ editOpen: false, selectedStory: null }),
}));