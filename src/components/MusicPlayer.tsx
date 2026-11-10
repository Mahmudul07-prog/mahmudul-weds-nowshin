"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioElemRef.current) return;

    if (isPlaying) {
      audioElemRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElemRef.current.volume = 0.45; // gentle, comforting volume
      audioElemRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && audioElemRef.current) {
      audioElemRef.current.volume = 0.45;
      audioElemRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("User interaction required for autoplay:", err));
    }
  }, [autoPlayTrigger, isPlaying]);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioElemRef}
        src="/audio/wedding-melody.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleMusic}
        aria-label="Toggle Islamic Wedding Nasheed"
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer ${
          isPlaying
            ? "bg-[#142921]/95 border-[#d4af37] text-[#fce09b] shadow-[0_0_20px_rgba(212,175,55,0.45)] scale-105"
            : "bg-[#0b1411]/85 border-[#d4af37]/35 text-stone-300 hover:border-[#d4af37]/70"
        }`}
      >
        {/* Animated Disc / Vinyl */}
        <div
          className={`relative w-8 h-8 rounded-full bg-[#1b352c] border border-[#d4af37]/70 flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "4s" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <Music className="w-3 h-3 inline text-[#d4af37]" />
            {isPlaying ? "বারাকাল্লাহু লাকুমা" : "বিয়ের মধুর গজল"}
          </span>
          <span className="text-[10px] text-stone-300 max-w-[130px] truncate">
            {isPlaying ? "প্লে হচ্ছে... (Wedding Nasheed)" : "শুনতে ক্লিক করুন 🎵"}
          </span>
        </div>

        {/* Equalizer animation / volume icon */}
        <div className="pl-1 flex items-center gap-1">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-[#d4af37] rounded-full animate-[bounce_0.8s_infinite]" style={{ height: "60%" }} />
              <span className="w-1 bg-[#fce09b] rounded-full animate-[bounce_0.6s_infinite_0.2s]" style={{ height: "100%" }} />
              <span className="w-1 bg-[#d4af37] rounded-full animate-[bounce_0.7s_infinite_0.4s]" style={{ height: "40%" }} />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </button>
    </div>
  );
}
