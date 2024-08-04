"use client";

import { VideoData } from "@/types";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function MyCourses({
  data,
  duration,
  videoId,
}: {
  data?: VideoData;
  duration?: number;
  videoId?: string;
}) {
  const [storageKeys, setStorageKeys] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const { title, chapters } = data;
      const videoData = {
        duration,
        title,
        chapters: chapters.chapters,
        completedVideo: 0,
      };
      localStorage.setItem(`video-${videoId}`, JSON.stringify(videoData));
    }

    setStorageKeys(
      Object.keys(localStorage).filter((key) => key.startsWith("video-"))
    );
  }, [data, duration, videoId]);
  console.log("---", storageKeys)
  return (
    <div className="flex flex-row flex-wrap gap-2 h-auto">
      {storageKeys.length > 0 ? (storageKeys.map((key) => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          return (
            <Card
              title={parsedData.title}
              duration={parsedData.duration}
              chapters={parsedData.chapters}
              videoId={key.split("-")[1]}
              key={key}
            />
          );
        }
        return null;
      })
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white-700 text-2xl">No courses found</p>
        </div>
      )}
    </div>
  );
}
