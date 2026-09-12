"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { calculateCountdown, CountdownTime, isCountdownExpired } from "@/lib/utils";

const CountdownBox = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-2xl bg-gradient-to-b from-[#15111B] to-[#0A080E] border border-amber-500/25 flex items-center justify-center shadow-xl shadow-black/80 overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 opacity-75" />
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient-gold tracking-tight"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-ivory-dark">
        {label}
      </span>
    </div>
  );
};

export const Countdown = () => {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      setIsExpired(isCountdownExpired(eventConfig.countdownDate));
      setTime(calculateCountdown(eventConfig.countdownDate));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#0F0C15]/90 to-[#07050A]/95 border border-amber-500/20 p-8 sm:p-10 md:p-12 shadow-2xl shadow-black text-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory mb-2 tracking-wide font-bold">
        {isExpired ? "LMS 2K26 Has Concluded" : "The LMS 2K26 Leadership Summit Begins In"}
      </h3>
      <p className="text-xs sm:text-sm text-ivory-muted uppercase tracking-[0.25em] mb-8">
        {eventConfig.event.location} • March 15, 2026
      </p>

      {isExpired ? (
        <p className="text-ivory-muted text-base leading-relaxed">
          Thank you to all delegates, speakers, and organizers who made LMS 2K26 unforgettable.
        </p>
      ) : (
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8">
          <CountdownBox value={time.days} label="Days" />
          <span className="font-serif text-2xl sm:text-3xl text-amber-500/40 -mt-6">:</span>
          <CountdownBox value={time.hours} label="Hours" />
          <span className="font-serif text-2xl sm:text-3xl text-amber-500/40 -mt-6">:</span>
          <CountdownBox value={time.minutes} label="Minutes" />
          <span className="font-serif text-2xl sm:text-3xl text-amber-500/40 -mt-6">:</span>
          <CountdownBox value={time.seconds} label="Seconds" />
        </div>
      )}
    </motion.div>
  );
};

export default Countdown;
