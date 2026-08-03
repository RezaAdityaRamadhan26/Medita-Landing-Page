import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteResourceButton from "@/components/admin/actions/DeleteResourceButton";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-black">Manage Services</h1>
        <Link
          href="/admin/services/new"
          className="px-6 py-3 bg-neo-blue text-white font-bold rounded-lg border-2 border-neo-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          + Add New Service
        </Link>
      </div>

      <div className="bg-white rounded-card border-4 border-neo-black shadow-neo overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-neo-black">
                <th className="p-4 font-bold text-neo-black border-r-2 border-neo-black">ID</th>
                <th className="p-4 font-bold text-neo-black border-r-2 border-neo-black">Title</th>
                <th className="p-4 font-bold text-neo-black border-r-2 border-neo-black">Color</th>
                <th className="p-4 font-bold text-neo-black border-r-2 border-neo-black">Image</th>
                <th className="p-4 font-bold text-neo-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr key={service.id} className={idx !== services.length - 1 ? "border-b-2 border-neo-black" : ""}>
                  <td className="p-4 font-semibold text-neo-black border-r-2 border-neo-black">{service.id}</td>
                  <td className="p-4 text-neo-black border-r-2 border-neo-black font-semibold">{service.title}</td>
                  <td className="p-4 text-neo-black border-r-2 border-neo-black">
                    <span className="inline-block px-3 py-1 rounded-full border-2 border-neo-black text-xs font-bold" style={{ backgroundColor: service.color || "#fff" }}>
                      {service.color || "None"}
                    </span>
                  </td>
                  <td className="p-4 text-neo-black border-r-2 border-neo-black">
                    <div className="w-16 h-12 bg-slate-100 border-2 border-neo-black rounded overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.image} alt="service" className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="p-4 flex gap-2 justify-center items-center">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="py-1 px-3 bg-neo-blue text-white text-sm font-bold rounded-md border-2 border-neo-black hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteResourceButton id={service.id} resource="services" resourceName="service" />
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-muted">
                    No services found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
