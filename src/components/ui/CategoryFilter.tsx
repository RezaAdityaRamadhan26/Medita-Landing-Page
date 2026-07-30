"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-2 py-2 text-sm md:text-base transition-all duration-200 ${
            activeCategory === category
              ? "font-bold text-neo-black border-b-4 border-neo-black"
              : "font-medium text-neutral-500 hover:text-neo-black"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
