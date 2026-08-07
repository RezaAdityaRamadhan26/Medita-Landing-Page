# 📋 Blazz Documentation Standards

**Version:** 2.0 | **Updated:** 2026-01-09

---

## 🎯 Prinsip Utama

| # | Prinsip | Penjelasan |
|---|---------|------------|
| 1 | **Satu topik = Satu dokumen** | Konsolidasi, jangan fragmentasi |
| 2 | **Self-contained** | Pembaca tidak perlu buka dokumen lain |
| 3 | **Codebase verification** | Cross-check ke codebase sebelum deprecated |
| 4 | **Bahasa Indonesia** | Istilah teknis tetap dalam English |
| 5 | **No Hardcoded Secrets** | Gunakan env vars atau referensi Doppler |

### Codebase Verification
```bash
# WAJIB sebelum deprecated - cek apakah pattern masih dipakai
grep -r "ClassName" app/
```
> ⚠️ **JANGAN** deprecated hanya karena terlihat lama. Verifikasi dulu!

---

## 📁 File Naming & Header

### Naming Format
```
[seq]-[YYYYMMDD]-[topic-description].md
```

**Contoh:** `01-20260109-qr-timeout-fix.md`

**Rules:** Lowercase • Sequential 2-digit • YYYYMMDD • Dash separator

### Header Template
```markdown
**Status:** 🟢 Active | ✅ Solved | ⚠️ Deprecated

# Judul Dokumen

**Topic:** qr / session / campaign / deployment / whatsapp  
**Updated:** YYYY-MM-DD  
**Tags:** #tag1 #tag2  
**Supersedes:** [Link jika deprecated]

---

## Overview
[Deskripsi singkat dokumen]
```

### Common Tags
```
#qr #session #campaign #whatsapp #deployment #bug #fix #performance #timeout #database
```

---

## 📊 Status & Lifecycle

| Status | Kapan Digunakan |
|--------|-----------------|
| 🟢 **Active** | Ongoing, belum selesai |
| ✅ **Solved** | Issue fixed, masih relevan untuk referensi |
| ⚠️ **Deprecated** | Ada dokumen lebih baru (tetap di folder asli) |

### Lifecycle Rules
- **HAPUS** → Jika 100% sudah diakomodir di dokumen baru
- **DEPRECATED** → Jika perlu historical reference, issue mungkin berulang
- **SOLVED** → Jika fix permanent dan masih berguna untuk referensi

> Dokumen deprecated **tetap di folder asli** dengan status marking.

---

## 🔐 Security Rules

**NEVER** include dalam dokumentasi:
- Passwords, API keys, tokens
- APP_KEY, JWT secrets, HMAC keys
- Database/Redis URLs dengan password
- Connection strings dengan credentials

### ✅ Safe Patterns
```bash
# Environment variable
LARAVEL_URL=http://${STAGING_USER}:${STAGING_PASSWORD}@${STAGING_HOST}

# Doppler reference
doppler secrets get KEY_NAME --project blazz --config stg --plain

# Placeholder
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@<HOST>/<DATABASE>
```

### Jika Accidentally Commit Secrets
1. **STOP** - Jangan push
2. **Report** ke team lead
3. **Rotate** secret immediately via Doppler
4. **Remove** dari git history dengan `git filter-repo`

---

## 📂 Folder Structure

```
/docs/
├── DOCUMENTATION-STANDARDS.md
├── architecture/          # System design & decisions
├── features/              # Per-feature documentation
│   ├── campaign/
│   ├── whatsapp/
│   └── [feature]/
├── issues/                # Bugs & fixes (by topic)
│   ├── qr/
│   ├── session/
│   └── [topic]/
├── guides/                # How-to guides
├── deployment/            # Deploy documentation
└── references/            # API docs, configs
```

### Root Directory Clean Rules
**Hanya boleh di root:**
- `artisan`, `composer.json`, `package.json`
- `*.config.js`, `*.sh`, `doppler.json`
- `phpunit.xml`, `README.md`

**Pindahkan ke folder yang tepat:**
- Test scripts → `tests/scripts/`
- Debug scripts → hapus atau `scripts/`
- Verification scripts → `tests/scripts/`

---

## 🔄 Workflow

### Development Phase
Buat dokumen terpisah saat riset/analisa/implementasi → **OK**

### Consolidation Phase
```
User: "gabungkan, buat compact"
├── Baca semua dokumen terkait
├── Tulis 1 dokumen utama
├── Pertahankan substansi, hilangkan redundansi
└── HAPUS dokumen lama yang sudah diakomodir
```

### ⏱️ Consolidation Rules: Timeline Order

**WAJIB** saat menggabungkan multiple dokumen/issue:

1. **Susun chronological** - Issue paling awal di atas, terbaru di bawah
2. **Sertakan tanggal** - Setiap issue/event harus ada tanggalnya
3. **Buat timeline jelas** - Pembaca harus paham urutan kejadian

#### Format Consolidated Document
```markdown
# [Topic] - Consolidated Issues

## Overview
Ringkasan masalah dan solusi final.

## Timeline

### 1. [YYYY-MM-DD] Issue Pertama
**Problem:** Deskripsi masalah awal
**Root Cause:** Penyebab
**Solution:** Apa yang dilakukan
**Status:** ✅ Solved

### 2. [YYYY-MM-DD] Issue Kedua  
**Problem:** Masalah berikutnya
**Root Cause:** Penyebab
**Solution:** Apa yang dilakukan
**Status:** ✅ Solved

### 3. [YYYY-MM-DD] Issue Terbaru
**Problem:** Masalah terkini
**Root Cause:** Penyebab
**Solution:** Apa yang dilakukan
**Status:** 🟢 Active / ✅ Solved

## Final Solution
Solusi akhir yang menyelesaikan semua issue.

## Files Changed
- path/to/file1
- path/to/file2
```

#### Contoh Timeline Table (Alternatif)
```markdown
## Issue Timeline
| # | Date | Issue | Root Cause | Status |
|---|------|-------|------------|--------|
| 1 | 2025-11-15 | QR timeout 30s | Puppeteer config | ✅ Solved |
| 2 | 2025-12-01 | QR gagal generate | Missing Doppler key | ✅ Solved |
| 3 | 2026-01-05 | QR blank image | Browser crash | ✅ Solved |
```

> 💡 **Benefit:** Dengan timeline, pembaca langsung paham evolusi masalah dan solusinya tanpa harus baca dokumen terpisah.

### Document Structure (Single Issue)
```markdown
# [Topic] - [Deskripsi]

## Problem
## Root Cause
## Solution
## Files Changed
## Verification
```

---

## ✅ Final Checklist

Sebelum commit dokumentasi:

- [ ] Header lengkap (Status, Topic, Updated, Tags)
- [ ] Overview section ada
- [ ] **Tidak ada secrets/credentials**
- [ ] Tidak redundant dengan dokumen lain
- [ ] Root directory clean (no temp scripts)
- [ ] Codebase verified sebelum deprecated

---

**Panduan ini untuk maintainability. Fleksibel, bukan kaku.**

