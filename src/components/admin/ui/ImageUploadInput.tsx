"use client";

import { useState, useRef } from "react";
import { Upload, Trash2 } from "lucide-react";

const formatImageUrl = (inputUrl: string) => {
  const url = inputUrl.trim();
  // Automatically convert Google Drive share links to embeddable direct image URLs
  const gdriveRegex = /(?:drive\.google\.com\/.*(?:file\/d\/|id=)|docs\.google\.com\/.*(?:file\/d\/|id=))([a-zA-Z0-9_-]+)/i;
  const match = url.match(gdriveRegex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

const compressToWebP = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Return unchanged if SVG or not a recognized bitmap image
    if (file.type === "image/svg+xml" || !file.type.startsWith("image/")) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Automatically scale down excessive dimensions (> 1600px) while maintaining aspect ratio
        const MAX_DIMENSION = 1600;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Compress and convert to WebP format with 80% quality for exceptionally lightweight sizes
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            const originalNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            const webpFile = new File([blob], `${originalNameWithoutExt}.webp`, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          0.8
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
};

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

    let uploadFile = file;
    try {
      // Compress and convert image to lightweight WebP before uploading
      uploadFile = await compressToWebP(file);
    } catch {
      uploadFile = file;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);
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
          <span>{uploading ? "Compressing (WebP) & Uploading..." : "Upload from Computer (Auto-WebP)"}</span>
        </button>

        <span className="text-sm font-bold text-neutral-muted text-center sm:text-left">or enter URL / Google link:</span>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(formatImageUrl(e.target.value))}
          placeholder={placeholder || "Paste direct link or Google Drive share link..."}
          className="flex-1 px-4 py-2.5 rounded-lg border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-primary-green text-sm font-semibold"
        />
      </div>

      {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
    </div>
  );
}
