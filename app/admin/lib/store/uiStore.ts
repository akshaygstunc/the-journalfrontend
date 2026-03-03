"use client";

import { create } from "zustand";

interface UIState {
  previewOpen: boolean;
  assignOpen: boolean;
  selectedStory: any | null;
  openPreview: (story: any) => void;
  closePreview: () => void;
  openAssign: (story: any) => void;
  closeAssign: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  previewOpen: false,
  assignOpen: false,
  selectedStory: null,

  openPreview: (story) =>
    set({ previewOpen: true, selectedStory: story }),

  closePreview: () =>
    set({ previewOpen: false }),

  openAssign: (story) =>
    set({ assignOpen: true, selectedStory: story }),

  closeAssign: () =>
    set({ assignOpen: false }),
}));