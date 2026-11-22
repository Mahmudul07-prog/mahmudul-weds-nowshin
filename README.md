# 💍 Mahmudul's Royal Wedding Invitation Website

A luxury, modern, and interactive digital wedding invitation platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Node.js API routes**, ready for 1-click deployment on **Vercel**.

---

## ✨ Features

- 💌 **Personalized Guest Links**: Anyone opening `?to=Guest+Name` (or `?name=...`) sees their name on the digital royal envelope and across all greetings.
- 📯 **Interactive Wax-Seal Royal Envelope**: A landing experience with an emerald velvet & gold digital envelope, royal wax-seal break animation, and celebratory confetti.
- 🔗 **Built-in Guest Link Generator Modal**: Type any guest's name directly on the site, copy the link, or share via WhatsApp with 1 click.
- 🎵 **Wedding Symphony Ambient Music Player**: Plays gentle acoustic chords automatically upon opening the envelope, with floating vinyl disc play/pause controls.
- 🌐 **Bilingual Support (বাংলা & English)**: Toggle between English and Bengali with one click.
- ⏳ **Live Countdown Timer**: Real-time days, hours, minutes, seconds countdown.
- 📖 **Story & Journey Timeline**: Chapters configured step-by-step:
  - *Chapter 1*: Family Talks & Destiny (Accomplished)
  - *Chapter 2*: The First Meet / প্রথম দেখা (Awaiting date announcement)
  - *Chapter 3*: Family Pact: Mahr & Dates Finalized / শুভ পাকা কথা ও দেনমোহর নির্ধারণ
  - *Chapter 4*: Sacred Nikah & Wedding Day
- 📅 **Events Schedule & Venues**: Gaye Holud, Sacred Nikah, Walima cards with Google Calendar integration, `.ics` iCal invite download, and Google Maps direction links.
- 📝 **Interactive RSVP Attendance Form**: Guests confirm attendance, number of companions, phone number, and special dietary requests. Saves to server API.
- 🤲 **Wishes & Feedback Board (দোয়ার বার্তা)**: Guests can leave prayers, messages, and emoji reactions with real-time live feed updates.
- 🌸 **Romantic Floating Petals**: Ambient floral petals gently floating down the page.

---

## 🛠️ পরবর্তী সময়ে তথ্য যোগ করার নিয়ম (Step-by-step Customization)

আপনি যখন কনের সাথে দেখা করবেন বা কোনো নির্দিষ্ট তারিখ ও লোকেশন নির্ধারণ করবেন, তখন **শুধুমাত্র একটি ফাইল** সম্পাদন করলেই পুরো ওয়েবসাইট স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে:

👉 **[`src/config/weddingData.ts`](./src/config/weddingData.ts)**

### ১. কনের সাথে দেখা হওয়ার পর কনের নাম ও তথ্য যোগ:
```typescript
bride: {
  name: "কনের নাম (e.g. Ayesha)",
  nameBn: "আয়েশা",
  fullName: "Ayesha Siddiqua",
  role: "The Bride",
  bio: "A heartfelt bio...",
  fatherName: "Father's Name",
  motherName: "Mother's Name",
  image: "/images/bride.jpg", // public/images/ ফোল্ডারে ছবি রাখবেন
  isRevealed: true, // এটি true করে দিবেন!
}
```

### ২. প্রথম দেখার তারিখ ও স্মৃতি যোগ:
`weddingData.ts` ফাইলের `story` সেকশনে গিয়ে `step-2` তে তারিখ ও বর্ণনা পরিবর্তন করুন:
```typescript
{
  id: "step-2",
  title: "The First Meet (প্রথম দেখা)",
  date: "১৫ জানুয়ারি ২০২৭", // আপনার দেখার তারিখ
  descriptionBn: "আমাদের প্রথম দেখার স্মরণীয় দিন...",
  isUnlocked: true, // আনলক করতে true করে দিবেন
  statusBadge: "Accomplished",
}
```

### ৩. বিয়ের ভেন্যু ও তারিখ পরিবর্তন:
`events` সেকশনে গিয়ে `venueName`, `venueAddress`, `date`, এবং `time` আপনার মতো করে লিখে দিন:
```typescript
venueName: "Senakunja / সেনা কুঞ্জ",
venueAddress: "Dhaka Cantonment, Dhaka",
date: "Friday, 18 December 2026",
isConfirmed: true,
```

---

## 🚀 Vercel-এ Deploy করার নিয়ম

### পদ্ধতি ১: GitHub-এর মাধ্যমে (সবচেয়ে সহজ ও জনপ্রিয়)
1. গিটহাবে একটি নতুন রিপোজিটরি তৈরি করুন (যেমন: `my-wedding-invite`).
2. কোড গিটহাবে পুশ করুন:
   ```bash
   git add .
   git commit -m "Royal wedding invite site ready"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-wedding-invite.git
   git push -u origin main
   ```
3. [Vercel](https://vercel.com) এ লগইন করুন।
4. **"Add New..."** -> **"Project"** এ ক্লিক করে আপনার রিপোজিটরি নির্বাচন করুন।
5. কোনো পরিবর্তন ছাড়াই **"Deploy"** বাটনে চাপ দিন।
6. ১ মিনিটের মধ্যে আপনার ওয়েবসাইট লাইভ হয়ে যাবে!

### পদ্ধতি ২: Vercel CLI দিয়ে সরাসরি টার্মিনাল থেকে
```bash
npx vercel
```

---

## 💻 Local Development

```bash
# ডিপেনডেন্সি ইন্সটল (প্রয়োজনে)
npm install

# ডেভেলপমেন্ট সার্ভার চালু
npm run dev

# প্রোডাকশন বিল্ড যাচাই
npm run build
```
ব্রাউজারে খুলুন: `http://localhost:3000` অথবা কোনো মেহমানের নামে পরীক্ষা করতে `http://localhost:3000/?to=Tanvir+Ahmed`.
