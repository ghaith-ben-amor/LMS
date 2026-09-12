"use client";

import React from "react";
import { motion } from "framer-motion";

export const LmsAnimation = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center select-none">
      {/* 1. Deep Core Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-900/30 to-amber-300/10 blur-3xl animate-pulse-subtle" />

      {/* 2. Expanding Radar Energy Waves */}
      {[0, 1.5, 3].map((delay, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-4 rounded-full border border-amber-400/20"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 3. Outer Celestial Orbiting Ring (Clockwise) */}
      <motion.div
        className="absolute inset-2 rounded-full border border-amber-500/25 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbital Node 1 */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_12px_#F7E4BE]" />
        {/* Orbital Node 2 */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-amber-500 shadow-[0_0_12px_#D4AF37]" />
      </motion.div>

      {/* 4. Middle Geometric Compass Ring (Counter-Clockwise) */}
      <motion.div
        className="absolute inset-8 rounded-full border border-amber-400/40 border-t-amber-300 border-b-rose-700 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {/* Diamond accents at cardinal points */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-amber-300" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 bg-amber-300" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-amber-300" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rotate-45 bg-amber-300" />
      </motion.div>

      {/* 5. Inner Radiant Sunburst Ring */}
      <motion.div
        className="absolute inset-14 rounded-full border-2 border-dashed border-amber-300/30"
        animate={{ rotate: 180 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* 6. Floating Ambient Orbiting Sparkles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F7E4BE]"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            transform: `rotate(${deg}deg) translate(110px) rotate(-${deg}deg)`,
          }}
        />
      ))}

      {/* 7. Center Metallic LMS 2K26 Emblem Badge */}
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-b from-[#1C1526] via-[#0E0B14] to-[#07050A] border-2 border-amber-400/60 p-1 shadow-[0_0_50px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden"
      >
        {/* Shimmer Light Flare Sweep */}
        <motion.div
          className="absolute -inset-y-10 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          animate={{ x: ["-150%", "250%"] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />

        {/* Inner Gold Frame Border */}
        <div className="w-full h-full rounded-full border border-amber-500/30 flex flex-col items-center justify-center p-4 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-black/60 relative">
          
          {/* Top Laurel / Crown Icon */}
          <div className="flex items-center gap-1 text-gold mb-1 opacity-90">
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L15 5L20 2L17 8L24 10L17 12L20 14L12 11L4 14L7 12L0 10L7 8L4 2L9 5L12 0Z" fill="url(#crown-gold)" />
              <defs>
                <linearGradient id="crown-gold" x1="0" y1="0" x2="24" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F7E4BE" />
                  <stop offset="1" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subtitle Header */}
          <span className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.25em] uppercase text-amber-300/80 mb-0.5">
            AIESEC Leadership
          </span>

          {/* LMS Title */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#F7E4BE] to-[#B38D29] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
            LMS
          </h2>

          {/* 2K26 Gold Badge Pill */}
          <div className="mt-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/40 to-amber-500/20 border border-amber-400/50 text-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.3em] text-ivory drop-shadow">
              2K26
            </span>
          </div>

          {/* Bottom Star Accent */}
          <div className="mt-2 flex items-center justify-center gap-1.5 text-amber-400/70 text-[0.65rem]">
            <span>★</span>
            <span className="font-semibold tracking-wider text-ivory-dark uppercase text-[0.55rem]">
              Summit
            </span>
            <span>★</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default LmsAnimation;
