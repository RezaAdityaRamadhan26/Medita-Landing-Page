import prisma from "@/lib/prisma";
import ArticleForm from "@/components/admin/forms/ArticleForm";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const article = await prisma.article.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Edit Article</h1>
      <ArticleForm initialData={article} />
    </div>
  );
}
