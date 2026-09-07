"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { speakers, Speaker } from "@/data/speakers";
import Badge from "./ui/Badge";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Globe, Share2, ExternalLink, Sparkles } from "lucide-react";

export const Speakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Keynote Leaders & Facilitators
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            MEET THE <span className="text-gradient-gold">VOICES</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            Inspiring visionaries, seasoned coaches, and industry disruptors sharing actionable insights on leadership and self-mastery.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {speakers.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedSpeaker(speaker)}
              className="group cursor-pointer rounded-3xl glass-card border border-amber-500/20 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col"
            >
              {/* Speaker Portrait Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-obsidian-surface">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-transparent to-transparent opacity-90" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="sm">
                    {speaker.category}
                  </Badge>
                </div>
              </div>

              {/* Speaker Info Box */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-ivory group-hover:text-gold transition-colors mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    {speaker.position}
                  </p>
                  <p className="text-xs text-ivory-dark font-medium">
                    {speaker.organization}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-ivory-muted line-clamp-2 font-light">
                  {speaker.description}
                </p>

                {/* Quick Bio Trigger Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold">
                  <span>View Full Profile</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Speaker Profile Modal */}
        <Modal
          isOpen={!!selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
          title={selectedSpeaker?.name || "Speaker Profile"}
          maxWidth="lg"
        >
          {selectedSpeaker && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-amber-500/30">
                  <Image
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <Badge variant="gold" size="sm" className="mb-2">
                    {selectedSpeaker.category}
                  </Badge>
                  <h4 className="font-serif text-2xl font-bold text-ivory">
                    {selectedSpeaker.name}
                  </h4>
                  <p className="text-sm font-bold text-amber-400">
                    {selectedSpeaker.position}
                  </p>
                  <p className="text-xs text-ivory-muted">{selectedSpeaker.organization}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-widest text-gold">
                  Biography & Expertise
                </h5>
                <p className="text-sm text-ivory-muted leading-relaxed font-light">
                  {selectedSpeaker.description}
                </p>
              </div>

              {selectedSpeaker.social && (
                <div className="flex items-center gap-3 pt-4">
                  {selectedSpeaker.social.linkedin && (
                    <Button
                      href={selectedSpeaker.social.linkedin}
                      variant="outline"
                      size="sm"
                      leftIcon={<Globe size={14} />}
                    >
                      LinkedIn
                    </Button>
                  )}
                  {selectedSpeaker.social.twitter && (
                    <Button
                      href={selectedSpeaker.social.twitter}
                      variant="outline"
                      size="sm"
                      leftIcon={<Share2 size={14} />}
                    >
                      Twitter
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Speakers;
