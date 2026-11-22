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
      nameBn: "মাহমুদুল",
      fullName: "Md. Mahmudul Hasan",
      fullNameBn: "মুহাম্মাদ মাহমুদুল হাসান",
      role: "The Groom",
      bio: "A passionate soul from Pir Bari, Aushpara, Laksam, ready to embark on life's most sacred and beautiful chapter with love and family blessings.",
      fatherName: "Khaza Md Aminul Ehsan",
      fatherNameBn: "খাজা মোঃ আমিনুল এহছান",
      motherName: "Kohinur Begum",
      motherNameBn: "কহিনুর বেগম",
      address: {
        village: "Pir Bari, Aushpara",
        villageBn: "পীর বাড়ি, আউশপাড়া",
        postOffice: "Laksam - 3570",
        postOfficeBn: "লাকসাম - ৩৫৭০",
        policeStation: "Laksam",
        policeStationBn: "লাকসাম",
        district: "Cumilla",
        districtBn: "কুমিল্লা",
        shortAddress: "Pir Bari, Aushpara, PO: Laksam (3570), PS: Laksam, Cumilla",
        shortAddressBn: "পীর বাড়ি, আউশপাড়া, ডাকঘর: লাকসাম (৩৫৭০), থানা: লাকসাম, জেলা: কুমিল্লা",
      },
      image: "/images/mahmudul-groom.jpg",
    },
    bride: {
      name: "Nowshin",
      nameBn: "নওশীন",
      fullName: "Nowshin Jahan Mili",
      fullNameBn: "নওশীন জাহান মিলি",
      role: "The Bride",
      bio: "A gracious and gentle soul from Maniksar (Khan Bari), Mudaforgonj, Barura, Cumilla, stepping hand-in-hand with Mahmudul into this sacred journey of eternal companionship, love, and piety.",
      fatherName: "Md. Abdul Malek Khan",
      fatherNameBn: "মোঃ আব্দুল মালেক খান",
      motherName: "Ms. Mariam Akter",
      motherNameBn: "মরিয়ম আক্তার",
      address: {
        village: "Maniksar (Khan Bari)",
        villageBn: "মানিকসার (খান বাড়ি)",
        postOffice: "Mudaforgonj",
        postOfficeBn: "মুদাফরগঞ্জ",
        policeStation: "Barura",
        policeStationBn: "বরুড়া",
        district: "Cumilla",
        districtBn: "কুমিল্লা",
        shortAddress: "Maniksar (Khan Bari), Mudaforgonj, Barura, Cumilla",
        shortAddressBn: "মানিকসার (খান বাড়ি), মুদাফরগঞ্জ, বরুড়া, কুমিল্লা",
      },
      image: "/images/nowshin-mili-bride.jpg",
      isRevealed: true,
    },
    hashtag: "#MahmudulWedsMili",
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahText: "In the name of Allah, the Most Gracious, the Most Merciful",
    quoteEnglish:
      "And among His signs is that He created for you spouses from among yourselves, so that you may find tranquility in them, and He placed between you love and mercy. (Surah Ar-Rum: 21)",
    quoteBengali:
      "এবং তাঁর অন্যতম নিদর্শন এই যে, তিনি তোমাদের মধ্য থেকে তোমাদের জন্য সঙ্গিনী সৃষ্টি করেছেন যাতে তোমরা তাদের নিকট প্রশান্তি পাও এবং তোমাদের মাঝে পারস্পরিক ভালোবাসা ও দয়া সৃষ্টি করেছেন। (সূরা আর-রূম: ২১)",
  },

  dates: {
    // এখানে আপনার ফাইনাল বিয়ের তারিখ বসবে (YYYY-MM-DDTHH:mm:ss)
    targetWeddingDate: "2026-12-18T13:30:00",
    displayDate: "17, 18 & 19 December 2026",
    displayDateBn: "১৭, ১৮ ও ১৯ ডিসেম্বর ২০২৬",
    // যখন তারিখ ফাইনাল হবে তখন isDateFinalized: true দিবেন
    isDateFinalized: true,
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
      title: "The First Meet (প্রথম দেখা)",
      titleBn: "প্রথম দেখার মাহেন্দ্রক্ষণ",
      date: "13 November 2026",
      dateBn: "১৩ নভেম্বর ২০২৬",
      description:
        "The momentous first meeting between Mahmudul and Nowshin Jahan Mili at Maniksar Khan Bari, Mudaforgonj, Barura, Cumilla (Bride's residence). Families united in joy and blessings for the beautiful journey ahead.",
      descriptionBn:
        "১৩ নভেম্বর ২০২৬, কনের নিজ বাড়ি—মানিকসার খান বাড়ি (মুদাফরগঞ্জ, বরুড়া, কুমিল্লা)-তে অনুষ্ঠিত হলো প্রথম দেখার মাহেন্দ্রক্ষণ। দুই পরিবারের সান্নিধ্য ও আনন্দঘন পরিবেশে রচিত হলো এক আজন্ম ভালোবাসার পবিত্র শুভসূচনা।",
      isUnlocked: true,
      statusBadge: "Accomplished",
      icon: "sparkles",
    },
    {
      id: "step-3",
      title: "Family Pact: Mahr & Dates Finalized",
      titleBn: "শুভ পাকা কথা (কাবিন ও দিনক্ষণ চূড়ান্ত)",
      date: "21 November 2026",
      dateBn: "২১ নভেম্বর ২০২৬",
      description:
        "With the heartfelt consent and presence of both families' elders, the sacred mahr (kabin) and wedding dates were gracefully finalized under abundant blessings and prayers.",
      descriptionBn:
        "উভয় পরিবারের মুরুব্বি ও অভিভাবকদের আন্তরিক উপস্থিতিতে শুভ পরিণয়ের পাকা কথা সম্পন্ন হলো। সুন্দর ও সৌহার্দ্যপূর্ণ পরিবেশে দেনমোহর (কাবিন) এবং শুভ বিবাহের চূড়ান্ত দিনক্ষণ নির্ধারণ করা হয়।",
      isUnlocked: true,
      statusBadge: "Accomplished",
      icon: "check-circle",
    },
    {
      id: "step-4",
      title: "The Sacred Nikah & Wedding Day",
      titleBn: "পবিত্র আকদ ও শুভ বিবাহ",
      date: "18 December 2026",
      dateBn: "১৮ ডিসেম্বর ২০২৬",
      description:
        "The official union witnessed by beloved friends and families, stepping hand-in-hand into eternity.",
      descriptionBn:
        "সকল আত্মীয়স্বজন ও প্রিয়জনদের দোয়া নিয়ে নতুন জীবনের পথে একসাথে পথচলা শুরু।",
      isUnlocked: false,
      statusBadge: "Upcoming",
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
      date: "Thursday, 17 December 2026",
      dateBn: "বৃহস্পতিবার, ১৭ ডিসেম্বর ২০২৬",
      time: "07:00 PM onwards",
      timeBn: "সন্ধ্যা ০৭:০০ ঘটিকা",
      venueName: "পীর বাড়ি (Pir Bari Residence)",
      venueAddress: "Aushpara, Pir Bari, Laksam, Cumilla - 3570",
      venueAddressBn: "আউশপাড়া, পীর বাড়ি, লাকসাম, কুমিল্লা - ৩৫৭০",
      mapUrl: "https://www.google.com/maps?q=23.245084,91.076703",
      directionsQuery: "23.245084,91.076703",
      coordinates: {
        lat: 23.245084,
        lng: 91.076703,
      },
      landmark: "Aushpara Pir Bari, near Aushpara Fazil Degree Madrasah road, Laksam, Cumilla.",
      landmarkBn: "আউশপাড়া পীর বাড়ি (অস্পাড়া ফাজিল ডিগ্রী মাদ্রাসা সংলগ্ন সড়ক দিয়ে সোজা পীর বাড়ি), লাকসাম, কুমিল্লা।",
      calendarDate: "20261217T190000",
      isConfirmed: true,
      dressCode: "Traditional Mustard Yellow & Floral",
      dressCodeBn: "বাসন্তী হলুদ অথবা রঙিন ঐতিহ্যবাহী পোশাক",
      audience: "Family Celebration",
      audienceBn: "পারিবারিক আনন্দ আয়োজন",
      iconName: "sun",
    },
    {
      id: "event-nikah",
      title: "The Sacred Nikah & Wedding",
      titleBn: "পবিত্র আকদ ও মূল বিবাহ অনুষ্ঠান",
      tagline: "The solemn prayer and vows binding two souls together forever",
      taglineBn: "কবুল বলে চিরবন্ধনে আবদ্ধ হওয়ার পবিত্র মুহূর্ত",
      date: "Friday, 18 December 2026",
      dateBn: "শুক্রবার, ১৮ ডিসেম্বর ২০২৬",
      time: "01:30 PM onwards",
      timeBn: "দুপুর ০১:৩০ ঘটিকা",
      venueName: "মানিকসার খান বাড়ি (Maniksar Khan Bari Residence)",
      venueAddress: "Maniksar (Khan Bari), PO: Mudaforgonj, PS: Barura, Cumilla",
      venueAddressBn: "মানিকসার (খান বাড়ি), ডাকঘর: মুদাফরগঞ্জ, থানা: বরুড়া, জেলা: কুমিল্লা",
      mapUrl: "https://www.google.com/maps?q=23.273140,91.043428",
      directionsQuery: "23.273140,91.043428",
      coordinates: {
        lat: 23.27314,
        lng: 91.043428,
      },
      plusCode: "72FV+59, Muddafarganj",
      landmark: "Maniksar Khan Bari (72FV+59, Muddafarganj), north of Mudaforgonj Bazar / Cumilla Road (R140), Barura, Cumilla.",
      landmarkBn: "মানিকসার খান বাড়ি (মুদাফরগঞ্জ বাজার / কুমিল্লা রোড R140 হতে উত্তর দিকে, প্লাস কোড: 72FV+59), বরুড়া, কুমিল্লা।",
      calendarDate: "20261218T133000",
      isConfirmed: true,
      dressCode: "Royal Traditional Panjabi / Sherwani & Saree",
      dressCodeBn: "রাজকীয় শেরওয়ানি / পাঞ্জাবি ও শাড়ি",
      audience: "Intimate Ceremony • Family & Close Relatives",
      audienceBn: "ঘরোয়া আকদ • পারিবারিক ও আমন্ত্রিত নিকটাত্মীয়",
      iconName: "rings",
    },
    {
      id: "event-walima",
      title: "Walima / Grand Reception",
      titleBn: "ওয়ালিমা ও বিবাহোত্তর সংবর্ধনা",
      tagline: "A feast of joy, blessings, and warm hospitality with family and friends",
      taglineBn: "অতিথি আপ্যায়ন, দোয়া ও মধুর স্মৃতিময় প্রীতিভোজ",
      date: "Saturday, 19 December 2026",
      dateBn: "শনিবার, ১৯ ডিসেম্বর ২০২৬",
      time: "01:00 PM onwards",
      timeBn: "দুপুর ০১:০০ ঘটিকা",
      venueName: "পীর বাড়ি (Pir Bari Residence)",
      venueAddress: "Aushpara, Pir Bari, Laksam, Cumilla - 3570",
      venueAddressBn: "আউশপাড়া, পীর বাড়ি, লাকসাম, কুমিল্লা - ৩৫৭০",
      mapUrl: "https://www.google.com/maps?q=23.245084,91.076703",
      directionsQuery: "23.245084,91.076703",
      coordinates: {
        lat: 23.245084,
        lng: 91.076703,
      },
      landmark: "Aushpara Pir Bari, near Aushpara Fazil Degree Madrasah road, Laksam, Cumilla.",
      landmarkBn: "আউশপাড়া পীর বাড়ি (অস্পাড়া ফাজিল ডিগ্রী মাদ্রাসা সংলগ্ন সড়ক দিয়ে সোজা পীর বাড়ি), লাকসাম, কুমিল্লা।",
      calendarDate: "20261219T130000",
      isConfirmed: true,
      dressCode: "Formal Suits & Elegant Traditional Wear",
      dressCodeBn: "মার্জিত ও ঐতিহ্যবাহী পোশাক",
      audience: "Grand Reception • All Honored Guests Welcome",
      audienceBn: "শুভ সংবর্ধনা • সকল সম্মানিত মেহমান ও সুধীজন",
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
