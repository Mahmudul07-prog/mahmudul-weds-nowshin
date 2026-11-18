"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Trash2,
  Lock,
  Unlock,
  Search,
  MessageCircle,
  ArrowLeft,
  RefreshCw,
  HeartHandshake,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Sparkles,
  Send
} from "lucide-react";
import { RsvpEntry, Wish } from "@/types";

interface GeneratedLinkItem {
  id: string;
  name: string;
  category: string;
  url: string;
  isSent: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const [activeTab, setActiveTab] = useState<"rsvp" | "wishes" | "links">("rsvp");
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "yes" | "tentative" | "no">("all");

  // Link Generator Hub State
  const [linkName, setLinkName] = useState("");
  const [linkCategory, setLinkCategory] = useState("family");
  const [generatedList, setGeneratedList] = useState<GeneratedLinkItem[]>([]);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [currentCopied, setCurrentCopied] = useState(false);

  const correctPin = "6300"; // Secret Host Security PIN

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true);
      setPinError("");
      loadData();
    } else {
      setPinError("ভুল পিন কোড! সঠিক পিন দিন।");
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [rsvpRes, wishesRes] = await Promise.all([
        fetch("/api/rsvp"),
        fetch("/api/wishes")
      ]);
      const rsvpData = await rsvpRes.json();
      const wishesData = await wishesRes.json();

      if (rsvpData.success) {
        setRsvps(rsvpData.rsvps || []);
      }
      if (wishesData.success) {
        setWishes(wishesData.wishes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRsvp = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই মেহমানের এন্ট্রিটি মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/rsvp?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setRsvps((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteWish = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই দোয়ার বার্তাটি মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/wishes?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setWishes((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const exportToCsv = () => {
    if (rsvps.length === 0) {
      alert("কোনো তথ্য নেই ডাউনলোড করার জন্য!");
      return;
    }

    const headers = ["Name", "Attendance", "Guests Count", "Phone", "Dietary / Notes", "Date Submitted"];
    const rows = rsvps.map((item) => [
      `"${item.name.replace(/"/g, '""')}"`,
      item.attendance === "yes" ? "Attending" : item.attendance === "tentative" ? "Tentative" : "Declined",
      item.guestCount || 1,
      `"${(item.phone || "").replace(/"/g, '""')}"`,
      `"${(item.notes || item.dietary || "").replace(/"/g, '""')}"`,
      new Date(item.createdAt).toLocaleString("en-GB")
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Mahmudul_Wedding_RSVP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Link Generator Helpers
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const trimmedLinkName = linkName.trim();
  const activeGeneratedUrl = trimmedLinkName
    ? `${origin}/?to=${encodeURIComponent(trimmedLinkName)}`
    : `${origin}/?to=Honored+Guest`;

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "family":
        return "👨‍👩‍👧‍👦 পরিবার ও আত্মীয়";
      case "friend":
        return "🤝 বন্ধু-বান্ধব";
      case "colleague":
        return "💼 সহকর্মী";
      case "vip":
        return "👑 বিশিষ্ট মেহমান";
      default:
        return "আমন্ত্রিত মেহমান";
    }
  };

  const getShareMessage = (name: string, url: string, cat: string) => {
    const greeting = cat === "friend" ? `প্রিয় ${name},` : `শ্রদ্ধেয় ${name},`;
    return `আসসালামু আলাইকুম,\n${greeting}\n\nমহান আল্লাহর অশেষ রহমতে মাহমুদুল হাসান ও নওশীন জাহান মিলির শুভ বিবাহ অনুষ্ঠিত হতে যাচ্ছে।\n\nএই আনন্দঘন শুভলগ্নে আপনার ও আপনার পরিবারের উপস্থিতি এবং আন্তরিক দোয়া আমাদের জন্য অত্যন্ত সম্মানের ও আনন্দের।\n\nআপনার জন্য বিশেষভাবে প্রস্তুতকৃত রাজকীয় ডিজিটাল নিমন্ত্রণপত্রটি দেখতে নিচের লিংকে প্রবেশ করুন:\n\n${url}\n\nবিনীত আমন্ত্রণে,\nআহসান ও খান পরিবার\n📞 +880 1863-846300`;
  };

  const handleCopyCurrentLink = () => {
    navigator.clipboard.writeText(activeGeneratedUrl);
    setCurrentCopied(true);
    setTimeout(() => setCurrentCopied(false), 2500);
  };

  const handleAddToList = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trimmedLinkName) return;
    const newItem: GeneratedLinkItem = {
      id: `link-${Date.now()}`,
      name: trimmedLinkName,
      category: linkCategory,
      url: activeGeneratedUrl,
      isSent: false,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setGeneratedList((prev) => [newItem, ...prev]);
    setLinkName("");
  };

  const handleSendWhatsApp = (item: GeneratedLinkItem) => {
    const msg = getShareMessage(item.name, item.url, item.category);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
    setGeneratedList((prev) =>
      prev.map((l) => (l.id === item.id ? { ...l, isSent: true } : l))
    );
  };

  const handleCopyItemLink = (item: GeneratedLinkItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedLinkId(item.id);
    setTimeout(() => setCopiedLinkId(null), 2500);
  };

  const toggleSent = (id: string) => {
    setGeneratedList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isSent: !l.isSent } : l))
    );
  };

  const deleteGeneratedLink = (id: string) => {
    setGeneratedList((prev) => prev.filter((l) => l.id !== id));
  };

  // Calculations
  const totalResponses = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attendance === "yes");
  const totalGuestsCount = attendingRsvps.reduce((acc, curr) => acc + (Number(curr.guestCount) || 1), 0);
  const tentativeCount = rsvps.filter((r) => r.attendance === "tentative").length;
  const declinedCount = rsvps.filter((r) => r.attendance === "no").length;

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone && r.phone.includes(searchQuery));
    const matchesStatus = statusFilter === "all" || r.attendance === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#08110e] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl royal-glass border border-[#d4af37]/40 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#d4af37] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-serif font-bold text-white mb-1">
            Host &amp; Admin Panel
          </h1>
          <p className="text-xs text-stone-400 mb-6">
            আমন্ত্রিত মেহমানদের তালিকা ও RSVP দেখতে পিন কোড দিন
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN দিন"
                className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl bg-[#0a1813] border border-[#d4af37]/40 text-[#fce09b] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-2 font-medium">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm text-[#0b1411] bg-gradient-to-r from-[#fce09b] via-[#d4af37] to-[#aa8214] hover:opacity-95 transition shadow-lg cursor-pointer"
            >
              প্রবেশ করুন (Unlock Dashboard)
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#d4af37] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              মূল ওয়েবসাইটে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08110e] text-[#f7f4ed] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/20">
          <div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 transition"
                title="Back to site"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#fce09b]">
                Wedding Host Dashboard
              </h1>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              মেহমানদের উপস্থিতি ও দোয়ার বার্তার পূর্ণাঙ্গ বিবরণ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-stone-300 border border-white/10 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={exportToCsv}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-[#0b1411] text-xs font-bold transition shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              Export to Excel (CSV)
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-950/40 text-stone-400 hover:text-red-300 text-xs border border-white/10 transition"
              title="Lock dashboard"
            >
              <Unlock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl royal-glass border border-[#d4af37]/30">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
              <span>মোট রেসপন্স</span>
              <Users className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {totalResponses}
            </div>
            <span className="text-[10px] text-stone-400">মেহমানের ফরম পূরণ</span>
          </div>

          <div className="p-5 rounded-2xl royal-glass border border-emerald-500/40 bg-emerald-950/20">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>উপস্থিত থাকবেন</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
              {totalGuestsCount} <span className="text-sm font-sans font-normal text-emerald-400">জন</span>
            </div>
            <span className="text-[10px] text-stone-400">
              ({attendingRsvps.length} টি পরিবার / আমন্ত্রণ)
            </span>
          </div>

          <div className="p-5 rounded-2xl royal-glass border border-amber-500/30">
            <div className="flex items-center justify-between text-amber-300 text-xs mb-1">
              <span>চেষ্টা করবেন</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              {tentativeCount}
            </div>
            <span className="text-[10px] text-stone-400">অনিশ্চিত / সম্ভাব্য</span>
          </div>

          <div className="p-5 rounded-2xl royal-glass border border-red-500/30">
            <div className="flex items-center justify-between text-red-300 text-xs mb-1">
              <span>আসতে পারছেন না</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-red-300">
              {declinedCount}
            </div>
            <span className="text-[10px] text-stone-400">বিনম্র অপরাগতা</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("rsvp")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "rsvp"
                ? "bg-[#d4af37] text-[#0b1411] shadow"
                : "bg-white/5 text-stone-300 hover:bg-white/10"
            }`}
          >
            <Users className="w-4 h-4" />
            RSVP মেহমান তালিকা ({rsvps.length})
          </button>
          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "wishes"
                ? "bg-[#d4af37] text-[#0b1411] shadow"
                : "bg-white/5 text-stone-300 hover:bg-white/10"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            দোয়ার বার্তা সমূহ ({wishes.length})
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === "links"
                ? "bg-[#d4af37] text-[#0b1411] shadow"
                : "bg-white/5 text-stone-300 hover:bg-white/10"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            🔗 ইনভাইটেশন লিংক হাব {generatedList.length > 0 && `(${generatedList.length})`}
          </button>
        </div>

        {/* Tab 1: RSVP List */}
        {activeTab === "rsvp" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম অথবা ফোন নম্বর দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0a1813] border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { key: "all", label: "সকল" },
                  { key: "yes", label: "আসবেন" },
                  { key: "tentative", label: "চেষ্টা করবেন" },
                  { key: "no", label: "আসতে পারছেন না" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key as "all" | "yes" | "no" | "tentative")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      statusFilter === tab.key
                        ? "bg-[#13241f] border border-[#d4af37] text-[#fce09b]"
                        : "bg-white/5 text-stone-400 hover:bg-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl royal-glass border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-stone-400 uppercase tracking-wider text-[10px]">
                      <th className="p-3.5">মেহমানের নাম</th>
                      <th className="p-3.5">উপস্থিতি</th>
                      <th className="p-3.5">মেহমান সংখ্যা</th>
                      <th className="p-3.5">যোগাযোগ / WhatsApp</th>
                      <th className="p-3.5">নোট / বার্তা</th>
                      <th className="p-3.5">তারিখ</th>
                      <th className="p-3.5 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-stone-400">
                          কোনো মেহমানের তথ্য পাওয়া যায়নি
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition">
                          <td className="p-3.5 font-medium text-white">
                            {item.name}
                          </td>
                          <td className="p-3.5">
                            {item.attendance === "yes" ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                                অবশ্যই আসব
                              </span>
                            ) : item.attendance === "tentative" ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/40">
                                চেষ্টা করব
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-950/60 text-red-300 border border-red-500/40">
                                আসতে পারছি না
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-stone-300 font-semibold">
                            {item.attendance !== "no" ? `${item.guestCount || 1} জন` : "—"}
                          </td>
                          <td className="p-3.5 text-stone-300">
                            {item.phone ? (
                              <div className="flex items-center gap-2">
                                <span>{item.phone}</span>
                                <a
                                  href={`https://wa.me/880${item.phone.replace(/[^0-9]/g, "").slice(-10)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition"
                                  title="WhatsApp-এ মেসেজ পাঠান"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            ) : (
                              <span className="text-stone-500">—</span>
                            )}
                          </td>
                          <td className="p-3.5 text-stone-300 max-w-xs truncate">
                            {item.notes || item.dietary || <span className="text-stone-500">—</span>}
                          </td>
                          <td className="p-3.5 text-stone-400 text-[11px]">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => deleteRsvp(item.id)}
                              className="p-1.5 text-stone-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wishes List */}
        {activeTab === "wishes" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl royal-glass border border-white/10 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.emoji || "🤲"}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-[#fce09b]">
                          {item.name}
                        </h4>
                        {item.relation && (
                          <span className="text-[10px] text-stone-400 bg-white/5 px-2 py-0.5 rounded-full">
                            {item.relation}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                        &ldquo;{item.message}&rdquo;
                      </p>
                      <span className="text-[10px] text-stone-500 mt-2 block">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteWish(item.id)}
                    className="p-1.5 text-stone-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition flex-shrink-0"
                    title="Delete message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Custom Invitation Link Hub */}
        {activeTab === "links" && (
          <div className="space-y-6">
            {/* Top Generator Card */}
            <div className="p-6 sm:p-7 rounded-3xl royal-glass border border-[#d4af37]/35 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    পার্সোনালাইজড ইনভাইটেশন লিংক জেনারেটর
                  </h3>
                  <p className="text-xs text-stone-300">
                    মেহমানের নাম লিখলেই তাদের নামের কাস্টম ডিজিটাল নিমন্ত্রণ লিংক ও মেসেজ প্রস্তুত হয়ে যাবে
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddToList} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name Input */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1.5">
                      মেহমান / পরিবারের নাম
                    </label>
                    <input
                      type="text"
                      value={linkName}
                      onChange={(e) => setLinkName(e.target.value)}
                      placeholder="যেমন: ইঞ্জিনিয়ার তানভীর ও পরিবার, আরিফ ভাই"
                      className="w-full px-4 py-3 rounded-xl bg-[#091511] border border-[#d4af37]/40 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#d4af37] transition"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      ক্যাটাগরি / সম্পর্ক
                    </label>
                    <select
                      value={linkCategory}
                      onChange={(e) => setLinkCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#091511] border border-[#d4af37]/40 text-white text-sm focus:outline-none focus:border-[#d4af37] transition"
                    >
                      <option value="family">👨‍👩‍👧‍👦 পরিবার ও আত্মীয়</option>
                      <option value="friend">🤝 বন্ধু-বান্ধব</option>
                      <option value="colleague">💼 সহকর্মী ও শুভাকাঙ্ক্ষী</option>
                      <option value="vip">👑 বিশিষ্ট মেহমান (VIP)</option>
                    </select>
                  </div>
                </div>

                {/* Generated Link Display */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    জেনারেট করা পার্সোনালাইজড লিংক:
                  </label>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#07130f] border border-[#d4af37]/25">
                    <span className="text-xs text-[#fce09b] truncate font-mono select-all flex-1">
                      {activeGeneratedUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCurrentLink}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-[#0b1411] text-xs font-bold transition cursor-pointer"
                    >
                      {currentCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{currentCopied ? "কপি হয়েছে!" : "কপি"}</span>
                    </button>
                    <a
                      href={activeGeneratedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 transition"
                      title="নতুন ট্যাবে প্রিভিউ দেখুন"
                    >
                      <ExternalLink className="w-4 h-4 text-[#d4af37]" />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!trimmedLinkName}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8214] text-[#061a14] font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition shadow-md shadow-[#d4af37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>তালিকায় যুক্ত করুন</span>
                  </button>

                  <button
                    type="button"
                    disabled={!trimmedLinkName}
                    onClick={() => {
                      if (!trimmedLinkName) return;
                      const msg = getShareMessage(trimmedLinkName, activeGeneratedUrl, linkCategory);
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className="py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-[#0b1411] font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-[#25D366]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>সরাসরি হোয়াটসঅ্যাপে পাঠান</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Batch Tracker List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-serif font-bold text-white flex items-center gap-2">
                  <span>তালিকায় তৈরি করা লিংক সমূহ</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fce09b]">
                    {generatedList.length}
                  </span>
                </h4>
                {generatedList.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("আপনি কি নিশ্চিত পুরো তালিকা খালি করতে চান?")) {
                        setGeneratedList([]);
                      }
                    }}
                    className="text-xs text-red-400 hover:text-red-300 transition"
                  >
                    তালিকা পরিষ্কার করুন
                  </button>
                )}
              </div>

              {generatedList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-stone-400 text-xs">
                  <LinkIcon className="w-8 h-8 text-stone-500 mx-auto mb-2 opacity-50" />
                  <p>এখনও কোনো কাস্টম লিংক তালিকায় যুক্ত করা হয়নি।</p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    উপরে মেহমানের নাম লিখে &ldquo;তালিকায় যুক্ত করুন&rdquo; চাপলে এখানে একের পর এক সেভ হয়ে থাকবে।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {generatedList.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                        item.isSent
                          ? "bg-emerald-950/20 border-emerald-500/30"
                          : "royal-glass border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleSent(item.id)}
                          title={item.isSent ? "Mark as unsent" : "Mark as sent"}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                            item.isSent
                              ? "bg-emerald-500 border-emerald-400 text-[#061a14]"
                              : "border-stone-500 hover:border-[#d4af37]"
                          }`}
                        >
                          {item.isSent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white">{item.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-stone-300">
                              {getCategoryLabel(item.category)}
                            </span>
                            {item.isSent && (
                              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                পাঠানো হয়েছে ✓
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400 block mt-0.5">
                            তৈরি: {item.createdAt} • {item.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyItemLink(item)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-stone-300 flex items-center gap-1.5 transition cursor-pointer"
                        >
                          {copiedLinkId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                          )}
                          <span>{copiedLinkId === item.id ? "কপি হয়েছে" : "কপি"}</span>
                        </button>

                        <button
                          onClick={() => handleSendWhatsApp(item)}
                          className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-[#0b1411] font-bold text-xs flex items-center gap-1.5 transition shadow cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 transition"
                          title="Open invitation"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                        </a>

                        <button
                          onClick={() => deleteGeneratedLink(item.id)}
                          className="p-1.5 text-stone-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition"
                          title="Remove from list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
