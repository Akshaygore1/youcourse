"use client";
import Image from "next/image";
import { formatTime } from "../utils";
import { useVideoStore } from "../store";
import { Play } from "lucide-react";

interface ChapterCardProps {
  title: string;
  thumbnails: string;
  timeStamp: number;
  nextTimestamp: number;
  lastTimestamp: number;
  videoId: string;
  totalDuration: number;
}

export default function ChapterCard({
  title,
  thumbnails,
  timeStamp,
  nextTimestamp,
  videoId,
  lastTimestamp,
  totalDuration,
}: ChapterCardProps) {
  const { setSelectedVideo } = useVideoStore();
  const handleClick = (
    videoId: string,
    timeStamp: number,
    maxTime: number,
    isLast: boolean
  ) => {
    setSelectedVideo({ id: videoId, timeStamp, maxTime, isLast });
  };
  return (
    <div className="flex flex-row p-4 gap-4">
      <div
        className="flex items-center justify-center"
        onClick={() => {
          handleClick(
            videoId,
            timeStamp,
            nextTimestamp ? nextTimestamp : totalDuration,
            nextTimestamp ? false : true
          );
        }}
      >
        <Play />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-white text-md">{title}</div>
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
