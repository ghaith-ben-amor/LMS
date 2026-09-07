"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { Sparkles } from "lucide-react";

export const FinalReveal = () => {
  return (
    <section
      id="reveal"
      className="relative min-h-[90vh] bg-[#050507] overflow-hidden flex items-center justify-center py-24 border-t border-amber-500/20"
    >
      {/* Ambient Velvet Lighting & Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-950/25 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[140px]" />

        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-300 rounded-full"
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.25,
              }}
              style={{
                left: `${(i * 19 + 7) % 95}%`,
                top: `${(i * 31 + 5) % 90}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-10">
        <Badge variant="gold" size="md" className="mx-auto">
          The Grand Reveal
        </Badge>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-sm sm:text-base md:text-lg text-ivory-muted uppercase tracking-[0.3em] font-medium">
            You've Seen The Mask
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="text-gradient-gold">
              BUT HAVE YOU DISCOVERED
              <br />
              WHAT'S BEHIND IT?
            </span>
          </h2>
        </motion.div>

        {/* Floating Mask Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto my-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-950/50 via-amber-500/20 to-transparent blur-2xl animate-pulse-subtle" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero_mask.png"
              alt="LMS 2K26 Reveal Mask"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Reveal Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-ivory">
            {eventConfig.event.name}
          </h3>

          <p className="text-base sm:text-xl text-amber-200/90 font-light leading-relaxed">
            {eventConfig.event.tagline}
          </p>

          <div className="pt-6">
            <Button
              href="/registration"
              variant="primary"
              size="lg"
              className="px-10 py-5 text-base sm:text-lg shadow-2xl shadow-gold-glow"
            >
              Join LMS 2K26 Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalReveal;
