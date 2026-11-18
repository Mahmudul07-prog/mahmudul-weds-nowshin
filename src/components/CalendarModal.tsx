"use client";

import React, { useState } from "react";
import { X, Calendar, Sparkles, Check, Download, Bell, ExternalLink } from "lucide-react";
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
  const [downloadAllSuccess, setDownloadAllSuccess] = useState(false);
  const [downloadSingleSuccess, setDownloadSingleSuccess] = useState(false);

  if (!isOpen || !event) return null;

  // Build Google Calendar template link
  const getGoogleCalendarUrl = (ev: WeddingEvent) => {
    const title = encodeURIComponent(`${ev.title} - Mahmudul & Nowshin's Wedding`);
    const details = encodeURIComponent(
      `${ev.tagline}\n\nVenue: ${ev.venueName}, ${ev.venueAddress}\nContact Helpline: +880 1863-846300`
    );
    const location = encodeURIComponent(`${ev.venueName}, ${ev.venueAddress}`);
    const dates = ev.calendarDate
      ? `${ev.calendarDate}Z/${ev.calendarDate}Z`
      : "20261225T133000Z/20261225T173000Z";

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
      : "2026-12-25T13:30:00";

    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&location=${location}&startdt=${startdt}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
  };

  // Generate .ics with VALARM (automatic phone notification/reminder)
  const downloadSingleIcs = (ev: WeddingEvent) => {
    const startStr = ev.calendarDate ? `${ev.calendarDate}Z` : "20261225T133000Z";
    const endStr = ev.calendarDate ? `${ev.calendarDate.slice(0, 8)}T220000Z` : "20261225T180000Z";

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mahmudul & Nowshin Royal Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
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
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${ev.id}-calendar-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSingleSuccess(true);
    setTimeout(() => setDownloadSingleSuccess(false), 3000);
  };

  // Generate multi-event .ics file containing all events in 1 click
  const downloadAllEventsIcs = () => {
    const eventsBlocks = allEvents
      .map((ev) => {
        const startStr = ev.calendarDate ? `${ev.calendarDate}Z` : "20261225T133000Z";
        const endStr = ev.calendarDate ? `${ev.calendarDate.slice(0, 8)}T220000Z` : "20261225T180000Z";

        return `BEGIN:VEVENT
UID:${ev.id}-all-${Date.now()}@mahmudul-wedding.com
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

    const fullIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mahmudul & Nowshin Royal Wedding Full Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${eventsBlocks}
END:VCALENDAR`;

    const blob = new Blob([fullIcs], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Mahmudul_Nowshin_Full_Wedding_Calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadAllSuccess(true);
    setTimeout(() => setDownloadAllSuccess(false), 3500);
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
              {lang === "en" ? "Event Calendar & Notification Reminder" : "ক্যালেন্ডার ও স্বয়ংক্রিয় রিমাইন্ডার"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {lang === "en" ? event.title : event.titleBn || event.title}
            </h3>
          </div>
        </div>

        {/* Event Preview Info Box */}
        <div className="p-3.5 rounded-2xl bg-[#091511]/90 border border-[#d4af37]/25 mb-5 space-y-1 text-xs">
          <p className="text-stone-300">
            <strong className="text-[#fce09b]">
              {lang === "en" ? "Date & Time:" : "তারিখ ও সময়:"}{" "}
            </strong>
            {lang === "en" ? event.date : event.dateBn || event.date} •{" "}
            {lang === "en" ? event.time : event.timeBn || event.time}
          </p>
          <p className="text-stone-400">
            <strong className="text-[#fce09b]">
              {lang === "en" ? "Venue:" : "স্থান:"}{" "}
            </strong>
            {event.venueName} ({lang === "en" ? event.venueAddress : event.venueAddressBn || event.venueAddress})
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {/* Option 1: Google Calendar */}
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 rounded-2xl bg-[#13241f] hover:bg-[#1c3830] border border-[#d4af37]/35 flex items-center justify-between transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                G
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-[#fce09b] transition">
                  Google Calendar
                </p>
                <p className="text-[11px] text-stone-400">
                  {lang === "en" ? "Open directly in Google Calendar app or web" : "গুগল ক্যালেন্ডার অ্যাপ বা ব্রাউজারে সাথে সাথে যোগ করুন"}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#fce09b]" />
          </a>

          {/* Option 2: Apple / iOS / Outlook (.ics file with alarms) */}
          <button
            onClick={() => downloadSingleIcs(event)}
            className="w-full p-3.5 rounded-2xl bg-[#13241f] hover:bg-[#1c3830] border border-[#d4af37]/35 flex items-center justify-between transition group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-[#fce09b] transition">
                  Apple iPhone / Outlook (.ics)
                </p>
                <p className="text-[11px] text-stone-400">
                  {lang === "en"
                    ? "Includes 24h & 2h automatic alarms & reminders"
                    : "২৪ ঘণ্টা ও ২ ঘণ্টা আগের স্বয়ংক্রিয় অ্যালার্ম সহ .ics ফাইল"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#d4af37]">
              {downloadSingleSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloadSingleSuccess ? "Downloaded" : "Download"}</span>
            </div>
          </button>

          {/* Option 3: Outlook Web */}
          <a
            href={getOutlookWebUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
                O
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-[#fce09b] transition">
                  Outlook.com / Office 365
                </p>
                <p className="text-[11px] text-stone-400">
                  {lang === "en" ? "Add to Outlook web calendar" : "আউটলুক ওয়েব ক্যালেন্ডারে যোগ করুন"}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#fce09b]" />
          </a>
        </div>

        {/* Special Feature: Add All 3 Wedding Events in 1 File */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <button
            onClick={downloadAllEventsIcs}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadAllSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{lang === "en" ? "Full Wedding Schedule Saved!" : "সম্পূর্ণ বিয়ের ক্যালেন্ডার ডাউনলোড সম্পন্ন!"}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === "en"
                    ? "Add All 3 Wedding Events to Calendar (1-Click)"
                    : "বিয়ের সকল অনুষ্ঠান একসাথে ক্যালেন্ডারে সেভ করুন (১-ক্লিক)"}
                </span>
              </>
            )}
          </button>
          <p className="text-[11px] text-stone-400 text-center mt-2">
            {lang === "en"
              ? "Saves Gaye Holud, Sacred Nikah & Grand Walima with reminder alarms to your device."
              : "গায়ে হলুদ, পবিত্র আকদ ও ওয়ালিমা—সবগুলো অনুষ্ঠান একসাথে আপনার ফোনে অ্যালার্ম সহ সেভ হবে।"}
          </p>
        </div>
      </div>
    </div>
  );
}
