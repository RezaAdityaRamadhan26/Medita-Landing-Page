"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCaseStudyButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Error deleting case study");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="py-1 px-3 bg-red-100 text-red-600 text-sm font-bold rounded-md border-2 border-neo-black hover:bg-red-200 transition-colors disabled:opacity-50"
    >
      {isDeleting ? "..." : "Delete"}
    </button>
  );
}
