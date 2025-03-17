import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Document from "@/models/DocumentSchema";
import connectToDB from "@/utils/db";

export async function POST(req) {
  await connectToDB();

  try {
    // Parse multipart form data using Next.js built-in method
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return NextResponse.json({ error: "Only .docx files are allowed" }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Save to MongoDB
    const doc = new Document({
      filename: file.name,
      contentType: file.type,
      fileData: fileBuffer,
      size: file.size,
    });
    await doc.save();

    return NextResponse.json({ message: "File uploaded successfully", id: doc._id }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Server error during upload", details: error.message },
      { status: 500 }
    );
  }
}