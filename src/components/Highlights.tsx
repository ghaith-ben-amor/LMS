"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import { Megaphone, Eye, Users, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Megaphone,
  Eye,
  Users,
  Sparkles,
};

export const Highlights = () => {
  return (
    <section id="highlights" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Seminar Opportunities & Formats
          </Badge>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-ivory leading-tight mb-6">
            DELEGATE <span className="text-gradient-gold">SUMMIT HIGHLIGHTS</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 mx-auto rounded-full mb-8" />

          <p className="text-sm sm:text-base md:text-lg text-ivory-muted leading-relaxed font-light">
            Every moment at LMS 2K26 is designed to foster growth, critical thinking, and lifelong connections among delegates.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {eventConfig.highlights.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 sm:p-10 rounded-3xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
                    <Icon size={26} />
                  </div>

                  <div className="space-y-2 min-w-0">
                    <span className="text-[0.65rem] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
