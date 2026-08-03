import HeroSection from "@/components/sections/home/HeroSection";
import PartnerBanner from "@/components/sections/home/PartnerBanner";
import WhyChooseUs from "@/components/sections/shared/WhyChooseUs";
import ServicesShowcase from "@/components/sections/shared/ServicesShowcase";
import PartnerSuccessStories from "@/components/sections/home/PartnerSuccessStories";
import InsightfulArticles from "@/components/sections/home/InsightfulArticles";
import ContactForm from "@/components/sections/shared/ContactForm";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settingsList = await prisma.setting.findMany();
  const settings = settingsList.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const dbServices = await prisma.service.findMany({
    orderBy: { createdAt: "asc" }
  });
  
  const services = dbServices.map(s => ({
    id: s.id,
    image: s.image,
    title: s.title,
    description: s.description,
    link: s.link || "",
    color: s.color || "",
  }));

  return (
    <>
      <HeroSection settings={settings} />
      <PartnerBanner />
      <WhyChooseUs settings={settings} />
      <ServicesShowcase settings={settings} services={services} />
      <PartnerSuccessStories />
      <InsightfulArticles />
      <ContactForm />
    </>
  );
}
