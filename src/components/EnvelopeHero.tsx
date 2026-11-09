"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { MailOpen, Heart, Sparkles } from "lucide-react";

interface EnvelopeHeroProps {
  guestName: string;
  groomName: string;
  brideName: string;
  onOpen: () => void;
  lang: "en" | "bn";
}

export default function EnvelopeHero({
  guestName,
  groomName,
  brideName,
  onOpen,
  lang,
}: EnvelopeHeroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpening(true);

    // Fire fireworks / confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#fce09b", "#f472b6", "#ffffff", "#aa8214"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ["#d4af37", "#f472b6"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ["#d4af37", "#fce09b"],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error", e);
    }

    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-[#08110e] overflow-hidden">
      {/* Background Royal Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-emerald-950/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none" />

      {/* Main Luxury Envelope Card */}
      <div
        className={`relative w-full max-w-xl mx-auto transition-all duration-700 transform ${
          isOpening ? "scale-105 opacity-0 -translate-y-6" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative rounded-3xl p-6 sm:p-10 royal-glass border-2 border-[#d4af37]/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.2)] text-center overflow-hidden">
          {/* Ornate Gold Corners */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />

          {/* Envelope Top Flap Silhouette */}
          <div className="relative mb-6">
            <p className="text-xs sm:text-sm tracking-[0.25em] text-[#d4af37] uppercase font-serif mb-1">
              {lang === "en" ? "Royal Wedding Invitation" : "রাজকীয় বিবাহ নিমন্ত্রণপত্র"}
            </p>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fce09b] tracking-wide my-3">
              {groomName} <span className="font-sans text-xl text-[#d4af37] font-light">&</span> {brideName}
            </h1>
          </div>

          {/* Personalized Salutation */}
          <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#0a1813]/85 border border-[#d4af37]/30 shadow-inner">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest text-stone-400 mb-1">
              {lang === "en" ? "Cordially Prepared For" : "শ্রদ্ধাভাজন অতিথি"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#ffffff] font-semibold tracking-wide text-shadow">
              {guestName}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed max-w-md mx-auto">
              {lang === "en"
                ? "You and your family are respectfully invited to join us and bestow your sincere prayers as we embark on this sacred journey of eternal togetherness."
                : "পবিত্র বৈবাহিক বন্ধনে আবদ্ধ হতে চলেছি। এই আনন্দঘন ক্ষণে আপনার সপরিবার উপস্থিতি এবং আন্তরিক দোয়া আমাদের জীবনের নতুন পথচলাকে আরও বরকতময় করবে।"}
            </p>
          </div>

          {/* Interactive Wax Seal Stamp Button */}
          <div className="my-6 flex flex-col items-center justify-center">
            <button
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95"
              aria-label="Open wedding invitation"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-md group-hover:bg-[#d4af37]/40 transition" />
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <Image
                  src="/images/wax-seal.svg"
                  alt="Royal Wax Seal"
                  width={112}
                  height={112}
                  className={`w-full h-full drop-shadow-[0_10px_20px_rgba(185,28,28,0.5)] ${
                    isOpening ? "animate-seal-break" : ""
                  }`}
                  priority
                />
              </div>
            </button>

            <button
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className="mt-4 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-serif font-semibold text-sm sm:text-base text-[#0b1411] bg-gradient-to-r from-[#fce09b] via-[#d4af37] to-[#e6c148] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MailOpen className="w-5 h-5 text-[#0b1411]" />
              <span>
                {isOpening
                  ? (lang === "en" ? "Opening Royal Invitation..." : "আমন্ত্রণপত্র উন্মোচন হচ্ছে...")
                  : (lang === "en" ? "Open Invitation" : "আমন্ত্রণপত্র খুলুন")}
              </span>
              <Sparkles className="w-4 h-4 text-[#0b1411]" />
            </button>
            <p className="text-[11px] text-stone-400 mt-2 font-light">
              {lang === "en" ? "Tap seal to open with music & ceremony details" : "অনুষ্ঠান সূচি দেখতে সিল মোহরে চাপ দিন"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
