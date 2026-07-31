"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { mockLandingPage } from "@/data/mock";

export default function HeroSection({ settings }: { settings?: Record<string, string> }) {
  const hero_badge_text = settings?.hero_badge_text || mockLandingPage.hero_badge_text;
  const hero_heading_title = settings?.hero_heading_title || mockLandingPage.hero_heading_title;
  const hero_description = settings?.hero_description || mockLandingPage.hero_description;
  const cta_button_text = settings?.cta_button_text || mockLandingPage.cta_button_text;

  return (
    <section className="relative bg-hero-gradient overflow-hidden border-b-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-16 md:py-20 lg:py-28 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
          {/* Floating Side Images for Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-12 -left-32 xl:-left-48 w-64 xl:w-80 hidden lg:block"
          >
            <Image src="/hero-section-1.svg" alt="Decoration Left" width={320} height={320} priority className="w-full h-auto drop-shadow-md" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-24 -right-32 xl:-right-48 w-64 xl:w-80 hidden lg:block"
          >
            <Image src="/hero-section-2.svg" alt="Decoration Right" width={320} height={320} priority className="w-full h-auto drop-shadow-md" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10 w-full"
          >
            <span className="inline-block text-sm font-semibold text-neo-blue mb-4">
              {hero_badge_text}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-neo-black leading-[1.1] mb-6">
              {hero_heading_title}
            </h1>
            <p className="text-neo-black text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              {hero_description}
            </p>
            <Button href="#about" variant="secondary" size="lg" className="bg-[#DCE399]">
              {cta_button_text}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
