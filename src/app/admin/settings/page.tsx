import prisma from "@/lib/prisma";
import SettingsForm from "@/components/admin/forms/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany();
  
  // Convert array of objects to a key-value map
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-black mb-4 sm:mb-8">Global Settings</h1>
      <p className="text-neutral-muted mb-8 text-sm sm:text-base">Manage the text content for the Hero section, About section, and Footer.</p>
      
      <SettingsForm initialData={settingsMap} />
    </div>
  );
}
