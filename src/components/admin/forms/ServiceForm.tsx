"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";
import ImageUploadInput from "@/components/admin/ui/ImageUploadInput";

import toast from "react-hot-toast";

interface ServiceFormProps {
  initialData?: Service | null;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "/our-services.svg",
    link: initialData?.link || "",
    color: initialData?.color || "#FDE2CD",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Menyimpan layanan...");
    
    try {
      const url = initialData ? `/api/services/${initialData.id}` : "/api/services";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Layanan berhasil disimpan!", { id: loadingToast });
        router.push("/admin/services");
        router.refresh();
      } else {
        toast.error("Gagal menyimpan layanan.", { id: loadingToast });
      }
    } catch {
      toast.error("Terjadi kesalahan jaringan.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-card border-4 border-neo-black shadow-neo space-y-6">
      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Service Title</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <ImageUploadInput
        label="Image (Illustration) - Saved to Service.image column & /uploads/services/ folder"
        value={formData.image}
        onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
        placeholder="/our-services.svg"
        section="services"
      />
      
      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Background Color (Hex Code)</label>
        <div className="flex gap-4 items-center max-w-sm">
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-12 h-12 rounded-lg border-2 border-neo-black p-1 cursor-pointer"
          />
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="#FDE2CD"
            className="flex-1 px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-neo-black mb-2">Target Link (Optional)</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="/about#services"
          className="w-full px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t-2 border-neo-black">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="px-6 py-3 font-bold text-neo-black bg-white rounded-lg border-2 border-neo-black shadow-neo-sm hover:bg-slate-100 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 font-bold text-white bg-primary-green rounded-lg border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  );
}
