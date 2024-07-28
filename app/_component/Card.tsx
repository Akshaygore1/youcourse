import React from "react";
import { convertSecondsToHours } from "../utils";

function Card({
  title,
  duration,
  chapters,
}: {
  title: string;
  duration: number;
  chapters: any;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 className="text-md font-bold text-gray-800 mb-2">{title}</h2>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-600">
            {convertSecondsToHours(duration)} Hours{" "}
          </p>
          <p className="text-sm text-gray-800">
            {chapters.chapters.length} Chapters
          </p>
        </div>
        <div className="text-sm text-gray-800 flex items-center">Continue</div>
      </div>
    </div>
  );
}

export default Card;
