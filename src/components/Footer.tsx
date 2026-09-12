"use client";

import React from "react";
import Link from "next/link";
import { eventConfig } from "@/data/event-config";
import { Mail, Phone, MapPin, Globe, Share2, Heart, Sparkles, ArrowUp } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030305] border-t border-amber-500/20 pt-16 sm:pt-20 pb-12 text-ivory relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-gold">
                <Sparkles size={16} />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-ivory">
                LMS <span className="text-amber-400">2K26</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
              {eventConfig.event.description}
            </p>

            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-400 block pt-2">
              Organized by AIESEC University
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-ivory-muted">
              <li>
                <a href="#home" className="hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  About LMS
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-gold transition-colors">
                  Pillars
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-gold transition-colors">
                  Summit Highlights
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-gold transition-colors">
                  Program Schedule
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-gold transition-colors">
                  Keynote Speakers
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-gold transition-colors">
                  Venue & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Event Details
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory-muted">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span>Hammamet, Tunisia</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <a href={`mailto:${eventConfig.contact.email}`} className="hover:text-gold transition-colors">
                  {eventConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <a href={`tel:${eventConfig.contact.phone}`} className="hover:text-gold transition-colors">
                  {eventConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Channels & Back to Top */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Follow LMS 2K26
            </h4>
            <p className="text-xs text-ivory-muted font-light">
              Join the official conversation on social media.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href={eventConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-amber-500/20 text-gold hover:border-gold hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <Heart size={18} />
              </a>
              <a
                href={eventConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-amber-500/20 text-gold hover:border-gold hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <Share2 size={18} />
              </a>
              <a
                href={eventConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-obsidian-surface border border-amber-500/20 text-gold hover:border-gold hover:bg-amber-500/10 flex items-center justify-center transition-all"
              >
                <Globe size={18} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-gold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Rights & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-dark font-light">
          <p>© {currentYear} LMS 2K26 — Local Motivation Seminar. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-gold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
