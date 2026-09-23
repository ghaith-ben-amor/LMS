"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Venue from "@/components/Venue";
import Partners from "@/components/Partners";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { useWebSocket } from "@/lib/use-websocket";

export default function Home() {
  const [settings, setSettings] = React.useState<{
    show_countdown: boolean;
    show_about: boolean;
    show_pillars: boolean;
    show_program: boolean;
    show_speakers: boolean;
    show_venue: boolean;
    show_partners: boolean;
    show_gallery: boolean;
  }>({
    show_countdown: false,
    show_about: false,
    show_pillars: false,
    show_program: false,
    show_speakers: false,
    show_venue: false,
    show_partners: false,
    show_gallery: false,
  });

  const loadSettings = React.useCallback(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          show_countdown: Boolean(data.show_countdown),
          show_about: Boolean(data.show_about),
          show_pillars: Boolean(data.show_pillars),
          show_program: Boolean(data.show_program),
          show_speakers: Boolean(data.show_speakers),
          show_venue: Boolean(data.show_venue),
          show_partners: Boolean(data.show_partners),
          show_gallery: Boolean(data.show_gallery),
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
          show_countdown: Boolean(data.settings.show_countdown),
          show_about: Boolean(data.settings.show_about),
          show_pillars: Boolean(data.settings.show_pillars),
          show_program: Boolean(data.settings.show_program),
          show_speakers: Boolean(data.settings.show_speakers),
          show_venue: Boolean(data.settings.show_venue),
          show_partners: Boolean(data.settings.show_partners),
          show_gallery: Boolean(data.settings.show_gallery),
        });
      }
    }, [])
  );

  return (
    <main className="w-full min-h-screen bg-black">
      <Navbar settings={settings} />
      <Hero />
      
      {/* Live Countdown Section */}
      {settings.show_countdown && (
        <section className="py-12 sm:py-16 bg-[#050507] px-4 relative z-10">
          <Countdown />
        </section>
      )}

      {settings.show_about && <About />}
      {settings.show_pillars && <Pillars />}
      {settings.show_program && <Program />}
      {settings.show_speakers && <Speakers />}
      {settings.show_venue && <Venue />}
      {settings.show_partners && <Partners />}
      {settings.show_gallery && <Gallery />}
      <Footer />
    </main>
  );
}
