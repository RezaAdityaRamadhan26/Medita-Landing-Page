"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminSidebar({ userName }: { userName: string | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Blog Articles", href: "/admin/articles" },
    { name: "Case Studies", href: "/admin/case-studies" },
    { name: "Manage Services", href: "/admin/services" },
    { name: "Global Settings", href: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-neo-black z-40 flex items-center px-4 justify-between shadow-sm">
        <h2 className="text-xl font-bold text-neo-black">Medita Admin</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 flex items-center gap-2 border-2 border-neo-black rounded-lg hover:bg-slate-100 transition-colors bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
        >
          <Menu size={20} />
          <span className="font-bold text-sm">Menu</span>
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r-2 border-neo-black shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b-2 border-neo-black flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-neo-black">Medita Admin</h2>
            <p className="text-sm text-neutral-muted truncate max-w-[150px]">
              {userName ? `Hi, ${userName}` : "Welcome"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto bg-white">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg border-2 transition-all font-semibold ${
                  isActive
                    ? "border-neo-black bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "border-transparent hover:border-neo-black hover:bg-slate-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-neo-black bg-white">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
