import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(caseStudies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const caseStudy = await prisma.caseStudy.create({
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
    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}
