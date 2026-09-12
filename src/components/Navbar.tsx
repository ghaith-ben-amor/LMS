"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "./ui/Button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Pillars", href: "#pillars" },
  { label: "Highlights", href: "#highlights" },
  { label: "Program", href: "#program" },
  { label: "Speakers", href: "#speakers" },
  { label: "Venue", href: "#venue" },
  { label: "Gallery", href: "#gallery" },
  { label: "Partners", href: "#partners" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#050507]/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl shadow-black/80"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="#home" className="group flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-rose-950 via-amber-500/30 to-amber-400 p-[1px] shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/30 transition-all">
              <div className="w-full h-full rounded-full bg-[#0D0B10] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-ivory group-hover:text-gold transition-colors">
                LMS <span className="text-amber-400">2K26</span>
              </span>
              <span className="text-[0.65rem] tracking-[0.25em] text-gray-400 uppercase font-sans">
                AIESEC University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-obsidian-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/15">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-gold font-bold"
                      : "text-ivory-muted hover:text-ivory hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              href="/registration"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Register as Delegate
            </Button>

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-obsidian-surface border border-amber-500/20 text-gold hover:border-gold transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0A080F]/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
              <nav className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-obsidian-surface/60 border border-amber-500/10 text-ivory text-sm font-semibold hover:border-amber-500/40 hover:text-gold hover:bg-amber-500/5 transition-all"
                  >
                    <span>{item.label}</span>
                    <span className="text-amber-500/40 text-xs">→</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <Button
                  href="/registration"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register as Delegate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;