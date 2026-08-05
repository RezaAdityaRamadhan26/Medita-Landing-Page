import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteResourceButton from "@/components/admin/actions/DeleteResourceButton";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-black">Manage Blog Articles</h1>
        <Link 
          href="/admin/articles/new"
          className="py-2 px-4 bg-primary-green text-white font-bold rounded-lg border-2 border-neo-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          + Add New Article
        </Link>
      </div>

      <div className="bg-white rounded-card border-4 border-neo-black shadow-neo overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-100 border-b-4 border-neo-black text-neo-black font-bold">
              <th className="p-4 w-20">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b-2 border-neo-black last:border-b-0 hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  {article.coverImage ? (
                    <div className="w-12 h-12 rounded border border-neo-black overflow-hidden bg-slate-50 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded border border-neutral-300 bg-slate-100 flex items-center justify-center text-[10px] text-neutral-400 font-bold">
                      None
                    </div>
                  )}
                </td>
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
                  <DeleteResourceButton id={article.id} resource="articles" resourceName="article" />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-muted font-semibold">
                  No articles found. Create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
