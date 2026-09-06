"use client";

import React from "react";
import { motion } from "framer-motion";
import { legacyEditions } from "@/data/legacy";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const LegacyCard = ({
  edition,
  isCenter,
}: {
  edition: (typeof legacyEditions)[0];
  isCenter?: boolean;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className={`relative group cursor-pointer ${isCenter ? "md:scale-110" : ""}`}
    >
      <div className="relative bg-gradient-to-br from-black to-burgundy/10 border border-burgundy/30 rounded-lg overflow-hidden p-6 md:p-8">
        {/* Year Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-gold/20 rounded-full">
          <span className="text-gold font-bold">{edition.year}</span>
        </div>

        {/* Image */}
        <div className="relative h-48 md:h-56 bg-gradient-to-br from-burgundy/20 to-gold/10 rounded-lg mb-6 flex items-center justify-center text-gray-600 overflow-hidden">
          <div className="text-center">
            <div className="text-5xl mb-2">📷</div>
            <p className="text-sm">Edition Image</p>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {edition.edition}
        </h3>
        <p className="text-gold font-semibold mb-3 uppercase tracking-widest">
          {edition.theme}
        </p>
        <p className="text-gray-400 text-base md:text-lg mb-4">
          {edition.description}
        </p>

        {/* Participants */}
        {edition.participants && (
          <div className="text-sm text-gray-500 border-t border-burgundy/20 pt-4 mt-4">
            👥 {edition.participants} participants
          </div>
        )}

        {/* Hover Border */}
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 rounded-lg transition-all duration-300" />
      </div>
    </motion.div>
  );
};

const Legacy = () => {
  return (
    <section
      id="legacy"
      className="py-20 md:py-32 bg-gradient-to-b from-black to-burgundy/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
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
            <span className="text-gold">LEGACY</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A journey of transformation and connection spanning multiple years
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-gradient-to-r from-burgundy to-gold mx-auto mt-6"
          />
        </motion.div>

        {/* Timeline Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {legacyEditions.map((edition, index) => (
            <LegacyCard
              key={edition.id}
              edition={edition}
              isCenter={index === legacyEditions.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Legacy;
