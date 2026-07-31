"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";

export default function AboutServicesShowcase() {
  const { service_title, service_description, service_cards } = mockLandingPage;

  return (
    <section id="services" className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-neo-black leading-[1.2]">
              {service_title}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-neo-black font-medium text-sm md:text-base leading-relaxed">
              {service_description}
            </p>
          </div>
        </motion.div>

        {/* Featured Service — WordPress (large card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[24px] border-2 border-neo-black shadow-neo overflow-hidden mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-extrabold text-neo-black mb-4">
                {service_cards[0].title}
              </h3>
              <p className="text-neo-black font-medium text-base md:text-lg leading-relaxed mb-6">
                {service_cards[0].description}
              </p>
              <a
                href={service_cards[0].link}
                className="inline-flex items-center gap-2 text-sm font-bold text-neo-blue hover:underline"
              >
                See our projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
            <div className="bg-neo-blue p-8 md:p-12 flex items-center justify-center min-h-[280px] lg:border-l-2 lg:border-neo-black border-t-2 lg:border-t-0 border-neo-black relative overflow-hidden">
              <Image 
                src={service_cards[0].image} 
                alt={service_cards[0].title} 
                width={400} 
                height={400} 
                className="w-full h-auto object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl" 
              />
            </div>
          </div>
        </motion.div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service_cards.slice(1).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-[24px] border-2 border-neo-black p-6 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all duration-300 group"
            >
              <div className="w-full relative h-40 mb-6 flex items-center justify-center">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  width={200} 
                  height={160} 
                  className="w-full h-full object-contain drop-shadow-[4px_4px_0_#1A1A1A]" 
                />
              </div>
              <h4 className="text-xl font-bold text-neo-black mb-3">
                {service.title}
              </h4>
              <p className="text-sm font-medium text-neo-black/80 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
