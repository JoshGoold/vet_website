"use client";

import Loader from "@/components/Loader";
import React, { useState } from "react";
import Canada from "@/assets/canada-flag.png";
import Image from "next/image";

const Pending = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([])
  const [selectedVeteran, setSelectedVeteran] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    resultsPerPage: 20,
  });

  const [catalog, setCatalog] = useState(false)
  const [query, setQuery] = useState("")
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
    if(formData.material === "Story" && selectedVeteran){
      data.append("vet", selectedVeteran._id)
    }

    try {
      if(formData.material === "Story" && selectedVeteran === null){
        return alert("Please select a veteran associated with the completed story.")
      }
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

  async function searchVeteran(page = 1) {
    if (!query) {
      alert("Please enter a search query");
      return;
    }

    try {
      const response = await fetch("https://veteran-api-for-kim.vercel.app/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query, page, limit: 20 }),
      });
      const data = await response.json();

      if (!data.Success) {
        alert(data.Message);
        return;
      }

      setResults(data.Data);
      setPagination(data.Pagination);
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to fetch results. Please try again.");
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      searchVeteran(newPage);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative">


       {catalog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="text-black hover:text-gray-700 text-2xl"
                onClick={() => setCatalog(false)}
              >
                ×
              </button>
            </div>

            {/* Search Input and Button */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                className="p-2 rounded border text-black flex-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Veteran Name"
              />
              <button
                className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                onClick={() => searchVeteran(1)}
              >
                Search
              </button>
            </div>

            {/* Veteran Selection Dropdown */}
            <div className="mb-4">
              {results.length === 0 ? (
                <p className="text-black">No results found.</p>
              ) : (
                <select
                  className="w-full p-2 text-black border rounded"
                  value={selectedVeteran?._id || ""}
                  onChange={(e) => {
                    const veteran = results.find((v) => v._id === e.target.value);
                    setSelectedVeteran(veteran || null);
                  }}
                >
                  <option className="text-black" value="">Select a Veteran</option>
                  {results.map((veteran) => (
                    <option className="text-black" key={veteran._id} value={veteran._id}>
                      {veteran.name} ({veteran.from})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Selected Veteran Details */}
            {selectedVeteran && (
              <div className="text-black border p-4 rounded bg-gray-50 mb-4">
                <h3 className="font-semibold text-lg mb-2">{selectedVeteran.name}</h3>
                <p><strong>From:</strong> {selectedVeteran.from}</p>
                <p><strong>Date of Death:</strong> {selectedVeteran.death}</p>
                <p><strong>Squadron:</strong> {selectedVeteran.squadron}</p>
                <p><strong>Inscribed:</strong> {selectedVeteran.inscribed}</p>
                <p><strong>Grave:</strong> {selectedVeteran.grave}</p>
                <p><strong>Taken:</strong> {selectedVeteran.taken ? "Yes" : "No"}</p>
                <p><strong>Full Description:</strong> {selectedVeteran.full_description}</p>
                <p className="bg-green-500 text-white p-3 mt-3">You have Selected {selectedVeteran.name}</p>
              </div>
            )}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-between items-center">
                <button
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages} (
                  {pagination.totalResults} results)
                </span>
                <button
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === pagination.totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}


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

          {/* Veteran Select */}
          {formData.material === "Story" && (
            <div className="p-2 bg-gray-700 border-gray-600 rounded">
              <div className="flex justify-between items-center">
                {selectedVeteran === null ? (
                  <>
                  <h1>Select a Veteran</h1>
                  <button onClick={()=> setCatalog(prev=> !prev)} className="bg-blue-500 p-2 rounded">Search Catalog</button>
                  </>
                ): (
                  <h1>{selectedVeteran.name}</h1>
                )}
                
              </div>
            </div>
          )}

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