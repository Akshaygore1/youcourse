import { create } from "zustand";

interface Video {
  id: string;
  timeStamp: number;
  maxTime: number;
  isLast: boolean;
}

interface VideoStore {
  selectedVideo: Video | null;
  selectedTimestamp: number;
  maxTime: number;
  isLast: boolean;
  setSelectedVideo: (video: Video) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  selectedVideo: null,
  selectedTimestamp: 0,
  maxTime: 0,
  isLast: false,
  setSelectedVideo: (video) =>
    set({
      selectedVideo: video,
      selectedTimestamp: video.timeStamp,
      maxTime: video.maxTime,
      isLast: video.isLast,
    }),
}));
