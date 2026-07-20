import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Nav from "@/components/chrome/Nav";
import ChromeCorners from "@/components/chrome/ChromeCorners";
import HomeChrome from "@/components/chrome/HomeChrome";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import Footer from "@/components/chrome/Footer";
import KatanaCanvas from "@/components/fx/KatanaCanvas";
import PetalsCanvas from "@/components/fx/PetalsCanvas";

const shuriken = localFont({
  src: "./fonts/TheLastShuriken.otf",
  variable: "--font-shuriken",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jayesh Puri Goswami — MERN Developer / Portfolio",
  description:
    "Full-stack MERN developer from Indore — 2+ years shipping production apps end to end: microservices, realtime platforms, payments and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shuriken.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* landing-only: traveling 3D katana + corner chrome */}
        <HomeChrome>
          <KatanaCanvas />
          <ChromeCorners />
        </HomeChrome>
        {/* ambient sakura petals */}
        <PetalsCanvas />

        <ScrollProgress />
        <Nav />

        {children}

        <Footer />
      </body>
    </html>
  );
}
