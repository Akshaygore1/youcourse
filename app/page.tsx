"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useVideoStore } from "./store";

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const { push } = useRouter();
  const store = useVideoStore();

  const handleClick = () => {
    if (url) {
      const videoId = url.split("v=")[1];
      push(`/video/${videoId}`);
    }
  };

  return (
    <main className=" min-h-screen p-24">
      <div className="flex justify-center items-center">
        Make Course Out of Your Youtube Video
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Enter Youtube Video ID"
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 text-black"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Open Youtube
        </button>
      </div>
    </main>
  );
}
