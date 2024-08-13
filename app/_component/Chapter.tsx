"use client";
import Image from "next/image";
import { formatTime } from "../utils";
import { useVideoStore } from "../../store/store";
import { CirclePause, CirclePlay, Check, Lock } from "lucide-react";
import { useEffect, useState } from "react";

interface ChapterCardProps {
  title: string;
  thumbnails: string;
  timeStamp: number;
  nextTimestamp: number;
  lastTimestamp: number;
  videoId: string;
  totalDuration: number;
  chapterIndex: number;
  totalChapters: number;
  index: number;
}

export default function ChapterCard({
  title,
  thumbnails,
  timeStamp,
  nextTimestamp,
  videoId,
  lastTimestamp,
  totalDuration,
  chapterIndex,
  totalChapters,
  index,
}: ChapterCardProps) {
  const { selectedVideo, setSelectedVideo, completedVideos } = useVideoStore();

  const [isUnlocked, setIsUnlocked] = useState(completedVideos.length === 0);
  const isCompleted = completedVideos.some(
    (video) => video.timeStamp === timeStamp
  );

  useEffect(() => {
    const prevChapterCompleted =
      chapterIndex === 0 ||
      completedVideos.some((video) => video.timeStamp === lastTimestamp);
    setIsUnlocked(prevChapterCompleted);
  }, [completedVideos, chapterIndex, lastTimestamp]);

  useEffect(() => {
    const data = localStorage.getItem(`video-${videoId}`);
    let localObjData = data ? JSON.parse(data) : { completed: 0 };
    const completed = localObjData.completed;

    // Unlock this chapter if it's the first one or if the previous chapter is completed
    setIsUnlocked(index === 0 || completed >= index);
  }, [index, videoId, completedVideos]);

  const handleClick = (
    videoId: string,
    timeStamp: number,
    maxTime: number,
    isLast: boolean
  ) => {
    if (isUnlocked) {
      setSelectedVideo({ id: videoId, timeStamp, maxTime, isLast });

      // Update local storage
      const data = localStorage.getItem(`video-${videoId}`);
      let localObjData = data ? JSON.parse(data) : { completed: 0 };
      localObjData.completed = Math.max(localObjData.completed, index + 1);
      localStorage.setItem(`video-${videoId}`, JSON.stringify(localObjData));
    }
  };

  return (
    <div
      className={`flex flex-row p-4 gap-4 border border-b border-white rounded-md ${
        !isUnlocked ? "opacity-50" : ""
      }`}
    >
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          handleClick(
            videoId,
            timeStamp,
            nextTimestamp ? nextTimestamp : totalDuration,
            chapterIndex === totalChapters - 1
          );
        }}
      >
        {!isUnlocked ? (
          <Lock color="gray" />
        ) : isCompleted ? (
          <Check color="green" />
        ) : selectedVideo && selectedVideo.timeStamp === timeStamp ? (
          <CirclePause color="red" />
        ) : (
          <CirclePlay color="red" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`text-md ${isUnlocked ? "text-white" : "text-gray-400"}`}
        >
          {title}
        </div>
        <div className="text-gray-400 text-sm">
          {formatTime(
            nextTimestamp
              ? nextTimestamp - timeStamp
              : totalDuration - timeStamp
          )}{" "}
          Mins
        </div>
      </div>
    </div>
  );
}
