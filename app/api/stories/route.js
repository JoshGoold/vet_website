import mongoose from "mongoose";
import Document from "@/models/DocumentSchema";
import connectToDB from "@/utils/db";

export async function GET() {
  try {
   await connectToDB()

    const stories = await Document.find({}).lean(); // Only fetch necessary fields
    return new Response(JSON.stringify(stories), { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(JSON.stringify({ error: "Server error fetching stories" }), { status: 500 });
  }
}