"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Upload, Heart, Sparkles, X, Plus, Check, Eye } from "lucide-react";
import confetti from "canvas-confetti";
import { WeddingPhoto } from "@/types";

interface GallerySectionProps {
  initialGuestName: string;
  lang: "en" | "bn";
}

export default function GallerySection({
  initialGuestName,
  lang,
}: GallerySectionProps) {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<WeddingPhoto | null>(null);

  // Upload Form States
  const [uploadName, setUploadName] = useState(
    initialGuestName && initialGuestName !== "Honored Guest" ? initialGuestName : ""
  );
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch photos
  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      if (data.success && Array.isArray(data.photos)) {
        setPhotos(data.photos);
      }
    } catch (e) {
      console.warn("Could not load photos:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Handle Image File Selection & Client-Side Canvas Compression
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(lang === "en" ? "Please select a valid image file." : "অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন।");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress using Canvas
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setPreviewUrl(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Submit Photo
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      alert(lang === "en" ? "Please select a photo to upload." : "অনুগ্রহ করে একটি ছবি নির্বাচন করুন।");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: uploadName.trim() || (lang === "en" ? "Guest" : "মেহমান"),
          caption: caption.trim() || (lang === "en" ? "Celebration moment" : "বিবাহের সুন্দর মুহূর্ত 🌸"),
          imageUrl: previewUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUploadSuccess(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f3c25b", "#ec4899", "#10b981"],
        });

        setTimeout(() => {
          setIsModalOpen(false);
          setPreviewUrl(null);
          setCaption("");
          setUploadSuccess(false);
          fetchPhotos();
        }, 1500);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(lang === "en" ? "Upload failed. Please try again." : "আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUploading(false);
    }
  };

  // Like a photo
  const handleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isLiked = likedMap[id];
          return { ...p, likes: (p.likes || 0) + (isLiked ? -1 : 1) };
        }
        return p;
      })
    );
  };

  return (
    <section id="gallery" className="py-20 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13241f] border border-[#d4af37]/35 text-xs text-[#fce09b] mb-3">
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{lang === "en" ? "Celebration Gallery & Memories" : "স্মৃতি গ্যালারি ও ফটো কর্নার"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            <span className="gold-gradient-text">
              {lang === "en" ? "Cherished Wedding Moments" : "মধুর স্মৃতি ও মেহমানদের ছবি"}
            </span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {lang === "en"
              ? "Share your joyful photographs with Mahmudul & Mili! Upload your selfies and warm memories to our royal wedding wall."
              : "মাহমুদুল ও মিলির শুভ পরিণয়ে আপনার তোলা সুন্দর মুহূর্তের ছবি সরাসরি সাইটে আপলোড করুন এবং অন্যদের সাথে আনন্দ ভাগ করে নিন।"}
          </p>

          {/* Upload Photo Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition shadow-lg shadow-[#d4af37]/30 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#061a14] stroke-[3]" />
              <span>{lang === "en" ? "Share Your Photo / Upload" : "আপনার ছবি আপলোড করুন 📸"}</span>
              <Sparkles className="w-4 h-4 text-[#061a14]" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-16 text-center text-stone-400">
            <div className="w-8 h-8 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin mx-auto mb-2" />
            <p className="text-xs">স্মৃতি গ্যালারি লোড হচ্ছে...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="py-16 text-center text-stone-400 royal-glass rounded-3xl p-8 max-w-md mx-auto">
            <Camera className="w-10 h-10 text-[#d4af37] mx-auto mb-3 opacity-60" />
            <p className="text-sm font-serif text-white">এখনও কোনো ছবি আপলোড হয়নি</p>
            <p className="text-xs text-stone-400 mt-1">প্রথম ছবি আপলোড করে গ্যালারির শুভসূচনা করুন!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl p-3 royal-glass royal-glass-hover border border-[#d4af37]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-1.5"
              >
                {/* Photo Container */}
                <div
                  onClick={() => setSelectedPhoto(item)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer bg-black/40"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || "Wedding moment"}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                      <Eye className="w-5 h-5 text-[#fce09b]" />
                    </span>
                  </div>
                </div>

                {/* Caption & Details */}
                <div className="pt-3 px-1">
                  <p className="text-xs text-stone-200 font-medium line-clamp-2 leading-snug">
                    {item.caption}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-semibold text-[#fce09b] truncate max-w-[130px]">
                      {item.guestName}
                    </span>
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-1 transition ${
                        likedMap[item.id] ? "text-rose-400 font-bold" : "hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedMap[item.id] ? "fill-rose-400" : ""
                        }`}
                      />
                      <span>{item.likes || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          UPLOAD MODAL
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl royal-glass border border-[#d4af37]/40 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPreviewUrl(null);
              }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <Camera className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                <span className="gold-gradient-text">
                  {lang === "en" ? "Share Your Wedding Photo" : "আপনার স্মৃতিচিত্র শেয়ার করুন"}
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {lang === "en"
                  ? "Upload photos taken at the wedding to our digital album"
                  : "বর-কনে বা অনুষ্ঠানের সুন্দর ছবি আপলোড করে গ্যালারি সমৃদ্ধ করুন"}
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Image Picker / Drop Zone */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  {lang === "en" ? "Select Photo:" : "ছবি নির্বাচন করুন:"}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#d4af37]/50 shadow-inner group">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 rounded-2xl border-2 border-dashed border-[#d4af37]/40 hover:border-[#d4af37] bg-black/25 text-center cursor-pointer transition"
                  >
                    <Upload className="w-8 h-8 text-[#d4af37] mx-auto mb-2 opacity-80" />
                    <p className="text-xs text-stone-200 font-medium">
                      {lang === "en" ? "Click to select a photo from your device" : "আপনার ফোন বা কম্পিউটার থেকে ছবি সিলেক্ট করুন"}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1">
                      (JPG, PNG, WebP — স্বয়ংক্রিয়ভাবে অপ্টিমাইজড হবে)
                    </p>
                  </div>
                )}
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {lang === "en" ? "Your Name:" : "আপনার নাম:"}
                </label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder={lang === "en" ? "e.g. Rafiq & Family" : "যেমন: মোঃ রফিকুল ইসলাম ও পরিবার"}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1411] border border-[#d4af37]/40 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {lang === "en" ? "Short Caption / Memory:" : "সুন্দর ক্যাপশন বা স্মৃতি:"}
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={lang === "en" ? "e.g. Joyous moments with brother Mahmudul! 💍" : "যেমন: ভাই মাহমুদুল ও মিলির সাথে স্মরণীয় আনন্দঘন মুহূর্ত! 💍✨"}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1411] border border-[#d4af37]/40 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isUploading || !previewUrl}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3c25b] to-[#aa8214] text-[#061a14] font-bold text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isUploading ? (
                    <span>{lang === "en" ? "Uploading Photo..." : "ছবি আপলোড হচ্ছে..."}</span>
                  ) : uploadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950 font-bold" />
                      <span>{lang === "en" ? "Uploaded Successfully! ✨" : "ছবি সফলভাবে যুক্ত হয়েছে! ✨"}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>{lang === "en" ? "Publish to Wedding Album" : "গ্যালারিতে পোস্ট করুন 🌸"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          LIGHTBOX MODAL FOR FULL-SIZE VIEW
          ========================================================================= */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full p-4 sm:p-6 rounded-3xl royal-glass border border-[#d4af37]/50 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-white/20 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/60 mb-4">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{selectedPhoto.caption}</p>
                <p className="text-xs text-[#fce09b] mt-0.5 font-serif">
                  Uploaded by: {selectedPhoto.guestName}
                </p>
              </div>
              <button
                onClick={() => handleLike(selectedPhoto.id)}
                className="px-4 py-2 rounded-full bg-[#13241f] border border-[#d4af37]/40 text-xs text-rose-400 flex items-center gap-1.5 font-semibold"
              >
                <Heart className={`w-4 h-4 ${likedMap[selectedPhoto.id] ? "fill-rose-400" : ""}`} />
                <span>{selectedPhoto.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
