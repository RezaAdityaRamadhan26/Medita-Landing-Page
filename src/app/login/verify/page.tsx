"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Resend OTP code state
  const [cooldown, setCooldown] = useState(60);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || resending || !email) return;
    setResending(true);
    setResendStatus(null);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isResend: true }),
      });

      if (res.ok) {
        setCooldown(60);
        setResendStatus("Kode baru telah dikirim ke email Anda.");
        setOtp("");
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mengirim kode ulang.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan saat meminta kode.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Mohon masukkan 6 digit kode verifikasi.");
      return;
    }

    setLoading(true);
    setError("");
    setResendStatus(null);

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 p-7 sm:p-8 shadow-sm text-center">
        
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Verifikasi Login
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-normal">
            Kode 6 digit telah dikirim ke<br />
            <span className="font-medium text-slate-800">{email || "email Anda"}</span>
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-medium">
            {error}
          </div>
        )}

        {resendStatus && (
          <div className="mb-5 p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-medium">
            {resendStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                if (error) setError("");
                if (resendStatus) setResendStatus(null);
              }}
              placeholder="••••••"
              className="w-full text-center text-2xl font-mono tracking-[0.4em] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>

        {/* Resend Code with Countdown Cooldown */}
        <div className="mt-6 text-xs text-slate-500">
          <span>Belum menerima kode? </span>
          {cooldown > 0 ? (
            <span className="text-slate-400 font-medium select-none">
              Kirim ulang ({cooldown}s)
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-slate-900 font-medium hover:underline cursor-pointer disabled:opacity-50"
            >
              {resending ? "Mengirim..." : "Kirim ulang"}
            </button>
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <Link
            href="/login"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
          >
            ← Kembali ke halaman login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-medium text-sm text-slate-500">Memuat halaman...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
