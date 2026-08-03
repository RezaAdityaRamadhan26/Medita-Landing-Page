"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";
import { ServiceCard } from "@/types";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function ServicesShowcase({ 
  settings, 
  services 
}: { 
  settings?: Record<string, string>,
  services?: ServiceCard[] 
}) {
  const service_title = settings?.service_title || mockLandingPage.service_title;
  const service_description = settings?.service_description || mockLandingPage.service_description;
  const displayService = services && services.length > 0 ? services[0] : mockLandingPage.service_cards[0];

  const highlights = [
    "Tailored & Scalable Architecture",
    "High Performance & SEO Optimized",
    "Seamless User Experience (UI/UX)"
  ];

  return (
    <section id="services-showcase" className="section-padding bg-transparent relative overflow-hidden">
      {/* Decorative subtle ambient pattern behind section */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-neo-lime/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-neo-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container-main px-4 lg:px-8">
        {/* Section Header - Sized exactly like Why Choose Us (full container alignment) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-end"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neo-black bg-[#DCE399] border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
              <Sparkles size={14} className="text-neo-black fill-white" />
              <span>Our Services</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black leading-[1.15]">
              {service_title}
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-slate-800 font-semibold text-base md:text-lg leading-relaxed">
              {service_description}
            </p>
          </div>
        </motion.div>

        {/* Featured Service - Asymmetric Layered & Dynamic UI (Not Just a Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Content Side (6 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-white border-2 border-neo-black shadow-neo-sm px-3.5 py-1 rounded-full w-max mb-4">
              ✨ Featured Digital Solution
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-neo-black mb-5 tracking-tight">
              {displayService.title}
            </h3>

            <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed mb-6">
              {displayService.description}
            </p>

            {/* Feature Check-list */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-neo-lime border-2 border-neo-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#1A1A1A]">
                    <CheckCircle2 size={14} className="text-neo-black stroke-[2.5]" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-neo-black">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <a
                href={displayService.link || "#contact"}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FDE2CD] text-neo-black font-extrabold text-base rounded-2xl border-3 border-neo-black shadow-neo hover:bg-neo-lime hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 w-max"
              >
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Illustration Side - Geometric Multi-layer Frame (Not a simple square) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 order-1 lg:order-2 w-full relative flex items-center justify-center py-6"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center p-6 sm:p-10">
              
              {/* Layer 1: Angled Background Accent Plane */}
              <div className="absolute inset-2 sm:inset-4 bg-[#FDE2CD] border-3 border-neo-black rounded-[36px] shadow-neo rotate-[4deg] transition-transform duration-500 hover:rotate-2" />

              {/* Layer 2: Offset Geometric Pattern / Grid Plate */}
              <div className="absolute inset-2 sm:inset-4 bg-white border-3 border-neo-black rounded-[32px] -rotate-[3deg] overflow-hidden">
                {/* Subtle Halftone Grid Texture Inside Plate */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              {/* Decorative Geometric Badges Floating */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-neo-blue rounded-2xl border-3 border-neo-black shadow-neo flex items-center justify-center rotate-[-12deg] z-20">
                <span className="font-black text-white text-lg">💡</span>
              </div>
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-neo-lime border-3 border-neo-black rounded-xl shadow-neo font-extrabold text-xs text-neo-black rotate-[8deg] z-20 hidden sm:block">
                🚀 #1 Solution
              </div>

              {/* Main Illustration Content */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <Image
                  src={displayService.image || "/our-services.svg"}
                  alt={displayService.title}
                  width={500}
                  height={500}
                  className="w-full h-auto max-h-[380px] object-contain drop-shadow-[6px_6px_0_#1A1A1A] rounded-2xl hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
