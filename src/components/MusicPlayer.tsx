"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function MusicPlayer({
  autoPlayTrigger,
  isMuted: externalMuted,
  onToggleMute: externalToggleMute,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [internalMuted, setInternalMuted] = useState(false);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  const isMuted = externalMuted !== undefined ? externalMuted : internalMuted;

  const toggleMute = () => {
    if (!audioElemRef.current) return;

    if (externalToggleMute) {
      externalToggleMute();
    } else {
      const nextMuted = !internalMuted;
      setInternalMuted(nextMuted);
      audioElemRef.current.muted = nextMuted;
      if (!nextMuted && !isPlaying) {
        audioElemRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  // Sync external muted state to audio element
  useEffect(() => {
    if (audioElemRef.current && externalMuted !== undefined) {
      audioElemRef.current.muted = externalMuted;
      if (!externalMuted && !isPlaying && autoPlayTrigger) {
        audioElemRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [externalMuted, isPlaying, autoPlayTrigger]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioElemRef.current) return;

    if (isPlaying && !isMuted) {
      // If playing, clicking mutes it
      toggleMute();
    } else if (isMuted) {
      // If muted, unmutes and plays
      toggleMute();
    } else {
      audioElemRef.current.volume = 0.45;
      audioElemRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked:", err));
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && audioElemRef.current) {
      audioElemRef.current.volume = 0.45;
      audioElemRef.current.muted = isMuted;
      audioElemRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay waiting for user gesture:", err));
    }
  }, [autoPlayTrigger, isMuted]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={audioElemRef}
        src="/audio/wedding-melody.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Main Pill Player */}
      <div
        className={`group relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-2xl ${
          isPlaying && !isMuted
            ? "bg-[#142921]/95 border-[#d4af37] text-[#fce09b] shadow-[0_0_20px_rgba(212,175,55,0.45)]"
            : "bg-[#0b1411]/90 border-stone-600/50 text-stone-300"
        }`}
      >
        {/* Animated Disc / Vinyl */}
        <button
          onClick={togglePlay}
          title={isMuted ? "Unmute Nasheed" : "Play/Pause"}
          className="relative cursor-pointer focus:outline-none"
        >
          <div
            className={`relative w-8 h-8 rounded-full bg-[#1b352c] border border-[#d4af37]/70 flex items-center justify-center transition-transform ${
              isPlaying && !isMuted ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "4s" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
          </div>
        </button>

        {/* Text Details */}
        <div className="flex flex-col text-left cursor-pointer" onClick={togglePlay}>
          <span className="text-[11px] font-semibold tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <Music className="w-3 h-3 inline text-[#d4af37]" />
            বারাকাল্লাহু লাকুমা
          </span>
          <span className="text-[10px] text-stone-300 max-w-[120px] sm:max-w-[140px] truncate">
            {isMuted
              ? "নিঃশব্দ (Muted)"
              : isPlaying
              ? "প্লে হচ্ছে (Wedding Nasheed)"
              : "চালু করতে চাপ দিন"}
          </span>
        </div>

        {/* Dedicated MUTE / UNMUTE Action Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          title={isMuted ? "সাউন্ড চালু করুন (Unmute)" : "সাউন্ড বন্ধ করুন (Mute)"}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition shadow-sm cursor-pointer ${
            isMuted
              ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50"
              : "bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-500/40"
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#d4af37]" />
              <span>Mute</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
