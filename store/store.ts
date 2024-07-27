import { create } from "zustand";

interface Video {
  id: string;
  timeStamp: number;
  maxTime: number;
  isLast: boolean;
}

interface VideoStore {
  selectedTimestamp: number;
  maxTime: number;
  isLast: boolean;
  selectedVideo: Video | null;
  setSelectedVideo: (video: Video | null) => void;
  completedVideos: Video[];
  setCompletedVideos: (videos: Video[]) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  selectedVideo: null,
  selectedTimestamp: 0,
  maxTime: 0,
  isLast: false,
  setSelectedVideo: (video) => set({ selectedVideo: video }),
  completedVideos: [],
  setCompletedVideos: (videos: Video[]) => set({ completedVideos: videos }),
}));
