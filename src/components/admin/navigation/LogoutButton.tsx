"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-2.5 px-4 bg-red-100 text-red-600 font-bold rounded-lg border-2 border-neo-black hover:bg-red-200 transition-all text-sm flex items-center justify-center gap-2 shadow-neo-sm active:translate-y-[1px] active:shadow-none"
    >
      <LogOut size={17} strokeWidth={2.5} />
      <span>Logout</span>
    </button>
  );
}
