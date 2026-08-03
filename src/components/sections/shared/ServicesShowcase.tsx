"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";
import { ServiceCard } from "@/types";

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

  return (
    <section id="services-showcase" className="py-16 bg-transparent">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        {/* Section Header - Aligned cleanly to max-w-4xl for visual balance */}
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
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-neo-black leading-[1.2]">
              {service_title}
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed">
              {service_description}
            </p>
          </div>
        </motion.div>

        {/* Services Highlight Card - Constrained to max-w-4xl with harmonious proportions */}
        <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-card border-3 border-neo-black p-6 sm:p-8 md:p-10 bg-[#FDE2CD] shadow-neo overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
                {/* Content Area (7 columns on large screens) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 mb-2 block">
                    ✨ Featured Solution
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neo-black mb-3">
                    {displayService.title}
                  </h3>
                  <p className="text-slate-800 font-semibold text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                    {displayService.description}
                  </p>
                  <div>
                    <a
                      href={displayService.link || "#contact"}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neo-black text-xs sm:text-sm font-extrabold rounded-full border-2 border-neo-black shadow-[2px_2px_0_0_#1A1A1A] hover:bg-neo-lime hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-200"
                    >
                      <span>Pelajari Lebih Lanjut</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Illustration Area (5 columns on large screens) - Trimmed height */}
                <div className="lg:col-span-5 w-full flex items-center justify-center relative">
                  <div className="relative w-full max-w-[280px] aspect-4/3 flex items-center justify-center">
                    <Image
                      src={displayService.image || "/our-services.svg"}
                      alt={displayService.title}
                      width={400}
                      height={300}
                      className="w-full h-auto max-h-[260px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
