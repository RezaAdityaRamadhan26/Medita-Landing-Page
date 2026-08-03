"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@prisma/client";
import ImageUploadInput from "@/components/admin/ui/ImageUploadInput";

interface CaseStudyFormProps {
  initialData?: CaseStudy | null;
}

export default function CaseStudyForm({ initialData }: CaseStudyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    thumbnail: initialData?.thumbnail || "",
    categoryTag: initialData?.categoryTag || "",
    summary: initialData?.summary || "",
    link: initialData?.link || "#",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if it's a new post and title is changed
      ...(name === "title" && !initialData ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = initialData ? `/api/case-studies/${initialData.id}` : "/api/case-studies";
      const method = initialData ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        router.push("/admin/case-studies");
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
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-neo-black mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-neo-black bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Category Tag</label>
        <input
          type="text"
          name="categoryTag"
          value={formData.categoryTag}
          onChange={handleChange}
          required
          placeholder="e.g. Website Custom Development"
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <ImageUploadInput
        label="Thumbnail Image - Saved to CaseStudy.thumbnail column & /uploads/case-studies/ folder"
        value={formData.thumbnail}
        onChange={(url) => setFormData((prev) => ({ ...prev, thumbnail: url }))}
        placeholder="/case-study-1.svg"
        section="case-studies"
      />

      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Link (Optional)</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="#"
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 font-bold text-neo-black bg-slate-100 rounded-full border-2 border-neo-black hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 font-bold text-white bg-primary-green rounded-full border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Case Study"}
        </button>
      </div>
    </form>
  );
}
