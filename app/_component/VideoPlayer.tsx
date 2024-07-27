"use client";
import React, { useEffect, useState, useRef } from "react";
import { useVideoStore } from "../../store/store";
import ReactPlayer from "react-player";
import { Play, Pause, Maximize, Minimize, Volume2, Volume } from "lucide-react";

interface VideoPlayerProps {
  selectedVideo: {
    id: string;
    timeStamp: number;
    maxTime: number;
    isLast: boolean;
  };
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function VideoPlayer() {
  const {
    selectedVideo,
    setSelectedVideo,
    completedVideos,
    setCompletedVideos,
  } = useVideoStore();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (selectedVideo) {
      const { id, timeStamp, maxTime } = selectedVideo;
      const url = `https://www.youtube.com/watch?v=${id}`;
      setVideoUrl(url);
      setKey((prevKey) => prevKey + 1);
      setCountdown(maxTime - timeStamp);

      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.seekTo(timeStamp, "seconds");
        }
      }, 100);
    }
  }, [selectedVideo]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (playing && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [playing, countdown]);

  const handleReady = () => {
    if (selectedVideo && playerRef.current) {
      playerRef.current.seekTo(selectedVideo.timeStamp, "seconds");
    }
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setPlayed(playedSeconds);
    if (playedSeconds < minTime) {
      playerRef.current?.seekTo(minTime, "seconds");
    }
    if (maxTime !== null && playedSeconds > maxTime) {
      playerRef.current?.seekTo(maxTime, "seconds");
      setPlaying(false);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
    if (selectedVideo) {
      setMinTime(selectedVideo.timeStamp);
      setMaxTime(selectedVideo.maxTime);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current?.seekTo(seekTo, "seconds");
    if (selectedVideo) {
      setCountdown(selectedVideo.maxTime - seekTo);
    }
  };

  const handleFullScreen = () => {
    if (videoContainerRef.current) {
      if (!isFullScreen) {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).mozRequestFullScreen) {
          (videoContainerRef.current as any).mozRequestFullScreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).msRequestFullscreen) {
          (videoContainerRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleMarkAsCompleted = () => {
    console.log("mark as completed");
    if (selectedVideo) {
      setCompletedVideos([
        ...completedVideos,
        {
          id: selectedVideo.id,
          timeStamp: selectedVideo.timeStamp,
          maxTime: selectedVideo.maxTime,
          isLast: selectedVideo.isLast,
        },
      ]);
      setSelectedVideo(null);
    }
  };
  return (
    <div className="flex flex-col gap-2 h-full w-full p-4 ">
      {videoUrl && (
        <div
          ref={videoContainerRef}
          className="video-container h-[80vh] w-full relative"
        >
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            key={key}
            playing={playing}
            onReady={handleReady}
            onProgress={handleProgress}
            onPause={handlePause}
            onPlay={handlePlay}
            onDuration={handleDuration}
            width="100%"
            height="100%"
            controls={false}
            pip={true}
            muted={muted}
            autoPlay={true}
          />
          <div className="flex flex-row gap-2 p-2 items-center bottom-4 left-4 right-4 rounded-lg">
            <input
              type="range"
              min={minTime}
              max={maxTime ?? duration}
              value={played}
              onChange={handleSeekChange}
              className="w-full h-1 bg-gray-200 appearance-none rounded-md overflow-hidden outline-none cursor-pointer "
            />
            <button onClick={() => setPlaying(!playing)} className="text-white">
              {playing ? <Pause /> : <Play />}
            </button>
            <button onClick={() => setMuted(!muted)} className="text-white">
              {muted ? <Volume /> : <Volume2 />}
            </button>
            <div className="flex flex-row gap-1 px-2">
              <div>{formatTime(countdown)}</div>
              <div>/</div>
              <div>
                {selectedVideo &&
                  (selectedVideo.isLast
                    ? formatTime(duration - selectedVideo.timeStamp)
                    : formatTime(
                        selectedVideo.maxTime - selectedVideo.timeStamp
                      ))}
              </div>
            </div>
            <button onClick={handleFullScreen} className="text-white">
              {isFullScreen ? <Minimize /> : <Maximize />}
            </button>
          </div>
          <div className="flex flex-row gap-2 p-2 items-center bottom-4 left-4 right-4 rounded-lg">
            <div className="flex flex-1 justify-end gap-2 py-4">
              <button
                onClick={handleMarkAsCompleted}
                className="text-white bg-red-500 p-2 rounded-lg"
              >
                Mark As Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
