import ArticleForm from "@/components/admin/forms/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Create New Article</h1>
      <ArticleForm />
    </div>
  );
}
