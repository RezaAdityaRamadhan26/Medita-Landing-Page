import {
  Article,
  CaseStudy,
  Testimonial,
  GlobalData,
  LandingPageData,
} from "@/types";

// ============================================
// Mock Data — Replaces Strapi CMS for development
// ============================================

export const mockGlobal: GlobalData = {
  site_name: "Medita Solusi Digital",
  logo: "/logo.svg",
  nav_links: [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Services", href: "/about" },
    { id: 3, label: "News & Blog", href: "/blog" },
    { id: 4, label: "Information", href: "/case-study" },
    { id: 5, label: "Contact", href: "#contact" },
  ],
  cta_banner_title: "Let's grow and collaborate with us!",
  cta_banner_description:
    "Creating sustainable partnerships with our clients. Transparency, honesty, and real talk are part of our collaborative DNA.",
  cta_banner_button_text: "Start Our Solution",
  footer_tagline:
    "Delivering innovative and holistic solutions, combining technology expertise, media strategy and consulting, to help businesses grow and adapt in the digital era.",
  social_links: [
    { id: 1, platform: "tiktok", url: "#" },
    { id: 2, platform: "instagram", url: "#" },
    { id: 3, platform: "x", url: "#" },
    { id: 4, platform: "facebook", url: "#" },
  ],
  copyright_text: "© 2024 Medita Solusi Digital. All rights reserved.",
};

export const mockLandingPage: LandingPageData = {
  hero_badge_text: "Your Trusted Digital Partner",
  hero_heading_title:
    "Providing smart digital solutions to help your creative business grow.",
  hero_description:
    "We combine technology expertise with creative strategy to deliver solutions that make a real impact on your business growth.",
  cta_button_text: "Get Started",
  hero_images: ["/illustrations/hero-illustration.webp"],
  about_title: "Holistic Solutions and Technology for Your Business Growth",
  about_description:
    "We provide comprehensive technology and creative solutions to optimize your business growth in the digital era, covering web, mobile, marketing, and consulting needs.",
  feature_list: [
    {
      id: 1,
      icon: "globe",
      title: "Website Digital",
      description:
        "Professional website development with modern technology for your online presence.",
    },
    {
      id: 2,
      icon: "layout",
      title: "Responsive Service",
      description:
        "Fast and responsive service to ensure your project runs smoothly.",
    },
    {
      id: 3,
      icon: "search",
      title: "Search Engine Optimization",
      description:
        "Boost your website visibility on search engines with our SEO expertise.",
    },
    {
      id: 4,
      icon: "handshake",
      title: "Work and Worship",
      description:
        "We believe in balancing professional excellence with purpose-driven work.",
    },
    {
      id: 5,
      icon: "award",
      title: "Professionalism",
      description:
        "A proven track record of delivering high-quality projects on time.",
    },
  ],
  service_title:
    "We Offer Comprehensive Digital Services to Maximize Your Business Potential.",
  service_description:
    "It's easy to think digital strategy is just one thing — but there's so much more to it. We're here to help you figure it all out.",
  service_cards: [
    {
      id: 1,
      image: "/illustrations/service-wordpress.webp",
      title: "Website Wordpress",
      description:
        "A fast and efficient website solution using WordPress, the world's most popular CMS. We help you build a professional, responsive, and easy-to-manage website—perfect for businesses, blogs, or personal portfolios. Themes and plugins are tailored to your specific needs.",
      link: "/about#services",
      color: "bg-[#FDE2CD]", // Pastel Orange
    },
    {
      id: 2,
      image: "/illustrations/service-custom-dev.webp",
      title: "Website Custom Development",
      description:
        "Need a website with unique features and a one-of-a-kind design? Our custom development service gives you full flexibility to build a website from scratch, tailored to your business flow and specific goals. We use the latest technologies to ensure top performance and security.",
      link: "/about#services",
      color: "bg-[#D6EFFF]", // Pastel Blue
    },
    {
      id: 3,
      image: "/illustrations/service-uiux.webp",
      title: "UI UX Design",
      description:
        "A great user interface and seamless user experience are key to digital success. We design websites and apps that are not only visually appealing but also functional, easy to navigate, and conversion-focused.",
      link: "/about#services",
      color: "bg-[#D8F5E9]", // Pastel Mint Green
    },
    {
      id: 4,
      image: "/illustrations/service-maintenance.webp",
      title: "Website Maintenance & Revamp",
      description:
        "Keep your website running smoothly and securely. Our maintenance service covers system updates, regular backups, security monitoring, and bug fixing—so you can focus on your business without worrying about technical issues.",
      link: "/about#services",
      color: "bg-[#FAD2D9]", // Pastel Pink
    },
    {
      id: 5,
      image: "/illustrations/service-seo.webp",
      title: "SEO & Content Optimization",
      description:
        "Create content that's easy to find on search engines, optimize your site structure, and improve your rankings—all with the latest techniques that are guaranteed to get results, so your business can be found on search engines.",
      link: "/about#services",
      color: "bg-[#E6F8C1]", // Pastel Lime Green
    },
    {
      id: 6,
      image: "/illustrations/service-advertising.webp",
      title: "Digital Advertising",
      description:
        "Your online ads are not producing results? We help you optimize them to minimize wasteful costs, find problems, and make sure your ads are more effective according to your targets.",
      link: "/about#services",
      color: "bg-[#EED5FF]", // Pastel Purple
    },
  ],
  form_title: "Want to know more?",
  form_subtitle: "Fill out this form below & consult with us!",
  form_button_text: "Email Now",
};

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Mengapa Website Branding Penting untuk Kepercayaan Pelanggan",
    slug: "mengapa-website-branding-penting",
    cover_image: "/blog-1.svg",
    category: "Website Branding",
    read_time: "5 min read",
    content: `<p>Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, cubilia enim sollicitudin libero nam ultricies consequat mi non.</p>
    <blockquote><p>Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.</p><cite>Janeth Andrew (CEO)</cite></blockquote>
    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, sapien elementum tincidunt nunc magna varius leo.</p>`,
    publishedAt: "2024-04-16",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Euismod ornare purus felis eget aliquam. Vel nisi integer sem noque parturient aliquet tellus velit.",
  },
  {
    id: 2,
    title: "Strategi Digital Marketing Terbaik untuk Meningkatkan Penjualan Online",
    slug: "strategi-digital-marketing-terbaik",
    cover_image: "/blog-2.svg",
    category: "Digital Marketing",
    read_time: "7 min read",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>",
    publishedAt: "2024-04-16",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam. Vel nisi integer sem noque parturient aliquet tellus velit. Bibendum vitae lectus tempus tincidunt.",
  },
  {
    id: 3,
    title: "Mulai Digital Marketing dalam 7 Langkah Praktis untuk Pemula",
    slug: "mulai-digital-marketing-7-langkah",
    cover_image: "/blog-1.svg",
    category: "Digital Marketing",
    read_time: "6 min read",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>",
    publishedAt: "2024-04-16",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam. Vel nisi integer sem noque parturient aliquet tellus velit. Bibendum vitae lectus tempus tincidunt.",
  },
  {
    id: 4,
    title: "Mengapa Website yang Cepat Loading Penting untuk SEO",
    slug: "website-cepat-loading-seo",
    cover_image: "/blog-2.svg",
    category: "Website Branding",
    read_time: "4 min read",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>",
    publishedAt: "2024-04-10",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel nisi integer sem noque parturient aliquet tellus velit.",
  },
  {
    id: 5,
    title: "Mindful Digital Marketing untuk Pertumbuhan Bisnis",
    slug: "mindful-digital-marketing",
    cover_image: "/blog-1.svg",
    category: "Digital Marketing",
    read_time: "8 min read",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>",
    publishedAt: "2024-04-08",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Euismod ornare purus felis eget aliquam.",
  },
  {
    id: 6,
    title: "Tips Membuat Landing Page yang Efektif untuk Konversi",
    slug: "tips-landing-page-efektif",
    cover_image: "/blog-2.svg",
    category: "Website Branding",
    read_time: "5 min read",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>",
    publishedAt: "2024-04-05",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vel nisi integer sem noque parturient.",
  },
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title:
      "Desain UX yang Terintegrasi Penuh: Studi Kasus Website Custom untuk Startup Teknologi",
    slug: "desain-ux-terintegrasi",
    category_tag: "UI/UX Design",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam. Vel nisi integer sem noque parturient aliquet vitae tellus velit. S lorem vitae lectus tempus tincidunt.",
    thumbnail: "/case-study-1.svg",
    link: "#",
  },
  {
    id: 2,
    title:
      "Dari Nol ke Online: Transformasi Digital UMKM lewat WordPress",
    slug: "transformasi-digital-umkm",
    category_tag: "Website Wordpress",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Vel nisi integer sem noque parturient aliquet vitae tellus velit. Bibendum vitae lectus tempus tincidunt.",
    thumbnail: "/case-study-2.svg",
    link: "#",
  },
  {
    id: 3,
    title:
      "Desain UX yang Terintegrasi Penuh: Studi Kasus Website Custom untuk Startup Teknologi",
    slug: "desain-ux-terintegrasi-2",
    category_tag: "Website Custom Development",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam. Vel nisi integer sem noque parturient aliquet vitae tellus velit.",
    thumbnail: "/case-study-1.svg",
    link: "#",
  },
  {
    id: 4,
    title:
      "Desain UX yang Terintegrasi Penuh: Studi Kasus Website Custom untuk Startup Teknologi",
    slug: "desain-ux-terintegrasi-3",
    category_tag: "UI/UX Design",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam.",
    thumbnail: "/case-study-2.svg",
    link: "#",
  },
  {
    id: 5,
    title:
      "Dari Nol ke Online: Transformasi Digital UMKM lewat WordPress",
    slug: "transformasi-digital-umkm-2",
    category_tag: "Website Wordpress",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Vel nisi integer sem noque parturient.",
    thumbnail: "/case-study-1.svg",
    link: "#",
  },
  {
    id: 6,
    title:
      "Desain UX yang Terintegrasi Penuh: Studi Kasus Website Custom untuk Startup Teknologi",
    slug: "desain-ux-terintegrasi-4",
    category_tag: "UI/UX Design",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Euismod ornare purus felis eget aliquam.",
    thumbnail: "/case-study-2.svg",
    link: "#",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    client_name: "Ahmad Ridwan",
    role: "CEO, TechStartup Indonesia",
    avatar: "/placeholder-avatar.svg",
    rating: 5,
    quote:
      "Medita Solusi Digital helped us transform our entire digital presence. The website they built exceeded our expectations.",
  },
  {
    id: 2,
    client_name: "Siti Nurhaliza",
    role: "Marketing Director, Fashion Brand",
    avatar: "/placeholder-avatar.svg",
    rating: 5,
    quote:
      "Professional team with excellent communication. Our e-commerce sales increased by 150% after the website revamp.",
  },
  {
    id: 3,
    client_name: "Budi Santoso",
    role: "Founder, EduTech Platform",
    avatar: "/placeholder-avatar.svg",
    rating: 4,
    quote:
      "The UI/UX design was spot on. Our users love the new interface and engagement metrics have never been better.",
  },
];
