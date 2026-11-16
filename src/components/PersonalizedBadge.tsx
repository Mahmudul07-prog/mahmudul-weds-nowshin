"use client";

import React, { useState } from "react";
import { UserCheck, Share2, Globe, Volume2, VolumeX, Menu, X, Calendar, Heart, Send, CheckCircle2 } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "#events",
      labelEn: "Schedule",
      labelBn: "অনুষ্ঠান সূচি",
      highlight: true,
      icon: <Calendar className="w-3.5 h-3.5" />,
    },
    {
      href: "#journey",
      labelEn: "Our Story",
      labelBn: "আমাদের গল্প",
      icon: <Heart className="w-3.5 h-3.5" />,
    },
    {
      href: "#rsvp",
      labelEn: "RSVP",
      labelBn: "উপস্থিতি (RSVP)",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    {
      href: "#wishes",
      labelEn: "Wishes",
      labelBn: "দোয়ার বার্তা",
      icon: <Send className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-[#08110e]/95 backdrop-blur-md border-b border-[#d4af37]/25 py-2.5 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Guest Greeting Pill */}
          <div className="flex items-center gap-2 overflow-hidden flex-shrink-0">
            <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37]">
              <UserCheck className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-col truncate">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium">
                {lang === "en" ? "Invited Guest" : "আমন্ত্রিত মেহমান"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#fce09b] truncate max-w-[120px] sm:max-w-[180px]">
                {guestName}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#0e1d17]/80 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                  item.highlight
                    ? "bg-[#d4af37]/20 text-[#fce09b] border border-[#d4af37]/50 shadow-[0_0_10px_rgba(212,175,55,0.25)] hover:bg-[#d4af37]/30"
                    : "text-stone-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{lang === "en" ? item.labelEn : item.labelBn}</span>
              </a>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Mute / Unmute Button */}
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
                {lang === "en" ? "Create Link" : "লিংক বানান"}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/40 transition"
              title="Toggle Bengali / English"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "বাংলা" : "EN"}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-full bg-[#13241f] text-stone-300 border border-[#d4af37]/30 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                  item.highlight
                    ? "bg-[#d4af37]/20 text-[#fce09b] border border-[#d4af37]/40"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{lang === "en" ? item.labelEn : item.labelBn}</span>
                {item.highlight && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37] text-black font-bold">
                    Special
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </header>

      <LinkGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        groomName={groomName}
      />
    </>
  );
}
