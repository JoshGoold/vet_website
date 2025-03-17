"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const validateEmail = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!email) {
      setMessage("Please enter an email.");
      return;
    }

    try {
      const response = await fetch("https://veteran-api-for-kim.vercel.app/validate-email", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.Success) {
        setIsEmailValidated(true);
        setMessage("Email validated successfully!");
      } else {
        setMessage("Email is not valid.");
        setIsEmailValidated(false);
      }
    } catch (error) {
      console.error("Validation error:", error);
      setMessage("Server error occurred during email validation.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a valid .docx file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("File uploaded successfully!");
        setFile(null);
        setEmail(""); // Reset form
        setIsEmailValidated(false); // Reset validation state
      } else {
        setMessage(result.error || "Upload failed.");
      }
    } catch (error) {
      setMessage("An error occurred during upload.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">Submit Your Work</h2>

        {!isEmailValidated ? (
          <form onSubmit={validateEmail} className="space-y-4">
            <div>
              <label className="block text-gray-100 mb-2">Enter Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {message && (
              <p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200"
            >
              Validate Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-100 mb-2">Upload Word Document (.docx)</label>
              <input
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            {message && (
              <p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={!file}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </form>
        )}
      </div>
    </div>
  );
}