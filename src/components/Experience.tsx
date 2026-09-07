"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Badge from "./ui/Badge";
import { Users, Eye, Megaphone, Sparkles, ArrowRight } from "lucide-react";

const iconMap = {
  Users,
  Eye,
  Megaphone,
  Sparkles,
};

export const Experience = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Interactive Spaces
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            ENTER THE <span className="text-gradient-gold">EXPERIENCE</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            Four specialized rooms carefully designed to challenge your perspectives, nurture authentic connections, and unlock leadership skills.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {eventConfig.experiences.map((exp, idx) => {
            const IconComponent = iconMap[exp.icon as keyof typeof iconMap] || Sparkles;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl glass-card p-8 sm:p-10 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Accent Room Number Background */}
                <span className="absolute top-4 right-6 font-serif text-6xl font-black text-amber-500/10 group-hover:text-amber-500/25 transition-colors select-none">
                  0{idx + 1}
                </span>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-950/60 to-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold transition-all">
                  <IconComponent className="w-7 h-7 text-gold" />
                </div>

                {/* Content */}
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-2">
                  {exp.subtitle}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory mb-4">
                  {exp.title}
                </h3>

                <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light mb-8">
                  {exp.description}
                </p>

                {/* Action Link */}
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold group-hover:translate-x-1 transition-transform">
                  <span>Explore Track</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
