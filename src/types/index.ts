// ============================================
// Strapi CMS TypeScript Interfaces
// Used for both Strapi API responses and mock data
// ============================================

// --- Shared Components ---
export interface FeatureItem {
  id: number;
  icon: string; // Icon name or placeholder
  title: string;
  description: string;
}

export interface ServiceCard {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
  color?: string;
}

export interface NavLink {
  id: number;
  label: string;
  href: string;
}

export interface SocialLink {
  id: number;
  platform: "tiktok" | "instagram" | "x" | "facebook";
  url: string;
}

// --- Collection Types ---
export interface Article {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  category: string;
  read_time: string;
  content: string; // Rich text HTML string (mock) or Strapi blocks
  publishedAt: string;
  excerpt?: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  category_tag: string;
  summary: string;
  thumbnail: string;
  link?: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface FormSubmission {
  name: string;
  email: string;
  service: string;
  message: string;
}

// --- Single Types ---
export interface LandingPageData {
  hero_badge_text: string;
  hero_heading_title: string;
  hero_description: string;
  cta_button_text: string;
  hero_images: string[];
  about_title: string;
  about_description: string;
  feature_list: FeatureItem[];
  service_title: string;
  service_description: string;
  service_cards: ServiceCard[];
  form_title: string;
  form_subtitle: string;
  form_button_text: string;
}

export interface GlobalData {
  site_name: string;
  logo: string;
  nav_links: NavLink[];
  cta_banner_title: string;
  cta_banner_description: string;
  cta_banner_button_text: string;
  footer_tagline: string;
  social_links: SocialLink[];
  copyright_text: string;
}
