"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { mockLandingPage } from "@/data/mock";
import dynamic from "next/dynamic";
import { MessageCircle, AlertTriangle, ShieldCheck, CheckCircle } from "lucide-react";

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
    <section id="contact" className="py-16 bg-transparent">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        {/* Constrained max-w-4xl for optimal, perfectly balanced sizing */}
        <div className="max-w-4xl mx-auto bg-[#F4F6E6] rounded-card border-3 border-neo-black shadow-neo overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Illustration & Branding (Left Side - 5 columns) */}
            <div className="hidden lg:flex flex-col items-center justify-center lg:col-span-5 p-6 lg:py-10 relative bg-[#E8EDB8]/40 h-full border-r-2 border-neo-black">
              <div className="relative w-full max-w-[260px] aspect-square flex flex-col items-center justify-center text-center">
                {/* Decorative Elements */}
                <div className="absolute -top-3 left-2 w-10 h-6 bg-neo-blue rounded-full border-2 border-neo-black shadow-neo-sm rotate-12" />
                <div className="absolute bottom-4 right-2 w-8 h-8 bg-[#FF7F50] rounded-full border-2 border-neo-black shadow-neo-sm animate-bounce-short" />
                
                <div className="relative z-10 w-full flex justify-center mb-2">
                  <Image 
                    src="/want-to-know-more.svg" 
                    alt="Contact Us Illustration" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto max-w-[230px] object-contain drop-shadow-[3px_3px_0_#1A1A1A]" 
                  />
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 bg-white border-2 border-neo-black rounded-full shadow-neo-sm mt-2 text-neo-black">
                  <MessageCircle size={15} className="text-neo-blue shrink-0 fill-neo-blue/20" />
                  <span>Konsultasi Gratis</span>
                </span>
              </div>
            </div>

            {/* Form Area (Right Side - 7 columns) */}
            <div className="lg:col-span-7 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-neo-black mb-1">
                  {form_title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-semibold">
                  {form_subtitle}
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-neo-lime text-neo-black border-2 border-neo-black p-6 rounded-xl shadow-neo text-center my-4">
                  <CheckCircle size={44} className="mx-auto mb-2 text-primary-green stroke-[2.5]" />
                  <p className="font-extrabold text-base mb-1">Pesan Berhasil Terkirim!</p>
                  <p className="text-xs font-semibold text-slate-700">Terima kasih! Tim kami akan segera meninjau pesan Anda dan membalas ke email Anda.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-[#FFCCD5] border-2 border-neo-black text-[#80001B] rounded-xl text-xs font-bold shadow-neo-sm flex items-center gap-2">
                      <AlertTriangle size={18} className="text-[#80001B] shrink-0" />
                      <span className="flex-1">{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Email Grid (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neo-black mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neo-black bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[2px_2px_0_0_#1A1A1A] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neo-black mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neo-black bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[2px_2px_0_0_#1A1A1A] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Services Select */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neo-black mb-1">
                      Services
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neo-black bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[2px_2px_0_0_#1A1A1A] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none appearance-none cursor-pointer"
                    >
                      <option value="">Select Service Needed</option>
                      <option value="Wordpress">Wordpress Development</option>
                      <option value="Web Development">Full Web Development</option>
                      <option value="UI/UX Design">UI / UX Design</option>
                      <option value="Website Maintenance">Website Maintenance & Optimization</option>
                      <option value="Website Revamp">Website Redesign / Revamp</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neo-black mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us briefly about your project requirements..."
                      rows={3}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-neo-black bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[2px_2px_0_0_#1A1A1A] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none resize-none"
                    />
                  </div>

                  {/* Google reCAPTCHA Widget & Submit Area */}
                  <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="w-full sm:w-auto overflow-hidden">
                      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                        <div className="border-2 border-neo-black rounded-lg overflow-hidden shadow-neo-sm inline-block transform scale-[0.95] origin-top-left">
                          <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={(token: string | null) => setCaptchaToken(token)}
                          />
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold bg-white border-2 border-dashed border-slate-400 px-3 py-2 rounded-xl text-slate-600 max-w-xs">
                          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                          <span>reCAPTCHA Ready</span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-full sm:w-36 py-2.5 font-extrabold text-xs sm:text-sm shadow-neo hover:translate-y-[-1px] active:translate-y-[1px] shrink-0"
                    >
                      {isSubmitting ? "Sending..." : form_button_text || "Email Now"}
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
