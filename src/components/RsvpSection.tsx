"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Users, Phone, User, Utensils, Sparkles } from "lucide-react";

interface RsvpSectionProps {
  initialGuestName: string;
  lang: "en" | "bn";
}

export default function RsvpSection({ initialGuestName, lang }: RsvpSectionProps) {
  const [name, setName] = useState(
    initialGuestName && initialGuestName !== "Guest" && initialGuestName !== "Honored Guest"
      ? initialGuestName
      : ""
  );
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "tentative">("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg(lang === "en" ? "Please enter your name" : "দয়া করে আপনার নাম লিখুন");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          attendance,
          guestCount,
          dietary: "",
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        if (attendance === "yes") {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#d4af37", "#fce09b", "#10b981", "#ffffff"],
          });
        }
      } else {
        setErrorMsg(data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === "en" ? "Failed to connect to server" : "সার্ভারে সংযোগ ব্যর্থ হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 relative overflow-hidden bg-[#0a1813]/50">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            {lang === "en" ? "Be Our Guest" : "আপনার উপস্থিতি একান্ত কাম্য"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "RSVP / Attendance Confirmation" : "উপস্থিতি নিশ্চিতকরণ"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <p className="text-xs sm:text-sm text-stone-400">
            {lang === "en"
              ? "Kindly respond so we can ensure warm arrangements and delightful hospitality for you and your family."
              : "আপনার উপস্থিতি নিশ্চিত করে আমাদের প্রস্তুতিকে সুন্দর ও সুশৃঙ্খল করতে সাহায্য করুন।"}
          </p>
        </div>

        {/* Success Card */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 rounded-3xl royal-glass border border-[#10b981]/50 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              {lang === "en" ? "Thank You!" : "অশেষ ধন্যবাদ!"}
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              {attendance === "yes"
                ? (lang === "en"
                    ? `Dearest ${name}, your RSVP has been recorded! We are truly excited to celebrate our special day with you.`
                    : `প্রিয় ${name}, আপনার সম্মতি পেয়ে আমরা অত্যন্ত আনন্দিত। অনুষ্ঠানে আপনাকে সানন্দে বরণ করে নেয়ার অপেক্ষায় রইলাম।`)
                : (lang === "en"
                    ? `Thank you for letting us know, ${name}. You will be warmly remembered in our prayers!`
                    : `অসংখ্য ধন্যবাদ জানানোর জন্য, ${name}। আপনার দোয়া আমাদের সাথে থাকবে ইনশাআল্লাহ।`)}
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-6 px-6 py-2 rounded-full text-xs font-semibold bg-[#13241f] text-[#fce09b] border border-[#d4af37]/30 hover:bg-[#1a332c] transition"
            >
              {lang === "en" ? "Submit Another Response" : "পুনরায় ফর্ম পূরণ করুন"}
            </button>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-3xl royal-glass border border-[#d4af37]/40 shadow-2xl space-y-6"
          >
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-xs text-red-200 text-center">
                {errorMsg}
              </div>
            )}

            {/* Guest Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  {lang === "en" ? "Your Full Name / মেহমানের নাম *" : "আপনার শুভ নাম *"}
                </span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Rahman / তানভীর রহমান"
                className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-sm transition"
              />
            </div>

            {/* Attendance Radio Pills */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                {lang === "en" ? "Will You Attend? / উপস্থিতি *" : "আপনি কি উপস্থিত থাকবেন? *"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    val: "yes",
                    labelEn: "Joyfully Accept",
                    labelBn: "অবশ্যই আসব ইনশাআল্লাহ",
                    emoji: "✨",
                  },
                  {
                    val: "tentative",
                    labelEn: "Tentative",
                    labelBn: "চেষ্টা করব",
                    emoji: "⏳",
                  },
                  {
                    val: "no",
                    labelEn: "Regretfully Decline",
                    labelBn: "আসতে পারছি না",
                    emoji: "🕊️",
                  },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setAttendance(item.val as "yes" | "no" | "tentative")}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      attendance === item.val
                        ? "bg-gradient-to-r from-[#d4af37] to-[#aa8214] text-[#0b1411] border-[#d4af37] shadow-md"
                        : "bg-[#091511] text-stone-300 border-white/10 hover:border-[#d4af37]/40"
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{lang === "en" ? item.labelEn : item.labelBn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count (only if yes or tentative) */}
            {attendance !== "no" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      {lang === "en" ? "Number of Guests" : "মোট মেহমান সংখ্যা"}
                    </span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37] text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                      <option key={num} value={num} className="bg-[#0b1411]">
                        {num} {num === 1 ? "Person" : "Persons"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      {lang === "en" ? "Phone / WhatsApp" : "ফোন / হোয়াটসঅ্যাপ"}
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] text-sm"
                  />
                </div>
              </div>
            )}

            {/* Special Requests or Wishes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#d4af37]" />
                  {lang === "en" ? "Notes / Dietary Preferences (Optional)" : "বিশেষ কোনো বার্তা / খাদ্য পছন্দ (ঐচ্ছিক)"}
                </span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Any special requirements or warm message for the couple..."
                    : "আপনার কোনো বিশেষ সুবিধা বা শুভকামনা..."
                }
                className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-serif font-bold text-sm sm:text-base text-[#0b1411] bg-gradient-to-r from-[#fce09b] via-[#d4af37] to-[#e6c148] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#0b1411]" />
              <span>
                {isSubmitting
                  ? (lang === "en" ? "Confirming..." : "নিশ্চিত করা হচ্ছে...")
                  : (lang === "en" ? "Confirm My RSVP" : "উপস্থিতি নিশ্চিত করুন")}
              </span>
              <Sparkles className="w-4 h-4 text-[#0b1411]" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
