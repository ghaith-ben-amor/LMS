"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { programSchedule } from "@/data/program";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ScheduleItem = ({ item }: { item: (typeof programSchedule)[0]["events"][0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col md:flex-row md:items-start gap-6 border-b border-burgundy/20 pb-6 last:border-b-0 last:pb-0"
    >
      {/* Time */}
      <div className="flex-shrink-0">
        <div className="text-2xl md:text-3xl font-bold text-gold">{item.time}</div>
        {item.duration && (
          <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
          {item.activity}
        </h4>
        <p className="text-gray-400 text-base md:text-lg mb-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="text-sm text-gold">📍 {item.location}</div>
          {item.speaker && (
            <div className="text-sm text-burgundy">👤 {item.speaker}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Program = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section
      id="program"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            <span className="text-white">THE</span>
            <br />
            <span className="text-gold">JOURNEY</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-gradient-to-r from-burgundy to-gold mx-auto"
          />
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-12 md:mb-16"
        >
          {programSchedule.map((day, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDay(index)}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                activeDay === index
                  ? "bg-gradient-to-r from-burgundy to-gold text-white shadow-lg shadow-gold/50"
                  : "bg-burgundy/20 text-gold border border-burgundy/50 hover:border-gold"
              }`}
            >
              {day.day}
            </motion.button>
          ))}
        </motion.div>

        {/* Schedule Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-black to-burgundy/5 border border-burgundy/20 rounded-lg p-8 md:p-12"
          >
            {/* Day Header */}
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {programSchedule[activeDay].day}
              </h3>
              <p className="text-gold text-lg">
                {programSchedule[activeDay].date}
              </p>
            </div>

            {/* Schedule Items */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {programSchedule[activeDay].events.map((event, idx) => (
                  <ScheduleItem key={event.id} item={event} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Program;
