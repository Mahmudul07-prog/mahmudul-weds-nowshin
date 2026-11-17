"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { MessageSquareHeart, Send, Sparkles, HeartHandshake, Check } from "lucide-react";
import { Wish } from "@/types";

interface WishesSectionProps {
  initialGuestName: string;
  lang: "en" | "bn";
}

export default function WishesSection({ initialGuestName, lang }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState(
    initialGuestName && initialGuestName !== "Guest" && initialGuestName !== "Honored Guest"
      ? initialGuestName
      : ""
  );
  const [relation, setRelation] = useState("Friend");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("🤲");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const emojis = ["🤲", "💐", "💍", "❤️", "🌟", "🎉", "🕊️"];

  useEffect(() => {
    // Fetch initial wishes
    fetch("/api/wishes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.wishes)) {
          setWishes(data.wishes);
        }
      })
      .catch((err) => console.warn("Could not load initial wishes", err));
  }, [initialGuestName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, relation, message, emoji }),
      });

      const data = await res.json();
      if (data.success) {
        setWishes((prev) => [data.wish, ...prev]);
        setMessage("");
        setStatusMsg(
          lang === "en"
            ? "Your blessing has been delivered to the couple!"
            : "আপনার দোয়ার বার্তা সফলভাবে প্রকাশিত হয়েছে!"
        );

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#d4af37", "#f472b6", "#ffffff"],
        });

        setTimeout(() => setStatusMsg(""), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            {lang === "en" ? "Prayers & Feedback" : "শুভকামনা ও দোয়ার বার্তা"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "Wishes & Blessings Board" : "অতিথিদের দোয়া ও মন্তব্য"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <MessageSquareHeart className="w-4 h-4 text-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Share your prayers, heartfelt advice, and warm congratulations for Mahmudul & Nowshin."
              : "নতুন দম্পতির জন্য আপনার মনের শুভকামনা, দোয়া বা উপদেশ রেখে যান।"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (5 columns) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl royal-glass border border-[#d4af37]/35 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-[#fce09b] mb-4 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-[#d4af37]" />
              {lang === "en" ? "Leave Your Blessing" : "দোয়ার বার্তা লিখুন"}
            </h3>

            {statusMsg && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5">
                  {lang === "en" ? "Your Name / আপনার নাম *" : "আপনার শুভ নাম *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir, ফারহানা"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  {lang === "en" ? "Relation / সম্পর্ক" : "সম্পর্ক"}
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white focus:outline-none focus:border-[#d4af37] text-sm"
                >
                  <option value="Friend">Friend / বন্ধু</option>
                  <option value="Family">Family / পরিবার</option>
                  <option value="Colleague">Colleague / সহকর্মী</option>
                  <option value="Well-Wisher">Well-Wisher / শুভাকাঙ্ক্ষী</option>
                  <option value="Cousin">Cousin / আত্মীয়</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  {lang === "en" ? "Pick a Blessing Emoji" : "ইমোজি বাছাই করুন"}
                </label>
                <div className="flex items-center gap-2">
                  {emojis.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setEmoji(item)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition ${
                        emoji === item
                          ? "bg-[#d4af37] scale-110 shadow-md text-black"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5">
                  {lang === "en" ? "Your Message / মন্তব্য *" : "আপনার দোয়া ও মন্তব্য *"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Write your warm prayers, du'a, or wedding wishes here..."
                      : "আপনার আন্তরিক দোয়া ও শুভকামনা এখানে লিখুন..."
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/30 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl font-serif font-bold text-sm text-[#0b1411] bg-gradient-to-r from-[#fce09b] to-[#d4af37] hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4 text-[#0b1411]" />
                <span>
                  {isSubmitting
                    ? (lang === "en" ? "Sending..." : "পাঠানো হচ্ছে...")
                    : (lang === "en" ? "Post My Blessing" : "দোয়া পোস্ট করুন")}
                </span>
                <Sparkles className="w-4 h-4 text-[#0b1411]" />
              </button>
            </form>
          </div>

          {/* Live Wishes Feed (7 columns) */}
          <div className="lg:col-span-7 space-y-4 max-h-[560px] overflow-y-auto pr-2">
            {wishes.length === 0 ? (
              <div className="p-8 rounded-2xl royal-glass text-center text-stone-400 text-sm">
                {lang === "en"
                  ? "Be the first to leave a blessing for the couple!"
                  : "প্রথম ব্যক্তি হিসেবে আপনার শুভকামনা রেখে যান!"}
              </div>
            ) : (
              wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl royal-glass border border-white/10 hover:border-[#d4af37]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.emoji || "💐"}</span>
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#fce09b]">
                          {item.name}
                        </h4>
                        {item.relation && (
                          <span className="text-[10px] text-[#d4af37]/80 uppercase tracking-wider">
                            {item.relation}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pl-8">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
