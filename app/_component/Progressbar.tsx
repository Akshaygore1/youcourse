"use client";

import React, { useEffect, useState } from "react";
import { useVideoStore } from "../../store/store";

function Progressbar({ numOfChapters }: { numOfChapters: number }) {
  const [percent, setPercent] = useState(0);
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const { completedVideos } = useVideoStore();

  useEffect(() => {
    setPercent((completedVideos.length / numOfChapters) * 100);
  }, [completedVideos.length, numOfChapters]);

  return (
    <div className="w-full p-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-white-700">Progress</span>
        <span className="text-sm font-semibold text-white-700">
          {Math.round(clampedPercent)}% completed
        </span>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 transition-all duration-300 ease-in-out"
          style={{ width: `${clampedPercent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Progressbar;
