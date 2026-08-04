"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Mohon masukkan 6 digit kode verifikasi.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });

    if (res?.error) {
      setError("Kode verifikasi salah atau sudah kadaluwarsa.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-white p-4">
      <div className="w-full max-w-md bg-white rounded-card border-4 border-neo-black shadow-neo p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-header.svg"
            alt="Medita Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-neo-black bg-neo-lime border-2 border-neo-black px-3 py-1 rounded-full shadow-neo-sm">
            <ShieldCheck size={16} className="text-neo-blue stroke-[2.5]" />
            <span>2FA SECURITY VALIDATION</span>
          </span>
        </div>

        <h1 className="text-2xl font-bold text-neo-black text-center mb-2">
          Verifikasi Kode OTP
        </h1>

        <p className="text-slate-600 text-sm text-center leading-relaxed mb-6">
          Kami telah mengirimkan 6 digit kode keamanan ke email: <br />
          <strong className="text-neo-black font-extrabold underline">{email || "email Anda"}</strong>
        </p>

        {error && (
          <div className="mb-4 p-3.5 bg-red-100 border-2 border-neo-black rounded-lg text-red-600 text-sm font-semibold text-center shadow-neo-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-neo-black mb-2 text-center">
              Masukkan 6 Angka Kode Verifikasi
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full text-center text-3xl font-black tracking-[0.6em] px-4 py-3.5 rounded-xl border-3 border-neo-black focus:outline-none focus:ring-4 focus:ring-neo-blue/30 focus:border-neo-blue transition-all bg-slate-50 text-neo-black shadow-inner"
                autoFocus
                required
              />
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              💡 Periksa folder Inbox atau Spam pada email Anda. Kode aktif 10 menit.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-3.5 bg-neo-blue text-white font-black text-base rounded-full border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <KeyRound size={20} className="stroke-[2.5]" />
            <span>{loading ? "Memverifikasi..." : "Verifikasi & Masuk"}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-neo-blue transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Halaman Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-neo-black">Memuat Halaman Verifikasi...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
