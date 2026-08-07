import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { mockArticles, mockCaseStudies, mockTestimonials, mockLandingPage, mockGlobal } from '../src/data/mock';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin Users (with 2FA access)
  const adminUsers = [
    { email: 'rezaadityaa26@gmail.com', name: 'Reza Aditya' },
    { email: 'meditasolusi@gmail.com', name: 'Medita Solusi Admin' },
    { email: 'admin@gmail.com', name: 'Administrator' },
    { email: 'fikri.adie04@gmail.com', name: 'Fikri Adie' },
  ];
  const passwordHash = await bcrypt.hash('admin123', 10);

  for (const admin of adminUsers) {
    const existingAdmin = await prisma.user.findUnique({ where: { email: admin.email } });
    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          email: admin.email,
          passwordHash,
          name: admin.name,
        },
      });
      console.log(`Created admin user: ${admin.email} / admin123`);
    } else {
      await prisma.user.update({
        where: { email: admin.email },
        data: { passwordHash, name: admin.name },
      });
      console.log(`Updated admin user: ${admin.email} / admin123`);
    }
  }

  // 2. Seed Articles
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    for (const article of mockArticles) {
      await prisma.article.create({
        data: {
          title: article.title || "",
          slug: article.slug || "",
          coverImage: article.cover_image || "",
          category: article.category || "",
          readTime: article.read_time || "",
          content: article.content || "",
          excerpt: article.excerpt || "",
          publishedAt: new Date(article.publishedAt || new Date()),
        },
      });
    }
    console.log(`Seeded ${mockArticles.length} articles`);
  }

  // 3. Seed Case Studies
  const caseStudyCount = await prisma.caseStudy.count();
  if (caseStudyCount === 0) {
    for (const cs of mockCaseStudies) {
      await prisma.caseStudy.create({
        data: {
          title: cs.title || "",
          slug: cs.slug || "",
          categoryTag: cs.category_tag || "",
          summary: cs.summary || "",
          thumbnail: cs.thumbnail || "",
          link: cs.link || "",
        },
      });
    }
    console.log(`Seeded ${mockCaseStudies.length} case studies`);
  }

  // 4. Seed Testimonials
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    for (const t of mockTestimonials) {
      await prisma.testimonial.create({
        data: {
          clientName: t.client_name || "",
          role: t.role || "",
          avatar: t.avatar || "",
          rating: t.rating || 5,
          quote: t.quote || "",
        }
      });
    }
    console.log(`Seeded ${mockTestimonials.length} testimonials`);
  }

  // 5. Seed Services
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    for (const s of mockLandingPage.service_cards) {
      await prisma.service.create({
        data: {
          image: s.image || "",
          title: s.title || "",
          description: s.description || "",
          link: s.link || "",
          color: s.color || "",
        }
      });
    }
    console.log(`Seeded ${mockLandingPage.service_cards.length} services`);
  }

  // 6. Seed Features
  const featureCount = await prisma.feature.count();
  if (featureCount === 0) {
    for (const f of mockLandingPage.feature_list) {
      await prisma.feature.create({
        data: {
          icon: f.icon || "",
          title: f.title || "",
          description: f.description || "",
        }
      });
    }
    console.log(`Seeded ${mockLandingPage.feature_list.length} features`);
  }

  // 7. Seed Global Settings
  const settingCount = await prisma.setting.count();
  if (settingCount === 0) {
    const settingsToCreate = [
      { key: "site_name", value: mockGlobal.site_name },
      { key: "hero_badge_text", value: mockLandingPage.hero_badge_text || "" },
      { key: "hero_heading_title", value: mockLandingPage.hero_heading_title || "" },
      { key: "hero_description", value: mockLandingPage.hero_description || "" },
      { key: "cta_button_text", value: mockLandingPage.cta_button_text || "" },
      { key: "about_title", value: mockLandingPage.about_title || "" },
      { key: "about_description", value: mockLandingPage.about_description || "" },
      { key: "service_title", value: mockLandingPage.service_title || "" },
      { key: "service_description", value: mockLandingPage.service_description || "" },
      { key: "form_title", value: mockLandingPage.form_title || "" },
      { key: "form_subtitle", value: mockLandingPage.form_subtitle || "" },
      { key: "form_button_text", value: mockLandingPage.form_button_text || "" },
      { key: "cta_banner_title", value: mockGlobal.cta_banner_title || "" },
      { key: "cta_banner_description", value: mockGlobal.cta_banner_description || "" },
      { key: "cta_banner_button_text", value: mockGlobal.cta_banner_button_text || "" },
      { key: "footer_tagline", value: mockGlobal.footer_tagline || "" },
      { key: "copyright_text", value: mockGlobal.copyright_text || "" },
    ];
    for (const setting of settingsToCreate) {
      await prisma.setting.create({ data: setting });
    }
    console.log(`Seeded ${settingsToCreate.length} global settings`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
