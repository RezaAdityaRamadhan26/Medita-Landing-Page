import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/navigation/AdminSidebar";

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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <AdminSidebar userName={session.user?.name} />
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 w-full max-w-full p-4 md:p-8 overflow-x-hidden overflow-y-auto mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}
