"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { eventConfig } from "@/data/event-config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT LMS", href: "#about" },
    { label: "THE MASQUERADE", href: "#masquerade" },
    { label: "PROGRAM", href: "#program" },
    { label: "SPEAKERS", href: "#speakers" },
    { label: "VENUE", href: "#venue" },
    { label: "PARTNERS", href: "#partners" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-lg border-b border-gold/20"
          : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="#" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest"
            >
              <span className="text-ivory">LMS</span>
              <span className="text-gold ml-1">2K26</span>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-300 hover:text-gold transition-colors duration-300 font-medium tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.05 }}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-burgundy via-gold to-burgundy text-black rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 tracking-wide"
            >
              JOIN LMS
            </motion.a>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gold/10 transition-colors text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-t border-gold/20"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-gray-300 hover:text-gold hover:bg-gold/5 rounded-lg transition-colors text-sm font-medium tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-2 border-t border-gold/20">
              <motion.a
                href="#cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2.5 bg-gradient-to-r from-burgundy via-gold to-burgundy text-black rounded-lg text-sm font-bold text-center transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 tracking-wide"
              >
                JOIN LMS
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
