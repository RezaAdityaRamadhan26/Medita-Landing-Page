"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function WordpressShowcase() {
  const wpService = mockLandingPage.service_cards[0];

  const benefits = [
    "Custom Themes & Plugin Development",
    "Easy-to-Manage Content Dashboard",
    "Speed Optimization & Security Hardening"
  ];

  return (
    <section className="bg-transparent py-20 relative overflow-hidden">
      <div className="container-main px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content (6 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            <span className="inline-block text-xs font-black text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full w-max mb-4">
              💻 WordPress Mastery
            </span>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-neo-black mb-5 leading-[1.15]">
              {wpService.title}
            </h3>
            
            <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed mb-6">
              {wpService.description}
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-neo-blue border-2 border-neo-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#1A1A1A]">
                    <CheckCircle2 size={14} className="text-white stroke-[2.5]" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-neo-black">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <a
                href={wpService.link}
                className="inline-flex items-center gap-3 px-7 py-4 bg-white text-neo-black font-extrabold text-base rounded-2xl border-3 border-neo-black shadow-neo hover:bg-neo-lime hover:translate-y-[-2px] active:translate-y-[2px] transition-all duration-200 w-max"
              >
                <span>See Our Projects</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* WordPress Layered Geometric Illustration (6 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center relative py-6"
          >
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-6 sm:p-10">
              
              {/* Angled Backdrop Layer */}
              <div className="absolute inset-2 sm:inset-4 bg-neo-blue/25 border-3 border-neo-black rounded-[36px] shadow-neo rotate-[-5deg] transition-transform duration-500 hover:rotate-[-2deg]" />

              {/* Front Plate Layer */}
              <div className="absolute inset-2 sm:inset-4 bg-white border-3 border-neo-black rounded-[32px] rotate-[3deg] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:18px_18px]" />
              </div>

              {/* Decorative Pill */}
              <div className="absolute top-3 right-4 px-4 py-2 bg-[#FF7F50] text-white border-3 border-neo-black rounded-full shadow-neo font-black text-xs rotate-[6deg] z-20">
                ⭐ Top CMS
              </div>

              {/* Image */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <Image 
                  src="/illustrations/service-wordpress.webp" 
                  alt="Wordpress" 
                  width={450} 
                  height={450} 
                  className="w-full h-auto max-h-[370px] object-contain drop-shadow-[6px_6px_0_#1A1A1A] rounded-2xl hover:scale-[1.03] transition-transform duration-300" 
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
