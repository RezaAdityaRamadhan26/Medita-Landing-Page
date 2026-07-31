"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { mockLandingPage } from "@/data/mock";

export default function ServicesShowcase({ 
  settings, 
  services 
}: { 
  settings?: Record<string, string>,
  services?: any[] 
}) {
  const service_title = settings?.service_title || mockLandingPage.service_title;
  const service_description = settings?.service_description || mockLandingPage.service_description;
  const displayService = services && services.length > 0 ? services[0] : mockLandingPage.service_cards[0];

  return (
    <section className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-16"
        >
          <div>
            <span className="block text-sm font-bold text-neo-blue mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-neo-black leading-[1.2]">
              {service_title}
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-neo-black font-medium text-base md:text-lg leading-relaxed">
              {service_description}
            </p>
          </div>
        </motion.div>

        {/* Services Highlight Card */}
        <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[24px] border-2 border-neo-black p-8 md:p-12 bg-[#FDE2CD] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-neo-black mb-4">
                    {displayService.title}
                  </h3>
                  <p className="text-neo-black font-medium text-sm md:text-base leading-relaxed mb-6">
                    {displayService.description}
                  </p>
                </div>
                {/* Illustration */}
                <div className="w-full relative flex items-center justify-center">
                  <Image
                    src={displayService.image || "/our-services.svg"}
                    alt={displayService.title}
                    width={500}
                    height={400}
                    className="w-full h-auto max-h-[400px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
