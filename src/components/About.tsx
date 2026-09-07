"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Countdown from "./Countdown";
import Badge from "./ui/Badge";

const StatCounter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6 sm:p-8 rounded-2xl text-center group hover:border-amber-500/50 transition-all"
    >
      <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient-gold mb-2 group-hover:scale-105 transition-transform">
        {count}+
      </div>
      <p className="text-xs sm:text-sm text-ivory-muted uppercase tracking-[0.2em] font-semibold">
        {label}
      </p>
    </motion.div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            AIESEC University Conference
          </Badge>
          
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-ivory leading-tight mb-6">
            MORE THAN AN EVENT.
            <br />
            <span className="text-gradient-gold">A MOMENT TO DISCOVER.</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-8" />

          <p className="text-sm sm:text-base md:text-lg text-ivory-muted leading-relaxed font-light">
            {eventConfig.about.description}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {eventConfig.stats.map((stat, index) => (
            <StatCounter key={index} end={stat.number} label={stat.label} />
          ))}
        </div>

        {/* Live Countdown Component */}
        <Countdown />
      </div>
    </section>
  );
};

export default About;
