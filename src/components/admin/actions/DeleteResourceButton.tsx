"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteResourceButtonProps {
  id: number | string;
  resource: "articles" | "case-studies" | "services";
  resourceName?: string;
}

export default function DeleteResourceButton({
  id,
  resource,
  resourceName = "item",
}: DeleteResourceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${resourceName}?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/${resource}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert(`Failed to delete ${resourceName}.`);
      }
    } catch (error) {
      alert(`Error deleting ${resourceName}.`);
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
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
