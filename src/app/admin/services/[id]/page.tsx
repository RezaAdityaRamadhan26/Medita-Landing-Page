import prisma from "@/lib/prisma";
import ServiceForm from "@/components/admin/forms/ServiceForm";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const service = await prisma.service.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!service) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Edit Service</h1>
      <ServiceForm initialData={service} />
    </div>
  );
}
