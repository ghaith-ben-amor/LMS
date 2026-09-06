"use client";

import React from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event-config";
import { Heart, Share2, Link as LinkIcon, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gold/10 py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-12 md:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-2 sm:col-span-1"
          >
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest">
                <span className="text-white">{eventConfig.event.name}</span>
              </h3>
              <p className="text-gold text-xs sm:text-sm font-light mt-2">
                {eventConfig.event.tagline}
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">
              Navigation
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  About
                </a>
              </li>
              <li>
                <a href="#masquerade" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Masquerade
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Program
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Speakers
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Venue
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block">
                  Partners
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href={eventConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-burgundy/20 text-gold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
              >
                <Heart size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href={eventConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-burgundy/20 text-gold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
              >
                <Share2 size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href={eventConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-burgundy/20 text-gold rounded-lg hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
              >
                <LinkIcon size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-white mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold sm:w-4 sm:h-4 flex-shrink-0" />
                <a
                  href={`mailto:${eventConfig.contact.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {eventConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold sm:w-4 sm:h-4 flex-shrink-0" />
                <a href={`tel:${eventConfig.contact.phone}`} className="hover:text-gold transition-colors">
                  {eventConfig.contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gold/10 pt-6 sm:pt-8 md:pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} LMS 2K26 — All Rights Reserved.
            </p>

            <div className="flex gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
              <a href="#" className="hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xs text-center mt-4 sm:mt-6 font-light italic"
          >
            Behind the Mask, Discover Yourself.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
