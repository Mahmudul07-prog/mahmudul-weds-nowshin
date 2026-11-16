"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { weddingData } from "@/config/weddingData";
import EnvelopeHero from "@/components/EnvelopeHero";
import PersonalizedBadge from "@/components/PersonalizedBadge";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import StoryTimeline from "@/components/StoryTimeline";
import EventsSection from "@/components/EventsSection";
import RsvpSection from "@/components/RsvpSection";
import WishesSection from "@/components/WishesSection";
import Footer from "@/components/Footer";
import PetalsEffect from "@/components/PetalsEffect";
import MusicPlayer from "@/components/MusicPlayer";

function WeddingContent() {
  const searchParams = useSearchParams();
  const rawTo = searchParams.get("to") || searchParams.get("name") || searchParams.get("guest");
  const guestName = rawTo ? decodeURIComponent(rawTo).trim() : "Honored Guest";

  const [isOpened, setIsOpened] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("bn"); // default to warm Bengali, toggleable to English
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setAutoPlayMusic(true);
    // Smooth scroll down to celebration
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  return (
    <main className="relative min-h-screen bg-[#08110e] text-[#f7f4ed]">
      {/* Romantic floating floral petals */}
      <PetalsEffect />

      {/* Floating Wedding Symphony & Music Player */}
      <MusicPlayer
        autoPlayTrigger={autoPlayMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {!isOpened ? (
        /* Envelope Landing Experience */
        <EnvelopeHero
          guestName={guestName}
          groomName={weddingData.couple.groom.name}
          brideName={weddingData.couple.bride.name}
          onOpen={handleOpenEnvelope}
          lang={lang}
        />
      ) : (
        /* Full Royal Wedding Invitation Experience */
        <div className="animate-in fade-in duration-700">
          {/* Top Sticky Personalized Greeting Bar */}
          <PersonalizedBadge
            guestName={guestName}
            lang={lang}
            onToggleLang={toggleLanguage}
            groomName={weddingData.couple.groom.name}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />

          {/* Hero Section with Countdown & Announcement */}
          <HeroSection
            config={weddingData}
            lang={lang}
            guestName={guestName}
          />

          {/* Couple Cards */}
          <CoupleSection
            config={weddingData}
            lang={lang}
          />

          {/* Story & Journey Milestones (Modular with upcoming locks) */}
          <StoryTimeline
            milestones={weddingData.story}
            lang={lang}
          />

          {/* Ceremony Schedule & Venue Locations */}
          <EventsSection
            events={weddingData.events}
            lang={lang}
          />

          {/* RSVP Attendance Form */}
          <RsvpSection
            initialGuestName={guestName}
            lang={lang}
          />

          {/* Wishes & Feedback Guestbook Wall */}
          <WishesSection
            initialGuestName={guestName}
            lang={lang}
          />

          {/* Royal Footer */}
          <Footer
            config={weddingData}
            lang={lang}
          />
        </div>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08110e] flex flex-col items-center justify-center text-[#d4af37]">
          <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mb-4" />
          <p className="font-serif text-lg tracking-widest uppercase">Opening Royal Invitation...</p>
        </div>
      }
    >
      <WeddingContent />
    </Suspense>
  );
}
