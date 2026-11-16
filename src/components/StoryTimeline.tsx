"use client";

import React from "react";
import { Heart, Sparkles, Lock, CheckCircle2, Calendar, Milestone } from "lucide-react";
import { StoryMilestone } from "@/types";

interface StoryTimelineProps {
  milestones: StoryMilestone[];
  lang: "en" | "bn";
}

export default function StoryTimeline({ milestones, lang }: StoryTimelineProps) {
  return (
    <section id="journey" className="py-20 px-4 relative overflow-hidden bg-[#070e0c]/60">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            {lang === "en" ? "How Destiny Brought Us Together" : "আমাদের পথচলার গল্প"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "Our Journey & Chapters" : "অধ্যায় ও মাইলফলক"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Milestone className="w-4 h-4 text-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Every love story is beautiful, but ours is written with patience, prayers, and family blessings."
              : "পারিবারিক দোয়ায় গাঁথা আমাদের এই বন্ধন। প্রতিটি মুহূর্তের স্মৃতি ক্রমান্বয়ে এই পাতায় ফুটে উঠবে।"}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#d4af37]/30 ml-4 sm:ml-32 space-y-12">
          {milestones.map((item, index) => {
            const isCompleted = item.isUnlocked;

            return (
              <div key={item.id} className="relative pl-8 sm:pl-12 group">
                {/* Node icon on line */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isCompleted
                      ? "bg-[#13241f] border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-[#0b1411] border-stone-600 text-stone-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : item.id === "step-2" ? (
                    <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Left side date indicator (for tablets & desktop) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block">
                    {lang === "en" ? item.date : item.dateBn || item.date}
                  </span>
                  <span className="text-[10px] text-stone-500 block">Chapter {index + 1}</span>
                </div>

                {/* Content Card */}
                <div
                  className={`p-6 rounded-2xl royal-glass border transition-all duration-300 ${
                    isCompleted
                      ? "border-[#d4af37]/40 shadow-lg"
                      : "border-white/10 opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Mobile Date */}
                  <div className="sm:hidden flex items-center gap-2 mb-2 text-xs font-medium text-[#d4af37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === "en" ? item.date : item.dateBn || item.date}</span>
                    <span className="text-stone-500">• Chapter {index + 1}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#fce09b]">
                      {lang === "en" ? item.title : item.titleBn || item.title}
                    </h3>
                    {item.statusBadge && (
                      <span
                        className={`text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full border ${
                          isCompleted
                            ? "bg-[#d4af37]/15 border-[#d4af37]/40 text-[#fce09b]"
                            : item.id === "step-2"
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse"
                            : "bg-white/5 border-white/10 text-stone-400"
                        }`}
                      >
                        {item.statusBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {lang === "en" ? item.description : item.descriptionBn || item.description}
                  </p>

                  {/* Special highlight for Chapter 2 */}
                  {item.id === "step-2" && (
                    item.isUnlocked ? (
                      <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 shadow-sm">
                        <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>
                          {lang === "en"
                            ? "Alhamdulillah, first meet accomplished on 13 Nov 2026 at Maniksar Khan Bari (Bride's Residence)!"
                            : "আলহামদুলিল্লাহ, ১৩ নভেম্বর ২০২৬ তারিখে মানিকসার খান বাড়ি (কনের নিজ বাড়ি)-তে প্রথম দেখা সফলভাবে সম্পন্ন হয়েছে!"}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>
                          {lang === "en"
                            ? "This special milestone will be updated with date & notes as soon as our first meet happens!"
                            : "দেখা হওয়ার পর এই অধ্যায়ে স্মরণীয় তারিখ ও বিশেষ অনুভূতি স্বয়ংক্রিয়ভাবে যুক্ত হবে।"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
