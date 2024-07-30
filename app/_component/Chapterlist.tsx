"use client";
import React, { useEffect } from "react";
import ChapterCard from "./Chapter";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Chapter {
  title: string;
  time: number;
  thumbnails: Thumbnail[];
}

export default function Chapterlist({
  data,
  duration,
  videoId,
}: {
  data: Chapter[];
  duration: number;
  videoId: string;
}) {
  console.log("data>>", data);
  return (
    <div className="p-4 flex flex-col gap-2">
      {data.map((chapter: Chapter, index: number, arr: Chapter[]) => (
        <ChapterCard
          title={chapter.title}
          videoId={videoId}
          thumbnails={chapter.thumbnails[0].url}
          timeStamp={chapter.time}
          key={chapter.title}
          nextTimestamp={arr[index + 1]?.time}
          lastTimestamp={arr[index - 1]?.time}
          totalDuration={duration}
          chapterIndex={index}
          totalChapters={arr.length}
        />
      ))}
    </div>
  );
}
