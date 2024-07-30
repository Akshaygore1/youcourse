"use client";
import Chaptersidebar from "@/app/_component/Chaptersidebar";
import VideoPlayer from "@/app/_component/VideoPlayer";
import { getVideoInfo } from "@/app/utils";
import React, { useEffect, useState } from "react";

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

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<Chapter[]>();
  const [duration, setDuration] = useState<number>();
  useEffect(() => {
    const data = localStorage.getItem(`video-${params.slug}`);

    if (data) {
      const parseData = JSON.parse(data);
      setData(parseData?.chapters);
      setDuration(parseData?.duration);
    }
  }, [params.slug]);
  return (
    <div className="flex flex-row gap-2 max-h-screen h-screen overflow-hidden bg-[#292929]">
      <div className="flex flex-col gap-2 w-3/4 overflow-y-auto">
        <VideoPlayer />
      </div>
      <div className="flex flex-col gap-2 w-1/4 overflow-y-auto">
        {data && data.length > 0 && duration && (
          <Chaptersidebar
            data={data}
            duration={duration}
            videoId={params.slug}
          />
        )}
      </div>
    </div>
  );
}
