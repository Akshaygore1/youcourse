import ChapterList from "@/app/_component/ChapterList";
import VideoPlayer from "@/app/_component/VideoPlayer";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-row gap-2 max-h-screen h-screen overflow-hidden">
      <div className="flex flex-col gap-2 w-3/4 overflow-y-auto">
        <VideoPlayer />
      </div>
      <div className="flex flex-col gap-2 w-1/4 overflow-y-auto">
        <ChapterList params={params} />
      </div>
    </div>
  );
}
