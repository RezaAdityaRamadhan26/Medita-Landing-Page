"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { mockLandingPage } from "@/data/mock";

export default function HeroSection() {
  const { hero_badge_text, hero_heading_title, hero_description, cta_button_text } =
    mockLandingPage;

  return (
    <section className="relative bg-hero-gradient overflow-hidden border-b-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-16 md:py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <span className="inline-block text-sm font-semibold text-neo-blue mb-4">
              {hero_badge_text}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-neo-black leading-[1.1] mb-6">
              {hero_heading_title}
            </h1>
            <p className="text-neo-black text-base md:text-lg leading-relaxed max-w-xl mb-10">
              {hero_description}
            </p>
            <Button href="#about" variant="secondary" size="lg">
              {cta_button_text}
            </Button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex items-center justify-center relative"
          >
            {mockLandingPage.hero_images?.[0] && (
              <Image
                src={mockLandingPage.hero_images[0]}
                alt="Medita Digital Solutions Hero"
                width={600}
                height={500}
                priority
                className="w-full h-auto max-h-[500px] object-contain drop-shadow-[6px_6px_0_#1A1A1A] rounded-3xl"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
