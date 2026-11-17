import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DuaEntry } from "@/types";

interface DuaData {
  totalDuas: number;
  duaCounts: Record<string, number>;
  recentBlessings: DuaEntry[];
}

const defaultDuaData: DuaData = {
  totalDuas: 234,
  duaCounts: {
    barakallah: 142,
    rabbana: 58,
    rizq: 34,
  },
  recentBlessings: [
    {
      id: "dua-1",
      guestName: "মাওলানা রফিকুল ইসলাম",
      duaId: "barakallah",
      duaTitle: "বারাকাল্লাহু লাকুমা (দাম্পত্যে অফুরন্ত বরকত)",
      duaArabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
      createdAt: new Date().toISOString(),
    },
  ],
};

let inMemoryData: DuaData = { ...defaultDuaData };

function getFilePath() {
  return path.join(process.cwd(), "data", "duas.json");
}

function readData(): DuaData {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed.totalDuas === "number") {
        inMemoryData = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read duas from disk, using in-memory:", error);
  }
  return inMemoryData;
}

function writeData(data: DuaData) {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not write duas to disk (e.g. Vercel serverless), kept in-memory:", error);
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json({ success: true, ...data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, duaId, duaTitle, duaArabic } = body;

    if (!duaId || !duaTitle) {
      return NextResponse.json(
        { success: false, error: "Dua details are required" },
        { status: 400 }
      );
    }

    const current = readData();
    current.totalDuas = (current.totalDuas || 0) + 1;
    current.duaCounts[duaId] = (current.duaCounts[duaId] || 0) + 1;

    const newEntry: DuaEntry = {
      id: `dua-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      guestName: guestName ? guestName.trim() : "সম্মানিত শুভাকাঙ্ক্ষী",
      duaId,
      duaTitle,
      duaArabic: duaArabic || "",
      createdAt: new Date().toISOString(),
    };

    current.recentBlessings = [newEntry, ...(current.recentBlessings || [])].slice(0, 15);
    inMemoryData = current;
    writeData(current);

    return NextResponse.json({
      success: true,
      message: "আলহামদুলিল্লাহ, আপনার বরকতময় দোয়া সংরক্ষিত হলো!",
      ...current,
    });
  } catch (error) {
    console.error("Dua submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
