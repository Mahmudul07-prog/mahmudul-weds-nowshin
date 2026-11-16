"use client";

import React, { useState, useRef } from "react";
import { Download, Share2, Sparkles, User, RefreshCw, Check, Heart, MapPin, Calendar, Phone, Award } from "lucide-react";
import { toJpeg } from "html-to-image";
import confetti from "canvas-confetti";
import { WeddingConfig } from "@/types";

interface InvitationCardSectionProps {
  config: WeddingConfig;
  initialGuestName: string;
  lang: "en" | "bn";
}

type CardTheme = "emerald" | "ivory" | "navy";

export default function InvitationCardSection({
  config,
  initialGuestName,
  lang: initialLang,
}: InvitationCardSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [guestName, setGuestName] = useState(
    initialGuestName && initialGuestName !== "Honored Guest" ? initialGuestName : ""
  );
  const [cardLang, setCardLang] = useState<"bn" | "en">(initialLang || "bn");
  const [theme, setTheme] = useState<CardTheme>("emerald");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const displayName = guestName.trim() || (cardLang === "en" ? "Honored Guest" : "সম্মানিত সুধী");

  // Handle Download as JPEG
  const handleDownloadJpeg = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      // Small pause to ensure rendering stability
      await new Promise((resolve) => setTimeout(resolve, 150));

      const bgColor =
        theme === "ivory"
          ? "#fcfbf7"
          : theme === "navy"
          ? "#070e1e"
          : "#061a14";

      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2.5, // 2.5x crisp high resolution for mobile/printing
        cacheBust: true,
        backgroundColor: bgColor,
      });

      const safeName = displayName.replace(/[^a-zA-Z0-9\u0980-\u09FF_-]/g, "_");
      const filename = `Mahmudul_Mili_Invitation_${safeName || "Guest"}.jpg`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Fire celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f3c25b", "#ffffff", "#10b981"],
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error("Failed to generate invitation JPEG:", err);
      alert(
        cardLang === "en"
          ? "Failed to generate image. Please try again."
          : "কার্ড ইমেজ তৈরিতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy shareable guest invitation URL
  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;
    const url = guestName.trim()
      ? `${origin}/?to=${encodeURIComponent(guestName.trim())}#card`
      : `${origin}/#card`;

    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;
    const shareUrl = guestName.trim()
      ? `${origin}/?to=${encodeURIComponent(guestName.trim())}#card`
      : `${origin}/#card`;

    const message =
      cardLang === "en"
        ? `السلام عليكم,\nDear ${displayName},\nYou are warmly invited to the royal wedding of Mahmudul Hasan & Nowshin Jahan Mili. Download your personalized invitation card here:\n\n${shareUrl}\n\nWe look forward to your presence and prayers! 💍✨`
        : `আসসালামু আলাইকুম,\nশ্রদ্ধেয় ${displayName},\nমাহমুদুল হাসান ও নওশীন জাহান মিলির শুভ বিবাহে আপনার জন্য প্রস্তুতকৃত ডিজিটাল নিমন্ত্রণপত্রটি এই লিংক থেকে দেখে ও ডাউনলোড করে নিন:\n\n${shareUrl}\n\nআপনার দোয়া ও উপস্থিতি একান্ত কাম্য! 💍✨`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Theme styling helpers
  const themeClasses = {
    emerald: {
      cardBg: "bg-gradient-to-b from-[#061a14] via-[#0a271f] to-[#04120e]",
      cardBorder: "border-[#d4af37]",
      innerBorder: "border-[#d4af37]/40",
      goldText: "text-[#fce09b]",
      bodyText: "text-[#e2ded4]",
      mutedText: "text-stone-300",
      accentBg: "bg-[#13241f]/90",
      sealBg: "from-[#d4af37] via-[#f3c25b] to-[#aa8214]",
      sealText: "text-[#061a14]",
      ribbonBg: "bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent",
    },
    ivory: {
      cardBg: "bg-gradient-to-b from-[#fdfbf7] via-[#f7f2e5] to-[#ece3cb]",
      cardBorder: "border-[#9b7625]",
      innerBorder: "border-[#9b7625]/40",
      goldText: "text-[#8c671b]",
      bodyText: "text-[#1c2e24]",
      mutedText: "text-[#3f4f46]",
      accentBg: "bg-[#f4eedf]",
      sealBg: "from-[#9b7625] via-[#c49a37] to-[#805f19]",
      sealText: "text-white",
      ribbonBg: "bg-gradient-to-r from-transparent via-[#9b7625]/20 to-transparent",
    },
    navy: {
      cardBg: "bg-gradient-to-b from-[#070e1e] via-[#0c1833] to-[#050a16]",
      cardBorder: "border-[#d4af37]",
      innerBorder: "border-[#d4af37]/40",
      goldText: "text-[#fce09b]",
      bodyText: "text-[#e2e7f0]",
      mutedText: "text-stone-300",
      accentBg: "bg-[#101e3b]/90",
      sealBg: "from-[#d4af37] via-[#f3c25b] to-[#aa8214]",
      sealText: "text-[#070e1e]",
      ribbonBg: "bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent",
    },
  }[theme];

  return (
    <section id="card" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13241f] border border-[#d4af37]/35 text-xs text-[#fce09b] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              {cardLang === "en" ? "Exclusive Invitation Card" : "ডিজিটাল নিমন্ত্রণপত্র"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
            <span className="gold-gradient-text">
              {cardLang === "en" ? "Personalized Royal Invitation" : "আপনার রাজকীয় নিমন্ত্রণপত্র"}
            </span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {cardLang === "en"
              ? "Each guest receives a unique, beautifully crafted digital wedding card. You can customize the name and download it instantly in high-definition JPEG format."
              : "প্রতিটি সম্মানিত অতিথির জন্য তৈরি আমাদের বিশেষ রাজকীয় নিমন্ত্রণপত্র। আপনার নাম যুক্ত করে সরাসরি হাই-কোয়ালিটি JPEG ছবি হিসেবে ডাউনলোড করুন।"}
          </p>
        </div>

        {/* Customization Toolbar */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl royal-glass border border-[#d4af37]/35 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Guest Name Input */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                {cardLang === "en" ? "Guest / Family Name:" : "কার্ডে অতিথির নাম:"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={cardLang === "en" ? "e.g. Mr. Rafiq & Family" : "যেমন: জনাব মোঃ রফিক ও পরিবার"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1411] border border-[#d4af37]/40 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
                />
                {guestName && (
                  <button
                    onClick={() => setGuestName("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Language & Theme Selectors */}
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              {/* Language Switch */}
              <div>
                <span className="block text-xs font-medium text-stone-300 mb-1.5">
                  {cardLang === "en" ? "Card Language:" : "কার্ডের ভাষা:"}
                </span>
                <div className="inline-flex rounded-xl bg-[#0b1411] p-1 border border-[#d4af37]/30">
                  <button
                    onClick={() => setCardLang("bn")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      cardLang === "bn"
                        ? "bg-[#d4af37] text-[#0b1411] shadow-md font-semibold"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    বাংলা (Bengali)
                  </button>
                  <button
                    onClick={() => setCardLang("en")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      cardLang === "en"
                        ? "bg-[#d4af37] text-[#0b1411] shadow-md font-semibold"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Theme Switch */}
              <div>
                <span className="block text-xs font-medium text-stone-300 mb-1.5">
                  {cardLang === "en" ? "Royal Card Style:" : "ডিজাইন থিম:"}
                </span>
                <div className="inline-flex rounded-xl bg-[#0b1411] p-1 border border-[#d4af37]/30 gap-1">
                  <button
                    onClick={() => setTheme("emerald")}
                    title="Royal Emerald"
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
                      theme === "emerald"
                        ? "bg-[#10b981]/25 text-[#fce09b] border border-[#d4af37]"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="hidden sm:inline">Emerald</span>
                  </button>
                  <button
                    onClick={() => setTheme("ivory")}
                    title="Imperial Ivory"
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
                      theme === "ivory"
                        ? "bg-[#f5e6cb]/25 text-[#fce09b] border border-[#d4af37]"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fdfbf7]" />
                    <span className="hidden sm:inline">Ivory</span>
                  </button>
                  <button
                    onClick={() => setTheme("navy")}
                    title="Midnight Navy"
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
                      theme === "navy"
                        ? "bg-[#1e3a8a]/25 text-[#fce09b] border border-[#d4af37]"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                    <span className="hidden sm:inline">Navy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-center sm:justify-end gap-3">
            {/* Share WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{cardLang === "en" ? "Share on WhatsApp" : "হোয়াটসঅ্যাপে পাঠান"}</span>
            </button>

            {/* Copy Card Link */}
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-[#13241f] hover:bg-[#1a352c] text-stone-200 border border-[#d4af37]/35 text-xs font-semibold flex items-center gap-2 transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#d4af37]" />}
              <span>{copiedLink ? (cardLang === "en" ? "Link Copied!" : "লিংক কপি হয়েছে!") : (cardLang === "en" ? "Copy Invite Link" : "কার্ড লিংক কপি")}</span>
            </button>

            {/* DOWNLOAD JPEG BUTTON */}
            <button
              onClick={handleDownloadJpeg}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#d4af37]/30 flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{cardLang === "en" ? "Generating High-Res JPEG..." : "JPEG ছবি তৈরি হচ্ছে..."}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950 font-extrabold" />
                  <span>{cardLang === "en" ? "Card Downloaded!" : "কার্ড ডাউনলোড সম্পন্ন!"}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-950 font-extrabold" />
                  <span>{cardLang === "en" ? "Download Card (JPEG)" : "কার্ড ডাউনলোড করুন (JPEG)"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            THE ROYAL INVITATION CARD (CONVERTED TO JPEG VIA HTML-TO-IMAGE)
            ========================================================================= */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className={`w-full max-w-xl ${themeClasses.cardBg} border-2 ${themeClasses.cardBorder} rounded-3xl p-6 sm:p-10 shadow-2xl relative text-center overflow-hidden transition-colors duration-300`}
            style={{
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(212, 175, 55, 0.25)",
            }}
          >
            {/* Inner Gold Filigree Frame */}
            <div
              className={`absolute inset-3 sm:inset-4 border border-dashed ${themeClasses.innerBorder} rounded-2xl pointer-events-none`}
            />

            {/* Corner Ornaments (SVG) */}
            {/* Top-Left */}
            <div className="absolute top-4 left-4 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none opacity-85">
              <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="3">
                <path d="M5,40 L5,5 L40,5 M15,50 L15,15 L50,15 M5,5 L25,25" />
                <circle cx="28" cy="28" r="4" fill="#d4af37" />
              </svg>
            </div>
            {/* Top-Right */}
            <div className="absolute top-4 right-4 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none opacity-85 rotate-90">
              <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="3">
                <path d="M5,40 L5,5 L40,5 M15,50 L15,15 L50,15 M5,5 L25,25" />
                <circle cx="28" cy="28" r="4" fill="#d4af37" />
              </svg>
            </div>
            {/* Bottom-Left */}
            <div className="absolute bottom-4 left-4 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none opacity-85 -rotate-90">
              <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="3">
                <path d="M5,40 L5,5 L40,5 M15,50 L15,15 L50,15 M5,5 L25,25" />
                <circle cx="28" cy="28" r="4" fill="#d4af37" />
              </svg>
            </div>
            {/* Bottom-Right */}
            <div className="absolute bottom-4 right-4 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none opacity-85 rotate-180">
              <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="3">
                <path d="M5,40 L5,5 L40,5 M15,50 L15,15 L50,15 M5,5 L25,25" />
                <circle cx="28" cy="28" r="4" fill="#d4af37" />
              </svg>
            </div>

            {/* Bismillah Calligraphy */}
            <div className="pt-2 sm:pt-4 mb-3">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl tracking-widest text-[#d4af37] font-semibold drop-shadow">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className={`text-[10px] sm:text-xs italic ${themeClasses.mutedText} font-light mt-0.5`}>
                {cardLang === "en"
                  ? "In the name of Allah, the Most Gracious, the Most Merciful"
                  : "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে"}
              </p>
            </div>

            {/* Royal Monogram Crest */}
            <div className="my-3 flex justify-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${themeClasses.sealBg} p-[2px] shadow-lg flex items-center justify-center`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    theme === "ivory" ? "bg-[#fcfbf7]" : "bg-[#081712]"
                  } flex flex-col items-center justify-center text-center`}
                >
                  <span className="font-serif text-xs tracking-tighter text-[#d4af37] font-bold">
                    M <span className="text-[10px] text-rose-400">♥</span> M
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-stone-400">
                    ROYAL
                  </span>
                </div>
              </div>
            </div>

            {/* Title Banner */}
            <div className="my-2">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                {cardLang === "en" ? "ROYAL WEDDING INVITATION" : "॥ শুভ বিবাহ নিমন্ত্রণপত্র ॥"}
              </p>
              <div className="flex items-center justify-center gap-2 my-1.5 opacity-80">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <span className="text-xs text-[#d4af37]">✦ ❖ ✦</span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>
            </div>

            {/* Personalized Guest Box */}
            <div
              className={`my-4 p-3.5 sm:p-4 rounded-2xl ${themeClasses.accentBg} border border-[#d4af37]/35 shadow-inner`}
            >
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mb-1">
                {cardLang === "en" ? "Cordially Invited / Respected Guest" : "পরম শ্রদ্ধার সাথে আমন্ত্রিত অতিথি:"}
              </p>
              <h3
                className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold ${themeClasses.goldText} tracking-wide drop-shadow`}
              >
                {displayName}
              </h3>
              <p className={`text-[10px] sm:text-xs ${themeClasses.mutedText} mt-1.5 leading-relaxed`}>
                {cardLang === "en"
                  ? "We cordially request the honor of your gracious presence and blessings on the joyous wedding celebration of"
                  : "আমাদের জীবনের এই আনন্দঘন ও পবিত্র মুহূর্তে আপনার সপরিবারে আন্তরিক দোয়া ও শুভাগমন একান্তভাবে কাম্য।"}
              </p>
            </div>

            {/* The Couple Section */}
            <div className="my-4 sm:my-5 space-y-2">
              {/* Groom */}
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  {cardLang === "en" ? "GROOM" : "বর"}
                </p>
                <h4
                  className={`text-lg sm:text-2xl font-serif font-bold ${
                    theme === "ivory" ? "text-emerald-950" : "text-white"
                  }`}
                >
                  {cardLang === "en" ? config.couple.groom.fullName : config.couple.groom.nameBn}
                </h4>
                <p className={`text-[10px] sm:text-xs ${themeClasses.mutedText}`}>
                  {cardLang === "en"
                    ? `Son of ${config.couple.groom.fatherName} & ${config.couple.groom.motherName}`
                    : `সুযোগ্য জ্যেষ্ঠ পুত্র: ${config.couple.groom.fatherNameBn || config.couple.groom.fatherName} ও ${config.couple.groom.motherNameBn || config.couple.groom.motherName}`}
                </p>
                <p className="text-[9px] sm:text-[10px] text-stone-400 italic">
                  {cardLang === "en"
                    ? "Pir Bari Residence, Aushpara, Laksam, Cumilla"
                    : "পীর বাড়ি, আউশপাড়া, লাকসাম, কুমিল্লা"}
                </p>
              </div>

              {/* Knot / Emblem */}
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-[1px] w-10 bg-[#d4af37]/40" />
                <span className="font-serif italic text-base sm:text-lg text-[#d4af37] font-semibold">
                  {cardLang === "en" ? "weds" : "এর সাথে শুভ বিবাহ"}
                </span>
                <div className="h-[1px] w-10 bg-[#d4af37]/40" />
              </div>

              {/* Bride */}
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  {cardLang === "en" ? "BRIDE" : "কনে"}
                </p>
                <h4
                  className={`text-lg sm:text-2xl font-serif font-bold ${
                    theme === "ivory" ? "text-emerald-950" : "text-white"
                  }`}
                >
                  {cardLang === "en" ? config.couple.bride.fullName : config.couple.bride.nameBn}
                </h4>
                <p className={`text-[10px] sm:text-xs ${themeClasses.mutedText}`}>
                  {cardLang === "en"
                    ? `Daughter of ${config.couple.bride.fatherName} & ${config.couple.bride.motherName}`
                    : `সুযোগ্য কন্যা: ${config.couple.bride.fatherNameBn || config.couple.bride.fatherName} ও ${config.couple.bride.motherNameBn || config.couple.bride.motherName}`}
                </p>
                <p className="text-[9px] sm:text-[10px] text-stone-400 italic">
                  {cardLang === "en" ? "Maniksar Khan Bari, Laksam" : "মানিকসার খান বাড়ি, লাকসাম"}
                </p>
              </div>
            </div>

            {/* Sacred Quranic Blessing */}
            <div className="my-3 px-3 py-2 rounded-xl bg-black/15 border border-[#d4af37]/20">
              <p className={`text-[9px] sm:text-[11px] italic ${themeClasses.mutedText} leading-relaxed`}>
                &ldquo;
                {cardLang === "en"
                  ? "And among His signs is that He created for you spouses from among yourselves, so that you may find tranquility in them... (Surah Ar-Rum: 21)"
                  : "এবং তাঁর অন্যতম নিদর্শন এই যে, তিনি তোমাদের মধ্য থেকে তোমাদের জন্য সঙ্গিনী সৃষ্টি করেছেন যাতে তোমরা তাদের নিকট প্রশান্তি পাও... (সূরা আর-রূম: ২১)"}
                &rdquo;
              </p>
            </div>

            {/* Program & Venue Box */}
            <div
              className={`my-3 p-3.5 rounded-xl ${themeClasses.accentBg} border border-[#d4af37]/30 text-left`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Date */}
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      {cardLang === "en" ? "Date & Time:" : "তারিখ ও সময়:"}
                    </span>
                    <span className={`font-semibold ${themeClasses.goldText} text-xs`}>
                      {cardLang === "en"
                        ? "Date to be announced InshaAllah"
                        : "শুভলগ্নে শীঘ্রই ঘোষিত হবে (ইনশাআল্লাহ)"}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      {cardLang === "en" ? "Nikah & Grand Walima Feast" : "পবিত্র আকদ ও প্রীতিভোজ"}
                    </span>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      {cardLang === "en" ? "Wedding Venue:" : "অনুষ্ঠানস্থল:"}
                    </span>
                    <span className={`font-semibold ${themeClasses.goldText} text-xs`}>
                      {cardLang === "en" ? "Pir Bari Residence (পীর বাড়ি)" : "পীর বাড়ি (Pir Bari Residence)"}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      {cardLang === "en" ? "Aushpara, Laksam, Cumilla - 3570" : "আউশপাড়া, লাকসাম, কুমিল্লা - ৩৫৭০"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sign-off & Helpline */}
            <div className="mt-4 pt-3 border-t border-[#d4af37]/25 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                {cardLang === "en" ? "With Best Compliments:" : "বিনীত আমন্ত্রণে:"}
              </p>
              <p className={`text-xs font-serif font-bold ${themeClasses.goldText} mt-0.5`}>
                {cardLang === "en" ? "Ahsan & Khan Families" : "আহসান ও খান পরিবার"}
              </p>
              <p className="text-[9px] text-stone-400 mt-1 flex items-center justify-center gap-2">
                <span>📞 +880 1863-846300</span>
                <span>•</span>
                <span>#MahmudulWedsMili</span>
              </p>
            </div>
          </div>
        </div>

        {/* Guest Guide Notes */}
        <div className="mt-8 text-center text-xs text-stone-400 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            {cardLang === "en"
              ? "High-Resolution 2.5x Export (Print & WhatsApp Ready)"
              : "উচ্চমানের ২.৫x রেজোলিউশন JPEG (প্রিন্ট ও হোয়াটসঅ্যাপের উপযোগী)"}
          </span>
          <span>•</span>
          <span>
            {cardLang === "en"
              ? "Share link directly to invite specific guests by name"
              : "মেহমানের নাম দিয়ে লিংক শেয়ার করতে পারেন"}
          </span>
        </div>
      </div>
    </section>
  );
}
