"use client";

import { useState } from "react";
import BlogHero from "@/components/sections/shared/BlogHero";
import CategoryFilter from "@/components/ui/CategoryFilter";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import Pagination from "@/components/ui/Pagination";
import ContactForm from "@/components/sections/shared/ContactForm";
import { CaseStudy } from "@/types";

const ITEMS_PER_PAGE = 6;
const caseStudyCategories = [
  "All",
  "Website Wordpress",
  "Website Custom Development",
  "UI / UX Design",
  "Website Maintenance",
  "Website Revamp",
];

interface CaseStudyClientProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyClient({ caseStudies }: CaseStudyClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudies =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((cs) =>
          cs.category_tag.toLowerCase().includes(activeCategory.toLowerCase().replace(" / ", "/"))
        );

  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const paginatedStudies = filteredStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <BlogHero
        badge="CASE STUDY"
        title="Find Inspiration from Their Success"
        description="Discover the secret behind the rapid growth of businesses that entrust their steps to our services."
      />

      {/* Category + Case Studies Section */}
      <section className="section-padding bg-transparent">
        <div className="container-main px-4 lg:px-8">
          {/* Category Header */}
          <div className="flex flex-col gap-4 mb-10">
            <h2 className="text-2xl font-bold text-neo-black">Category</h2>
            <CategoryFilter
              categories={caseStudyCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Section Title */}
          <h3 className="text-xl font-bold text-neo-black mb-6">
            All Case Study
          </h3>

          {/* Case Study Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <ContactForm />
    </>
  );
}
