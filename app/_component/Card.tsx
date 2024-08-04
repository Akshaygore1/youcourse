"use client";
import React from "react";
import { convertSecondsToHours } from "../utils";
import { redirect, useRouter } from "next/navigation";

function Card({
  title,
  duration,
  chapters,
  videoId,
}: {
  title: string;
  duration: number;
  chapters: any;
  videoId: string;
}) {
  const router = useRouter();
  console.log("---", title, duration, chapters, videoId);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 className="text-md font-bold text-gray-800 mb-2 min-h-[3rem]">
        {title}
      </h2>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-600">
            {convertSecondsToHours(duration)} Hours
          </p>
          <p className="text-sm text-gray-800">{chapters.length} Chapters</p>
        </div>
        <div
          className="text-lg text-gray-800 flex items-center hover:text-blue-500 cursor-pointer"
          onClick={() => {
            console.log("continue");
            router.push(`/video/${videoId}`);
          }}
        >
          Continue
        </div>
      </div>
    </div>
  );
}

export default Card;
