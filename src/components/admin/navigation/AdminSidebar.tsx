"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Wrench, 
  Settings, 
  Globe, 
  Menu, 
  X, 
  ExternalLink 
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminSidebar({ userName }: { userName: string | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Services", href: "/admin/services", icon: Wrench },
    { name: "Blog Articles", href: "/admin/articles", icon: FileText },
    { name: "Case Studies", href: "/admin/case-studies", icon: FolderKanban },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* 1. MOBILE TOP NAVIGATION BAR (< md) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-4 border-neo-black z-40 flex items-center justify-between px-4 shadow-neo-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-neo-lime border-2 border-neo-black animate-pulse" />
          <h2 className="text-lg font-extrabold text-neo-black tracking-tight">Medita Admin</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 bg-slate-100 border-2 border-neo-black rounded-lg hover:bg-slate-200 transition-colors"
            title="Lihat Website Live"
          >
            <Globe size={18} className="text-neo-black" />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="px-3.5 py-2 flex items-center gap-2 border-2 border-neo-black rounded-lg bg-[#DCE399] text-neo-black hover:bg-neo-lime transition-all font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
          >
            <Menu size={18} strokeWidth={2.5} />
            <span>MENU ADMIN</span>
          </button>
        </div>
      </header>

      {/* 2. MOBILE BACKDROP OVERLAY */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. RESPONSIVE SIDEBAR (Desktop Fixed / Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 max-w-[85vw] bg-white border-r-4 border-neo-black shadow-[6px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col z-50 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-4 border-neo-black bg-[#F4F6E6] flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-neo-blue border border-neo-black" />
              <h2 className="text-xl font-extrabold text-neo-black tracking-wide">ADMIN PANEL</h2>
            </div>
            <p className="text-xs font-bold text-slate-600 truncate max-w-[180px]">
              👤 {userName ? `Hi, ${userName}` : "Welcome, Admin"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg border-2 border-neo-black bg-white text-neo-black hover:bg-red-100 shadow-neo-sm active:translate-y-[1px] transition-colors"
            aria-label="Tutup Menu"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-white">
          <p className="px-2 pb-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
            Menu Pengelola Web
          </p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                  isActive
                    ? "border-neo-black bg-[#DCE399] text-neo-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[2px]"
                    : "border-transparent text-slate-700 hover:border-neo-black hover:bg-slate-100 hover:text-neo-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <IconComponent size={20} className={isActive ? "text-neo-black" : "text-slate-500"} />
                <span>{link.name}</span>
                {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-neo-black" />}
              </Link>
            );
          })}

          <div className="pt-4 border-t-2 border-dashed border-slate-200 mt-4">
            <p className="px-2 pb-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Akses Cepat
            </p>
            <Link
              href="/"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-700 hover:border-neo-black hover:bg-slate-50 hover:shadow-neo-sm transition-all font-bold text-sm"
            >
              <div className="flex items-center gap-3">
                <Globe size={19} className="text-neo-blue" />
                <span>Lihat Web Live</span>
              </div>
              <ExternalLink size={16} className="text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t-4 border-neo-black bg-slate-50">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
