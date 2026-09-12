"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { Compass, Users, Target, ArrowRight } from "lucide-react";

export const Pillars = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % eventConfig.pillars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const pillars = eventConfig.pillars;
  const current = pillars[activePillar];

  const pillarIcons = [Compass, Users, Target];

  return (
    <section
      id="pillars"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#050507] via-[#09070D] to-[#050507] relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-rose-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="md" className="mb-4">
            Conference Pillars & Learning Outcomes
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            THE THREE PILLARS OF <span className="text-gradient-gold">LMS 2K26</span>
          </h2>

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            Designed to empower delegates with strategic leadership skills, collaborative synergy, and actionable growth tools.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const isActive = activePillar === idx;
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <motion.div
                key={pillar.number}
                onClick={() => {
                  setActivePillar(idx);
                  setIsAutoPlay(false);
                }}
                whileHover={{ y: -6 }}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-b from-[#19111E] to-[#0D0B12] border-amber-500/60 shadow-2xl shadow-amber-500/10"
                    : "glass-card hover:border-amber-500/30"
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activePillarIndicator"
                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    isActive ? "bg-amber-500/20 border-amber-400 text-amber-400" : "bg-obsidian-surface border-white/10 text-ivory-muted"
                  }`}>
                    <Icon size={22} />
                  </div>
                  <Badge variant={isActive ? "gold" : "obsidian"}>
                    Pillar {pillar.number}
                  </Badge>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs font-mono text-amber-400/90 tracking-wider uppercase mb-3">
                  {pillar.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detail Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-gradient-to-r from-[#120C17] via-[#09070D] to-[#120C17] border border-amber-500/25 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                Pillar {current.number} • Focus
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl text-ivory font-extrabold">
                {current.title}
              </h4>
              <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                href="/registration"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Register for LMS 2K26</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Pillars;
