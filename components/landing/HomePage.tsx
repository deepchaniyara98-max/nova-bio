"use client";

import { About } from "@/components/landing/About";
import { Capabilities } from "@/components/landing/Capabilities";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Impact } from "@/components/landing/Impact";
import { Navbar } from "@/components/landing/Navbar";
import { Research } from "@/components/landing/Research";
import { ScientificVisualization } from "@/components/landing/Visualization";
import { CustomCursor } from "@/components/common/CustomCursor";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { SmoothScroll } from "@/components/common/SmoothScroll";

export function HomePage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <ScientificVisualization />
        <Capabilities />
        <Impact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
