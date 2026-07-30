"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/cards/ArticleCard";
import { mockArticles } from "@/data/mock";

export default function InsightfulArticles() {
  const displayedArticles = mockArticles.slice(0, 3);

  return (
    <section className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 flex flex-col items-center"
        >
          <span className="inline-block text-xs font-bold text-neo-black bg-neo-lime border-2 border-neo-black shadow-neo-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            News & Insightful Articles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black leading-[1.2] mb-2">
            Browse insightful articles through the trends
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-neo-yellow border-2 border-neo-black shadow-neo-sm flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <p className="text-sm md:text-base text-neo-black">
            Your time is valuable.{" "}
            <span className="font-bold text-neo-black">
              Read our insightful article within 5 minutes.
            </span>
          </p>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
