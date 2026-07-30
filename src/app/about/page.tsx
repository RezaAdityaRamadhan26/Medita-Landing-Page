import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import ValueProposition from "@/components/sections/ValueProposition";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "About Us | Medita Solusi Digital",
  description:
    "Grow creatively with Medita Solusi Digital. We provide holistic solutions and technology for your business growth — WordPress, Web Development, UI/UX Design, and more.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero
        badge="ABOUT US"
        title="Grow Creatively With Us"
        description="At Medita Digital Solutions, we provide a holistic digital ecosystem to build culturally collaborative businesses along in our clients' creative direction. Whether it's application development, or building a media office and future-ready digital consultancy."
      />
      <ValueProposition />
      <WhyChooseUs />
      <ServicesShowcase />
      <ContactForm />
    </>
  );
}
