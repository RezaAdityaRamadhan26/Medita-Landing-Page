import prisma from "@/lib/prisma";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { notFound } from "next/navigation";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!caseStudy) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Edit Case Study</h1>
      <CaseStudyForm initialData={caseStudy} />
    </div>
  );
}
