import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const cleanSlug = (body.slug || body.title || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/(^-|-$)+/g, "");

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: cleanSlug || `article-${Date.now()}`,
        coverImage: body.coverImage,
        category: body.category,
        readTime: body.readTime,
        content: body.content,
        excerpt: body.excerpt,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
