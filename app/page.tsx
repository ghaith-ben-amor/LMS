"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Masquerade from "@/components/Masquerade";
import Experience from "@/components/Experience";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Venue from "@/components/Venue";
import Partners from "@/components/Partners";
import Gallery from "@/components/Gallery";
import Legacy from "@/components/Legacy";
import FinalReveal from "@/components/FinalReveal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-widest">
            <span className="text-white">LMS</span>
            <br />
            <span className="text-gold">2K26</span>
          </h1>
          <p className="text-gold text-lg mb-8 tracking-widest font-light">
            ENTERING THE MASQUERADE...
          </p>
          <div className="flex gap-2 justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black max-w-5xl mx-auto py-8">
      <Navbar />
      <Hero />
      <About />
      <Masquerade />
      <Experience />
      <Program />
      <Speakers />
      <Venue />
      <Partners />
      <Gallery />
      <Legacy />
      <FinalReveal />
      <Footer />
    </main>
  );
}
