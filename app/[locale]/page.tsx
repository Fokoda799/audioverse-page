"use client";

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Screenshots } from "@/components/Screenshots";
import { WhyAudioVerse } from "@/components/WhyAudioVerse";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { DownloadCTA } from "@/components/DownloadCTA";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Hero />
      <Features />
      <HowItWorks />
      <Screenshots />
      <WhyAudioVerse />
      {/* <Testimonials /> */}
      <FAQ />
      <DownloadCTA />
    </>
  );
}
