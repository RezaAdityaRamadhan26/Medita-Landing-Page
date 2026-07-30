import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Article } from "@/types";

interface ArticleCardFeaturedProps {
  article: Article;
}

export default function ArticleCardFeatured({ article }: ArticleCardFeaturedProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block bg-white rounded-[24px] border-2 border-neo-black shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg transition-all duration-300 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[280px] lg:border-r-2 lg:border-neo-black border-b-2 lg:border-b-0 border-neo-black">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-100 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          {/* Play/Arrow Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-neo-lime border-2 border-neo-black rounded-full flex items-center justify-center shadow-neo-sm group-hover:bg-neo-blue group-hover:text-white transition-colors duration-200 text-neo-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <Badge className="w-fit mb-4">{article.category}</Badge>
          <h3 className="text-xl md:text-3xl font-extrabold text-neo-black mb-3 group-hover:text-neo-blue transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs font-bold text-neo-black/70 mb-3">
            {new Date(article.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-sm md:text-base font-medium text-neo-black/80 leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-neo-blue hover:underline">
            Read More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
