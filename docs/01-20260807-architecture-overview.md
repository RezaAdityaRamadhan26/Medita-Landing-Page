**Status:** 🟢 Active

# Architecture Overview: Next.js + Strapi Headless CMS

**Topic:** architecture / tech-stack / headless-cms  
**Updated:** 2026-08-07  
**Tags:** #architecture #strapi #nextjs #headless #migration

---

## Overview
Dokumen ini menjelaskan perombakan arsitektur proyek Medita Landing Page dari monolithic Next.js + Prisma menjadi arsitektur **Pure Headless CMS** menggunakan kombinasi **Next.js (Frontend)** dan **Strapi v5 (Backend)**. 

Keputusan ini diambil untuk memenuhi requirement proyek yang menetapkan Strapi sebagai standar pembuatan landing page, mengutamakan kemudahan manajemen konten (CMS), serta pemisahan tegas (decoupling) antara kode presentasi dan data.

---

## 🏗 Struktur Arsitektur Baru

### 1. Frontend (Wajah Utama)
- **Teknologi:** Next.js (App Router), Tailwind CSS
- **Lokasi:** Folder *root* proyek (kecuali `/backend`)
- **Peran:** Bertanggung jawab murni pada presentasi UI dan *User Experience* pengunjung (Landing Page).
- **Data Fetching:** Menggunakan metode REST API (fetch) ke server Strapi. Tidak ada koneksi langsung ke database.
- **Kondisi Khusus:** Seluruh *dashboard custom admin* (`/admin` Next.js) beserta login OTP-nya telah **DIHAPUS** untuk mencegah tumpang tindih fitur dengan CMS.

### 2. Backend (Dapur & Manajemen Konten)
- **Teknologi:** Strapi v5 CMS (Node.js), SQLite (Local)
- **Lokasi:** `/backend`
- **Peran:** Menjadi *Single Source of Truth* untuk semua konten website, sistem manajemen media, dan kontrol hak akses (*Role-Based Access Control*).
- **Content-Types:**
  - `Article` (Artikel Blog)
  - `Service` (Layanan Utama)
  - `CaseStudy` (Portofolio/Studi Kasus)
  - `Testimonial` (Ulasan Klien)
  - `Feature` (Fitur Tambahan)
  - `Setting` (Pengaturan Global Website)

---

## 🛠 Panduan Menjalankan Proyek Secara Lokal

Karena arsitektur kini terbagi menjadi Frontend dan Backend terpisah, keduanya harus dijalankan secara bersamaan saat pengembangan (*development*).

### Terminal 1: Menjalankan Backend (Strapi)
```bash
cd backend
npm run develop
```
- Server backend akan berjalan di `http://localhost:1337`.
- **Dashboard Admin:** `http://localhost:1337/admin`.
- Digunakan untuk menambah, mengedit, atau menghapus artikel dan konten lainnya.

### Terminal 2: Menjalankan Frontend (Next.js)
```bash
# Di folder root proyek
npm run dev
```
- Server frontend akan berjalan di `http://localhost:3000`.
- Membutuhkan `.env` dengan variabel `NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337`.

---

## 🔐 Manajemen Roles (Admin & Editor)
Dengan menggunakan Strapi, logika *Role-Based Access Control* dikendalikan penuh oleh Admin Panel Strapi (bukan melalui koding manual Next.js).
- **Super Admin:** Mengelola pengaturan Strapi, membuat skema, dan menambah *user* (termasuk *Editor*).
- **Editor:** Akun yang dibuat oleh Admin untuk tim *content writer*. Mereka hanya memiliki akses ke menu pengelolaan konten (menulis artikel, mempublikasi studi kasus) tanpa kemampuan mengubah struktur website atau menambah user lain.
- **Public:** Digunakan oleh Next.js untuk menarik data (melalui HTTP GET). Pengaturan izin *find* dan *findOne* untuk API publik harus senantiasa diaktifkan di menu *Settings > Roles (Users & Permissions)*.

---

## 🗑 Mengapa Prisma & Dashboard Admin Next.js Dihapus?
1. **Redundansi:** Strapi sudah menyediakan antarmuka (dashboard) manajemen konten tercanggih di industri (*Rich Text, Media Library, Date Pickers*). Membangun ulang fitur tersebut di dalam Next.js sangat membuang waktu dan biaya *maintenance*.
2. **Kepatuhan Kebutuhan (Requirements):** Mengikuti standar baku *tech stack* yang telah ditetapkan untuk project, yaitu menjadikan Strapi sebagai sentral manajemen.
3. **Keterbatasan Vercel & SQLite:** Memaksa fitur CMS berat di Next.js dengan serverless SQLite tidak ideal. Strapi dirancang khusus untuk memikul beban operasional manajemen data tersebut.

## 📝 Catatan Penting
- Jangan pernah menulis ulang form admin di folder `/src/app/admin`. Semua logika input konten harus dipusatkan ke `http://localhost:1337/admin`.
- Segala penambahan tipe konten baru (misal: "Team Member") harus dilakukan melalui *Content-Type Builder* di Dashboard Strapi, yang secara otomatis akan membuka rute API `/api/team-members` untuk digunakan Next.js.
