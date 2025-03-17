import mongoose from "mongoose";
import Document from "@/models/DocumentSchema";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   await connectToDB()

    const stories = await Document.find({}).lean(); // Only fetch necessary fields
    if(!stories){
        return NextResponse.json({Success: false, Message: "No Completed Stories"}, {status: 404})
    }
    return  NextResponse.json({Message: "Stories fetched",stories, Success: true}, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "Server error fetching stories" }, { status: 500 });
  }
}