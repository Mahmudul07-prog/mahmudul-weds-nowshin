"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  // Soft gentle ambient synth chords for romantic backdrop
  const chords = [
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
    [220.0, 261.63, 329.63, 392.0],  // Am7
    [174.61, 220.0, 261.63, 329.63], // Fmaj7
    [196.0, 246.94, 293.66, 392.0],  // G
  ];

  const playSynthesizedAmbient = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let chordIndex = 0;
      const playNextChord = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "closed") return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle envelope
          const startTime = ctx.currentTime + i * 0.15;
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.025, startTime + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 4.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 4.8);
        });
      };

      playNextChord();
      intervalRef.current = setInterval(playNextChord, 4600);
    } catch (e) {
      console.warn("Web audio not supported", e);
      setAudioSupported(false);
    }
  };

  const stopSynthesizedAmbient = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioElemRef.current) {
        audioElemRef.current.pause();
      }
      stopSynthesizedAmbient();
      setIsPlaying(false);
    } else {
      if (audioElemRef.current && audioElemRef.current.src) {
        audioElemRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            playSynthesizedAmbient();
            setIsPlaying(true);
          });
      } else {
        playSynthesizedAmbient();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      toggleMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopSynthesizedAmbient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!audioSupported) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio ref={audioElemRef} src="/audio/wedding-melody.mp3" loop preload="none" />
      
      <button
        onClick={toggleMusic}
        aria-label="Toggle background music"
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-2xl ${
          isPlaying
            ? "bg-[#142921]/90 border-[#d4af37] text-[#fce09b] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            : "bg-[#0b1411]/80 border-[#d4af37]/30 text-stone-300 hover:border-[#d4af37]/60"
        }`}
      >
        {/* Animated Disc / Vinyl */}
        <div
          className={`relative w-7 h-7 rounded-full bg-[#1e3a30] border border-[#d4af37]/60 flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "3s" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#d4af37] flex items-center gap-1.5">
            <Music className="w-3 h-3 inline" />
            {isPlaying ? "Music Playing" : "Wedding Symphony"}
          </span>
          <span className="text-[10px] text-stone-400 max-w-[110px] truncate">
            {isPlaying ? "Instrumental Melody" : "Tap to Play"}
          </span>
        </div>

        <div className="pl-1">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </button>
    </div>
  );
}
