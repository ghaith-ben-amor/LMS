"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";

const FinalReveal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="reveal"
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-20"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Dark Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-burgundy/5 to-black" />

        {/* Animated Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full"
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
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

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-burgundy rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute top-1/3 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Opening Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide uppercase mb-8">
            You've Seen The Mask
          </p>

          <h2 className="text-5xl md:text-8xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-gold via-burgundy to-gold bg-clip-text text-transparent">
              But Have You Discovered
              <br />
              What's Behind It?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Your journey of transformation awaits at LMS 2K26
          </p>
        </motion.div>

        {/* Animated Mask Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          {/* Mask that "disappears" */}
          <motion.div
            animate={isVisible ? { opacity: 0, scale: 1.2 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold to-burgundy opacity-30 blur-2xl" />
            <div className="absolute inset-0 border-2 border-gold rounded-full" />
            <div className="absolute inset-4 border border-burgundy/50 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Reveal Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-widest">
            <span className="text-white">{eventConfig.event.name}</span>
          </h1>

          <p className="text-xl md:text-3xl text-gold font-light leading-relaxed">
            {eventConfig.event.tagline}
          </p>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 3.2 }}
            className="pt-8"
          >
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-5 bg-gradient-to-r from-burgundy via-gold to-burgundy text-white rounded-full font-bold text-lg tracking-wide transition-all duration-300"
            >
              JOIN LMS 2K26
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 3.8 }}
              className="text-gray-400 text-sm mt-6"
            >
              Be part of something extraordinary. Be part of the transformation.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalReveal;
