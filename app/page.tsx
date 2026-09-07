"use client";

import React from "react";
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
  return (
    <main className="w-full min-h-screen bg-black">
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
