"use client";

import { useState, useRef } from "react";

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
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full border border-neo-black shadow text-xs font-bold px-2 hover:bg-red-600 transition-all"
            title="Remove image"
          >
            ✕ Remove
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
          className="px-4 py-3 bg-neo-lime text-neo-black font-bold rounded-lg border-2 border-neo-black shadow-neo-sm hover:bg-[#DCE399] transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {uploading ? "Uploading..." : "Upload from Computer"}
        </button>

        <span className="text-sm font-bold text-neutral-muted text-center sm:text-left">or enter URL:</span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "/illustrations/sample.svg"}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
        />
      </div>

      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
}
