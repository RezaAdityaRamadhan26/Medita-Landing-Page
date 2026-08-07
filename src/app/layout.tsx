import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

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

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className={`${outfit.className} bg-white text-neo-black antialiased`}>
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            className: "border-2 border-neo-black shadow-neo font-bold text-sm",
            style: {
              background: "#fff",
              color: "#1A1A1A",
              borderRadius: "12px",
            }
          }} 
        />
      </body>
    </html>
  );
}

