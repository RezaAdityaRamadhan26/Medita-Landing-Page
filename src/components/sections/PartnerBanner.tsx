"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PartnerBanner() {
  return (
    <section className="bg-white border-y-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold text-[#2D7362] mb-3">
            They&apos;ve trusted us — and we&apos;re just getting started.
          </span>
          <h2 className="text-lg md:text-2xl font-bold text-neo-black leading-snug mb-10">
            We pride ourselves in helping our clients grow digitally. Now, it&apos;s your
            business&apos; turn to level up with Medita Solusi.
          </h2>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <Image src="/storia-coffee-logo.svg" alt="Storia Coffee" width={120} height={120} className="w-24 md:w-32 h-auto" />
            <Image src="/kharisma-furniture-logo.svg" alt="Kharisma Furniture" width={120} height={120} className="w-24 md:w-32 h-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
