"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { legacyEditions, LegacyEdition } from "@/data/legacy";
import Badge from "./ui/Badge";
import { Users, Calendar, Sparkles } from "lucide-react";

export const Legacy = () => {
  return (
    <section id="legacy" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Our Journey Through The Years
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            THE <span className="text-gradient-gold">LEGACY</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            A tradition of transformational leadership conferences hosted by AIESEC University, impacting hundreds of youth leaders.
          </p>
        </div>

        {/* Edition Cards Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {legacyEditions.map((edition: LegacyEdition, idx: number) => {
            const isCurrent = edition.year === 2026;

            return (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl glass-card border transition-all overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? "border-amber-500/60 shadow-xl shadow-rose-950/30 ring-1 ring-amber-500/30"
                    : "border-amber-500/15 hover:border-amber-500/40"
                }`}
              >
                {/* Edition Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-obsidian-surface">
                  <Image
                    src={edition.image}
                    alt={edition.edition}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-black/30 to-transparent" />

                  {/* Year Tag */}
                  <div className="absolute top-4 right-4">
                    <Badge variant={isCurrent ? "gold" : "obsidian"}>
                      {edition.year}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">
                      Theme: {edition.theme}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory mb-2">
                      {edition.edition}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light">
                      {edition.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-ivory-dark font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} className="text-gold" />
                      {edition.participants} Delegates
                    </span>
                    {isCurrent && <span className="text-amber-400 font-bold uppercase">Current Flagship</span>}
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

export default Legacy;
