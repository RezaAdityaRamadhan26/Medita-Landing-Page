import prisma from "@/lib/prisma";
import BlogClient from "./BlogClient";
import { Article } from "@/types";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const dbArticles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });

  const articles: Article[] = dbArticles.map((a) => ({
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

  return <BlogClient articles={articles} />;
}
