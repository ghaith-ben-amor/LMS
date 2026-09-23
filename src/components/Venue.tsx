"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { Home, Utensils, Wifi, Lock, Sparkles, EyeOff } from "lucide-react";

const venueFeatures = [
  {
    icon: Lock,
    title: "Secret Destination",
    description: "Kept strictly confidential to offer an exclusive, immersive experience.",
  },
  {
    icon: Home,
    title: "5-Star Resort Experience",
    description: "World-class rooms and luxury amenities tailored for LMS 2K26 delegates.",
  },
  {
    icon: Utensils,
    title: "Gourmet Catering",
    description: "Chef-prepared dining sessions & evening networking receptions.",
  },
  {
    icon: Wifi,
    title: "State-of-the-Art Facilities",
    description: "High-speed optical Wi-Fi, audio-visual halls, and breakout rooms.",
  },
];

export const Venue = () => {
  return (
    <section id="venue" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 right-0 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-rose-950/20 rounded-full blur-3xl sm:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Confidential Destination
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-4">
            THE <span className="text-gradient-gold">VENUE</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full" />
        </div>

        {/* Venue Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Venue Image Card with Secret Vignette */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group"
          >
            <Image
              src="/images/venue/venue-main.jpg"
              alt="Secret LMS 2K26 Venue"
              fill
              className="object-cover filter blur-[4px] brightness-75 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Blur Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-black/60 to-black/30" />

            {/* Secret Center Emblem */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-400/50 backdrop-blur-xl flex items-center justify-center mb-4 shadow-xl shadow-amber-500/20 animate-pulse">
                <EyeOff className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory tracking-widest uppercase">
                LOCATION TOP SECRET
              </h3>
            </div>

            {/* Floating Location Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-amber-500/30 backdrop-blur-xl z-20">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="font-serif text-base font-bold text-ivory">
                  Secret Venue Unveiling Soon
                </span>
              </div>
            </div>
          </motion.div>

          {/* Venue Features & Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {venueFeatures.map((feature, idx) => {
                const IconComp = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-obsidian-card border border-amber-500/15 hover:border-amber-500/40 transition-colors flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-ivory">
                        {feature.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button href="/registration" variant="primary" size="lg">
                Register To Unlock Venue Details
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
