import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import ArticleCard from "@/components/cards/ArticleCard";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getArticleBySlugOrId(paramSlug: string) {
  const decodedSlug = decodeURIComponent(paramSlug).trim();

  // 1. Try exact match with original param
  let article = await prisma.article.findUnique({ where: { slug: paramSlug } });
  if (article) return article;

  // 2. Try exact match with decoded and trimmed slug
  article = await prisma.article.findUnique({ where: { slug: decodedSlug } });
  if (article) return article;

  // 3. Try case-insensitive match (handles capital letters or spacing variations)
  article = await prisma.article.findFirst({
    where: {
      slug: {
        equals: decodedSlug,
        mode: "insensitive",
      },
    },
  });
  if (article) return article;

  // 4. Try matching by numeric ID if parameter happens to be an integer ID
  const idNum = parseInt(paramSlug, 10);
  if (!isNaN(idNum) && String(idNum) === paramSlug.trim()) {
    article = await prisma.article.findUnique({ where: { id: idNum } });
    if (article) return article;
  }

  // 5. Fallback: search substring match in slug or title to recover slightly malformed URL slugs
  article = await prisma.article.findFirst({
    where: {
      OR: [
        { slug: { contains: decodedSlug, mode: "insensitive" } },
        { title: { equals: decodedSlug, mode: "insensitive" } },
      ],
    },
  });

  return article;
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugOrId(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Medita Blog`,
    description: article.excerpt || undefined,
  };
}

// Social share icons
function ShareButtons() {
  return (
    <div className="flex items-center gap-3">
      {[
        { platform: "tiktok", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" /></svg> },
        { platform: "instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
        { platform: "x", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
        { platform: "facebook", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
      ].map((s) => (
        <a
          key={s.platform}
          href="#"
          className="w-10 h-10 rounded-xl border-2 border-neo-black bg-white shadow-neo-sm flex items-center justify-center text-neo-black hover:bg-neo-lime transition-all"
          aria-label={`Share on ${s.platform}`}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbArticle = await getArticleBySlugOrId(slug);

  if (!dbArticle) {
    notFound();
  }

  const article = {
    id: dbArticle.id,
    title: dbArticle.title,
    slug: dbArticle.slug,
    cover_image: dbArticle.coverImage || "",
    category: dbArticle.category || "General",
    read_time: dbArticle.readTime || "5 min read",
    content: dbArticle.content || "",
    publishedAt: dbArticle.publishedAt ? dbArticle.publishedAt.toISOString() : new Date().toISOString(),
    excerpt: dbArticle.excerpt || "",
  };

  const allArticles = await prisma.article.findMany();
  const popularTopics = [...new Set(allArticles.map((a) => a.category).filter(Boolean))] as string[];

  const dbRelated = await prisma.article.findMany({
    where: {
      category: article.category,
      id: { not: article.id },
    },
    take: 2,
  });

  const relatedArticles = dbRelated.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    cover_image: a.coverImage || "",
    category: a.category || "General",
    read_time: a.readTime || "5 min read",
    content: a.content || "",
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : new Date().toISOString(),
    excerpt: a.excerpt || "",
  }));

  return (
    <>
      {/* Article Header */}
      <section className="bg-transparent pt-8 pb-4 border-b-2 border-neo-black">
        <div className="container-main px-4 lg:px-8">
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neo-black leading-tight mb-4 max-w-3xl">
            {article.title}
          </h1>
          <p className="text-sm font-bold text-neo-black/70">
            Posted on{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Navigation + Share */}
      <section className="bg-transparent border-b-2 border-neo-black">
        <div className="container-main px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-neo-black hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to main
          </Link>
          <ShareButtons />
        </div>
      </section>

      {/* Article Content + Sidebar */}
      <section className="section-padding bg-transparent">
        <div className="container-main px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Body */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-neo-black prose-p:text-neo-black/80 prose-p:leading-relaxed prose-a:text-neo-blue prose-blockquote:border-l-[8px] prose-blockquote:border-primary-green prose-blockquote:bg-[#EAF3CC] prose-blockquote:rounded-r-xl prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:text-neo-black prose-blockquote:font-bold border-2 border-neo-black shadow-neo bg-white p-8 md:p-12 rounded-[24px]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Cover Image */}
              {article.cover_image ? (
                <div className="my-8 rounded-[24px] border-2 border-neo-black shadow-neo overflow-hidden aspect-[16/9] relative bg-slate-50">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="my-8 rounded-[24px] border-2 border-neo-black shadow-neo overflow-hidden aspect-[16/9] bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-200 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              {/* Additional Content */}
              <div className="prose prose-lg max-w-none prose-p:text-neo-black/80 prose-p:leading-relaxed prose-a:text-neo-blue bg-white border-2 border-neo-black shadow-neo p-8 md:p-12 rounded-[24px]">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, cubilia enim sollicitudin libero nam ultricies consequat mi non,{" "}
                  <a href="#" className="text-neo-blue font-bold underline">link</a>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Popular Topics */}
              <div className="mb-10 bg-white border-2 border-neo-black shadow-neo rounded-[24px] p-6">
                <h3 className="text-xl font-bold text-neo-black mb-4">
                  Popular Topics:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/blog?category=${encodeURIComponent(topic)}`}
                      className="px-4 py-2 rounded-full text-xs font-bold border-2 border-neo-black bg-neo-lime text-neo-black hover:bg-neo-blue hover:text-white transition-colors duration-200 shadow-neo-sm"
                    >
                      {topic}
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="px-4 py-2 rounded-full text-xs font-bold border-2 border-neo-black bg-neo-lime text-neo-black hover:bg-neo-blue hover:text-white transition-colors duration-200 shadow-neo-sm"
                  >
                    Mobile
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white border-2 border-neo-black shadow-neo rounded-[24px] p-6">
                <h3 className="text-xl font-bold text-neo-black mb-4">
                  Related Article
                </h3>
                <div className="space-y-5">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
