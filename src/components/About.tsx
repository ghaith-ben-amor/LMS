"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Countdown from "./Countdown";

const StatCounter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center p-4 sm:p-6 rounded-lg bg-gradient-to-b from-gold/5 to-burgundy/5 border border-gold/10 hover:border-gold/30 transition-all duration-300"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold mb-3">{count}+</div>
      <p className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-widest font-semibold">
        {label}
      </p>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 lg:py-40 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
            <span className="text-white">{eventConfig.about.title}</span>
            <br />
            <span className="text-gold">{eventConfig.about.subtitle}</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy mx-auto mt-4 sm:mt-6 rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto leading-relaxed"
        >
          {eventConfig.about.description}
        </motion.p>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-24 lg:mb-32"
        >
          {eventConfig.stats.map((stat, index) => (
            <StatCounter key={index} end={stat.number} label={stat.label} />
          ))}
        </motion.div>

        {/* Countdown */}
        <div className="mb-0">
          <Countdown />
        </div>
      </div>
    </section>
  );
};

export default About;
