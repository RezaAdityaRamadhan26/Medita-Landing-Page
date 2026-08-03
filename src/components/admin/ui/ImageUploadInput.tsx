"use client";

import { useState, useRef } from "react";
import { Upload, X, Trash2 } from "lucide-react";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  section?: string;
}

export default function ImageUploadInput({ label, value, onChange, placeholder, section = "general" }: ImageUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", section);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-neo-black">{label}</label>

      {/* Preview Section */}
      {value && (
        <div className="relative inline-block border-2 border-neo-black rounded-lg p-2 bg-slate-50 shadow-neo-sm overflow-hidden max-w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="max-h-40 w-auto object-contain rounded" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md border border-neo-black shadow text-xs font-bold flex items-center gap-1 hover:bg-red-600 transition-all"
            title="Remove image"
          >
            <Trash2 size={13} strokeWidth={2.5} />
            <span>Remove</span>
          </button>
        </div>
      )}

      {/* Input & Upload Button Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 bg-neo-lime text-neo-black font-bold text-sm rounded-lg border-2 border-neo-black shadow-neo-sm hover:bg-[#DCE399] transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 cursor-pointer"
        >
          <Upload size={18} strokeWidth={2.5} />
          <span>{uploading ? "Uploading..." : "Upload from Computer"}</span>
        </button>

        <span className="text-sm font-bold text-neutral-muted text-center sm:text-left">or enter URL:</span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "/illustrations/sample.svg"}
          className="flex-1 px-4 py-2.5 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green text-sm font-semibold"
        />
      </div>

      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
}
