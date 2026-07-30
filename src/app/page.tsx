import HeroSection from "@/components/sections/HeroSection";
import PartnerBanner from "@/components/sections/PartnerBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import PartnerSuccessStories from "@/components/sections/PartnerSuccessStories";
import InsightfulArticles from "@/components/sections/InsightfulArticles";
import ContactForm from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnerBanner />
      <WhyChooseUs />
      <ServicesShowcase />
      <PartnerSuccessStories />
      <InsightfulArticles />
      <ContactForm />
    </>
  );
}
