import HeroSection from "@/components/sections/HeroSection";
import PartnerBanner from "@/components/sections/PartnerBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import PartnerSuccessStories from "@/components/sections/PartnerSuccessStories";
import InsightfulArticles from "@/components/sections/InsightfulArticles";
import ContactForm from "@/components/sections/ContactForm";
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
