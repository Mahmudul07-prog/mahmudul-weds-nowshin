export interface StoryMilestone {
  id: string;
  title: string;
  titleBn?: string;
  date: string;
  dateBn?: string;
  description: string;
  descriptionBn?: string;
  isUnlocked: boolean;
  statusBadge?: string;
  icon?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  titleBn?: string;
  tagline: string;
  taglineBn?: string;
  date: string;
  dateBn?: string;
  time: string;
  timeBn?: string;
  venueName: string;
  venueAddress: string;
  venueAddressBn?: string;
  mapUrl?: string;
  calendarDate?: string; // YYYYMMDDTHHMMSS
  isConfirmed: boolean;
  dressCode?: string;
  dressCodeBn?: string;
  iconName?: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      name: string;
      nameBn: string;
      fullName: string;
      role: string;
      bio: string;
      fatherName: string;
      fatherNameBn?: string;
      motherName: string;
      motherNameBn?: string;
      address?: {
        village: string;
        villageBn: string;
        postOffice: string;
        postOfficeBn: string;
        policeStation: string;
        policeStationBn: string;
        district: string;
        districtBn: string;
        shortAddress?: string;
        shortAddressBn?: string;
      };
      image?: string;
    };
    bride: {
      name: string;
      nameBn: string;
      fullName: string;
      role: string;
      bio: string;
      fatherName: string;
      fatherNameBn?: string;
      motherName: string;
      motherNameBn?: string;
      address?: {
        village: string;
        villageBn: string;
        postOffice: string;
        postOfficeBn: string;
        policeStation: string;
        policeStationBn: string;
        district: string;
        districtBn: string;
        shortAddress?: string;
        shortAddressBn?: string;
      };
      image?: string;
      isRevealed: boolean;
    };
    hashtag: string;
    bismillahText: string;
    bismillahArabic: string;
    quoteEnglish: string;
    quoteBengali: string;
  };
  dates: {
    targetWeddingDate: string; // ISO format: e.g. "2026-12-25T18:00:00"
    displayDate: string;
    displayDateBn: string;
    isDateFinalized: boolean;
  };
  events: WeddingEvent[];
  story: StoryMilestone[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  music: {
    title: string;
    artist: string;
    audioUrl?: string;
  };
}

export interface Wish {
  id: string;
  name: string;
  relation?: string;
  message: string;
  emoji?: string;
  createdAt: string;
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attendance: "yes" | "no" | "tentative";
  guestCount: number;
  dietary?: string;
  notes?: string;
  createdAt: string;
}

export interface WeddingPhoto {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  createdAt: string;
  likes?: number;
}

export interface DuaEntry {
  id: string;
  guestName: string;
  duaId: string;
  duaTitle: string;
  duaArabic: string;
  createdAt: string;
}
