"use client";

import React, { useState } from "react";
import { X, Calendar, Sparkles, Check, Download, Bell, ExternalLink, CheckSquare, Square, Info } from "lucide-react";
import { WeddingEvent } from "@/types";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: WeddingEvent | null;
  allEvents: WeddingEvent[];
  lang: "en" | "bn";
}

export default function CalendarModal({
  isOpen,
  onClose,
  event,
  allEvents,
  lang,
}: CalendarModalProps) {
  // By default, select ONLY the event clicked on (or Walima by default if general)
  const defaultId =
    event?.id ||
    allEvents.find((e) => e.id === "event-walima")?.id ||
    allEvents[0]?.id ||
    "event-walima";

  const [selectedIds, setSelectedIds] = useState<string[]>([defaultId]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [prevEventId, setPrevEventId] = useState<string | null>(event?.id || null);

  // Synchronize when a different event is selected
  if (event && event.id !== prevEventId) {
    setPrevEventId(event.id);
    setSelectedIds([event.id]);
  }

  if (!isOpen) return null;

  const toggleEvent = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least one selected
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedEvents = allEvents.filter((e) => selectedIds.includes(e.id));
  const primaryEvent = selectedEvents[0] || event || allEvents[0];

  // Build Google Calendar template link for primary selected event
  const getGoogleCalendarUrl = (ev: WeddingEvent) => {
    const title = encodeURIComponent(`${ev.title} - Mahmudul & Nowshin's Wedding`);
    const details = encodeURIComponent(
      `${ev.tagline}\n\nVenue: ${ev.venueName}, ${ev.venueAddress}\nContact Helpline: +880 1863-846300`
    );
    const location = encodeURIComponent(`${ev.venueName}, ${ev.venueAddress}`);
    const dates = ev.calendarDate
      ? `${ev.calendarDate}Z/${ev.calendarDate}Z`
      : "20261218T133000Z/20261218T173000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Build Outlook Web link
  const getOutlookWebUrl = (ev: WeddingEvent) => {
    const subject = encodeURIComponent(`${ev.title} - Mahmudul & Nowshin's Wedding`);
    const body = encodeURIComponent(
      `${ev.tagline}\n\nVenue: ${ev.venueName}, ${ev.venueAddress}\nContact Helpline: +880 1863-846300`
    );
    const location = encodeURIComponent(`${ev.venueName}, ${ev.venueAddress}`);
    const startdt = ev.calendarDate
      ? `${ev.calendarDate.slice(0, 4)}-${ev.calendarDate.slice(4, 6)}-${ev.calendarDate.slice(6, 8)}T${ev.calendarDate.slice(9, 11)}:${ev.calendarDate.slice(11, 13)}:00`
      : "2026-12-18T13:30:00";

    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&location=${location}&startdt=${startdt}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
  };

  // Generate .ics containing ONLY the user-selected events with alarms & GPS
  const handleDownloadSelectedIcs = () => {
    if (selectedEvents.length === 0) return;

    const eventsBlocks = selectedEvents
      .map((ev) => {
        const startStr = ev.calendarDate ? `${ev.calendarDate}Z` : "20261218T133000Z";
        const endStr = ev.calendarDate ? `${ev.calendarDate.slice(0, 8)}T220000Z` : "20261218T180000Z";

        return `BEGIN:VEVENT
UID:${ev.id}-${Date.now()}@mahmudul-wedding.com
DTSTAMP:20261118T000000Z
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:${ev.title} - Mahmudul & Nowshin
DESCRIPTION:${ev.tagline}. Venue: ${ev.venueName}, ${ev.venueAddress}. Helpline: +880 1863-846300
LOCATION:${ev.venueName}, ${ev.venueAddress}${ev.coordinates ? `\nGEO:${ev.coordinates.lat};${ev.coordinates.lng}` : ""}
STATUS:CONFIRMED
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: ${ev.title} tomorrow!
TRIGGER:-P1D
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: ${ev.title} in 2 hours!
TRIGGER:-PT2H
END:VALARM
END:VEVENT`;
      })
      .join("\n");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mahmudul & Nowshin Royal Wedding Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${eventsBlocks}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const filename =
      selectedEvents.length === 1
        ? `${selectedEvents[0].id}-calendar-invite.ics`
        : `Mahmudul_Nowshin_Selected_Ceremonies.ics`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 sm:p-7 rounded-3xl royal-glass border border-[#d4af37]/45 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
              {lang === "en" ? "Custom Calendar Reminder" : "ক্যালেন্ডার ও স্বয়ংক্রিয় রিমাইন্ডার"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {lang === "en" ? "Select Ceremony to Save" : "আমন্ত্রিত অনুষ্ঠান নির্বাচন করুন"}
            </h3>
          </div>
        </div>

        {/* Cultural Clarification Note */}
        <div className="p-3 rounded-2xl bg-[#13241f]/90 border border-[#d4af37]/30 mb-4 flex items-start gap-2 text-xs text-[#fce09b]">
          <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === "en"
              ? "You can choose only the ceremony you are attending (e.g. Walima Reception or both) to add custom reminders to your phone."
              : "আপনি যে অনুষ্ঠানে আমন্ত্রিত বা উপস্থিত থাকবেন (যেমন: শুভ ওয়ালিমা ও দোয়া অথবা উভয়টি), শুধুমাত্র সেটি বেছে নিয়ে আপনার ফোনে রিমাইন্ডার সেভ করুন।"}
          </p>
        </div>

        {/* Event Selection Checkboxes */}
        <div className="space-y-2.5 mb-5">
          <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
            {lang === "en" ? "Select which events to sync:" : "কোন কোন অনুষ্ঠানের রিমাইন্ডার চান:"}
          </label>

          {allEvents.map((ev) => {
            const isSelected = selectedIds.includes(ev.id);
            const isWalima = ev.id === "event-walima";
            const isNikah = ev.id === "event-nikah";

            return (
              <div
                key={ev.id}
                onClick={() => toggleEvent(ev.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isSelected
                    ? "bg-[#13241f] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    : "bg-[#091511]/70 border-white/10 hover:border-white/20 opacity-75"
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-[#d4af37]"
                  aria-label="Toggle selection"
                >
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-[#d4af37]" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "en" ? ev.title : ev.titleBn || ev.title}
                    </h4>
                    {/* Audience Badge */}
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-semibold border ${
                        isWalima
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                          : isNikah
                          ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                          : "bg-white/5 border-white/10 text-stone-400"
                      }`}
                    >
                      {lang === "en" ? ev.audience || "Ceremony" : ev.audienceBn || "অনুষ্ঠান"}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 mt-1">
                    {lang === "en" ? ev.time : ev.timeBn || ev.time} •{" "}
                    <span className="text-[#fce09b]">{ev.venueName}</span>
                  </p>
                  <p className="text-[11px] text-stone-400 truncate">
                    {lang === "en" ? ev.venueAddress : ev.venueAddressBn || ev.venueAddress}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Summary Pill */}
        <div className="mb-4 text-center">
          <span className="text-xs text-stone-300">
            {lang === "en"
              ? `Selected for calendar sync: ${selectedEvents.length} event(s)`
              : `ক্যালেন্ডারে যোগ করার জন্য নির্বাচিত: ${selectedEvents.length}টি অনুষ্ঠান`}
          </span>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {/* Option 1: Apple iPhone / Android / Outlook (.ics file with automatic alarms) */}
          <button
            onClick={handleDownloadSelectedIcs}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-lg shadow-[#d4af37]/25 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-[#061a14]" />
              <span>
                {downloadSuccess
                  ? (lang === "en" ? "Calendar Saved to Phone!" : "ক্যালেন্ডার সেভ হয়েছে!")
                  : lang === "en"
                  ? `Save Selected Event(s) to Phone (.ics)`
                  : `নির্বাচিত ${selectedEvents.length}টি অনুষ্ঠান ফোনে সেভ করুন (.ics)`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              {downloadSuccess ? <Check className="w-4 h-4 stroke-[3]" /> : <Download className="w-4 h-4" />}
            </div>
          </button>

          {/* Option 2: Google Calendar (Web/App) */}
          {primaryEvent && (
            <a
              href={getGoogleCalendarUrl(primaryEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-2xl bg-[#13241f] hover:bg-[#1c3830] border border-[#d4af37]/35 flex items-center justify-between transition group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
                  G
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#fce09b] transition">
                    Google Calendar ({lang === "en" ? primaryEvent.title : primaryEvent.titleBn || primaryEvent.title})
                  </p>
                  <p className="text-[10px] text-stone-400">
                    {lang === "en" ? "Open directly in Google Calendar app" : "সরাসরি গুগল ক্যালেন্ডারে যুক্ত করুন"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#fce09b]" />
            </a>
          )}

          {/* Option 3: Outlook Web */}
          {primaryEvent && (
            <a
              href={getOutlookWebUrl(primaryEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">
                  O
                </div>
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-[#fce09b] transition">
                    Outlook.com / Office 365
                  </p>
                  <p className="text-[10px] text-stone-400">
                    {lang === "en" ? "Add to Outlook web calendar" : "আউটলুক ওয়েব ক্যালেন্ডারে যোগ করুন"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#fce09b]" />
            </a>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-white/10 text-center">
          <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              {lang === "en"
                ? "Includes 24h & 2h automatic alarms & GPS directions."
                : "২৪ ঘণ্টা ও ২ ঘণ্টা আগের স্বয়ংক্রিয় অ্যালার্ম ও জিপিএস ডিরেকশন অন্তর্ভুক্ত রয়েছে।"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
