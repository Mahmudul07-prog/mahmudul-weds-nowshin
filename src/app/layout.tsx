import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/config/weddingData";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: `${weddingData.couple.groom.name} & ${weddingData.couple.bride.name} | Royal Wedding Invitation`,
  description: `You are cordially invited to celebrate the auspicious union of ${weddingData.couple.groom.fullName} & ${weddingData.couple.bride.fullName}.`,
  openGraph: {
    title: `${weddingData.couple.groom.name} & ${weddingData.couple.bride.name} - Royal Wedding Invitation`,
    description: "Personalized Digital Wedding Invitation with events, RSVP, and wishes.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${jakarta.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#08110e] text-[#f7f4ed] selection:bg-[#d4af37] selection:text-[#0b1411]">
        {children}
      </body>
    </html>
  );
}
