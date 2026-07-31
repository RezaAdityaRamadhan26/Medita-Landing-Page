import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-neo-black">Manage Blog Articles</h1>
        <Link 
          href="/admin/articles/new"
          className="py-2 px-4 bg-primary-green text-white font-bold rounded-lg border-2 border-neo-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          + Add New Article
        </Link>
      </div>

      <div className="bg-white rounded-card border-4 border-neo-black shadow-neo overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-4 border-neo-black text-neo-black font-bold">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b-2 border-neo-black last:border-b-0 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-neo-black">{article.title}</td>
                <td className="p-4 text-neutral-muted">{article.category}</td>
                <td className="p-4 text-neutral-muted">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="py-1 px-3 bg-neo-blue text-white text-sm font-bold rounded-md border-2 border-neo-black hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteArticleButton id={article.id} />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-muted font-semibold">
                  No articles found. Create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
