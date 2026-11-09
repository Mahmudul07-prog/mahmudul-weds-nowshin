"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, User } from "lucide-react";
import { WeddingConfig } from "@/types";

interface CoupleSectionProps {
  config: WeddingConfig;
  lang: "en" | "bn";
}

export default function CoupleSection({ config, lang }: CoupleSectionProps) {
  const { groom, bride } = config.couple;

  return (
    <section id="couple" className="py-20 px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-900/20 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            {lang === "en" ? "Two Souls, Bound by Faith" : "পবিত্র বন্ধনে আবদ্ধ দুটি হৃদয়"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "The Bride & The Groom" : "বর ও কনে পরিচিতি"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
        </div>

        {/* Couple Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Groom Card */}
          <div className="rounded-3xl p-6 sm:p-8 royal-glass royal-glass-hover transition-all duration-300 flex flex-col items-center text-center">
            {/* Photo Avatar */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-2 border-2 border-[#d4af37]/60 shadow-[0_0_30px_rgba(212,175,55,0.25)] mb-6">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#091511] relative">
                <Image
                  src={groom.image || "/images/groom-placeholder.svg"}
                  alt={groom.fullName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-2 right-2 p-2 rounded-full bg-[#13241f] border border-[#d4af37] text-[#d4af37] shadow">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
              {lang === "en" ? groom.role : "বর"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {lang === "en" ? groom.fullName : groom.nameBn}
            </h3>

            {/* Parents Info */}
            <div className="my-3 py-2 px-4 rounded-xl bg-white/5 border border-white/5 text-xs text-stone-300 max-w-xs">
              <p>
                <strong className="text-stone-400">Son of:</strong> {groom.fatherName} & {groom.motherName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-2 max-w-sm">
              {groom.bio}
            </p>
          </div>

          {/* Bride Card */}
          <div className="rounded-3xl p-6 sm:p-8 royal-glass royal-glass-hover transition-all duration-300 flex flex-col items-center text-center relative">
            {/* Status Ribbon if still awaiting meet */}
            {!bride.isRevealed && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#f472b6]/20 border border-[#f472b6]/40 text-[#fbc2eb] text-[10px] font-medium tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#f472b6]" />
                {lang === "en" ? "First Meet Awaited" : "দেখা হওয়ার অপেক্ষায়"}
              </div>
            )}

            {/* Photo Avatar */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-2 border-2 border-[#f472b6]/50 shadow-[0_0_30px_rgba(244,114,182,0.25)] mb-6">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#160912] relative">
                <Image
                  src={bride.image || "/images/bride-placeholder.svg"}
                  alt={bride.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute bottom-2 right-2 p-2 rounded-full bg-[#1e0e18] border border-[#f472b6] text-[#fbc2eb] shadow">
                <Heart className="w-4 h-4 fill-[#fbc2eb]" />
              </span>
            </div>

            <span className="text-[11px] uppercase tracking-widest text-[#fbc2eb] font-semibold mb-1">
              {lang === "en" ? bride.role : "কনে"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {lang === "en" ? bride.name : bride.nameBn}
            </h3>

            {/* Parents Info */}
            <div className="my-3 py-2 px-4 rounded-xl bg-white/5 border border-white/5 text-xs text-stone-300 max-w-xs">
              <p>
                <strong className="text-stone-400">Daughter of:</strong> {bride.fatherName} & {bride.motherName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-2 max-w-sm">
              {bride.bio}
            </p>

            {/* Modular note for user */}
            <div className="mt-4 p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[11px] text-[#fce09b] max-w-xs">
              💍 {lang === "en" 
                ? "Bride details & photo will be unveiled right after our first official meeting!" 
                : "কনের সাথে প্রথম দেখার পর সুন্দর ছবি ও বিস্তারিত তথ্য এই কার্ডে যুক্ত করা হবে ইনশাআল্লাহ!"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
