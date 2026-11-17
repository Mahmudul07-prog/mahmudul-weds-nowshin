import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { WeddingPhoto } from "@/types";

const defaultPhotos: WeddingPhoto[] = [
  {
    "id": "photo-1",
    "guestName": "Mahmudul & Nowshin",
    "caption": "দুই পরিবারের ভালোবাসায় চিরস্থায়ী ভালোবাসার পবিত্র সূচনা 💍✨",
    "imageUrl": "/images/mahmudul-groom.jpg",
    "createdAt": "2026-11-13T10:00:00.000Z",
    "likes": 48
  },
  {
    "id": "photo-2",
    "guestName": "Family Moments",
    "caption": "পীর বাড়ির পারিবারিক প্রাঙ্গণ ও ঐতিহাসিক স্নিগ্ধ সকাল 🌿🕊️",
    "imageUrl": "/images/nowshin-mili-bride.jpg",
    "createdAt": "2026-11-13T11:30:00.000Z",
    "likes": 35
  }
];

let inMemoryPhotos: WeddingPhoto[] = [...defaultPhotos];

function getFilePath() {
  return path.join(process.cwd(), "data", "photos.json");
}

function readPhotos(): WeddingPhoto[] {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryPhotos = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read photos from disk, using in-memory:", error);
  }
  return inMemoryPhotos;
}

function writePhotos(photos: WeddingPhoto[]) {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(photos, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not write photos to disk (kept in-memory):", error);
  }
}

export async function GET() {
  const photos = readPhotos();
  return NextResponse.json({ success: true, photos });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, caption, imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );
    }

    const currentPhotos = readPhotos();
    const newPhoto: WeddingPhoto = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      guestName: guestName ? guestName.trim() : "সম্মানিত অতিথি",
      caption: caption ? caption.trim() : "স্মরণীয় মুহূর্ত 🌸",
      imageUrl,
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    const updated = [newPhoto, ...currentPhotos];
    inMemoryPhotos = updated;
    writePhotos(updated);

    return NextResponse.json({
      success: true,
      message: "আপনার ছবি সফলভাবে গ্যালারিতে যুক্ত হয়েছে!",
      photo: newPhoto,
      photos: updated,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const pin = searchParams.get("pin");

    if (pin !== "6300") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const current = readPhotos();
    const updated = current.filter((p) => p.id !== id);
    inMemoryPhotos = updated;
    writePhotos(updated);

    return NextResponse.json({ success: true, photos: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
