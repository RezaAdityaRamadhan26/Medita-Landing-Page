"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { mockLandingPage } from "@/data/mock";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export default function ContactForm() {
  const { form_title, form_subtitle, form_button_text } = mockLandingPage;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      setErrorMsg("Silakan centang kotak reCAPTCHA (I am not a robot) terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Gagal mengirim pesan. Silakan coba lagi.");
      } else {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", service: "", message: "" });
        setCaptchaToken(null);
        setTimeout(() => setIsSubmitted(false), 6000);
      }
    } catch {
      setErrorMsg("Terjadi kesalahan koneksi saat mengirim email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        <div className="bg-[#F4F6E6] rounded-card border-2 border-neo-black shadow-neo overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Illustration Side */}
            <div className="hidden lg:flex items-end justify-center p-8 pt-12 relative">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-16 h-8 bg-neo-blue rounded-full border-2 border-neo-black shadow-neo-sm rotate-12"></div>
                <div className="absolute bottom-20 right-10 w-12 h-12 bg-[#FF7F50] rounded-full border-2 border-neo-black shadow-neo-sm"></div>
                
                <div className="relative z-10 w-full flex justify-center">
                  <Image 
                    src="/want-to-know-more.svg" 
                    alt="Contact Us" 
                    width={500} 
                    height={500} 
                    className="w-full h-auto max-w-[400px] object-contain drop-shadow-[4px_4px_0_#1A1A1A] rounded-2xl" 
                  />
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neo-black mb-2">
                {form_title}
              </h2>
              <p className="text-neo-black text-sm mb-8">
                {form_subtitle}
              </p>

              {isSubmitted ? (
                <div className="bg-neo-lime text-neo-black border-2 border-neo-black p-6 rounded-card shadow-neo text-center animate-bounce-short">
                  <svg className="w-12 h-12 mx-auto mb-3 text-primary-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="font-bold text-lg mb-1">Pesan Berhasil Terkirim!</p>
                  <p className="text-sm text-neo-black/80">Terima kasih! Tim kami akan segera meninjau pesan Anda dan membalas ke email Anda.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-[#FFCCD5] border-2 border-neo-black text-[#80001B] rounded-xl text-xs sm:text-sm font-bold shadow-neo-sm flex items-center gap-2">
                      <span>⚠️</span>
                      <span className="flex-1">{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-neo-black mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neo-black mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neo-black mb-1.5">
                      Services
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Service</option>
                      <option value="Wordpress">Wordpress</option>
                      <option value="Web Development">Web Development</option>
                      <option value="UI/UX Design">UI / UX Design</option>
                      <option value="Website Maintenance">
                        Website Maintenance
                      </option>
                      <option value="Website Revamp">Website Revamp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neo-black mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all resize-none"
                    />
                  </div>

                  {/* Google reCAPTCHA Widget */}
                  <div className="pt-2 flex justify-start overflow-x-auto">
                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                      <div className="border-2 border-neo-black rounded-lg overflow-hidden shadow-neo-sm">
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={(token: string | null) => setCaptchaToken(token)}
                        />
                      </div>
                    ) : (
                      <div className="text-xs bg-slate-100 border-2 border-dashed border-slate-400 p-3 rounded-xl text-slate-600 w-full">
                        🔒 <strong>reCAPTCHA v2 Siap:</strong> Tambahkan <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> di <code>.env</code> Anda untuk memunculkan kotak centang keamanan.
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-40 disabled:opacity-70"
                    >
                      {isSubmitting ? "Mengirim..." : form_button_text}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
