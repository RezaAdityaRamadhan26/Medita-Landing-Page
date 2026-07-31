import Button from "@/components/ui/Button";
import ArticleCard from "@/components/cards/ArticleCard";
import prisma from "@/lib/prisma";

export default async function InsightfulArticles() {
  const dbArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // Map to the shape ArticleCard expects
  const displayedArticles = dbArticles.map(a => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    cover_image: a.coverImage || "",
    category: a.category,
    read_time: a.readTime,
    content: a.content,
    publishedAt: a.publishedAt.toISOString().split('T')[0],
    excerpt: a.excerpt,
  }));

  return (
    <section className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-neo-blue">
            Blog
          </span>
          <Button href="#" variant="secondary" size="md" className="bg-[#DCE399]">
            Explore More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-neo-black leading-[1.2] mb-8">
              Your time is valuable. Read our insightful article within 5 minutes.
            </h2>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-neo-blue border-2 border-neo-black flex items-center justify-center shadow-neo hover:translate-y-[-2px] transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-neo-blue border-2 border-neo-black flex items-center justify-center shadow-neo hover:translate-y-[-2px] transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          
          {/* Right Column - Slider */}
          <div className="lg:col-span-8 overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {displayedArticles.map((article) => (
                <div key={article.id} className="min-w-[280px] w-full md:min-w-[320px] lg:min-w-[350px] max-w-[350px] snap-center shrink-0">
                  <ArticleCard article={article as any} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
