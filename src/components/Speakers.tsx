"use client";

import React from "react";
import { motion } from "framer-motion";
import { speakers } from "@/data/speakers";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Link as LinkIcon, Share2 } from "lucide-react";

const SpeakerCard = ({
  speaker,
}: {
  speaker: (typeof speakers)[0];
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-burgundy/20 to-gold/10 overflow-hidden rounded-lg mb-6 border border-burgundy/20 group-hover:border-gold/50 transition-all duration-300">
        {/* Placeholder Image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs sm:text-sm">
          <div className="text-center">
            <div className="text-5xl mb-2">👤</div>
            <p>Speaker Image</p>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Social Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {speaker.social?.linkedin && (
            <motion.a
              href={speaker.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-2 sm:p-3 bg-gold text-black rounded-full hover:shadow-lg hover:shadow-gold/50 transition-all"
            >
              <LinkIcon size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
          )}
          {speaker.social?.twitter && (
            <motion.a
              href={speaker.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-2 sm:p-3 bg-burgundy text-white rounded-full hover:shadow-lg hover:shadow-burgundy/50 transition-all"
            >
              <Share2 size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Speaker Info */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{speaker.name}</h3>
        <p className="text-gold font-bold text-xs sm:text-sm md:text-base mb-1 uppercase tracking-wide">{speaker.position}</p>
        <p className="text-gray-400 text-xs sm:text-sm mb-4">{speaker.organization}</p>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
          {speaker.description}
        </p>
      </div>
    </motion.div>
  );
};

const Speakers = () => {
  return (
    <section
      id="speakers"
      className="py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-black to-burgundy/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
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
            <span className="text-white">MEET THE</span>
            <br />
            <span className="text-gold">VOICES</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy mx-auto rounded-full"
          />
        </motion.div>

        {/* Speakers Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
        >
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers;
