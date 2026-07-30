"use client";

import { motion } from "framer-motion";
import { mockLandingPage } from "@/data/mock";

export default function WordpressShowcase() {
  const wpService = mockLandingPage.service_cards[0];

  return (
    <section className="bg-neutral-light pb-16 md:pb-20 lg:pb-24">
      <div className="container-main px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[24px] border-2 border-neo-black shadow-neo overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                {wpService.title}
              </h3>
              <p className="text-neutral-muted text-sm md:text-base leading-relaxed mb-6">
                {wpService.description}
              </p>
              <a
                href={wpService.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-green hover:underline"
              >
                See our projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* WordPress Logo / Image Placeholder */}
            <div className="bg-neo-blue p-8 md:p-12 flex items-center justify-center min-h-[280px] lg:border-l-2 lg:border-neo-black border-t-2 lg:border-t-0 border-neo-black">
              <div className="w-32 h-32 bg-white rounded-full border-2 border-neo-black shadow-neo flex items-center justify-center">
                <span className="text-5xl font-bold text-neo-black">W</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
