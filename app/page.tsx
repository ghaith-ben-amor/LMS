"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Highlights from "@/components/Highlights";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Venue from "@/components/Venue";
import Partners from "@/components/Partners";
import Gallery from "@/components/Gallery";
import Legacy from "@/components/Legacy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <Navbar />
      <Hero />
      <About />
      <Pillars />
      <Highlights />
      <Program />
      <Speakers />
      <Venue />
      <Partners />
      <Gallery />
      <Legacy />
      <Footer />
    </main>
  );
}
