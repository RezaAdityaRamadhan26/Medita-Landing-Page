"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Email atau password salah.");
        setLoading(false);
      } else {
        router.push(`/login/verify?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setError("Terjadi kendala jaringan atau server. Silakan coba kembali.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-white p-4">
      <div className="w-full max-w-md bg-white rounded-card border-4 border-neo-black shadow-neo p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-header.svg"
            alt="Medita Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-neo-black text-center mb-6">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-neo-black rounded-lg text-red-600 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-neo-black mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
              placeholder="admin@medita.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neo-black mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neo-black transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-green text-white font-bold rounded-full border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
