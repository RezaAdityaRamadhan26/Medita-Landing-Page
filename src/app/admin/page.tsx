import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const articleCount = await prisma.article.count();
  const caseStudyCount = await prisma.caseStudy.count();

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Articles Stat */}
        <div className="bg-white p-6 rounded-card border-4 border-neo-black shadow-neo">
          <h3 className="text-lg font-bold text-neutral-muted mb-2">Total Blog Articles</h3>
          <p className="text-5xl font-black text-primary-green mb-6">{articleCount}</p>
          <Link 
            href="/admin/articles"
            className="inline-flex py-2 px-4 bg-neo-blue text-white font-bold rounded-lg border-2 border-neo-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Manage Articles
          </Link>
        </div>

        {/* Case Studies Stat */}
        <div className="bg-white p-6 rounded-card border-4 border-neo-black shadow-neo">
          <h3 className="text-lg font-bold text-neutral-muted mb-2">Total Case Studies</h3>
          <p className="text-5xl font-black text-secondary-blue mb-6">{caseStudyCount}</p>
          <Link 
            href="/admin/case-studies"
            className="inline-flex py-2 px-4 bg-primary-green text-white font-bold rounded-lg border-2 border-neo-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Manage Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}
