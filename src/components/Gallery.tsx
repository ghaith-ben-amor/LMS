"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages, GalleryImage } from "@/data/gallery";
import Badge from "./ui/Badge";
import Modal from "./ui/Modal";
import { Maximize2, Sparkles, Filter } from "lucide-react";

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

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#050507] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="gold" size="md" className="mb-4">
            Visual Archive
          </Badge>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-ivory tracking-wider mb-6">
            MEMORIES <span className="text-gradient-gold">OF EXCELLENCE</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-900 via-amber-400 to-rose-900 mx-auto rounded-full mb-6" />

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed font-light">
            Moments of passion, keynotes, gala celebrations, and lifelong bonds forged during LMS editions.
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
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gold text-obsidian shadow-lg shadow-gold/20"
                    : "bg-obsidian-card text-ivory-muted border border-amber-500/15 hover:border-amber-500/40 hover:text-ivory"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedImage(img)}
              className="group relative h-64 rounded-2xl overflow-hidden glass-card border border-amber-500/20 cursor-pointer"
            >
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B10] via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Text & Icon Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform">
                <div>
                  <Badge variant="gold" size="sm" className="mb-1">
                    {img.category}
                  </Badge>
                  <h4 className="font-serif text-lg font-bold text-ivory">
                    {img.title}
                  </h4>
                </div>

                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <Maximize2 size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Screen Lightbox Modal */}
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title={selectedImage?.title || "Memory Lightbox"}
          maxWidth="xl"
        >
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-amber-500/30">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-ivory">
                    {selectedImage.title}
                  </h4>
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Category: {selectedImage.category}
                  </p>
                </div>
                <Badge variant="gold">LMS Archive</Badge>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Gallery;
