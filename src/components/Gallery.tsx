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
    <section id="gallery" className="py-16 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Ambient Lighting (Optimized Blur for Mobile GPUs) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-amber-500/10 rounded-full blur-3xl sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-rose-950/20 rounded-full blur-3xl sm:blur-[160px] pointer-events-none" />

      {/* Edge Gradient Vignettes for Smooth Infinite Dissolve */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-32 lg:w-48 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-32 lg:w-48 bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="gold" size="md" className="mb-4">
            Visual Archive & Memories
          </Badge>

          <h2 className="font-serif text-3xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-4 sm:mb-6">
            MEMORIES <span className="text-gradient-gold">OF EXCELLENCE</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full" />
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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

      {/* ─── Animated Sliding Track 1: Left to Right Translation (Ultra Smooth Hardware Accelerated) ─── */}
      <div className="w-full overflow-hidden py-2 sm:py-4 mb-2 sm:mb-4 [perspective:1200px]">
        <motion.div
          className="flex items-center gap-3 sm:gap-7 w-max transform-gpu will-change-transform"
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
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => setSelectedImage(img)}
              className="group relative w-[270px] h-[180px] sm:w-[440px] sm:h-[275px] rounded-[24px] sm:rounded-[36px] p-2 sm:p-3 bg-gradient-to-b from-[#1c1829] via-[#0f0c18] to-[#07050b] border border-amber-500/30 hover:border-amber-400/90 shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex-shrink-0"
            >
              {/* Inner Curved Screen Mask */}
              <div className="relative w-full h-full rounded-[18px] sm:rounded-[26px] overflow-hidden bg-black">
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 270px, 440px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08060c]/90 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                {/* Card Header Tag */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-extrabold uppercase tracking-wider bg-obsidian-surface/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm shadow-md">
                    {img.category}
                  </span>
                </div>

                {/* Card Title & Lightbox Action */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between z-20">
                  <div>
                    <h4 className="font-serif text-sm sm:text-xl font-bold text-ivory drop-shadow-md line-clamp-1">
                      {img.title}
                    </h4>
                    <span className="block text-[0.6rem] sm:text-[0.65rem] text-ivory-dark font-medium mt-0.5">
                      LMS 2K26 Memory
                    </span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-obsidian flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Maximize2 size={12} className="sm:hidden" />
                    <Maximize2 size={14} className="hidden sm:block" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Animated Sliding Track 2: Right to Left Translation (Ultra Smooth Hardware Accelerated) ─── */}
      <div className="w-full overflow-hidden py-2 sm:py-4 [perspective:1200px]">
        <motion.div
          className="flex items-center gap-3 sm:gap-7 w-max transform-gpu will-change-transform"
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
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => setSelectedImage(img)}
              className="group relative w-[270px] h-[180px] sm:w-[440px] sm:h-[275px] rounded-[24px] sm:rounded-[36px] p-2 sm:p-3 bg-gradient-to-b from-[#1c1829] via-[#0f0c18] to-[#07050b] border border-amber-500/30 hover:border-amber-400/90 shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex-shrink-0"
            >
              {/* Inner Curved Screen Mask */}
              <div className="relative w-full h-full rounded-[18px] sm:rounded-[26px] overflow-hidden bg-black">
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 270px, 440px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08060c]/90 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                {/* Card Header Tag */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-extrabold uppercase tracking-wider bg-obsidian-surface/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm shadow-md">
                    {img.category}
                  </span>
                </div>

                {/* Card Title & Lightbox Action */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between z-20">
                  <div>
                    <h4 className="font-serif text-sm sm:text-xl font-bold text-ivory drop-shadow-md line-clamp-1">
                      {img.title}
                    </h4>
                    <span className="block text-[0.6rem] sm:text-[0.65rem] text-ivory-dark font-medium mt-0.5">
                      LMS 2K26 Memory
                    </span>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-obsidian flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Maximize2 size={12} className="sm:hidden" />
                    <Maximize2 size={14} className="hidden sm:block" />
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
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Category: {selectedImage.category}
                </div>
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
