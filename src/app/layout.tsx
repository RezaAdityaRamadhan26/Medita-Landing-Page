import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/layout/CTABanner";
import "./globals.css";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Medita Solusi Digital | Smart Digital Solutions for Your Business",
  description:
    "Delivering innovative and holistic digital solutions — WordPress, Web Development, UI/UX Design, Website Maintenance, and Website Revamp to help businesses grow in the digital era.",
  keywords: [
    "digital agency",
    "web development",
    "wordpress",
    "UI/UX design",
    "website maintenance",
    "Medita Solusi Digital",
  ],
};

export default async function RootLayout({
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
    <html lang="id" className={outfit.variable}>
      <body className={`${outfit.className} pt-[72px]`}>
        <Navbar siteName={settings.site_name} />
        <main>{children}</main>
        <CTABanner />
        <Footer />
      </body>
    </html>
  );
}
