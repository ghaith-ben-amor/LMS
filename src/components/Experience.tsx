"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Users,
  Eye,
  Megaphone,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Users,
  Eye,
  Megaphone,
  Sparkles,
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof eventConfig.experiences)[0];
  index: number;
}) => {
  const Icon = iconMap[experience.icon as keyof typeof iconMap];

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black via-burgundy/5 to-burgundy/10 border border-burgundy/30 p-6 sm:p-8 md:p-10 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-burgundy/0 group-hover:from-gold/5 group-hover:to-burgundy/10 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="mb-6 inline-block p-3 bg-gold/15 rounded-lg border border-gold/20 group-hover:bg-gold/25 group-hover:border-gold/50 transition-all duration-300"
        >
          <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-gold" />
        </motion.div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          {experience.title}
        </h3>
        <p className="text-gold text-xs sm:text-sm md:text-base font-bold mb-4 uppercase tracking-widest">
          {experience.subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed mb-6">
          {experience.description}
        </p>

        {/* Index Number */}
        <div className="absolute top-4 right-4 text-4xl sm:text-5xl md:text-6xl font-bold text-gold/10 group-hover:text-gold/30 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-gold text-sm sm:text-base font-semibold"
        >
          → Discover More
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-32 lg:py-40 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight"
          >
            <span className="text-white">ENTER THE</span>
            <br />
            <span className="text-gold">EXPERIENCE</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy mx-auto rounded-full"
          />
        </motion.div>

        {/* Experience Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
        >
          {eventConfig.experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
