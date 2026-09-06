"use client";

import React from "react";
import { motion } from "framer-motion";
import { partners } from "@/data/partners";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const PartnerLogo = ({ partner }: { partner: (typeof partners)[0] }) => {
  return (
    <motion.a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      className="group relative h-32 md:h-40 bg-gradient-to-br from-black to-burgundy/10 border border-burgundy/30 rounded-lg flex items-center justify-center overflow-hidden"
    >
      {/* Placeholder Logo */}
      <div className="text-center text-gray-600 group-hover:text-gray-500 transition-colors">
        <div className="text-4xl mb-2">🎭</div>
        <p className="text-xs">{partner.name}</p>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  );
};

const PartnerCategory = ({
  category,
  title,
  categoryPartners,
}: {
  category: string;
  title: string;
  categoryPartners: typeof partners;
}) => {
  if (categoryPartners.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mb-16"
    >
      <motion.h3
        variants={fadeInUp}
        className="text-2xl md:text-3xl font-bold text-gold mb-8 uppercase tracking-widest"
      >
        {title}
      </motion.h3>

      <motion.div
        variants={staggerContainer}
        className={`grid gap-6 ${
          category === "main"
            ? "grid-cols-1 md:grid-cols-1 max-w-md"
            : category === "gold"
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {categoryPartners.map((partner) => (
          <PartnerLogo key={partner.id} partner={partner} />
        ))}
      </motion.div>
    </motion.div>
  );
};

const Partners = () => {
  const mainPartners = partners.filter((p) => p.category === "main");
  const goldPartners = partners.filter((p) => p.category === "gold");
  const silverPartners = partners.filter((p) => p.category === "silver");
  const mediaPartners = partners.filter((p) => p.category === "media");

  return (
    <section
      id="partners"
      className="py-20 md:py-32 bg-gradient-to-b from-black to-burgundy/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            <span className="text-white">OUR</span>
            <br />
            <span className="text-gold">PARTNERS</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We're proud to collaborate with organizations that share our vision for
            leadership and personal development.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-gradient-to-r from-burgundy to-gold mx-auto mt-6"
          />
        </motion.div>

        {/* Partners by Category */}
        <div>
          <PartnerCategory category="main" title="Main Partner" categoryPartners={mainPartners} />
          <PartnerCategory category="gold" title="Gold Partners" categoryPartners={goldPartners} />
          <PartnerCategory category="silver" title="Silver Partners" categoryPartners={silverPartners} />
          <PartnerCategory category="media" title="Media Partners" categoryPartners={mediaPartners} />
        </div>

        {/* Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="text-gray-400 text-lg mb-6">Interested in becoming a partner?</p>
          <motion.a
            href="mailto:contact@lms2k26.tn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-burgundy to-gold text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/50"
          >
            BECOME A PARTNER
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
