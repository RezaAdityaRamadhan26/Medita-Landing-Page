"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";

export default function WordpressShowcase() {
  const wpService = mockLandingPage.service_cards[0];

  return (
    <section className="bg-transparent py-16">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-card border-3 border-neo-black shadow-neo overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Content (7 columns) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neo-black mb-3">
                  {wpService.title}
                </h3>
                <p className="text-slate-700 font-semibold text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                  {wpService.description}
                </p>
                <div>
                  <a
                    href={wpService.link}
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

              {/* WordPress Image (5 columns) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex items-center justify-center bg-neo-blue/30 h-full lg:border-l-2 border-t-2 lg:border-t-0 border-neo-black relative overflow-hidden">
                 <Image 
                   src="/illustrations/service-wordpress.webp" 
                   alt="Wordpress" 
                   width={320} 
                   height={320} 
                   className="w-full h-auto max-h-[240px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl" 
                 />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
