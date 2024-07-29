import React from "react";
import Progressbar from "@/app/_component/Progressbar";
import Chapterlist from "@/app/_component/Chapterlist";

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

interface Chapters {
  areAutoGenerated: boolean;
  chapters: Chapter[];
}

interface VideoData {
  id: string;
  duration: number;
  title: string;
  chapters: Chapters;
}

async function getDuration(videoId: string): Promise<number> {
  const res = await fetch(
    `https://yt.lemnoslife.com/videos?part=contentDetails&id=${videoId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.items[0]?.contentDetails?.duration || 0;
}

export default async function Chaptersidebar({
  data,
  duration,
  videoId,
}: {
  data: VideoData;
  duration: number;
  videoId: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 px-4 py-2">
        {data.chapters && data.chapters.chapters.length > 0 && (
          <Progressbar numOfChapters={data.chapters.chapters.length} />
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {data.chapters && data.chapters.chapters.length > 0 ? (
          <div className="flex flex-col gap-2">
            <Chapterlist data={data} duration={duration} videoId={videoId} />
          </div>
        ) : (
          <div className="p-4 text-white">No chapters</div>
        )}
      </div>
    </div>
  );
}
