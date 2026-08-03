import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#0ABDA0",
          "green-hover": "#09A98F",
          "green-light": "#E0FFF5",
          dark: "#1A1A1A", // Darker black for neo-brutalism
        },
        neo: {
          blue: "#08B3D9",
          lime: "#C5E898",
          black: "#1A1A1A",
          yellow: "#FDE047",
        },
        neutral: {
          muted: "#6B7280",
          light: "#F5F7FA",
          border: "#1A1A1A",
          "bg-form": "#F0F4F8",
        },
        accent: {
          mint: "#D6F5ED",
          "cta-bg": "#1A1A1A",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #F0FDF8 0%, #D4F1F9 100%)",
        "blog-hero-gradient": "linear-gradient(135deg, #F3E5F5 0%, #E8F5E9 100%)",
      },
      borderRadius: {
        card: "16px",
        button: "12px", // Neo-brutalism usually has slightly rounded buttons instead of full pills
      },
      boxShadow: {
        card: "4px 4px 0px 0px #1A1A1A",
        "card-hover": "6px 6px 0px 0px #1A1A1A",
        nav: "0 4px 0px 0px #1A1A1A",
        neo: "4px 4px 0px 0px #1A1A1A",
        "neo-sm": "2px 2px 0px 0px #1A1A1A",
        "neo-lg": "6px 6px 0px 0px #1A1A1A",
      },
      borderWidth: {
        '2': '2px',
        '3': '3px',
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
