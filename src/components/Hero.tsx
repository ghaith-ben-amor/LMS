"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { ArrowDown, Calendar, MapPin, Sparkles, Award } from "lucide-react";
import Button from "./ui/Button";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#050507] overflow-hidden flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Ambient Velvet Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-700/10 rounded-full blur-[150px]" />

        {/* Ambient Gold Particles */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-300 rounded-full shadow-[0_0_8px_#D4AF37]"
              animate={{
                y: [0, -35, 0],
                opacity: [0.1, 0.7, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                delay: (i * 0.2) % 3,
                ease: "easeInOut",
              }}
              style={{
                left: `${(i * 17 + 5) % 95}%`,
                top: `${(i * 23 + 10) % 90}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* AIESEC Badge Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-surface/80 border border-amber-500/30 text-gold shadow-lg shadow-black/50 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-ivory">
            AIESEC University Presents
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-bold tracking-widest text-amber-400">
            LMS 2K26 DELEGATE PORTAL
          </span>
        </motion.div>

        {/* Floating 3D Leadership Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 my-2 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-950/20 to-transparent blur-2xl animate-pulse-subtle" />
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(212,175,55,0.35)]"
          >
            <Image
              src="/images/hero_emblem.png"
              alt="LMS 2K26 Leadership Emblem"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider leading-[1.05] text-ivory">
            LEAD WITH PURPOSE.
            <br />
            <span className="text-gradient-gold">DISCOVER YOUR POTENTIAL.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-ivory-muted font-light max-w-2xl mx-auto leading-relaxed tracking-wide pt-2">
            Join 200+ delegates in Hammamet for LMS 2K26 — the flagship Local Motivation Seminar featuring high-impact workshops, inspiring keynotes, and transformative networking.
          </p>
        </motion.div>

        {/* Location & Date Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 mb-10 text-xs sm:text-sm text-ivory-muted"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-obsidian-card border border-amber-500/15">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-semibold text-ivory">15–17 March 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-obsidian-card border border-amber-500/15">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-semibold text-ivory">Hammamet, Tunisia</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-obsidian-card border border-amber-500/15">
            <Award className="w-4 h-4 text-gold" />
            <span className="font-semibold text-ivory">Official Delegate Portal</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button href="/registration" variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
            Register as Delegate
          </Button>
          <Button href="#about" variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
            Explore Conference
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 sm:mt-20 p-3 rounded-full border border-amber-500/20 text-gold hover:border-gold hover:bg-gold/10 transition-colors"
          aria-label="Scroll to About Section"
        >
          <ArrowDown size={18} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
