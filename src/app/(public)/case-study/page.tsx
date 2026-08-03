import prisma from "@/lib/prisma";
import CaseStudyClient from "./CaseStudyClient";
import { CaseStudy } from "@/types";

export const dynamic = "force-dynamic";

export default async function CaseStudyPage() {
  const dbCaseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });

  const caseStudies: CaseStudy[] = dbCaseStudies.map((cs) => ({
    id: cs.id,
    title: cs.title,
    slug: cs.slug,
    category_tag: cs.categoryTag || "Custom Development",
    summary: cs.summary || "",
    thumbnail: cs.thumbnail || "",
    link: cs.link || "",
  }));

  return <CaseStudyClient caseStudies={caseStudies} />;
}
