"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { Home, Utensils, Wifi, MapPin, Compass, ShieldCheck } from "lucide-react";

const venueFeatures = [
  {
    icon: Home,
    title: "Luxury Accommodation",
    description: "5-star Mediterranean resort rooms designed for comfort and privacy.",
  },
  {
    icon: Utensils,
    title: "Gourmet Catering",
    description: "Chef-prepared dining sessions & networking evening receptions.",
  },
  {
    icon: Wifi,
    title: "State-of-the-Art Facilities",
    description: "High-speed optical Wi-Fi, audio-visual halls, and breakout rooms.",
  },
  {
    icon: MapPin,
    title: "Coastal Hammamet",
    description: "Conveniently accessible via Tunis-Carthage Airport shuttle.",
  },
];

export const Venue = () => {
  return (
    <section id="venue" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Exclusive Destination
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-4">
            THE <span className="text-gradient-gold">VENUE</span>
          </h2>

          <p className="font-serif text-2xl sm:text-3xl text-amber-200/90 font-light mb-6">
            {eventConfig.event.location}
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
            className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group"
          >
            <Image
              src="/images/venue/venue-main.jpg"
              alt="Hammamet Tunisia Resort Venue"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-black/30 to-transparent" />

            {/* Floating Location Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-amber-500/30 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-gold animate-spin-slow" />
                <span className="font-serif text-lg font-bold text-ivory">
                  Hammamet Coastal Resort
                </span>
              </div>
              <p className="text-xs text-ivory-muted font-light">
                An intimate seaside setting designed to foster deep reflection and transformative connections.
              </p>
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
            <p className="text-base sm:text-lg text-ivory-muted font-light leading-relaxed">
              Nestled along the Mediterranean coast in Hammamet, our selected venue combines elegance, privacy, and world-class facilities to create an unforgettable environment for LMS 2K26 delegates.
            </p>

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
                      <h4 className="font-serif text-base font-bold text-ivory mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-ivory-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button href="/registration" variant="primary" size="lg">
                Reserve Your Place
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
