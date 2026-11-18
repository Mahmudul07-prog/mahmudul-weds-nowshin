"use client";

import React, { useState } from "react";
import { X, Navigation, MapPin, Copy, Check, Phone, Compass, ExternalLink, Car } from "lucide-react";
import { WeddingEvent } from "@/types";

interface VenueNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: WeddingEvent | null;
  lang: "en" | "bn";
}

export default function VenueNavigationModal({
  isOpen,
  onClose,
  event,
  lang,
}: VenueNavigationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !event) return null;

  const destinationQuery = event.directionsQuery || event.venueAddress;
  // Google Maps Turn-by-Turn Driving Navigation mode
  const liveNavigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destinationQuery
  )}&travelmode=driving`;

  // Standard Google Maps Pin search
  const mapSearchUrl =
    event.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationQuery)}`;

  const fullAddress =
    lang === "en"
      ? `${event.venueName}, ${event.venueAddress}`
      : `${event.venueName}, ${event.venueAddressBn || event.venueAddress}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl royal-glass border border-[#d4af37]/45 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
              {lang === "en" ? "GPS Live Navigation & Directions" : "লাইভ জিপিএস নেভিগেশন ও রাস্তা"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {event.venueName}
            </h3>
          </div>
        </div>

        {/* Event & Address Card */}
        <div className="p-4 rounded-2xl bg-[#091511]/90 border border-[#d4af37]/30 mb-5 space-y-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="text-stone-400 block font-medium">
                {lang === "en" ? "Full Venue Address:" : "অনুষ্ঠানস্থলের পূর্ণাঙ্গ ঠিকানা:"}
              </span>
              <p className="text-white font-medium mt-0.5 leading-relaxed">
                {lang === "en" ? event.venueAddress : event.venueAddressBn || event.venueAddress}
              </p>
            </div>
          </div>

          {/* Landmark Guide */}
          {(event.landmark || event.landmarkBn) && (
            <div className="pt-2 border-t border-white/10 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-emerald-300 font-semibold block">
                  {lang === "en" ? "Landmark & Easy Way:" : "সহজে পৌঁছানোর ল্যান্ডমার্ক:"}
                </span>
                <p className="text-stone-300 mt-0.5">
                  {lang === "en" ? event.landmark : event.landmarkBn || event.landmark}
                </p>
              </div>
            </div>
          )}

          {/* Exact GPS Coordinates & Plus Code */}
          {event.coordinates && (
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#fce09b]">
              <span className="font-mono bg-black/30 px-2.5 py-1 rounded-lg border border-[#d4af37]/20">
                📍 GPS: {event.coordinates.lat.toFixed(6)}, {event.coordinates.lng.toFixed(6)}
                {event.plusCode && ` • ${event.plusCode}`}
              </span>
              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {lang === "en" ? "Exact House Pinpoint ✓" : "সঠিক বাড়ির লোকেশন পিন ✓"}
              </span>
            </div>
          )}
        </div>

        {/* Primary Action: Turn-by-Turn GPS Navigation */}
        <div className="space-y-3">
          <a
            href={liveNavigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>
              {lang === "en"
                ? "Start Turn-by-Turn GPS Navigation (Google Maps)"
                : "গুগল ম্যাপে লাইভ ড্রাইভ নেভিগেশন শুরু করুন"}
            </span>
          </a>

          {/* Secondary Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* View Map Pin */}
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#13241f] hover:bg-[#1c3830] border border-[#d4af37]/35 text-xs text-stone-200 flex items-center justify-center gap-2 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{lang === "en" ? "View Map Pin" : "ম্যাপে পিন দেখুন"}</span>
            </a>

            {/* Copy Address */}
            <button
              onClick={handleCopyAddress}
              className="py-2.5 px-3 rounded-xl bg-[#13241f] hover:bg-[#1c3830] border border-[#d4af37]/35 text-xs text-stone-200 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
              <span>{copied ? (lang === "en" ? "Address Copied!" : "ঠিকানা কপি হয়েছে!") : (lang === "en" ? "Copy Address" : "ঠিকানা কপি করুন")}</span>
            </button>
          </div>
        </div>

        {/* Helpline Support for Lost Guests */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-left">
            <p className="text-[10px] text-stone-400">
              {lang === "en" ? "Need route assistance on wedding day?" : "রাস্তা চিনতে অসুবিধা হলে কল করুন:"}
            </p>
            <p className="text-xs font-semibold text-[#fce09b]">
              Helpline: +880 1863-846300
            </p>
          </div>
          <a
            href="tel:+8801863846300"
            className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Call Now" : "সরাসরি কল"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
