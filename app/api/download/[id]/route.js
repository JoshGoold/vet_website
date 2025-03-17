import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Document from "@/models/DocumentSchema";
import connectToDB from "@/utils/db";

export async function GET(req, { params }) {
  const { id } = params; // Extract id from dynamic route params

  try {
    await connectToDB();

    const doc = await Document.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Return the binary file data with appropriate headers
    return new NextResponse(doc.fileData, {
      status: 200,
      headers: {
        "Content-Type": doc.contentType,
        "Content-Disposition": `attachment; filename="${doc.filename}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Server error during download", details: error.message },
      { status: 500 }
    );
  }
}