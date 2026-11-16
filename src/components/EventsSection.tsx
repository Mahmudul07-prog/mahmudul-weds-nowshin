"use client";

import React from "react";
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus } from "lucide-react";
import { WeddingEvent } from "@/types";

interface EventsSectionProps {
  events: WeddingEvent[];
  lang: "en" | "bn";
}

export default function EventsSection({ events, lang }: EventsSectionProps) {
  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${event.title} - Mahmudul's Wedding`);
    const details = encodeURIComponent(
      `${event.tagline}. Venue: ${event.venueName}, ${event.venueAddress}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    // Example dates: 20261225T133000Z / 20261225T173000Z
    const dates = event.calendarDate
      ? `${event.calendarDate}Z/${event.calendarDate}Z`
      : "20261225T130000Z/20261225T170000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const downloadIcs = (event: WeddingEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mahmudul Wedding//EN
BEGIN:VEVENT
SUMMARY:${event.title} - Mahmudul's Wedding
DESCRIPTION:${event.tagline}
LOCATION:${event.venueName}, ${event.venueAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              ? "Join us in our celebrations across every sacred milestone. Exact venues & timestamps will be communicated with reverence."
              : "আমাদের জীবনের স্মরণীয় প্রতিটি অনুষ্ঠানে আপনার উপস্থিতি একান্তভাবে কাম্য।"}
          </p>
        </div>

        {/* Notice Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-[#13241f]/70 border border-[#d4af37]/30 text-center">
          <p className="text-xs text-[#fce09b] flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>
              {lang === "en"
                ? "The Sacred Nikah & Wedding ceremony will be hosted at the Bride's residence (Maniksar Khan Bari, Barura), followed by the Grand Walima at the Groom's residence (Pir Bari, Laksam)."
                : "পবিত্র আকদ ও মূল বিবাহ অনুষ্ঠান কনের নিজ বাড়ি—মানিকসার খান বাড়ি (মুদাফরগঞ্জ, বরুড়া, কুমিল্লা) এবং বিবাহোত্তর ওয়ালিমা বরের বাড়ি—পীর বাড়ি (আউশপাড়া, লাকসাম)-তে অনুষ্ঠিত হবে।"}
            </span>
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl p-6 sm:p-7 royal-glass royal-glass-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Event Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#fce09b]">
                    {event.isConfirmed
                      ? (lang === "en" ? "Confirmed" : "নির্ধারিত")
                      : (lang === "en" ? "Tentative / প্রস্তাবিত" : "প্রস্তাবিত সময়")}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
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

                {/* Dress code */}
                {event.dressCode && (
                  <div className="mt-4 p-3 rounded-xl bg-white/5 text-[11px] text-stone-300">
                    <span className="text-[#d4af37] font-semibold block mb-0.5">
                      {lang === "en" ? "Suggested Attire:" : "পোশাকের ধারণা:"}
                    </span>
                    {lang === "en" ? event.dressCode : event.dressCodeBn || event.dressCode}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                <a
                  href={getGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#13241f] hover:bg-[#1c3830] text-[#fce09b] border border-[#d4af37]/30 text-xs font-medium flex items-center justify-center gap-2 transition"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-[#d4af37]" />
                  {lang === "en" ? "Add to Google Calendar" : "গুগল ক্যালেন্ডারে যোগ করুন"}
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => downloadIcs(event)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    .iCal Invite
                  </button>
                  <a
                    href={event.mapUrl || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Navigation className="w-3 h-3 text-[#d4af37]" />
                    {lang === "en" ? "Map View" : "ম্যাপ"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
