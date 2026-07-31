"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Handshake, Leaf, Target } from "lucide-react";

const features = [
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Partnership That Grows Together",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Focus on Sustainable Growth",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Accurate and Scalable Digital Solutions",
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
            <div className="w-full flex items-center justify-center relative">
              <Image 
                src="/why-choose-us.svg" 
                alt="Why Choose Us" 
                width={500} 
                height={500} 
                className="w-full h-auto max-w-[460px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl" 
              />
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
                  className="flex items-center justify-between p-4 rounded-xl bg-white border-2 border-neo-black shadow-none hover:translate-y-[-2px] hover:shadow-neo transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 border-2 border-neo-black flex items-center justify-center text-neo-black">
                      {feature.icon}
                    </div>
                    <span className="text-base font-bold text-neo-black">
                      {feature.title}
                    </span>
                  </div>
                  <div className="w-6 h-6 border-2 border-neo-black rounded flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold leading-none mb-0.5">+</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
