"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Check, Send, Award, Clock } from "lucide-react";
import { DuaEntry } from "@/types";

interface DuaBlessingsSectionProps {
  initialGuestName: string;
  lang: "en" | "bn";
}

const SUNNAH_DUAS = [
  {
    id: "barakallah",
    badge: "রাসূল (সাঃ)-এর সুন্নতি দোয়া",
    badgeEn: "Sunnah Marriage Blessing",
    arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration: "Bārakallāhu laka wa bāraka 'alayka wa jama'a baynakumā fī khayr",
    meaningBn: "আল্লাহ তোমাদের দাম্পত্য জীবনে অফুরন্ত বরকত দান করুন, তোমাদের ওপর রহমত বর্ষণ করুন এবং কল্যাণের সাথে তোমাদের উভয়কে একত্রিত রাখুন।",
    meaningEn: "May Allah bless for you, and shower His blessings upon you, and bring you together in goodness. (Abu Dawud, Tirmidhi)",
    icon: "🤲",
  },
  {
    id: "rabbana",
    badge: "পবিত্র কুরআনের আয়াত (সূরা ফুরকান: ৭৪)",
    badgeEn: "Quranic Prayer (Surah Al-Furqan: 74)",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbanā hablana min azwājinā wa dhurriyyātinā qurrata a'yunin waj'alnā lil-muttaqīna imāmā",
    meaningBn: "হে আমাদের প্রতিপালক! আমাদের জীবনসঙ্গী ও সন্তানদের আমাদের চোখের শীতলতা বানিয়ে দিন এবং আমাদেরকে মুত্তাকীদের আদর্শ নেতা বানান।",
    meaningEn: "Our Lord! Grant unto us in our spouses and offspring the comfort of our eyes and make us leaders of the righteous.",
    icon: "🕊️",
  },
  {
    id: "rizq",
    badge: "রিজিক, ভালোবাসা ও দীর্ঘায়ুর দোয়া",
    badgeEn: "Prayer for Abundance, Love & Peace",
    arabic: "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَوَسِّعْ عَلَيْهِمَا فِي رِزْقِهِمَا",
    transliteration: "Allāhumma bārik lahumā wa bārik 'alayhimā wa wassi' 'alayhimā fī rizqihimā",
    meaningBn: "হে আল্লাহ! তাঁদের উভয়কে বরকতময় করুন, তাঁদের ওপর রহমত ঢেলে দিন এবং তাঁদের রিজিকে অফুরন্ত প্রাচুর্য ও বরকত দিন।",
    meaningEn: "O Allah! Bless them both, shower Your grace upon them, and expand their sustenance with love and ease.",
    icon: "💎",
  },
];

export default function DuaBlessingsSection({
  initialGuestName,
  lang,
}: DuaBlessingsSectionProps) {
  const [totalDuas, setTotalDuas] = useState(234);
  const [duaCounts, setDuaCounts] = useState<Record<string, number>>({
    barakallah: 142,
    rabbana: 58,
    rizq: 34,
  });
  const [recentBlessings, setRecentBlessings] = useState<DuaEntry[]>([]);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});
  const [guestName, setGuestName] = useState(
    initialGuestName && initialGuestName !== "Honored Guest" ? initialGuestName : ""
  );

  useEffect(() => {
    fetch("/api/duas")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (typeof data.totalDuas === "number") setTotalDuas(data.totalDuas);
          if (data.duaCounts) setDuaCounts(data.duaCounts);
          if (Array.isArray(data.recentBlessings)) setRecentBlessings(data.recentBlessings);
        }
      })
      .catch((err) => console.warn("Failed to load duas:", err));
  }, []);

  const handleSendDua = async (dua: (typeof SUNNAH_DUAS)[0]) => {
    if (sendingId) return;
    setSendingId(dua.id);

    // Fire fireworks / confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#d4af37", "#f3c25b", "#10b981", "#ffffff"],
    });

    try {
      const res = await fetch("/api/duas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim() || (lang === "en" ? "Loving Well-Wisher" : "সম্মানিত শুভাকাঙ্ক্ষী"),
          duaId: dua.id,
          duaTitle: lang === "en" ? dua.badgeEn : dua.badge,
          duaArabic: dua.arabic,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTotalDuas(data.totalDuas);
        setDuaCounts(data.duaCounts);
        if (data.recentBlessings) setRecentBlessings(data.recentBlessings);
        setSentMap((prev) => ({ ...prev, [dua.id]: true }));
      }
    } catch (e) {
      console.error("Dua error:", e);
      // Fallback optimistic increment
      setTotalDuas((prev) => prev + 1);
      setDuaCounts((prev) => ({ ...prev, [dua.id]: (prev[dua.id] || 0) + 1 }));
      setSentMap((prev) => ({ ...prev, [dua.id]: true }));
    } finally {
      setSendingId(null);
    }
  };

  return (
    <section id="duas" className="py-20 px-4 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13241f] border border-[#d4af37]/35 text-xs text-[#fce09b] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "en" ? "Gifts of Sacred Prayers" : "দোয়ার তোহফা ও সুন্নতি বরকত"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            <span className="gold-gradient-text">
              {lang === "en" ? "Send Sacred Duas to the Couple" : "বর-কনেকে বরকতময় দোয়া পাঠান"}
            </span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {lang === "en"
              ? "Touch any of the authentic Sunnah prayers below to send your heartfelt blessings. Your prayer will be cherished eternally."
              : "রাসূলুল্লাহ (সাঃ)-এর শেখানো সুন্নতি দোয়াগুলোর যেকোনোটিতে স্পর্শ করে মাহমুদুল ও মিলির নতুন জীবনের জন্য আপনার বরকতময় শুভেচ্ছা পৌঁছে দিন।"}
          </p>

          {/* Live Dua Counter Badge */}
          <div className="mt-6 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#13241f] via-[#1a382e] to-[#13241f] border border-[#d4af37]/45 shadow-lg shadow-[#d4af37]/15">
            <Award className="w-5 h-5 text-[#d4af37]" />
            <span className="text-xs sm:text-sm text-stone-200">
              {lang === "en" ? "Total Blessings Bestowed:" : "আলহামদুলিল্লাহ, সংগৃহীত নেক দোয়া:"}
            </span>
            <span className="font-serif font-bold text-lg sm:text-xl text-[#fce09b] tracking-wider">
              {totalDuas.toLocaleString()}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* 3 Interactive Sunnah Dua Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SUNNAH_DUAS.map((dua) => {
            const isSent = sentMap[dua.id];
            const isThisSending = sendingId === dua.id;
            const count = duaCounts[dua.id] || 0;

            return (
              <div
                key={dua.id}
                className="rounded-3xl p-6 royal-glass royal-glass-hover border border-[#d4af37]/30 transition-all duration-300 flex flex-col justify-between relative group hover:scale-[1.02]"
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-[#d4af37]/15 text-[#fce09b] border border-[#d4af37]/30">
                      {lang === "en" ? dua.badgeEn : dua.badge}
                    </span>
                    <span className="text-lg">{dua.icon}</span>
                  </div>

                  {/* Arabic Calligraphy */}
                  <div className="my-4 p-4 rounded-2xl bg-black/35 border border-[#d4af37]/25 text-center">
                    <p
                      className="font-serif text-lg sm:text-xl text-[#fce09b] leading-loose tracking-wide font-semibold"
                      dir="rtl"
                    >
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Meaning */}
                  <p className="text-xs text-stone-300 leading-relaxed italic mb-3">
                    &ldquo;{lang === "en" ? dua.meaningEn : dua.meaningBn}&rdquo;
                  </p>
                  <p className="text-[10px] text-stone-500 font-light mb-4">
                    {dua.transliteration}
                  </p>
                </div>

                {/* Footer Action & Count */}
                <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>{count} জন দোয়া দিয়েছেন</span>
                  </span>

                  <button
                    onClick={() => handleSendDua(dua)}
                    disabled={isThisSending}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow cursor-pointer ${
                      isSent
                        ? "bg-emerald-900/60 border border-emerald-500 text-emerald-300"
                        : "bg-gradient-to-r from-[#d4af37] to-[#aa8214] text-[#061a14] hover:brightness-110 active:scale-95"
                    }`}
                  >
                    {isSent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === "en" ? "Sent! 🤲" : "দোয়া অর্পিত ✨"}</span>
                      </>
                    ) : isThisSending ? (
                      <span>{lang === "en" ? "Sending..." : "পাঠানো হচ্ছে..."}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === "en" ? "Send Dua 🤲" : "দোয়া পাঠান 🤲"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Recent Blessings Marquee/Ticker */}
        {recentBlessings.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#13241f]/75 border border-[#d4af37]/30">
            <div className="flex items-center gap-2 mb-2 text-xs text-[#d4af37] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Recent Prayers from Loved Ones:" : "অতিথিদের সাম্প্রতিক দোয়া ও শুভাশিস:"}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {recentBlessings.slice(0, 5).map((b) => (
                <div
                  key={b.id}
                  className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 text-stone-300 flex items-center gap-2"
                >
                  <span className="text-[#fce09b] font-medium">{b.guestName}:</span>
                  <span className="text-stone-400 truncate max-w-[200px]">{b.duaTitle}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
