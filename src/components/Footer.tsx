"use client";

import React from "react";
import { Heart, Phone, MessageCircle, Mail } from "lucide-react";
import { WeddingConfig } from "@/types";

interface FooterProps {
  config: WeddingConfig;
  lang: "en" | "bn";
}

export default function Footer({ config, lang }: FooterProps) {
  return (
    <footer className="pt-16 pb-12 px-4 border-t border-[#d4af37]/20 bg-[#060c0a] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border-2 border-[#d4af37] mx-auto flex items-center justify-center mb-4 bg-[#0e1d17] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <span className="font-serif font-bold text-lg text-[#fce09b]">M &amp; S</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {config.couple.groom.name} &amp; {config.couple.bride.name}
        </h3>

        <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-serif mb-6">
          {config.couple.hashtag}
        </p>

        {/* Du'a */}
        <p className="text-xs sm:text-sm text-stone-300 italic max-w-lg mx-auto leading-relaxed mb-8">
          {lang === "en"
            ? "“May Allah bless our families, grant us peace, and unite our hearts in endless compassion and piety.”"
            : "“আল্লাহ আমাদের পরিবারগুলোকে বরকত দান করুন এবং পারস্পরিক দয়া ও ভালোবাসার সাথে চিরকাল ঐক্যবদ্ধ রাখুন।”"}
        </p>

        {/* Contact info for guests */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 my-6 pb-6 border-b border-white/10">
          <a
            href={`tel:${config.contact.phone}`}
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{config.contact.phone}</span>
          </a>
          <a
            href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#25D366] transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Helpline</span>
          </a>
          <a
            href={`mailto:${config.contact.email}`}
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition"
          >
            <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{config.contact.email}</span>
          </a>
        </div>

        <div className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          <span>for Mahmudul&apos;s Royal Wedding Celebration</span>
        </div>
      </div>
    </footer>
  );
}
