"use client";

import { useState, Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, KeyRound, RefreshCw } from "lucide-react";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State untuk Kirim Ulang Kode (Resend OTP)
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email || countdown > 0 || resending) return;
    setResending(true);
    setResendMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setResendMessage("Kode verifikasi baru telah berhasil dikirim ke email Anda");
        setCountdown(60); // Waktu jeda 60 detik sebelum bisa klik lagi
      } else {
        setError(data.error || "Gagal mengirim ulang kode OTP.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan saat mengirim ulang kode.");
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
    setResendMessage("");

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
            width={180}
            height={60}
            className="h-14 md:h-16 w-auto"
          />
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
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="000000"
                className="w-full text-center text-3xl font-black tracking-[0.6em] px-4 py-3.5 rounded-xl border-3 border-neo-black focus:outline-none focus:ring-4 focus:ring-neo-blue/30 focus:border-neo-blue transition-all bg-slate-50 text-neo-black shadow-inner"
                autoFocus
                required
              />
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              Pastikan cek folder Inbox atau Spam di email kamu ya. Kodenya aktif selama 10 menit.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full py-3.5 bg-neo-blue text-white font-black text-base rounded-full border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound size={20} className="stroke-[2.5]" />
            <span>{loading ? "Memverifikasi..." : "Verifikasi & Masuk"}</span>
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-slate-600 mb-2.5">
            Belum menerima kode atau kodenya kadaluwarsa?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || countdown > 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-lime text-neo-black font-extrabold text-xs rounded-full border-2 border-neo-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <RefreshCw size={14} className={`stroke-[2.5] ${resending ? "animate-spin text-neo-blue" : ""}`} />
            <span>
              {resending
                ? "Mengirim ulang kode..."
                : countdown > 0
                ? `Kirim ulang dalam (${countdown}s)`
                : "Kirim Ulang Kode OTP"}
            </span>
          </button>
          {resendMessage && (
            <p className="text-xs text-primary-green font-black mt-3 animate-pulse">
              {resendMessage}
            </p>
          )}
        </div>

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
