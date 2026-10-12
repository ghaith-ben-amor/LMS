"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { MapPin, Waves, Utensils, Wifi, Sparkles, Bed, ShieldCheck, Compass } from "lucide-react";

const venueFeatures = [
  {
    icon: MapPin,
    title: "Prime Coastal Location",
    description: "Zone Touristique Hammamet Nord, just 200m from the Mediterranean beach.",
  },
  {
    icon: Bed,
    title: "Comfortable Delegate Rooms",
    description: "Spacious air-conditioned rooms with private balconies and full amenities.",
  },
  {
    icon: Waves,
    title: "Pools & Leisure Areas",
    description: "Large outdoor swimming pools, sun terraces, and relaxing green gardens.",
  },
  {
    icon: Utensils,
    title: "Full Catering & Dining",
    description: "Buffet restaurants serving local Tunisian & international cuisine for delegates.",
  },
  {
    icon: Compass,
    title: "Dedicated Plenary & Workshop Spaces",
    description: "Ample indoor conference spaces equipped for high-energy sessions and team activities.",
  },
  {
    icon: Wifi,
    title: "Connectivity & Services",
    description: "Wi-Fi access, 24/7 reception support, and secure event grounds.",
  },
];

export const Venue = () => {
  return (
    <section id="venue" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 right-0 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-rose-950/20 rounded-full blur-3xl sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 sm:w-[450px] sm:h-[450px] bg-amber-500/10 rounded-full blur-3xl sm:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Official Conference Venue
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-4">
            HOTEL LE <span className="text-gradient-gold">ZENITH</span>
          </h2>

          <p className="text-ivory-muted text-sm sm:text-base max-w-xl mx-auto mb-6">
            Zone Touristique Hammamet Nord, Tunisia
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full" />
        </div>

        {/* Venue Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Venue Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group glass-card"
          >
            <Image
              src="/images/venue/venue-main.jpg"
              alt="Hôtel Le Zénith Hammamet - Official LMS 2K26 Venue"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-transparent to-transparent opacity-80" />

            {/* Floating Location Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-amber-500/30 backdrop-blur-xl z-20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-ivory">
                      Hôtel Le Zénith
                    </h4>
                    <span className="text-xs text-amber-400 font-semibold tracking-wide">
                      Hammamet Nord, Tunisie
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-gold text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3★ Resort</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venue Features & Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-3">
                An Immersive Space for Growth & Synergy
              </h3>
              <p className="text-ivory-muted text-sm sm:text-base leading-relaxed">
                Nestled in the tourist district of Hammamet Nord, Hôtel Le Zénith offers delegates the ideal blend of seaside Mediterranean calm, extensive workshop facilities, and communal living spaces designed to foster lifelong camaraderie throughout the 3-day conference.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venueFeatures.map((feature, idx) => {
                const IconComp = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-obsidian-card border border-amber-500/15 hover:border-amber-500/40 transition-colors flex gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-4.5 h-4.5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-ivory mb-0.5">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-ivory-muted leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button href="/registration" variant="primary" size="lg">
                Register For LMS 2K26
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
