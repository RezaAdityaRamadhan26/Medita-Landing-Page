import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="group bg-white rounded-card border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg transition-all duration-200 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[469/227] border-b-2 border-neo-black bg-slate-50">
        {caseStudy.thumbnail ? (
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {/* Arrow Icon */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary-green group-hover:text-white transition-colors duration-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Badge>{caseStudy.category_tag}</Badge>
        <h3 className="text-base font-semibold text-primary-dark mt-3 mb-2 line-clamp-2 group-hover:text-primary-green transition-colors">
          {caseStudy.title}
        </h3>
        <p className="text-xs text-neutral-muted mb-3">
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3 mb-4">
          {caseStudy.summary}
        </p>
        {caseStudy.link && (
          <Link
            href={caseStudy.link}
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary-blue hover:underline"
          >
            Read More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
