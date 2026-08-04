import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import prisma from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsList = await prisma.setting.findMany();
  const settings = settingsList.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="pt-[74px] md:pt-[78px] flex flex-col min-h-screen">
      <Navbar siteName={settings.site_name} />
      <main className="flex-grow">{children}</main>
      <CTABanner />
      <Footer />
    </div>
  );
}
