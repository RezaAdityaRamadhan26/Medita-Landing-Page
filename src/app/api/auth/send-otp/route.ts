import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Mohon isi email dan password Anda." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    // Generate 6-digit verification code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode,
        otpExpiresAt,
      },
    });

    // Console log for local dev debugging or if SMTP isn't configured
    console.log("=========================================");
    console.log(`🔑 [2FA OTP CODE] untuk ${email}: ${otpCode}`);
    console.log("=========================================");

    // Send via Nodemailer if SMTP is configured
    const smtpUser = process.env.SMTP_USER || "meditasolusi@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 28px; border: 3px solid #1A1A1A; border-radius: 16px; background-color: #F4F6E6; color: #1A1A1A;">
          <h2 style="margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #1A1A1A; color: #1A1A1A; font-size: 20px; font-weight: 800;">
            Kode Verifikasi Login Admin
          </h2>
          <p style="font-size: 15px; line-height: 1.6; margin: 16px 0; color: #1A1A1A;">
            Halo <strong>${user.name || "Tim Medita"}</strong>,
          </p>
          <p style="font-size: 15px; line-height: 1.6; margin: 16px 0; color: #334155;">
            Ada percobaan login baru ke halaman admin Medita Solusi Digital menggunakan email <strong>${email}</strong>.
          </p>
          <p style="font-size: 15px; line-height: 1.6; margin: 16px 0; color: #334155;">
            Gunakan 6 angka di bawah ini untuk menyelesaikan proses login:
          </p>
          <div style="background-color: #FFFFFF; padding: 20px; border: 3px solid #1A1A1A; border-radius: 12px; margin: 24px 0; text-align: center;">
            <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #0076FF;">${otpCode}</span>
          </div>
          <p style="font-size: 13px; color: #64748B; line-height: 1.5; margin-top: 16px;">
            Kode ini aktif selama 10 menit ke depan. Kalau kamu tidak merasa melakukan login ini, kamu bisa abaikan email ini atau segera ganti password akunmu untuk keamanan.
          </p>
          <p style="font-size: 14px; color: #334155; margin-top: 24px; margin-bottom: 0;">
            Salam hangat,<br />
            <strong>Tim Medita Solusi Digital</strong>
          </p>
          <div style="margin-top: 24px; padding-top: 16px; font-size: 11px; text-align: center; color: #64748B; border-top: 1px solid #CBD5E1;">
            Email otomatis dari sistem keamanan dashboard Medita Solusi Digital.
          </div>
        </div>
      `;

      const mailOptions = {
        from: `"Medita Solusi Digital" <${smtpUser}>`,
        to: email,
        subject: `Kode Verifikasi Login (${otpCode}) - Medita Solusi Digital`,
        html: htmlContent,
      };

      const primaryTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 10000,
      });

      try {
        const info = await primaryTransporter.sendMail(mailOptions);
        console.log(`✅ [2FA Email Sent] Sukses dikirim via Port 465 ke ${email} (ID: ${info.messageId})`);
      } catch (primaryErr) {
        console.warn("Jalur Port 465 terputus, mencoba jalur cadangan Port 587 (STARTTLS)...", primaryErr);
        const backupTransporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: { user: smtpUser, pass: smtpPass },
          connectionTimeout: 10000,
        });
        const info = await backupTransporter.sendMail(mailOptions);
        console.log(`✅ [2FA Email Sent] Sukses dikirim via Port 587 ke ${email} (ID: ${info.messageId})`);
      }
    } else {
      console.log(`[Dev Mode - Tanpa SMTP_PASS di .env] Email simulasi ke ${email}: Kode Anda adalah ${otpCode}`);
    }

    return NextResponse.json({ success: true, message: "Kode OTP dikirim ke email." }, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat memproses login." },
      { status: 500 }
    );
  }
}
