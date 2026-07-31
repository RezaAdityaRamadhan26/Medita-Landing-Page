import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

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
    const body = await req.json();
    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        coverImage: body.coverImage,
        category: body.category,
        readTime: body.readTime,
        content: body.content,
        excerpt: body.excerpt,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
