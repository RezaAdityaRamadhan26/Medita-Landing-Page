import Link from "next/link";
import { mockGlobal } from "@/data/mock";

export default function CTABanner() {
  const { cta_banner_title, cta_banner_description, cta_banner_button_text } =
    mockGlobal;

  return (
    <section className="bg-neo-lime border-y-2 border-neo-black">
      <div className="container-main px-4 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neo-black mb-3">
            {cta_banner_title}
          </h2>
          <p className="text-neo-black font-medium text-sm md:text-base leading-relaxed">
            {cta_banner_description}
          </p>
        </div>
        <Link
          href="#contact"
          className="shrink-0 inline-flex items-center bg-neo-blue text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-button border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-y-[2px] active:shadow-none transition-all duration-200"
        >
          {cta_banner_button_text}
        </Link>
      </div>
    </section>
  );
}
