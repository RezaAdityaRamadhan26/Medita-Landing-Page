"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-2 bg-red-100 text-red-600 font-bold rounded-lg border-2 border-neo-black hover:bg-red-200 transition-all text-sm"
    >
      Logout
    </button>
  );
}
