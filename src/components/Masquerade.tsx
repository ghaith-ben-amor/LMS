"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const MasqueradeStage = ({
  stage,
  isActive,
}: {
  stage: (typeof eventConfig.masqueradeStages)[0];
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
      transition={{ duration: 0.6 }}
      className="cursor-pointer group"
    >
      <div
        className={`relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg border transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-br from-burgundy/30 via-black to-gold/10 border-gold shadow-lg shadow-gold/20"
            : "bg-black/40 border-burgundy/20 hover:border-burgundy/50 hover:shadow-lg hover:shadow-burgundy/10"
        }`}
      >
        {/* Stage Number */}
        <div
          className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-4 transition-colors duration-300 ${
            isActive ? "text-gold" : "text-burgundy/50"
          }`}
        >
          {stage.number}
        </div>

        {/* Stage Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
          {stage.title}
        </h3>

        {/* Stage Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
          {stage.description}
        </p>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy to-gold rounded-t-lg"
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
          />
        )}
      </div>
    </motion.div>
  );
};

const Masquerade = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % eventConfig.masqueradeStages.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const handleStageClick = (index: number) => {
    setActiveStage(index);
    setIsAutoPlay(false);
  };

  return (
    <section
      id="masquerade"
      className="py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-black via-black to-burgundy/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight"
          >
            <span className="text-white">THE</span>
            <br />
            <span className="text-gold">MASQUERADE</span>
          </motion.h2>

          <motion.blockquote
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 italic font-light mb-4 sm:mb-6 md:mb-8"
          >
            "Every mask hides a story.
            <br />
            Every story hides a potential."
          </motion.blockquote>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            The mask represents the identities we show to the world and the journey of
            discovering what lies behind them. Through LMS 2K26, explore the three stages
            of self-discovery that will transform your understanding of leadership.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy mx-auto mt-4 sm:mt-6 rounded-full"
          />
        </motion.div>

        {/* Interactive Stages */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-12 md:mb-16"
        >
          {eventConfig.masqueradeStages.map((stage, index) => (
            <div
              key={index}
              onClick={() => handleStageClick(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleStageClick(index);
              }}
            >
              <MasqueradeStage stage={stage} isActive={activeStage === index} />
            </div>
          ))}
        </motion.div>

        {/* Auto-play Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
            {isAutoPlay ? "Auto-playing..." : "Click to explore • Click again to auto-play"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 sm:px-6 py-2 bg-burgundy/30 border border-burgundy/50 text-gold rounded-full text-xs sm:text-sm font-medium hover:bg-burgundy/50 transition-all duration-300"
          >
            {isAutoPlay ? "Pause" : "Resume"} Auto-Play
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Masquerade;
