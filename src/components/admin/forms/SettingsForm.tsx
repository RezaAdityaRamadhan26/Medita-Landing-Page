"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

interface SettingsFormProps {
  initialData: Record<string, string>;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        alert("Settings saved successfully!");
        router.refresh();
      } else {
        alert("Something went wrong!");
      }
    } catch {
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Hero Section Settings */}
      <div className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
        <h2 className="text-xl font-bold text-neo-black border-b-2 border-neo-black pb-2">Hero Section</h2>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Badge Text</label>
          <input
            type="text"
            name="hero_badge_text"
            value={formData.hero_badge_text || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Heading Title</label>
          <textarea
            name="hero_heading_title"
            value={formData.hero_heading_title || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Description</label>
          <textarea
            name="hero_description"
            value={formData.hero_description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">CTA Button Text</label>
          <input
            type="text"
            name="cta_button_text"
            value={formData.cta_button_text || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      {/* About Section Settings */}
      <div className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
        <h2 className="text-xl font-bold text-neo-black border-b-2 border-neo-black pb-2">About Section</h2>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Title</label>
          <textarea
            name="about_title"
            value={formData.about_title || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Description</label>
          <textarea
            name="about_description"
            value={formData.about_description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      {/* Services Section Header Settings */}
      <div className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
        <h2 className="text-xl font-bold text-neo-black border-b-2 border-neo-black pb-2">Services Header</h2>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Title</label>
          <textarea
            name="service_title"
            value={formData.service_title || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Description</label>
          <textarea
            name="service_description"
            value={formData.service_description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      {/* Global / Footer Settings */}
      <div className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
        <h2 className="text-xl font-bold text-neo-black border-b-2 border-neo-black pb-2">Global & Footer</h2>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Site Name</label>
          <input
            type="text"
            name="site_name"
            value={formData.site_name || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Footer Tagline</label>
          <textarea
            name="footer_tagline"
            value={formData.footer_tagline || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Copyright Text</label>
          <input
            type="text"
            name="copyright_text"
            value={formData.copyright_text || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 sticky bottom-6 z-30">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 font-extrabold text-white bg-primary-green rounded-full border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70 text-base flex items-center gap-2.5"
        >
          <Save size={20} strokeWidth={2.5} />
          <span>{loading ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>
    </form>
  );
}
