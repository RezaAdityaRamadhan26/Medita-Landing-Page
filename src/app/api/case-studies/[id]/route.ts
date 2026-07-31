import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!caseStudy) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const caseStudy = await prisma.caseStudy.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        slug: body.slug,
        categoryTag: body.categoryTag,
        summary: body.summary,
        thumbnail: body.thumbnail,
        link: body.link,
      },
    });
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.caseStudy.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
