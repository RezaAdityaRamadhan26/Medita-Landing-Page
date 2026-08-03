"use client";

import { useState } from "react";
import BlogHero from "@/components/sections/shared/BlogHero";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ArticleCardFeatured from "@/components/cards/ArticleCardFeatured";
import ArticleCard from "@/components/cards/ArticleCard";
import Pagination from "@/components/ui/Pagination";
import ContactForm from "@/components/sections/shared/ContactForm";
import { Article } from "@/types";

const ITEMS_PER_PAGE = 3;
const blogCategories = ["All", "Website Branding", "Digital Marketing"];

interface BlogClientProps {
  articles: Article[];
}

export default function BlogClient({ articles }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const totalPages = Math.ceil(
    Math.max(filteredArticles.length - 1, 0) / ITEMS_PER_PAGE
  );
  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);
  const paginatedArticles = remainingArticles.slice(
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
        badge="BLOG"
        title="Your Destination for Practical and Powerful Solutions"
        description="Stay ahead with the latest insights, practical tips, innovative ideas, industry innovations, Medita Digital Solutions services, and much more interesting information."
      />

      {/* Category + Articles Section */}
      <section className="section-padding bg-transparent">
        <div className="container-main px-4 lg:px-8">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b-2 border-neo-black pb-4">
            <h2 className="text-2xl font-bold text-neo-black">Category</h2>
            <CategoryFilter
              categories={blogCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-8">
              <ArticleCardFeatured article={featuredArticle} />
            </div>
          )}

          {/* Article Grid */}
          {paginatedArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

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
