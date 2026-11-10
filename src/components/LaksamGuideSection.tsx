"use client";

import React from "react";
import Image from "next/image";
import { Compass, MapPin, Navigation, Sparkles, Building, Train, Waves, Landmark } from "lucide-react";

interface LaksamPlace {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  image: string;
  location: string;
  locationBn: string;
  distance: string;
  distanceBn: string;
  description: string;
  descriptionBn: string;
  mapUrl: string;
  icon: React.ReactNode;
}

interface LaksamGuideSectionProps {
  lang: "en" | "bn";
}

export default function LaksamGuideSection({ lang }: LaksamGuideSectionProps) {
  const places: LaksamPlace[] = [
    {
      id: "faizunnesa-bari",
      name: "Nawab Faizunnesa Palace & Museum",
      nameBn: "নওয়াব ফয়জুন্নেছা জমিদার বাড়ি ও জাদুঘর",
      category: "Historical Heritage",
      categoryBn: "ঐতিহাসিক প্রত্নতত্ত্ব ও জাদুঘর",
      image: "/images/laksam/nawab-faizunnesa-bari.jpg",
      location: "Paschimgaon, Laksam (Bank of Dakatia River)",
      locationBn: "পশ্চিমগাঁও, লাকসাম (ডাকাতিয়া নদীর কোল ঘেঁষে)",
      distance: "~10 mins from Pir Bari Venue",
      distanceBn: "পীর বাড়ি ভেন্যু থেকে মাত্র ১০-১২ মিনিট",
      description:
        "The majestic 1871 estate and museum of Nawab Faizunnesa Choudhurani, the first and only female Nawab in South Asia, awarded by Queen Victoria. Featuring classic Mughal-British architecture, royal court rooms, and riverside tranquility.",
      descriptionBn:
        "উপমহাদেশের একমাত্র নারী নওয়াব মহীয়সী ফয়জুন্নেছা চৌধুরাণীর স্মৃতিবিজড়িত ১৮৭১ সালের ঐতিহাসিক প্রাসাদ ও জাতীয় জাদুঘর। চমৎকার ব্রিটিশ ও মুঘল স্থাপত্য, রঙের মহল এবং ডাকাতিয়া নদীর শান্ত কোল পর্যটকদের প্রধান আকর্ষণ।",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nawab+Faizunnesa+Zamindar+Bari+Laksam",
      icon: <Building className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: "laksam-junction",
      name: "Historic Laksam Railway Junction",
      nameBn: "ঐতিহাসিক লাকসাম রেলওয়ে জংশন",
      category: "British Era Landmark",
      categoryBn: "ব্রিটিশ আমলের রেল ঐতিহ্য",
      image: "/images/laksam/laksam-junction.jpg",
      location: "Laksam Town Center",
      locationBn: "লাকসাম পৌরশহর",
      distance: "~8 mins from Pir Bari Venue",
      distanceBn: "পীর বাড়ি ভেন্যু থেকে মাত্র ৮-১০ মিনিট",
      description:
        "Established in 1893 during the British period over 300 acres of land. It stands as one of the oldest, largest, and historically rich railway junctions in Bangladesh connecting Dhaka, Chattogram, and Sylhet.",
      descriptionBn:
        "১৮৯৩ সালে ব্রিটিশ আমলে ৩০০ একরেরও বেশি জমির ওপর প্রতিষ্ঠিত বাংলাদেশের অন্যতম প্রাচীন ও সুবিশাল রেলওয়ে জংশন। ঐতিহ্যের সাক্ষী এই জংশনটি দেখতে দূরদূরান্ত থেকে ভ্রমণপিপাসুরা আসেন।",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Laksam+Railway+Junction",
      icon: <Train className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: "dakatia-river",
      name: "Scenic Dakatia River & Riverfront",
      nameBn: "প্রমত্তা ডাকাতিয়া নদী ও রিভারভিউ",
      category: "Nature & Sunset Views",
      categoryBn: "প্রাকৃতিক সৌন্দর্য ও সূর্যাস্ত",
      image: "/images/laksam/dakatia-river-view.jpg",
      location: "Riverbanks along Laksam Bridge",
      locationBn: "লাকসাম ব্রিজ ও নদীতীরবর্তী এলাকা",
      distance: "~5 mins from Pir Bari Venue",
      distanceBn: "পীর বাড়ির নিকটবর্তী",
      description:
        "The lifeblood of Laksam, the serene Dakatia River offers tranquil breezes, traditional wooden boats, and golden evening sunset views along the scenic riverside promenade.",
      descriptionBn:
        "লাকসাম শহরের বুক চিরে বয়ে চলা শান্ত ডাকাতিয়া নদী। নদীর পাড়ে বসে স্নিগ্ধ বাতাস উপভোগ, নৌকায় ঘুরে বেড়ানো এবং সূর্যাস্তের মনোরম দৃশ্য দেখার জন্য এটি অসাধারণ এক স্থান।",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Dakatia+River+Laksam+Bridge",
      icon: <Waves className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: "moisani-bari",
      name: "Historic Moishani Bari (Zemindar Palace)",
      nameBn: "ঐতিহাসিক মৈশানী বাড়ি (মৈশান বাড়ি)",
      category: "Ancient Zemindar Estate",
      categoryBn: "প্রাচীন ঐতিহ্যবাহী জমিদার বাড়ি",
      image: "/images/laksam/moisani-bari.jpg",
      location: "Laksam Town, Cumilla",
      locationBn: "লাকসাম পৌরশহর, কুমিল্লা",
      distance: "~5-6 mins from Pir Bari Venue",
      distanceBn: "পীর বাড়ি ভেন্যু থেকে মাত্র ৫-৬ মিনিট",
      description:
        "The century-old historic residence of Zemindar Atul Krishna Roy Chowdhury, famously known locally as 'Moishan Bari' or 'Moishani Bari'. The noble family was instrumental in establishing the historic Laksam Pilot High School in 1923 and developing early town civic heritage.",
      descriptionBn:
        "লাকসামের শতবর্ষী প্রাচীন ঐতিহ্যবাহী জমিদার বাড়ি—যা স্থানীয়ভাবে 'মৈশানী বাড়ি' বা 'মৈশান বাড়ি' নামে সর্বজনবিদিত (জমিদার অতুল কৃষ্ণ রায় চৌধুরীর বাড়ি)। ১৯২৩ সালে ঐতিহ্যবাহী লাকসাম পাইলট উচ্চ বিদ্যালয় প্রতিষ্ঠা ও শিক্ষার প্রসারে এই জমিদার বাড়ির অবদান চিরস্মরণীয়।",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Moishan+Bari+Laksam",
      icon: <Landmark className="w-4 h-4 text-[#d4af37]" />,
    },
  ];

  return (
    <section id="laksam" className="py-20 px-4 relative overflow-hidden bg-[#07130f]/75 border-y border-[#d4af37]/20">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-950/30 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#13241f] border border-[#d4af37]/40 mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-xs uppercase tracking-widest text-[#fce09b] font-medium">
              {lang === "en" ? "Explore Our Hometown" : "আমাদের লাকসাম শহর দর্শন"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {lang === "en" ? "Sightseeing in Laksam" : "লাকসামের ঐতিহাসিক ও দর্শনীয় স্থান"}
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Welcoming our esteemed guests from near and far! While you join Mahmudul's wedding at Pir Bari, take a short tour of our beloved Laksam's proud heritage and scenic landmarks."
              : "আমাদের বিয়েতে আগত সকল সম্মানিত মেহমানদের লাকসামের মাটিতে আন্তরিক স্বাগতম! পীর বাড়িতে অনুষ্ঠানের পাশাপাশি সময় পেলে ঘুরে আসুন আমাদের ভালোবাসার লাকসাম শহরের এই অপূর্ব দর্শনীয় স্থানগুলো।"}
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {places.map((place) => (
            <div
              key={place.id}
              className="rounded-3xl royal-glass border border-[#d4af37]/30 overflow-hidden hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              {/* Image Preview with Zoom on hover */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#0a1813]">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#08110e]/85 backdrop-blur-md border border-[#d4af37]/40 text-[#fce09b] text-[10px] font-semibold tracking-wider flex items-center gap-1.5 shadow">
                  {place.icon}
                  <span>{lang === "en" ? place.category : place.categoryBn}</span>
                </div>

                {/* Distance Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-medium shadow">
                  📍 {lang === "en" ? place.distance : place.distanceBn}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fce09b] mb-1.5 group-hover:text-white transition">
                    {lang === "en" ? place.name : place.nameBn}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#d4af37] mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{lang === "en" ? place.location : place.locationBn}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
                    {lang === "en" ? place.description : place.descriptionBn}
                  </p>
                </div>

                {/* Direct Google Maps Direction button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#13241f] hover:bg-[#1a382e] text-[#fce09b] border border-[#d4af37]/35 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm cursor-pointer group-hover:border-[#d4af37]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{lang === "en" ? "View Location on Google Maps" : "গুগল ম্যাপে লোকেশন দেখুন"}</span>
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
