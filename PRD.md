# Product Requirement Document (PRD) - Company Landing Page & Blog

## 1. Project Overview & Objectives
* **Project Name:** Company / Agency Landing Page & Blog
* **Goal:** Membangun landing page performa tinggi, responsif, dan *pixel-perfect* sesuai desain Figma dengan pengelolaan konten mandiri via Strapi CMS.
* **Tech Stack:**
  * **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript, Framer Motion (untuk animasi/slider).
  * **Backend / CMS:** Strapi CMS (Headless).
  * **Database:** PostgreSQL / MySQL.

---

## 2. Technical & UI Specifications

### 2.1 Design & Responsiveness Guidelines
* **Reference File:** "Home.jpg"
* **Pixel-Perfect Accuracy:** Tampilan frontend (Next.js) harus presisi mengikuti *spacing, typography, warna, border-radius*, dan *shadow* pada file referensi.
* **Responsive Breakpoints:**
  * **Desktop:** >= 1200px (Sesuai canvas desain asli).
  * **Tablet:** 768px - 1199px (Grid 2 kolom / adaptif).
  * **Mobile:** < 768px (Layout stacking 1 kolom, navbar berubah jadi *hamburger menu*, grid artikel/testimoni berubah jadi *touch-swipe carousel*).

---

## 3. Strapi CMS Schema & Content Management
Semua *copywriting*, gambar, dan artikel wajib di-manage penuh dari Strapi CMS.

### 3.1 Collection Types (Konten Berulang)

**A. Articles (Blog)**
* `title` (Short Text)
* `slug` (UID)
* `cover_image` (Media - Single)
* `category` (Short Text / Enumeration)
* `read_time` (Short Text)
* `content` (Rich Text / Blocks Editor)
* `publishedAt` (Date/Time)

**B. Case Studies**
* `title` (Short Text)
* `category_tag` (Short Text)
* `summary` (Long Text)
* `thumbnail` (Media - Single)
* `link` (Short Text - Optional)

**C. Testimonials**
* `client_name` (Short Text)
* `role` (Short Text)
* `avatar` (Media - Single)
* `rating` (Number - 1 to 5)
* `quote` (Long Text)

### 3.2 Single Types (Landing Page Content)
* **Hero Section:** `hero_badge_text`, `hero_heading_title`, `hero_description`, `cta_button_text`, `hero_images`.
* **Value Proposition:** `about_title`, `about_description`, `feature_list` (Component: Icon, Title, Description).
* **Services Section:** `service_title`, `service_description`, `service_cards` (Component: Image, Title, Description).
* **Contact Section:** `form_title`, `form_subtitle`, `form_button_text`.
* **Footer:** `footer_tagline`, `social_links`, `copyright_text`.

---

## 4. Functional Requirements & Integrations
* **Dynamic Form Handling:** Form *"Want to know more?"* dikirim ke Strapi Collection **Form Submissions** atau via API webhook email (misal: Formspree/Resend).
* **SEO & Image Optimization:** Gunakan `next/image` untuk gambar dari CMS. Terapkan Dynamic Metadata dari Strapi.

---

## 5. AI Agent System Prompt & Constraints

> **[FOR AI AGENT / CLAUDE OPUS TO READ & EXECUTE]**
>
> **Role & Objective**
> You are an elite, senior Full-Stack Developer specializing in Next.js (App Router), Tailwind CSS, and Strapi CMS. Your ultimate goal is to translate the provided design image ("Home.jpg") into a production-ready, highly responsive Next.js frontend, deeply integrated with a Strapi headless CMS backend, exactly as specified in this PRD.
> 
> **1. Strict Visual & Pixel-Perfect Mandate (The "No Hallucination" Rule)**
> * Treat the provided image ("Home.jpg") as the absolute source of truth for all UI/UX decisions.
> * Do not invent your own design language, spacing, or color palettes. Extract the exact hex codes, border-radius, font sizes, and layout structures visually apparent in the image.
> * Use Tailwind CSS arbitrary values (e.g., `text-[#1A2B3C]` or `p-[30px]`) if standard Tailwind classes do not perfectly match the design.
> * All layouts must use CSS Grid or Flexbox to replicate the exact alignment seen in the image.
> 
> **2. Tech Stack & Frontend Architecture Limits**
> * **Framework:** Next.js (App Router). Do NOT use the old Pages router.
> * **Styling:** Tailwind CSS. Do NOT use standard CSS files, SCSS, or inline styles.
> * **Components:** Build strictly modular, reusable React components (e.g., `<Hero/>`, `<TestimonialCard/>`).
> * **Responsiveness:** The design is desktop-first. You MUST implement responsive breakpoints (`sm:`, `md:`, `lg:`) to ensure stacking layouts on mobile devices.
> 
> **3. Strapi CMS Integration Mandate**
> * Every single piece of text, image, and data on the frontend must be dynamic and mapped to a Strapi CMS schema.
> * Do NOT hardcode copywriting into the React components. Use the exact JSON schema structures defined in the PRD.
> * Implement generic data fetching functions in Next.js to retrieve data from Strapi API endpoints securely.
> 
> **4. Execution Protocol (Step-by-Step)**
> You must execute this project in the following strict order, waiting for user confirmation if instructed:
> * **STEP 1 - Visual Analysis:** Analyze "Home.jpg" and output a comprehensive list of extracted colors, typography hierarchy, and UI sections.
> * **STEP 2 - Component Tree:** Output a Markdown tree of the Next.js component structure you plan to build.
> * **STEP 3 - CMS Schema Scaffolding:** Generate the exact Strapi Content-Type JSON schemas based on the PRD.
> * **STEP 4 - Implementation:** Write the Next.js code section by section, ensuring the frontend gracefully handles empty data states from the CMS.
> 
> **5. Penalty Clause**
> Do not use placeholder images from random URLs unless explicitly told. Leave Next.js `<Image/>` tags ready to receive URLs from the Strapi backend. Do not introduce third-party UI libraries (like MUI or Chakra) unless explicitly requested; rely purely on Tailwind CSS.