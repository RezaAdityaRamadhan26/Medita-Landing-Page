import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: parseInt(resolvedParams.id) },
    });
    if (!caseStudy) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const resolvedParams = await params;
    const body = await req.json();
    const caseStudy = await prisma.caseStudy.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        title: body.title,
        slug: body.slug,
        categoryTag: body.categoryTag,
        summary: body.summary,
        thumbnail: body.thumbnail,
        link: body.link,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const resolvedParams = await params;
    await prisma.caseStudy.delete({
      where: { id: parseInt(resolvedParams.id) },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
