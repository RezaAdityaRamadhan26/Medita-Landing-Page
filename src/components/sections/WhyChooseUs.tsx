"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Conversion as the priority",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Focus on beautiful art",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trust and reliability",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-full aspect-square max-w-[460px] mx-auto bg-neo-yellow rounded-3xl border-2 border-neo-black shadow-neo flex items-center justify-center p-8 relative overflow-hidden">
               <div className="absolute top-8 left-8 w-12 h-12 rounded-full border-2 border-neo-black bg-neo-lime"></div>
               <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full border-2 border-neo-black bg-neo-blue"></div>
              <div className="relative w-[70%] aspect-square bg-white border-2 border-neo-black shadow-neo flex items-center justify-center rounded-2xl rotate-3">
                {/* Placeholder illustration */}
                <div className="w-32 h-32 bg-primary-green/10 rounded-full border-2 border-neo-black flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-neo-black" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black leading-[1.2] mb-6">
              It&apos;s not about how grand your website looks, but how effectively it
              works for your business.
            </h2>
            <p className="text-neo-black text-base md:text-lg leading-relaxed mb-8">
              At Medita Solusi, we believe that a great digital presence isn&apos;t just about
              aesthetics — it&apos;s about creating real value, driving conversions, and
              building lasting relationships with your audience.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-neo-black shadow-neo-sm hover:translate-y-[-2px] hover:shadow-neo transition-all duration-200 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-neo-lime border-2 border-neo-black flex items-center justify-center text-neo-black">
                    {feature.icon}
                  </div>
                  <span className="text-base font-bold text-neo-black">
                    {feature.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
