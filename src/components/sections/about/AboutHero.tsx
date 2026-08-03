"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
  badge: string;
  title: string;
  description: string;
}

export default function AboutHero({ badge, title, description }: AboutHeroProps) {
  return (
    <section className="relative bg-hero-gradient overflow-hidden border-b-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-16 md:py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-sm font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-6">
              {badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold text-neo-black leading-[1.1] mb-6">
              {title}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-neo-black font-medium text-base md:text-lg leading-relaxed max-w-lg bg-white p-6 rounded-2xl border-2 border-neo-black shadow-neo">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-neo-yellow rounded-full border-2 border-neo-black shadow-neo hidden lg:block" />
        <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-neo-blue rounded-full border-2 border-neo-black shadow-neo hidden lg:block" />
      </div>
    </section>
  );
}
