import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Wish } from "@/types";

const defaultWishes: Wish[] = [
  {
    id: "wish-1",
    name: "Tanvir Ahmed",
    relation: "Friend",
    message: "মাবরুক! অনেক অনেক শুভকামনা ও দোয়া রইল তোমাদের নতুন জীবনের জন্য। আল্লাহ তোমাদের দাম্পত্য জীবনে অফুরন্ত বরকত দান করুন।",
    emoji: "🤲",
    createdAt: new Date().toISOString(),
  },
  {
    id: "wish-2",
    name: "Nusrat & Rafiq",
    relation: "Cousin",
    message: "Heartiest congratulations! May your journey together be blessed with endless happiness, love, and understanding.",
    emoji: "💐",
    createdAt: new Date().toISOString(),
  },
  {
    id: "wish-3",
    name: "Dr. Kamrul Hasan",
    relation: "Family Friend",
    message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair! Wishing you both a lifetime of peace and affection.",
    emoji: "💍",
    createdAt: new Date().toISOString(),
  },
];

let inMemoryWishes: Wish[] = [...defaultWishes];

function getFilePath() {
  return path.join(process.cwd(), "data", "wishes.json");
}

function readWishesFromFile(): Wish[] {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryWishes = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read wishes from disk, using in-memory:", error);
  }
  return inMemoryWishes;
}

function writeWishesToFile(wishes: Wish[]) {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(wishes, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not write wishes to disk:", error);
  }
}

export async function GET() {
  const wishes = readWishesFromFile();
  return NextResponse.json({ success: true, wishes });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, relation, message, emoji } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }

    const newWish: Wish = {
      id: "wish-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      name: String(name).trim().slice(0, 80),
      relation: relation ? String(relation).trim().slice(0, 40) : "Well-Wisher",
      message: String(message).trim().slice(0, 500),
      emoji: emoji || "💐",
      createdAt: new Date().toISOString(),
    };

    const currentWishes = readWishesFromFile();
    const updated = [newWish, ...currentWishes];
    inMemoryWishes = updated;
    writeWishesToFile(updated);

    return NextResponse.json({ success: true, wish: newWish, allWishes: updated });
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit wish" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    const current = readWishesFromFile();
    const filtered = current.filter((item) => item.id !== id);
    inMemoryWishes = filtered;
    writeWishesToFile(filtered);

    return NextResponse.json({ success: true, message: "Wish deleted" });
  } catch (error) {
    console.error("Error deleting wish:", error);
    return NextResponse.json({ success: false, error: "Failed to delete wish" }, { status: 500 });
  }
}
