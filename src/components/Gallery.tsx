"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const GalleryImage = ({
  image,
  index,
}: {
  image: (typeof galleryImages)[0];
  index: number;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${
        index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-burgundy/20 to-gold/10 overflow-hidden">
        {/* Placeholder Image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
          <div className="text-center">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-xs">{image.title}</p>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
            {image.category && (
              <p className="text-sm text-gold uppercase tracking-widest">{image.category}</p>
            )}
          </div>
        </div>

        {/* Icon */}
        <div className="absolute top-4 right-4 p-2 bg-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-5 h-5 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-white">MEMORIES</span>
            <br />
            <span className="text-gold">BEHIND THE MASK</span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-gradient-to-r from-burgundy to-gold mx-auto"
          />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max"
        >
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
