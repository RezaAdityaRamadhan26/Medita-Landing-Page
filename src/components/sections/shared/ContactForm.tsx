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
    <section id="contact" className="section-padding bg-transparent">
      <div className="container-main px-4 lg:px-8">
        {/* Expanded to max-w-6xl for optimal spaciousness matching Why Choose Us */}
        <div className="max-w-6xl mx-auto bg-[#F4F6E6] rounded-card border-3 border-neo-black shadow-neo overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Illustration & Branding Area (5 columns) */}
            <div className="hidden lg:flex flex-col items-center justify-center lg:col-span-5 p-8 lg:p-12 relative bg-[#E8EDB8]/60 border-r-3 border-neo-black overflow-hidden">
              {/* Subtle grid accent inside illustration panel */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:20px_20px]" />
              
              <div className="relative w-full max-w-[360px] flex flex-col items-center justify-center text-center">
                {/* Decorative Shapes */}
                <div className="absolute -top-6 left-4 w-14 h-8 bg-neo-blue rounded-full border-3 border-neo-black shadow-neo-sm rotate-12" />
                <div className="absolute bottom-10 right-4 w-12 h-12 bg-[#FF7F50] rounded-full border-3 border-neo-black shadow-neo-sm animate-bounce-short" />
                
                <div className="relative z-10 w-full flex justify-center mb-6">
                  <Image 
                    src="/want-to-know-more.svg" 
                    alt="Contact Us Illustration" 
                    width={400} 
                    height={400} 
                    className="w-full h-auto max-w-[320px] object-contain drop-shadow-[5px_5px_0_#1A1A1A] rounded-2xl" 
                  />
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 bg-white border-3 border-neo-black rounded-full shadow-neo text-neo-black">
                  <MessageCircle size={16} className="text-neo-blue shrink-0 fill-neo-blue/20" />
                  <span>Konsultasi Proyek Gratis</span>
                </span>
              </div>
            </div>

            {/* Form Area (7 columns) - Spacious & Comfortable */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-neo-black mb-2 tracking-tight">
                  {form_title}
                </h2>
                <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed">
                  {form_subtitle}
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-neo-lime text-neo-black border-3 border-neo-black p-8 rounded-2xl shadow-neo text-center my-6 animate-bounce-short">
                  <CheckCircle size={52} className="mx-auto mb-3 text-primary-green stroke-[2.5]" />
                  <p className="font-extrabold text-xl mb-2">Pesan Berhasil Terkirim!</p>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    Terima kasih telah menghubungi kami! Tim profesional Medita Solusi akan meninjau kebutuhan Anda dan membalas langsung ke email Anda dalam waktu kurang dari 24 jam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 bg-[#FFCCD5] border-2 border-neo-black text-[#80001B] rounded-xl text-xs md:text-sm font-bold shadow-neo-sm flex items-center gap-3">
                      <AlertTriangle size={20} className="text-[#80001B] shrink-0" />
                      <span className="flex-1">{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neo-black mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-neo-black bg-white text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[3px_3px_0_0_#1A1A1A] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neo-black mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-neo-black bg-white text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[3px_3px_0_0_#1A1A1A] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Services Select */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neo-black mb-2">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-neo-black bg-white text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[3px_3px_0_0_#1A1A1A] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none cursor-pointer text-neo-black"
                    >
                      <option value="" className="text-slate-400">Select Service Needed</option>
                      <option value="Wordpress">Wordpress Development</option>
                      <option value="Web Development">Full Web Development</option>
                      <option value="UI/UX Design">UI / UX Design</option>
                      <option value="Website Maintenance">Website Maintenance & Optimization</option>
                      <option value="Website Revamp">Website Redesign / Revamp</option>
                    </select>
                  </div>

                  {/* Message Textarea - Expanded to 5 rows with generous comfort sizing */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neo-black mb-2">
                      Project Description & Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your objectives, desired features, timeline, or any specific challenges..."
                      rows={5}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-neo-black bg-white text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all shadow-[3px_3px_0_0_#1A1A1A] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-y min-h-[140px] placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>

                  {/* Google reCAPTCHA Widget & Submit Area */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-auto overflow-hidden">
                      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                        <div className="border-2 border-neo-black rounded-lg overflow-hidden shadow-neo-sm inline-block">
                          <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={(token: string | null) => setCaptchaToken(token)}
                          />
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs font-bold bg-white border-2 border-dashed border-slate-400 px-4 py-2.5 rounded-xl text-slate-600">
                          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                          <span>reCAPTCHA Protected</span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-48 py-3.5 font-black text-sm md:text-base shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] shrink-0"
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
