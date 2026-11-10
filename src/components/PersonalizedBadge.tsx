"use client";

import React, { useState } from "react";
import { UserCheck, Share2, Globe, Volume2, VolumeX } from "lucide-react";
import LinkGeneratorModal from "./LinkGeneratorModal";

interface PersonalizedBadgeProps {
  guestName: string;
  lang: "en" | "bn";
  onToggleLang: () => void;
  groomName: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function PersonalizedBadge({
  guestName,
  lang,
  onToggleLang,
  groomName,
  isMuted,
  onToggleMute,
}: PersonalizedBadgeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-[#08110e]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Guest Greeting Pill */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37]">
              <UserCheck className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-col truncate">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                {lang === "en" ? "Invitation For" : "আমন্ত্রণপত্র গ্রাহক"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#fce09b] truncate">
                {guestName}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Mute / Unmute Button in Header */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border transition ${
                  isMuted
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                    : "bg-[#13241f] border-[#d4af37]/35 text-[#fce09b] hover:bg-[#1a332c]"
                }`}
                title={isMuted ? "সাউন্ড চালু করুন (Unmute)" : "সাউন্ড বন্ধ করুন (Mute)"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] hidden sm:inline">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                    <span className="text-[11px] hidden sm:inline">Mute</span>
                  </>
                )}
              </button>
            )}

            {/* Create Link for another guest */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#13241f] hover:bg-[#1a332c] text-[#fce09b] border border-[#d4af37]/35 transition shadow-sm"
              title="Generate a custom link for any guest"
            >
              <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">
                {lang === "en" ? "Create Guest Link" : "নতুন লিংক তৈরি"}
              </span>
              <span className="sm:hidden">Share</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/40 transition"
              title="Toggle Bengali / English"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "বাংলা" : "English"}</span>
            </button>
          </div>
        </div>
      </header>

      <LinkGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        groomName={groomName}
      />
    </>
  );
}
