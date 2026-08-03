"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AboutServicesShowcase() {
  const { service_title, service_description, service_cards } = mockLandingPage;

  return (
    <section id="services" className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        
        {/* Section Header - Full Width standard container sizing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-end"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
              <Sparkles size={14} className="text-neo-black" />
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

        {/* Featured Service — WordPress (Layered Asymmetric Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center"
          >
            <span className="inline-block text-xs font-black text-neo-black bg-[#DCE399] border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full w-max mb-4">
              🌟 Primary Specialty
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black mb-5 leading-[1.15]">
              {service_cards[0].title}
            </h3>
            <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed mb-8">
              {service_cards[0].description}
            </p>
            <div>
              <a
                href={service_cards[0].link}
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#FDE2CD] text-neo-black text-base font-extrabold rounded-2xl border-3 border-neo-black shadow-neo hover:bg-neo-lime hover:translate-y-[-2px] active:translate-y-[2px] transition-all duration-200 w-max"
              >
                <span>See Our Projects</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* Layered Geometric Illustration Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center relative py-6"
          >
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-6 sm:p-10">
              {/* Back Layer */}
              <div className="absolute inset-2 sm:inset-4 bg-neo-lime/40 border-3 border-neo-black rounded-[36px] shadow-neo rotate-[5deg]" />
              {/* Front Plate Layer */}
              <div className="absolute inset-2 sm:inset-4 bg-white border-3 border-neo-black rounded-[32px] -rotate-[3deg] overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
              <div className="relative z-10 w-full flex items-center justify-center">
                <Image 
                  src={service_cards[0].image} 
                  alt={service_cards[0].title} 
                  width={450} 
                  height={450} 
                  className="w-full h-auto max-h-[380px] object-contain drop-shadow-[6px_6px_0_#1A1A1A] rounded-2xl" 
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service_cards.slice(1).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-[24px] border-3 border-neo-black p-7 shadow-neo hover:translate-y-[-6px] hover:shadow-neo-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-full relative h-40 mb-6 flex items-center justify-center bg-slate-50 border-2 border-neo-black rounded-2xl p-4 shadow-neo-sm group-hover:bg-[#E8EDB8]/30 transition-colors">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    width={200} 
                    height={160} 
                    className="w-full h-full object-contain drop-shadow-[3px_3px_0_#1A1A1A] group-hover:scale-105 transition-transform" 
                  />
                </div>
                <h4 className="text-xl md:text-2xl font-black text-neo-black mb-3">
                  {service.title}
                </h4>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
