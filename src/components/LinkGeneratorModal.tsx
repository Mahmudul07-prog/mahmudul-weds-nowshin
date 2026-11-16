"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Share2, X, Sparkles, MessageCircle } from "lucide-react";

interface LinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
}

export default function LinkGeneratorModal({
  isOpen,
  onClose,
  groomName,
}: LinkGeneratorModalProps) {
  const [guestName, setGuestName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  if (!isOpen) return null;

  const trimmedName = guestName.trim();
  const generatedUrl = trimmedName
    ? `${baseUrl}/?to=${encodeURIComponent(trimmedName)}`
    : `${baseUrl}/?to=Guest`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `السلام عليكم,\nDear ${
    trimmedName || "Honored Guest"
  },\nYou are warmly invited to celebrate the royal wedding of ${groomName} & Nowshin Jahan Mili. Open the link to view ceremony details and download your personalized Royal Invitation Card (JPEG):\n\n${generatedUrl}\n\nWe eagerly look forward to your presence and prayers! 💍✨`;

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl royal-glass border border-[#d4af37]/40 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 mb-3 text-[#d4af37]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-[#fce09b] tracking-wide">
            Create Personalized Invite Link
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            মেহমানের নাম লিখলেই সাথে সাথে তাদের নামের পার্সোনালাইজড লিংক তৈরি হয়ে যাবে!
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37] mb-2 font-medium">
              Guest Name / মেহমানের নাম
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Tanvir Ahmed & Family, আরিফ ভাই"
              className="w-full px-4 py-3 rounded-xl bg-[#091511]/90 border border-[#d4af37]/40 text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
            />
          </div>

          {/* Generated URL Box */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
              Generated Personalized Link:
            </label>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#08110e] border border-[#d4af37]/20">
              <span className="text-xs text-stone-300 truncate font-mono select-all flex-1">
                {generatedUrl}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-[#0b1411] text-xs font-semibold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa8214] text-[#0b1411] font-semibold hover:opacity-95 transition shadow-lg shadow-[#d4af37]/20"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Link Copied!" : "Copy Invite Link"}
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold transition shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4" />
              Send on WhatsApp
            </button>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-stone-400">
            💡 <strong className="text-stone-300">প্রো-টিপ:</strong> লিংকটি যে কাউকে পাঠালে তারা সরাসরি নিজের নাম লেখা রাজকীয় আমন্ত্রণপত্র দেখতে পাবেন!
          </p>
        </div>
      </div>
    </div>
  );
}
