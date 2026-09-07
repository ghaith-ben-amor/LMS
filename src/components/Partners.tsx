"use client";

import React from "react";
import { motion } from "framer-motion";
import { partners, Partner } from "@/data/partners";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { ExternalLink, Award, Sparkles, Star, Tv } from "lucide-react";

const PartnerLogo = ({ partner }: { partner: Partner }) => {
  return (
    <motion.a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative h-28 sm:h-32 rounded-2xl glass-card border border-amber-500/20 hover:border-amber-500/50 flex flex-col items-center justify-center p-4 text-center transition-all overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/5 to-rose-950/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Styled Brand Graphic / Title */}
      <span className="font-serif text-base sm:text-lg font-bold text-ivory group-hover:text-gold transition-colors tracking-wide">
        {partner.name}
      </span>

      <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory-dark group-hover:text-amber-400/80 transition-colors flex items-center gap-1">
        <span>Visit Partner</span>
        <ExternalLink size={10} />
      </span>
    </motion.a>
  );
};

export const Partners = () => {
  const mainPartners = partners.filter((p) => p.category === "main");
  const goldPartners = partners.filter((p) => p.category === "gold");
  const silverPartners = partners.filter((p) => p.category === "silver");
  const mediaPartners = partners.filter((p) => p.category === "media");

  return (
    <section id="partners" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-950/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="gold" size="md" className="mb-4">
            Collaborations & Sponsors
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            OUR <span className="text-gradient-gold">PARTNERS</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            We are proud to collaborate with global institutions and forward-thinking organizations empowering youth leadership.
          </p>
        </div>

        {/* Main Organizer Highlight */}
        {mainPartners.length > 0 && (
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-6 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-gold" />
              <span>Organizer & Main Partner</span>
            </span>
            <div className="max-w-md mx-auto">
              <PartnerLogo partner={mainPartners[0]} />
            </div>
          </div>
        )}

        {/* Gold Partners */}
        {goldPartners.length > 0 && (
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 block mb-6 text-center flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-gold" />
              <span>Gold Partners</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {goldPartners.map((p) => (
                <PartnerLogo key={p.id} partner={p} />
              ))}
            </div>
          </div>
        )}

        {/* Silver & Media Partners Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {silverPartners.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-ivory-muted block mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Silver Partners</span>
              </span>
              <div className="grid grid-cols-2 gap-4">
                {silverPartners.map((p) => (
                  <PartnerLogo key={p.id} partner={p} />
                ))}
              </div>
            </div>
          )}

          {mediaPartners.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-ivory-muted block mb-6 flex items-center gap-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>Media Partners</span>
              </span>
              <div className="grid grid-cols-2 gap-4">
                {mediaPartners.map((p) => (
                  <PartnerLogo key={p.id} partner={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Partner Call to Action */}
        <div className="rounded-3xl glass-card border border-amber-500/30 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory">
            Partner With LMS 2K26
          </h3>
          <p className="text-sm text-ivory-muted max-w-xl mx-auto font-light">
            Connect your brand with 200+ top Tunisian and international youth leaders. Join our partner ecosystem today.
          </p>
          <div className="pt-2">
            <Button href="mailto:contact@lms2k26.tn" variant="outline" size="md">
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
