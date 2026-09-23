"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Highlights from "@/components/Highlights";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Venue from "@/components/Venue";
import Partners from "@/components/Partners";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { useWebSocket } from "@/lib/use-websocket";

export default function Home() {
  const [settings, setSettings] = React.useState<{ show_speakers: boolean; show_partners: boolean }>({
    show_speakers: false,
    show_partners: false,
  });

  const loadSettings = React.useCallback(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          show_speakers: Boolean(data.show_speakers),
          show_partners: Boolean(data.show_partners),
        });
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Real-time WebSocket synchronization
  useWebSocket(
    React.useCallback((data: any) => {
      if (data?.type === "SETTINGS_UPDATED" && data.settings) {
        setSettings({
          show_speakers: Boolean(data.settings.show_speakers),
          show_partners: Boolean(data.settings.show_partners),
        });
      }
    }, [])
  );

  return (
    <main className="w-full min-h-screen bg-black">
      <Navbar settings={settings} />
      <Hero />
      
      {/* Live Countdown Section */}
      <section className="py-12 sm:py-16 bg-[#050507] px-4 relative z-10">
        <Countdown />
      </section>

      <About />
      <Pillars />
      <Highlights />
      <Program />
      {settings.show_speakers && <Speakers />}
      <Venue />
      {settings.show_partners && <Partners />}
      <Gallery />
      <Footer />
    </main>
  );
}
