import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, message, captchaToken } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Mohon lengkapi semua kolom yang wajib diisi." },
        { status: 400 }
      );
    }

    // 1. Dapatkan Alamat IP Client
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    // 2. IP Rate Limiting: Maksimal 5 kali pengiriman per IP
    const submissionCount = await prisma.contactSubmission.count({
      where: { ipAddress },
    });

    if (submissionCount >= 5) {
      return NextResponse.json(
        {
          error:
            "Batas maksimal pengiriman email telah habis. Alamat IP ini sudah mencapai batas 5 kali pengiriman pesan.",
        },
        { status: 429 }
      );
    }

    // 3. Verifikasi Google reCAPTCHA (Jika Kunci Rahasia Dikonfigurasi di .env)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!captchaToken) {
        return NextResponse.json(
          { error: "Silakan selesaikan verifikasi reCAPTCHA terlebih dahulu." },
          { status: 400 }
        );
      }

      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}&remoteip=${ipAddress}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success) {
        return NextResponse.json(
          { error: "Verifikasi keamanan reCAPTCHA tidak valid. Silakan coba lagi." },
          { status: 400 }
        );
      }
    }

    // 4. Konfigurasi & Pengiriman SMTP via Nodemailer
    const smtpUser = process.env.SMTP_USER || "meditasolusi@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 3px solid #1A1A1A; border-radius: 16px; background-color: #F4F6E6; color: #1A1A1A;">
          <h2 style="margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #1A1A1A; color: #1A1A1A; font-size: 20px;">
            📬 Pesan Konsultasi Baru
          </h2>
          <div style="margin-bottom: 16px;">
            <p style="margin: 8px 0;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email Client:</strong> <a href="mailto:${email}" style="color: #0076FF; text-decoration: underline;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Layanan Diminta:</strong> <span style="background-color: #DCE399; padding: 2px 8px; border-radius: 4px; border: 1px solid #1A1A1A; font-weight: bold;">${service}</span></p>
            <p style="margin: 8px 0;"><strong>Alamat IP Client:</strong> <code style="background-color: #E2E8F0; padding: 2px 6px; border-radius: 4px;">${ipAddress}</code> (Pengiriman ke-${submissionCount + 1}/5)</p>
          </div>
          
          <div style="background-color: #FFFFFF; padding: 16px; border: 2px solid #1A1A1A; border-radius: 12px; margin-top: 16px;">
            <strong style="display: block; margin-bottom: 8px; color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Isi Pesan:</strong>
            <p style="white-space: pre-line; margin: 0; font-size: 15px; line-height: 1.6; color: #1A1A1A;">${message}</p>
          </div>
          
          <div style="margin-top: 24px; font-size: 11px; text-align: center; color: #64748B; border-top: 1px solid #CBD5E1; pt: 12px;">
            Email otomatis dikirim melalui Nodemailer SMTP Medita Solusi Digital Landing Page.
          </div>
        </div>
      `;

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`,
        replyTo: email,
        to: "meditasolusi@gmail.com",
        subject: `[Website Lead] ${service} - dari ${name}`,
        html: htmlContent,
      };

      // 1. Percobaan Pertama: Jalur Port 465 (SMTPS SSL Modern)
      const primaryTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 10000,
      });

      try {
        await primaryTransporter.sendMail(mailOptions);
      } catch (primaryErr) {
        console.warn("Jalur Port 465 terputus, beralih ke jalur cadangan Port 587 (STARTTLS)...", primaryErr);
        // 2. Percobaan Cadangan Otomatis: Jalur Port 587 (STARTTLS)
        const backupTransporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: { user: smtpUser, pass: smtpPass },
          connectionTimeout: 10000,
        });
        await backupTransporter.sendMail(mailOptions);
      }
    } else {

      // Dalam mode lokal jika SMTP_PASS belum ditaruh di .env
      console.log(`[Dev Simulation] Email dari ${email} akan dikirim ke meditasolusi@gmail.com`);
    }

    // 5. Simpan catatan pengiriman IP di database setelah berhasil
    await prisma.contactSubmission.create({
      data: {
        ipAddress,
        email,
      },
    });

    return NextResponse.json(
      { success: true, message: "Pesan Anda berhasil dikirim ke Medita Solusi Digital!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    const errorDetails = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Terjadi kendala server saat mengirim email (${errorDetails}). Silakan hubungi kami via WhatsApp atau pastikan server terminal telah di-restart.` },
      { status: 500 }
    );
  }
}

