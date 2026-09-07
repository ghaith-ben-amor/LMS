"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { Sparkles, Eye, ShieldCheck } from "lucide-react";

export const Masquerade = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % eventConfig.masqueradeStages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const stages = eventConfig.masqueradeStages;
  const current = stages[activeStage];

  return (
    <section
      id="masquerade"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#050507] via-[#09070D] to-[#050507] relative overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="md" className="mb-4">
            The Concept & Philosophy
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            THE <span className="text-gradient-gold">MASQUERADE</span>
          </h2>

          <blockquote className="font-serif text-xl sm:text-2xl text-amber-200/90 italic font-light max-w-xl mx-auto mb-6">
            &ldquo;Every mask hides a story. Every story hides a potential.&rdquo;
          </blockquote>

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            The masquerade is not a disguise — it is a gateway. Explore the three transformative stages of personal discovery designed for LMS 2K26.
          </p>
        </div>

        {/* Stage Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <motion.div
                key={stage.number}
                onClick={() => {
                  setActiveStage(idx);
                  setIsAutoPlay(false);
                }}
                whileHover={{ y: -6 }}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-b from-[#19111E] to-[#0D0B12] border-amber-500/60 shadow-2xl shadow-rose-950/30"
                    : "glass-card hover:border-amber-500/30"
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeStageIndicator"
                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Number */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-serif text-4xl sm:text-5xl font-extrabold transition-colors ${
                      isActive ? "text-gradient-gold" : "text-amber-500/20"
                    }`}
                  >
                    {stage.number}
                  </span>
                  <Badge variant={isActive ? "gold" : "obsidian"}>
                    Stage {idx + 1}
                  </Badge>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-3">
                  {stage.title}
                </h3>

                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detail Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-gradient-to-r from-[#120C17] via-[#09070D] to-[#120C17] border border-amber-500/25 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                Current Focus • Stage {current.number}
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
                variant="outline"
                size="sm"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
              >
                {isAutoPlay ? "Pause Auto-Play" : "Resume Auto-Play"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Masquerade;
