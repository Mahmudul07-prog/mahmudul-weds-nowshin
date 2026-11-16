"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Heart, Send, CheckCircle2, Download, Sparkles } from "lucide-react";
import { WeddingConfig } from "@/types";

interface HeroSectionProps {
  config: WeddingConfig;
  lang: "en" | "bn";
  guestName: string;
}

export default function HeroSection({ config, lang, guestName }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(config.dates.targetWeddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config.dates.targetWeddingDate]);

  return (
    <section id="home" className="relative pt-24 pb-20 px-4 text-center overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#d4af37]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#d4af37]/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Arabic Bismillah Calligraphy */}
        <div className="mb-4">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#d4af37] tracking-wider drop-shadow-md">
            {config.couple.bismillahArabic}
          </p>
          <p className="text-xs text-stone-400 italic mt-1 font-light">
            {config.couple.bismillahText}
          </p>
        </div>

        {/* Personalized Welcome Banner */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#13241f]/90 border border-[#d4af37]/40 mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="text-xs text-[#fce09b] font-medium tracking-wide">
            {lang === "en" ? `Welcome, ${guestName}` : `শুভাগমন, ${guestName}`}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-2">
          {lang === "en" ? "We Are Getting Married" : "আমরা শুরু করতে যাচ্ছি এক পবিত্র বন্ধন"}
        </p>

        {/* Couple Names */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-wide my-4 leading-tight">
          <span className="gold-gradient-text">{config.couple.groom.name}</span>
          <span className="block sm:inline sm:mx-4 font-serif text-3xl sm:text-5xl text-[#d4af37] font-light">
            &
          </span>
          <span className="gold-gradient-text">{config.couple.bride.name}</span>
        </h1>

        {/* Islamic Quote */}
        <div className="my-8 max-w-2xl mx-auto p-4 sm:p-6 rounded-2xl royal-glass border border-[#d4af37]/25">
          <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
            &ldquo;{lang === "en" ? config.couple.quoteEnglish : config.couple.quoteBengali}&rdquo;
          </p>
        </div>

        {/* Countdown Timer Container */}
        <div className="my-10 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              {config.dates.isDateFinalized
                ? (lang === "en" ? "Countdown To The Auspicious Union" : "শুভদিনের প্রতীক্ষা")
                : (lang === "en" ? "Official Countdown (Tentative)" : "অফিসিয়াল কাউন্টডাউন (প্রস্তাবিত সময়)")}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: lang === "en" ? "Days" : "দিন", value: timeLeft.days },
              { label: lang === "en" ? "Hours" : "ঘন্টা", value: timeLeft.hours },
              { label: lang === "en" ? "Minutes" : "মিনিট", value: timeLeft.minutes },
              { label: lang === "en" ? "Seconds" : "সেকেন্ড", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-5 rounded-2xl royal-glass border border-[#d4af37]/30 shadow-lg text-center"
              >
                <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#fce09b]">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Date & Location Snapshot */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13241f] border border-[#d4af37]/30">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              {lang === "en" ? config.dates.displayDate : config.dates.displayDateBn}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13241f] border border-[#d4af37]/30">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              {lang === "en" ? "Pir Bari, Laksam, Cumilla" : "পীর বাড়ি, লাকসাম, কুমিল্লা"}
            </span>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="#card"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:scale-105 transition shadow-lg shadow-[#d4af37]/35 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#061a14]" />
            {lang === "en" ? "Download Invitation Card" : "নিমন্ত্রণপত্র ডাউনলোড করুন"}
          </a>
          <a
            href="#rsvp"
            className="px-6 py-3 rounded-full royal-glass hover:bg-[#1a352c] text-[#fce09b] border border-[#d4af37]/40 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            {lang === "en" ? "Confirm Attendance (RSVP)" : "উপস্থিতি নিশ্চিত করুন (RSVP)"}
          </a>
          <a
            href="#events"
            className="px-6 py-3 rounded-full royal-glass hover:bg-[#1a352c] text-stone-200 border border-white/10 text-xs sm:text-sm font-medium transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            {lang === "en" ? "View Ceremony Schedule" : "অনুষ্ঠান সূচি"}
          </a>
          <a
            href="#wishes"
            className="px-6 py-3 rounded-full royal-glass hover:bg-[#1a352c] text-stone-200 border border-white/10 text-xs sm:text-sm font-medium transition flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-[#d4af37]" />
            {lang === "en" ? "Leave Blessings" : "দোয়ার বার্তা পাঠান"}
          </a>
        </div>
      </div>
    </section>
  );
}
