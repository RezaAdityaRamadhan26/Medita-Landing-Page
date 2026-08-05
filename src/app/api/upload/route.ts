import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const section = (formData.get("section") as string) || "general";
    const cleanSection = section.replace(/[^a-zA-Z0-9_-]/g, "");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";

    // Always convert uploaded images to Base64 Data URL regardless of local development or serverless deployment.
    // This ensures that when an image is uploaded on localhost, the actual image string is stored inside the online database,
    // allowing the deployed Vercel application to display the exact same image immediately without throwing 404 errors for local filesystem paths!
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // Optionally attempt saving to local disk during local development purely for local reference/debugging, without affecting the return URL
    try {
      if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${timestamp}-${originalName}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads", cleanSection);
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, fileName), buffer);
      }
    } catch {
      // Ignore local file saving errors
    }

    return NextResponse.json({ url: dataUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
