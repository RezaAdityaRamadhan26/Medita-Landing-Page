"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { mockGlobal } from "@/data/mock";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { nav_links } = mockGlobal;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-nav">
      <div className="container-main flex items-center justify-between h-[72px] px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="/logo-header.svg" 
            alt="Medita Solusi Digital" 
            width={140} 
            height={40} 
            priority
            className="h-8 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {nav_links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-primary-dark hover:text-primary-green transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-neo-blue text-white text-sm font-semibold px-6 py-2.5 rounded-button border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-y-[2px] active:shadow-none transition-all duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Free Consultation
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-primary-dark"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-primary-dark"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-primary-dark"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-neutral-border overflow-hidden"
          >
            <div className="container-main px-4 py-6 flex flex-col gap-4">
              {nav_links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-primary-dark hover:text-primary-green transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-neo-blue text-white text-sm font-semibold px-6 py-3 rounded-button border-2 border-neo-black shadow-neo transition-all mt-2"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
