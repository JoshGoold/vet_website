"use client";

import Loader from "@/components/Loader";
import React, { useState } from "react";
import Canada from "@/assets/canada-flag.png";
import Image from "next/image";

const Pending = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    material: "",
    link: "",
    summary: "",
    img: null, // Store the file object, not just the value
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormData((prev) => ({ ...prev, img: files[0] })); // Store the file object
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, img: e.dataTransfer.files[0] }));
      setErrors((prev) => ({ ...prev, img: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.material) newErrors.material = "Material type is required";
    if (!formData.link) newErrors.link = "Dropbox link is required";
    if (!formData.summary) newErrors.summary = "Summary is required";
    if (!formData.img) newErrors.img = "Cover image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    data.append("material", formData.material);
    data.append("link", formData.link);
    data.append("summary", formData.summary);
    data.append("img", formData.img);

    try {
      // Replace with your API endpoint
      const response = await fetch("https://veteran-api-for-kim.vercel.app/upload-material", {
        method: "POST",
        body: data,
      });
      
      const result = await response.json();
      if(result.Success){
        console.log("Upload successful:", result);
        alert("Upload successful")
      }
      
      // Reset form or show success message here
      setFormData({ material: "", link: "", summary: "", img: null });
    } catch (error) {
      console.error("Error uploading material:", error);
      setErrors({ submit: "Failed to upload material. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Image src={Canada} alt="Canada Flag" width={40} height={24} className="rounded" />
            Upload New Material
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Material Select */}
          <div>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Material to be Uploaded
              </option>
              <option value="News">News</option>
              <option value="Lesson">Lesson Plan</option>
              <option value="Story">Completed Story</option>
            </select>
            {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material}</p>}
          </div>

          {/* Dropbox Link */}
          <div>
            <input
              name="link"
              type="text"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter Dropbox Link Here"
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
          </div>

          {/* Summary */}
          <div>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter Summary of material here"
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
          </div>

          {/* Image Upload with Drag and Drop */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`w-full p-4 border-2 border-dashed rounded-lg text-center ${
              dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-600"
            }`}
          >
            <input
              type="file"
              name="img"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {formData.img ? (
                <p className="text-white">Selected: {formData.img.name}</p>
              ) : (
                <p className="text-gray-400">
                  Drag and drop an image here or{" "}
                  <span className="text-blue-500 hover:underline">click to upload</span>
                </p>
              )}
            </label>
            {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
          {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
        </form>
      </div>
    </div>
  );
};

export default Pending;