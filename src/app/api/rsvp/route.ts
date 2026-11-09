import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { RsvpEntry } from "@/types";

let inMemoryRsvps: RsvpEntry[] = [];

function getFilePath() {
  return path.join(process.cwd(), "data", "rsvps.json");
}

function readRsvpsFromFile(): RsvpEntry[] {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not read RSVPs from disk, using in-memory:", error);
  }
  return inMemoryRsvps;
}

function writeRsvpsToFile(rsvps: RsvpEntry[]) {
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(rsvps, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not write RSVPs to disk (likely serverless environment):", error);
  }
}

export async function GET() {
  const rsvps = readRsvpsFromFile();
  return NextResponse.json({ success: true, count: rsvps.length, rsvps });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, attendance, guestCount, dietary, notes } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const newRsvp: RsvpEntry = {
      id: "rsvp-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      name: String(name).trim().slice(0, 100),
      phone: phone ? String(phone).trim().slice(0, 30) : "",
      attendance: attendance === "no" ? "no" : attendance === "tentative" ? "tentative" : "yes",
      guestCount: Math.max(1, Math.min(20, Number(guestCount) || 1)),
      dietary: dietary ? String(dietary).trim().slice(0, 150) : "",
      notes: notes ? String(notes).trim().slice(0, 300) : "",
      createdAt: new Date().toISOString(),
    };

    const currentRsvps = readRsvpsFromFile();
    const updated = [newRsvp, ...currentRsvps];
    inMemoryRsvps = updated;
    writeRsvpsToFile(updated);

    return NextResponse.json({ success: true, message: "RSVP recorded successfully", rsvp: newRsvp });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process RSVP" },
      { status: 500 }
    );
  }
}
