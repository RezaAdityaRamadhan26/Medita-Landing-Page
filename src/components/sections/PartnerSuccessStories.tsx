"use client";

import { motion } from "framer-motion";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import { mockCaseStudies } from "@/data/mock";

export default function PartnerSuccessStories() {
  const displayedCaseStudies = mockCaseStudies.slice(0, 3);

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
            Partner Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black leading-[1.2] mb-4">
            Explore more about our partner success stories
          </h2>
        </motion.div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCaseStudies.map((cs, index) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseStudyCard caseStudy={cs} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
