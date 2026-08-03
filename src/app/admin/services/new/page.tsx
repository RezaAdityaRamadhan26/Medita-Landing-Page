import ServiceForm from "@/components/admin/forms/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-neo-black mb-8">Add New Service</h1>
      <ServiceForm />
    </div>
  );
}
