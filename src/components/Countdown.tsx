"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { calculateCountdown, CountdownTime } from "@/lib/utils";

const CountdownBox = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-2"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <p className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
        {label}
      </p>
    </div>
  );
};

const Countdown = () => {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set initial countdown
    setTime(calculateCountdown(eventConfig.countdownDate));

    // Update countdown every second
    const timer = setInterval(() => {
      setTime(calculateCountdown(eventConfig.countdownDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-black via-burgundy/5 to-burgundy/10 border border-burgundy/30 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 hover:border-gold/30 transition-all duration-300"
    >
      <h3 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 tracking-widest uppercase font-semibold">
        The Masquerade Begins In
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <CountdownBox value={time.days} label="Days" />
        <CountdownBox value={time.hours} label="Hours" />
        <CountdownBox value={time.minutes} label="Minutes" />
        <CountdownBox value={time.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

export default Countdown;
