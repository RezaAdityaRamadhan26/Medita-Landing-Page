"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { mockLandingPage } from "@/data/mock";
import { Laptop } from "lucide-react";

export default function ContactForm() {
  const { form_title, form_subtitle, form_button_text } = mockLandingPage;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call (will connect to Strapi later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", service: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                
                {/* Main Illustration Placeholder */}
                <div className="w-[80%] aspect-[4/3] bg-white rounded-xl border-2 border-neo-black shadow-neo relative z-10 flex flex-col overflow-hidden">
                   <div className="h-6 bg-neutral-200 border-b-2 border-neo-black flex items-center px-3 gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-6">
                     <div className="w-24 h-24 bg-white rounded-full border-2 border-neo-black shadow-neo-sm flex items-center justify-center">
                       <Laptop className="w-12 h-12 text-neo-black" strokeWidth={1.5} />
                     </div>
                   </div>
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
                <div className="bg-neo-lime text-neo-black border-2 border-neo-black p-6 rounded-card shadow-neo-sm text-center">
                  <svg className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="font-semibold">Thank you! We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all appearance-none"
                    >
                      <option value="">Services</option>
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
                      placeholder="Message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-neo-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neo-blue transition-all resize-none"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-32"
                    >
                      {isSubmitting ? "Sending..." : form_button_text}
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
