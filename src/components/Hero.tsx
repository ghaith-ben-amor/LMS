"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center pt-20"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-burgundy/30 via-black to-black"
        />

        {/* Subtle Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative z-10 text-center px-3 sm:px-4 md:px-6 max-w-5xl mx-auto w-full"
      >
        {/* Mask Visual */}
        <motion.div
          variants={itemVariants}
          className="mb-6 sm:mb-8 md:mb-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative"
          >
            {/* Placeholder for mask SVG - will be replaced with actual mask design */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold to-burgundy opacity-20 blur-xl" />
            <div className="absolute inset-0 border-2 border-gold rounded-full" />
            <div className="absolute inset-4 border border-burgundy/50 rounded-full" />

            {/* Eye shapes */}
            <div className="absolute top-1/3 left-1/4 w-4 h-6 border border-gold rounded-full opacity-70" />
            <div className="absolute top-1/3 right-1/4 w-4 h-6 border border-gold rounded-full opacity-70" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-widest mb-3 sm:mb-4 md:mb-6 leading-tight"
        >
          <span className="text-white">{eventConfig.hero.title}</span>
        </motion.h1>

        {/* Main Tagline */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gold font-light leading-relaxed tracking-wide whitespace-pre-line">
            {eventConfig.hero.subtitle}
          </p>
        </motion.div>

        {/* Location */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-12 tracking-widest uppercase"
        >
          {eventConfig.hero.location}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-burgundy via-gold to-burgundy text-black rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 tracking-wide"
          >
            {eventConfig.hero.cta}
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="text-gold" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
