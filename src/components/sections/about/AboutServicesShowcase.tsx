"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";

export default function AboutServicesShowcase() {
  const { service_title, service_description, service_cards } = mockLandingPage;

  return (
    <section id="services" className="py-16 bg-transparent">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered & bounded by max-w-4xl */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10"
        >
          <div className="md:col-span-6">
            <span className="inline-block text-xs font-black text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-neo-black leading-[1.2]">
              {service_title}
            </h2>
          </div>
          <div className="md:col-span-6 flex items-end">
            <p className="text-slate-700 font-semibold text-xs sm:text-sm md:text-base leading-relaxed">
              {service_description}
            </p>
          </div>
        </motion.div>

        {/* Featured Service — WordPress (large card) - Constrained to max-w-4xl */}
        <div className="max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-card border-3 border-neo-black shadow-neo overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neo-black mb-3">
                  {service_cards[0].title}
                </h3>
                <p className="text-slate-700 font-semibold text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                  {service_cards[0].description}
                </p>
                <div>
                  <a
                    href={service_cards[0].link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-lime text-neo-black text-xs sm:text-sm font-extrabold rounded-full border-2 border-neo-black shadow-[2px_2px_0_0_#1A1A1A] hover:bg-[#DCE399] hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-200"
                  >
                    <span>See our projects</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 bg-neo-blue/20 p-6 sm:p-8 flex items-center justify-center h-full lg:border-l-2 border-t-2 lg:border-t-0 border-neo-black relative overflow-hidden">
                <Image 
                  src={service_cards[0].image} 
                  alt={service_cards[0].title} 
                  width={320} 
                  height={320} 
                  className="w-full h-auto max-h-[240px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other Services Grid - Also centered in a cohesive max-w-5xl/4xl grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service_cards.slice(1).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-card border-3 border-neo-black p-6 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-full relative h-36 mb-5 flex items-center justify-center bg-slate-50 border-2 border-neo-black rounded-xl p-3 shadow-neo-sm">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    width={180} 
                    height={140} 
                    className="w-full h-full object-contain drop-shadow-[2px_2px_0_#1A1A1A]" 
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-neo-black mb-2">
                  {service.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
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
