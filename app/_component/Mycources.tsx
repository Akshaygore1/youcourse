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
        chapters,
      };
      localStorage.setItem(`video-${videoId}`, JSON.stringify(videoData));
    }

    setStorageKeys(
      Object.keys(localStorage).filter((key) => key.startsWith("video-"))
    );
  }, [data, duration, videoId]);

  return (
    <div className="flex flex-row gap-2">
      {storageKeys.map((key) => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          return (
            <div key={key}>
              <Card
                title={parsedData.title}
                duration={parsedData.duration}
                chapters={parsedData.chapters}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
