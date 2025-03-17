import mongoose from "mongoose";
import Document from "@/models/DocumentSchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const doc = await Document.findById(id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Set headers for file download
    res.setHeader("Content-Type", doc.contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${doc.filename}"`);
    res.send(doc.fileData); // Send binary data
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ error: "Server error during download" });
  }
}