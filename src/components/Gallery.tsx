"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages, GalleryImage } from "@/data/gallery";
import Badge from "./ui/Badge";
import Modal from "./ui/Modal";
import { Maximize2, Sparkles } from "lucide-react";

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { label: "All Memories", value: "all" },
    { label: "Social & Gala", value: "social" },
    { label: "Ceremonies", value: "ceremonies" },
    { label: "Workshops", value: "workshops" },
    { label: "Networking", value: "networking" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Duplicate items for continuous seamless infinite marquee looping
  const track1Images = [...filteredImages, ...filteredImages, ...filteredImages];
  const track2Images = [...filteredImages].reverse();
  const track2Doubled = [...track2Images, ...track2Images, ...track2Images];

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Edge Gradient Vignettes for Smooth Infinite Dissolve */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="gold" size="md" className="mb-4">
            Visual Archive & Memories
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            MEMORIES <span className="text-gradient-gold">OF EXCELLENCE</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            An animated gallery of moments, keynotes, gala celebrations, and lifelong bonds forged during LMS editions.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gold text-obsidian shadow-lg shadow-gold/25 scale-105 font-extrabold"
                    : "bg-obsidian-card text-ivory-muted border border-amber-500/20 hover:border-amber-500/50 hover:text-ivory"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Animated Sliding Track 1: Left to Right Translation (Ultra Slow Marquee) ─── */}
      <div className="w-full overflow-hidden py-3 mb-4">
        <motion.div
          className="flex items-center gap-5 sm:gap-6 w-max"
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 85,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {track1Images.map((img, idx) => (
            <motion.div
              key={`tr1-${img.id}-${idx}`}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedImage(img)}
              className="group relative w-[310px] h-[200px] sm:w-[420px] sm:h-[260px] rounded-[28px] overflow-hidden bg-[#0e0c14] border border-amber-500/20 hover:border-amber-400/80 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] transition-all duration-500 cursor-pointer flex-shrink-0"
            >
              {/* Inner Curved Image Mask */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09070D]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Card Header Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-extrabold uppercase tracking-wider bg-obsidian-surface/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {img.category}
                  </span>
                </div>

                {/* Card Title & Lightbox Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between z-10">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-ivory drop-shadow-md line-clamp-1">
                      {img.title}
                    </h4>
                    <p className="text-[0.65rem] text-ivory-dark font-medium mt-0.5">
                      LMS 2K26 Memory
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-obsidian flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Animated Sliding Track 2: Right to Left Translation (Ultra Slow Marquee) ─── */}
      <div className="w-full overflow-hidden py-3">
        <motion.div
          className="flex items-center gap-5 sm:gap-6 w-max"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 80,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {track2Doubled.map((img, idx) => (
            <motion.div
              key={`tr2-${img.id}-${idx}`}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedImage(img)}
              className="group relative w-[310px] h-[200px] sm:w-[420px] sm:h-[260px] rounded-[28px] overflow-hidden bg-[#0e0c14] border border-amber-500/20 hover:border-amber-400/80 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] transition-all duration-500 cursor-pointer flex-shrink-0"
            >
              {/* Inner Curved Image Mask */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09070D]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Card Header Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-extrabold uppercase tracking-wider bg-obsidian-surface/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {img.category}
                  </span>
                </div>

                {/* Card Title & Lightbox Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between z-10">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-ivory drop-shadow-md line-clamp-1">
                      {img.title}
                    </h4>
                    <p className="text-[0.65rem] text-ivory-dark font-medium mt-0.5">
                      LMS 2K26 Memory
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-obsidian flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Full Screen Lightbox Modal ─── */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || "Memory Lightbox"}
        maxWidth="xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-[28px] overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-black">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  {selectedImage.title}
                </h4>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Category: {selectedImage.category}
                </p>
              </div>
              <Badge variant="gold">LMS Archive</Badge>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
