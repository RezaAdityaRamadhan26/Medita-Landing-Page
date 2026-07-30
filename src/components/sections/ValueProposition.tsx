"use client";

import { motion } from "framer-motion";
import { mockLandingPage } from "@/data/mock";

const iconMap: Record<string, React.ReactNode> = {
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  layout: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  handshake: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  award: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
};

export default function ValueProposition() {
  const { about_title, about_description, feature_list } = mockLandingPage;

  return (
    <section className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <span className="inline-block text-xs font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Our Focus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold text-neo-black leading-[1.1] mb-4 max-w-3xl mx-auto">
            {about_title}
          </h2>
          <p className="text-neo-black font-medium text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {about_description}
          </p>
        </motion.div>

        {/* Feature Cards Grid — 3 top + 2 bottom centered */}
        <div className="flex flex-wrap justify-center gap-6">
          {feature_list.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border-2 border-neo-black rounded-[24px] p-6 shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-neo-lime border-2 border-neo-black flex items-center justify-center text-neo-black mb-6 group-hover:bg-neo-blue group-hover:text-white transition-colors duration-200">
                {iconMap[feature.icon] || iconMap.globe}
              </div>
              <h3 className="text-xl font-bold text-neo-black mb-3">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-neo-black/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
