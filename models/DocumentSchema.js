const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true }, // e.g., "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  fileData: { type: Buffer, required: true }, // Store binary data
  size: { type: Number, required: true }, // File size in bytes
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Document || mongoose.model("Document", DocumentSchema);