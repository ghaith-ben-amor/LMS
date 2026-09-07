"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./ui/Badge";
import { Clock, MapPin, User } from "lucide-react";

interface AgendaItem {
  id: number;
  day_label: string;
  day_date: string;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
  sort_order: number;
}

interface DayGroup {
  day: string;
  date: string;
  events: AgendaItem[];
}

function groupByDay(items: AgendaItem[]): DayGroup[] {
  const map = new Map<string, DayGroup>();
  for (const item of items) {
    const key = item.day_label;
    if (!map.has(key)) {
      map.set(key, { day: item.day_label, date: item.day_date, events: [] });
    }
    map.get(key)!.events.push(item);
  }
  // Sort days alphabetically (DAY 01, DAY 02 …)
  return Array.from(map.values()).sort((a, b) => a.day.localeCompare(b.day));
}

export const Program = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [schedule, setSchedule] = useState<DayGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const res = await fetch("/api/program", { cache: "no-store" });
        const data = await res.json();
        if (data.items) {
          setSchedule(groupByDay(data.items as AgendaItem[]));
        }
      } catch {
        // silently fallback to empty
      } finally {
        setIsLoading(false);
      }
    }
    void fetchAgenda();
  }, []);

  const currentDay = schedule[activeDayIndex];

  return (
    <section id="program" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Conference Agenda
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            THE <span className="text-gradient-gold">JOURNEY</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            Three immersive days packed with workshops, keynotes, social masquerade galas, and self-discovery sessions.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
          </div>
        ) : schedule.length === 0 ? (
          <div className="text-center text-ivory-muted py-16 font-light">
            No agenda items yet. Check back soon.
          </div>
        ) : (
          <>
            {/* Day Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
              {schedule.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <button
                    key={day.day}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-rose-900 via-amber-500 to-rose-900 text-obsidian shadow-lg shadow-amber-500/20 scale-105"
                        : "bg-obsidian-card text-ivory-muted border border-amber-500/20 hover:border-amber-500/50 hover:text-ivory"
                    }`}
                  >
                    <span>{day.day}</span>
                    <span className="ml-2 opacity-75 font-normal">({day.date.split(",")[0]})</span>
                  </button>
                );
              })}
            </div>

            {/* Schedule Agenda Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDayIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl glass-card border border-amber-500/20 p-6 sm:p-10 md:p-12 shadow-2xl space-y-8"
              >
                {/* Day Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-1">
                      Schedule Overview
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory">
                      {currentDay.day} — {currentDay.date}
                    </h3>
                  </div>
                  <Badge variant="gold" size="md">
                    {currentDay.events.length} Planned Sessions
                  </Badge>
                </div>

                {/* Event Timeline List */}
                <div className="space-y-6">
                  {currentDay.events.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group relative rounded-2xl bg-obsidian-card/70 border border-amber-500/10 p-5 sm:p-6 hover:border-amber-500/40 hover:bg-obsidian-surface transition-all flex flex-col md:flex-row md:items-center gap-6"
                    >
                      {/* Time Badge */}
                      <div className="flex-shrink-0 flex items-center md:flex-col md:items-start gap-3 w-32">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gradient-gold">
                          {item.time}
                        </span>
                        {item.duration && (
                          <span className="inline-flex items-center gap-1 text-[0.7rem] text-ivory-dark font-medium uppercase tracking-wider">
                            <Clock size={12} className="text-amber-400" />
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Event Information */}
                      <div className="flex-grow space-y-2">
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                          {item.activity}
                        </h4>
                        <p className="text-xs sm:text-sm text-ivory-muted font-light leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold">
                          {item.location && (
                            <span className="inline-flex items-center gap-1.5 text-amber-400/90">
                              <MapPin size={14} />
                              {item.location}
                            </span>
                          )}
                          {item.speaker && (
                            <span className="inline-flex items-center gap-1.5 text-rose-300">
                              <User size={14} />
                              {item.speaker}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
};

export default Program;
