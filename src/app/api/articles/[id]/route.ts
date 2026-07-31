import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(resolvedParams.id) },
    });
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const article = await prisma.article.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        title: body.title,
        slug: body.slug,
        coverImage: body.coverImage,
        category: body.category,
        readTime: body.readTime,
        content: body.content,
        excerpt: body.excerpt,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.article.delete({
      where: { id: parseInt(resolvedParams.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
