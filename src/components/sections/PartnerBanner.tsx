"use client";

import { motion } from "framer-motion";

export default function PartnerBanner() {
  return (
    <section className="bg-white border-y-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left justify-center"
        >
          {/* Star/Badge Icon */}
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-neo-yellow border-2 border-neo-black shadow-neo-sm flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A" stroke="#1A1A1A">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <p className="text-base md:text-xl font-bold text-neo-black leading-relaxed max-w-3xl">
            We pride ourselves in helping our clients grow digitally. Now it&apos;s your
            business&apos;s turn to level up with{" "}
            <span className="text-neo-blue underline decoration-4 underline-offset-4">Medita Solusi.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
