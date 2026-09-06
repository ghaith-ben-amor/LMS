"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MapPin, Home, Wifi, Utensils } from "lucide-react";

const VenueFeature = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 text-gold text-2xl">{Icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const Venue = () => {
  return (
    <section
      id="venue"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
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
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="text-gold">THE VENUE</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-4xl text-white font-light mb-6"
          >
            {eventConfig.event.location}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-gradient-to-r from-burgundy to-gold mx-auto"
          />
        </motion.div>

        {/* Venue Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-80 md:h-96 bg-gradient-to-br from-burgundy/20 to-gold/10 rounded-lg overflow-hidden border border-burgundy/30"
          >
            {/* Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <div className="text-6xl mb-2">🏛️</div>
                <p>Venue Image</p>
              </div>
            </div>
          </motion.div>

          {/* Venue Information */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 leading-relaxed"
            >
              Nestled on the Mediterranean coast, our exclusive venue in Hammamet combines
              elegance, privacy, and world-class facilities. An intimate setting designed to
              foster authentic connections and meaningful experiences.
            </motion.p>

            {/* Features */}
            <div className="space-y-6">
              <VenueFeature
                icon={<Home size={24} />}
                title="Luxury Accommodation"
                description="Comfortable and elegant rooms with modern amenities"
              />
              <VenueFeature
                icon={<Utensils size={24} />}
                title="Fine Dining"
                description="Gourmet meals prepared by world-class chefs"
              />
              <VenueFeature
                icon={<Wifi size={24} />}
                title="Modern Facilities"
                description="High-speed Wi-Fi, conference halls, and workshop spaces"
              />
              <VenueFeature
                icon={<MapPin size={24} />}
                title="Strategic Location"
                description="Easy access via Tunis airport and ground transportation"
              />
            </div>

            {/* CTA */}
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#cta"
              className="inline-block px-8 py-4 bg-gradient-to-r from-burgundy to-gold text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/50"
            >
              EXPLORE THE VENUE
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
