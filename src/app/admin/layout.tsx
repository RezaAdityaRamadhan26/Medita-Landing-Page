import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-2 border-neo-black shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col z-10">
        <div className="p-6 border-b-2 border-neo-black">
          <h2 className="text-xl font-bold text-neo-black">Medita Admin</h2>
          <p className="text-sm text-neutral-muted">Welcome, {session.user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-3 rounded-lg border-2 border-transparent hover:border-neo-black hover:bg-slate-100 hover:shadow-neo transition-all font-semibold"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/articles"
            className="block px-4 py-3 rounded-lg border-2 border-transparent hover:border-neo-black hover:bg-slate-100 hover:shadow-neo transition-all font-semibold"
          >
            Blog Articles
          </Link>
          <Link
            href="/admin/case-studies"
            className="block px-4 py-3 rounded-lg border-2 border-transparent hover:border-neo-black hover:bg-slate-100 hover:shadow-neo transition-all font-semibold"
          >
            Case Studies
          </Link>
          <Link
            href="/admin/settings"
            className="block px-4 py-3 rounded-lg border-2 border-transparent hover:border-neo-black hover:bg-slate-100 hover:shadow-neo transition-all font-semibold"
          >
            Global Settings
          </Link>
        </nav>

        <div className="p-4 border-t-2 border-neo-black">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
