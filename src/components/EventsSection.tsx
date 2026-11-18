"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus, Bell, Car } from "lucide-react";
import { WeddingEvent } from "@/types";
import CalendarModal from "./CalendarModal";
import VenueNavigationModal from "./VenueNavigationModal";

interface EventsSectionProps {
  events: WeddingEvent[];
  lang: "en" | "bn";
}

export default function EventsSection({ events, lang }: EventsSectionProps) {
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<WeddingEvent | null>(null);
  const [selectedNavigationEvent, setSelectedNavigationEvent] = useState<WeddingEvent | null>(null);

  const walimaEvent = events.find((e) => e.id === "event-walima") || events[2] || events[0];

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            {lang === "en" ? "Ceremonies & Celebrations" : "বিবাহের শুভ অনুষ্ঠানমালা"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "Event Schedule & Venues" : "সময়সূচি ও ভেন্যু"}
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
            {lang === "en"
              ? "Join us in our celebrations. You can add your invited ceremony (Walima or both) to your calendar for automated alerts and turn-by-turn Google Maps navigation."
              : "আমাদের জীবনের স্মরণীয় প্রতিটি অনুষ্ঠানে আপনার উপস্থিতি একান্তভাবে কাম্য। আপনার আমন্ত্রিত অনুষ্ঠানটি (ওয়ালিমা বা উভয়টি) ক্যালেন্ডারে যুক্ত করে রিমাইন্ডার নিন এবং গুগল ম্যাপস দিয়ে সহজে পৌঁছান।"}
          </p>
        </div>

        {/* Notice & Quick Walima Sync Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-[#13241f]/80 border border-[#d4af37]/35 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#fce09b] block">
                {lang === "en" ? "Sacred Venues & Ceremonies" : "পবিত্র আকদ ও সংবর্ধনার স্থান"}
              </strong>
              <span className="text-stone-300">
                {lang === "en"
                  ? "Nikah at Bride's residence (Maniksar Khan Bari, Barura) & Grand Walima for all guests at Groom's residence (Pir Bari, Laksam)."
                  : "পবিত্র আকদ কনের নিজ বাড়ি (মানিকসার খান বাড়ি, বরুড়া) এবং শুভ বিবাহোত্তর ওয়ালিমা বরের নিজ বাড়ি (পীর বাড়ি, লাকসাম)-তে অনুষ্ঠিত হবে।"}
              </span>
            </div>
          </div>

          {/* Quick Walima Calendar Reminder */}
          <button
            onClick={() => setSelectedCalendarEvent(walimaEvent)}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8214] text-[#061a14] font-bold text-xs hover:brightness-110 transition shadow-md shadow-[#d4af37]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Walima Reminder (1-Click)" : "ওয়ালিমা ও দোয়া রিমাইন্ডার"}</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => {
            const isWalima = event.id === "event-walima";
            const isNikah = event.id === "event-nikah";

            return (
              <div
                key={event.id}
                className={`rounded-3xl p-6 sm:p-7 royal-glass royal-glass-hover transition-all duration-300 flex flex-col justify-between ${
                  isWalima ? "border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]" : ""
                }`}
              >
                <div>
                  {/* Event Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#fce09b]">
                      {event.isConfirmed
                        ? (lang === "en" ? "Confirmed" : "নির্ধারিত")
                        : (lang === "en" ? "Tentative / প্রস্তাবিত" : "প্রস্তাবিত সময়")}
                    </span>

                    {(event.audience || event.audienceBn) && (
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          isWalima
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                            : isNikah
                            ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            : "bg-white/5 border-white/10 text-stone-400"
                        }`}
                      >
                        {lang === "en" ? event.audience : event.audienceBn}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                    {lang === "en" ? event.title : event.titleBn || event.title}
                  </h3>
                  <p className="text-xs text-stone-300 italic mb-6">
                    {lang === "en" ? event.tagline : event.taglineBn || event.tagline}
                  </p>

                  {/* Details List */}
                  <div className="space-y-3 py-4 border-y border-white/10 text-xs text-stone-300">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <span>{lang === "en" ? event.date : event.dateBn || event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <span>{lang === "en" ? event.time : event.timeBn || event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#fce09b] block font-normal">{event.venueName}</strong>
                        <span className="text-stone-400">
                          {lang === "en" ? event.venueAddress : event.venueAddressBn || event.venueAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Landmark Notice */}
                  {(event.landmark || event.landmarkBn) && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200">
                      <span className="font-semibold block text-emerald-300 mb-0.5">
                        {lang === "en" ? "Landmark Guide:" : "ল্যান্ডমার্ক নির্দেশিকা:"}
                      </span>
                      {lang === "en" ? event.landmark : event.landmarkBn || event.landmark}
                    </div>
                  )}

                  {/* Dress code */}
                  {event.dressCode && (
                    <div className="mt-3 p-2.5 rounded-xl bg-white/5 text-[11px] text-stone-300">
                      <span className="text-[#d4af37] font-semibold block mb-0.5">
                        {lang === "en" ? "Suggested Attire:" : "পোশাকের ধারণা:"}
                      </span>
                      {lang === "en" ? event.dressCode : event.dressCodeBn || event.dressCode}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Add to Calendar & Live GPS Navigation */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  {/* 1. Add to Calendar (Google, Apple, Outlook with Alarms) */}
                  <button
                    onClick={() => setSelectedCalendarEvent(event)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#13241f] hover:bg-[#1c3830] text-[#fce09b] border border-[#d4af37]/35 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#d4af37]" />
                    <span>
                      {lang === "en" ? "Add to Calendar (Alarms)" : "ক্যালেন্ডার ও রিমাইন্ডার"}
                    </span>
                  </button>

                  {/* 2. Direct Live GPS Navigation (Google Maps Turn-by-Turn) */}
                  <button
                    onClick={() => setSelectedNavigationEvent(event)}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <Car className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {lang === "en" ? "Google Maps GPS Navigation" : "গুগল ম্যাপস লাইভ নেভিগেশন"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={!!selectedCalendarEvent}
        onClose={() => setSelectedCalendarEvent(null)}
        event={selectedCalendarEvent}
        allEvents={events}
        lang={lang}
      />

      {/* Venue GPS Navigation Modal */}
      <VenueNavigationModal
        isOpen={!!selectedNavigationEvent}
        onClose={() => setSelectedNavigationEvent(null)}
        event={selectedNavigationEvent}
        lang={lang}
      />
    </section>
  );
}
