"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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

  const performDelete = async (toastId: string) => {
    toast.dismiss(toastId);
    setIsDeleting(true);
    const loadingToast = toast.loading(`Menghapus ${resourceName}...`);
    try {
      const res = await fetch(`/api/${resource}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`${resourceName} berhasil dihapus!`, { id: loadingToast });
        router.refresh();
      } else {
        toast.error(`Gagal menghapus ${resourceName}.`, { id: loadingToast });
      }
    } catch {
      toast.error(`Error menghapus ${resourceName}.`, { id: loadingToast });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold">Apakah Anda yakin ingin menghapus {resourceName} ini?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 border-2 border-neo-black rounded-md font-bold"
          >
            Batal
          </button>
          <button 
            onClick={() => performDelete(t.id)} 
            className="px-3 py-1 text-sm bg-red-500 text-white hover:bg-red-600 border-2 border-neo-black rounded-md font-bold"
          >
            Yakin Hapus
          </button>
        </div>
      </div>
    ), { duration: 10000 });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="py-1 px-3 bg-red-100 text-red-600 text-xs font-bold rounded-md border-2 border-neo-black hover:bg-red-200 transition-colors disabled:opacity-50 inline-flex items-center gap-1"
    >
      <Trash2 size={13} strokeWidth={2.5} />
      <span>{isDeleting ? "Deleting..." : "Delete"}</span>
    </button>
  );
}
