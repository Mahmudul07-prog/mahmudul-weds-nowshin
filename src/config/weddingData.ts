import { WeddingConfig } from "@/types";

/**
 * =========================================================================
 * 💍 WEDDING MASTER CONFIGURATION
 * =========================================================================
 * এই ফাইলের মাধ্যমে আপনি যেকোনো সময় সহজে বিয়ের তারিখ, লোকেশন, কনের নাম, 
 * প্রেমের/পরিবারের গল্প বা ইভেন্টের বিস্তারিত পরিবর্তন বা যোগ করতে পারবেন।
 *
 * আপনি যখন নতুন কোনো তথ্য দিবেন (যেমন: কনের সাথে প্রথম দেখার তারিখ, ভেন্যু),
 * তখন শুধু নিচের ফিল্ডগুলোতে তথ্য বসিয়ে দিলেই পুরো ওয়েবসাইট সাথে সাথে আপডেট হয়ে যাবে!
 * =========================================================================
 */

export const weddingData: WeddingConfig = {
  couple: {
    groom: {
      name: "Mahmudul",
      nameBn: "মাহমুদুল হাসান",
      fullName: "Md. Mahmudul Hasan",
      role: "The Groom",
      bio: "A passionate soul from Pir Bari, Aushpara, Laksam, ready to embark on life's most sacred and beautiful chapter with love and family blessings.",
      fatherName: "Khaza Md Aminul Ahsan",
      motherName: "Kohinur Begum",
      image: "/images/mahmudul-groom.jpg",
    },
    bride: {
      name: "The Special One",
      nameBn: "কনে (Coming Soon)",
      fullName: "Bride to be",
      role: "The Bride",
      bio: "A precious soul chosen by destiny, waiting for the auspicious moment of their first encounter to begin their forever journey.",
      fatherName: "Mr. Father's Name",
      motherName: "Mrs. Mother's Name",
      image: "/images/bride-placeholder.svg",
      // আপনি যখন কনের নাম ও ছবি জানাবেন, তখন isRevealed: true করে দিবেন
      isRevealed: false,
    },
    hashtag: "#MahmudulWedsSoon",
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahText: "In the name of Allah, the Most Gracious, the Most Merciful",
    quoteEnglish:
      "And among His signs is that He created for you spouses from among yourselves, so that you may find tranquility in them, and He placed between you love and mercy. (Surah Ar-Rum: 21)",
    quoteBengali:
      "এবং তাঁর অন্যতম নিদর্শন এই যে, তিনি তোমাদের মধ্য থেকে তোমাদের জন্য সঙ্গিনী সৃষ্টি করেছেন যাতে তোমরা তাদের নিকট প্রশান্তি পাও এবং তোমাদের মাঝে পারস্পরিক ভালোবাসা ও দয়া সৃষ্টি করেছেন। (সূরা আর-রূম: ২১)",
  },

  dates: {
    // এখানে আপনার ফাইনাল বিয়ের তারিখ বসবে (YYYY-MM-DDTHH:mm:ss)
    targetWeddingDate: "2026-12-25T18:00:00",
    displayDate: "To Be Announced InshaAllah",
    displayDateBn: "ইনশাআল্লাহ খুব শীঘ্রই তারিখ জানানো হবে",
    // যখন তারিখ ফাইনাল হবে তখন isDateFinalized: true দিবেন
    isDateFinalized: false,
  },

  // আমাদের গল্পের বিভিন্ন ধাপ (Timeline / Journey)
  story: [
    {
      id: "step-1",
      title: "Family Talks & Destiny",
      titleBn: "পারিবারিক আলাপ ও শুভসূচনা",
      date: "07 November 2026",
      dateBn: "০৭ নভেম্বর ২০২৬",
      description:
        "Two families connecting with heart and prayers, laying the foundation for a lifetime of togetherness.",
      descriptionBn:
        "পরিবারের মধ্যস্থতায় সুন্দর সম্পর্কের শুভ সূচনা। আন্তরিক আলোচনা ও দোয়ার মাধ্যমে তৈরি হলো সম্পর্কের ভিত্তি।",
      isUnlocked: true,
      statusBadge: "Accomplished",
      icon: "heart",
    },
    {
      id: "step-2",
      title: "The First Meet (দেখা হওয়ার শুভক্ষণ)",
      titleBn: "প্রথম দেখার মাহেন্দ্রক্ষণ",
      date: "Awaiting the Precious Day",
      dateBn: "অপেক্ষার প্রহর...",
      description:
        "The much-anticipated moment where eyes meet and hearts speak the silent language of destiny.",
      descriptionBn:
        "এখনও প্রথম দেখা হয়নি। যেদিন দেখা হবে, সেই স্মরণীয় তারিখ ও অনুভূতি এখানে খুব সুন্দরভাবে যুক্ত করা হবে ইনশাআল্লাহ।",
      isUnlocked: false,
      statusBadge: "Next Chapter / পরবর্তী ধাপ",
      icon: "sparkles",
    },
    {
      id: "step-3",
      title: "The Formal Commitment & Ring",
      titleBn: "আংটি বদল ও শুভ আংটি পরিধান",
      date: "Upcoming InshaAllah",
      dateBn: "শীঘ্রই আসছে",
      description:
        "Exchanging promises under the blessings of both families, cementing our hearts for the sacred journey.",
      descriptionBn:
        "দুপক্ষের পরিবারের সান্নিধ্যে শুভ প্রতিশ্রুতি এবং আংটি বিনিময়ের স্মৃতি।",
      isUnlocked: false,
      statusBadge: "Upcoming",
      icon: "ring",
    },
    {
      id: "step-4",
      title: "The Sacred Nikah & Wedding Day",
      titleBn: "পবিত্র আকদ ও শুভ বিবাহ",
      date: "The Grand Celebration",
      dateBn: "মহোৎসব",
      description:
        "The official union witnessed by beloved friends and families, stepping hand-in-hand into eternity.",
      descriptionBn:
        "সকল আত্মীয়স্বজন ও প্রিয়জনদের দোয়া নিয়ে নতুন জীবনের পথে একসাথে পথচলা শুরু।",
      isUnlocked: false,
      statusBadge: "Destination",
      icon: "infinity",
    },
  ],

  // বিয়ের বিভিন্ন ইভেন্ট (হলুদ, বিয়ে, রিসেপশন ইত্যাদি)
  events: [
    {
      id: "event-holud",
      title: "Gaye Holud & Sangeet",
      titleBn: "গায়ে হলুদ ও বর্ণিল উৎসব",
      tagline: "A splash of turmeric, music, laughter and joyful traditions",
      taglineBn: "হলুদের ছোঁয়া, সুরের ঝংকার ও পরিবারের আনন্দধারা",
      date: "Date to be announced",
      dateBn: "তারিখ শীঘ্রই জানানো হবে",
      time: "07:00 PM onwards",
      timeBn: "সন্ধ্যা ০৭:০০ ঘটিকা",
      venueName: "পীর বাড়ি (Pir Bari Residence)",
      venueAddress: "Aushpara, Pir Bari, Laksam, Cumilla - 3570",
      venueAddressBn: "আউশপাড়া, পীর বাড়ি, লাকসাম, কুমিল্লা - ৩৫৭০",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Aushpara,+Laksam,+Cumilla",
      calendarDate: "20261224T190000",
      isConfirmed: true,
      dressCode: "Traditional Mustard Yellow & Floral",
      dressCodeBn: "বাসন্তী হলুদ অথবা রঙিন ঐতিহ্যবাহী পোশাক",
      iconName: "sun",
    },
    {
      id: "event-nikah",
      title: "The Sacred Nikah & Wedding",
      titleBn: "পবিত্র আকদ ও মূল বিবাহ অনুষ্ঠান",
      tagline: "The solemn prayer and vows binding two souls together forever",
      taglineBn: "কবুল বলে চিরবন্ধনে আবদ্ধ হওয়ার পবিত্র মুহূর্ত",
      date: "Date to be announced",
      dateBn: "তারিখ শীঘ্রই জানানো হবে",
      time: "01:30 PM onwards",
      timeBn: "দুপুর ০১:৩০ ঘটিকা",
      venueName: "পীর বাড়ি (Pir Bari Residence)",
      venueAddress: "Aushpara, Pir Bari, Laksam, Cumilla - 3570",
      venueAddressBn: "আউশপাড়া, পীর বাড়ি, লাকসাম, কুমিল্লা - ৩৫৭০",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Aushpara,+Laksam,+Cumilla",
      calendarDate: "20261225T133000",
      isConfirmed: true,
      dressCode: "Royal Traditional Panjabi / Sherwani & Saree",
      dressCodeBn: "রাজকীয় শেরওয়ানি / পাঞ্জাবি ও শাড়ি",
      iconName: "rings",
    },
    {
      id: "event-walima",
      title: "Walima / Grand Reception",
      titleBn: "ওয়ালিমা ও বিবাহোত্তর সংবর্ধনা",
      tagline: "A feast of joy, blessings, and warm hospitality with family and friends",
      taglineBn: "অতিথি আপ্যায়ন, দোয়া ও মধুর স্মৃতিময় নৈশভোজ",
      date: "Date to be announced",
      dateBn: "তারিখ শীঘ্রই জানানো হবে",
      time: "07:30 PM onwards",
      timeBn: "সন্ধ্যা ০৭:৩০ ঘটিকা",
      venueName: "পীর বাড়ি (Pir Bari Residence)",
      venueAddress: "Aushpara, Pir Bari, Laksam, Cumilla - 3570",
      venueAddressBn: "আউশপাড়া, পীর বাড়ি, লাকসাম, কুমিল্লা - ৩৫৭০",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Aushpara,+Laksam,+Cumilla",
      calendarDate: "20261227T193000",
      isConfirmed: true,
      dressCode: "Formal Suits & Elegant Evening Wear",
      dressCodeBn: "ফর্মাল বা মার্জিত অভিজাত পোশাক",
      iconName: "utensils",
    },
  ],

  contact: {
    phone: "+880 1863-846300",
    whatsapp: "+880 1863-846300",
    email: "invitation@example.com",
  },

  music: {
    title: "বারাকাল্লাহু লাকুমা (Baraka Allahu Lakuma)",
    artist: "ইসলামিক বিয়ের মধুর গজল / Nasheed",
    audioUrl: "/audio/wedding-melody.mp3",
  },
};
