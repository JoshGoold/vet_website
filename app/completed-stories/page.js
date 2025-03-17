"use client";

import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";

const CompletedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stories from the API on mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/stories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        if(!data.Success){
            return;
        }
        setStories(data.stories);
      } catch (err) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Handle file download
  const handleDownload = async (id, filename) => {
    try {
      const response = await fetch(`/api/download/${id}`);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading file: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Completed Stories</h1>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : stories.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No stories have been completed yet.</p>
        ) : (
          <ul className="space-y-4">
            {stories.map((story) => (
              <li
                key={story._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg">{story.filename}</span>
                <button
                  onClick={() => handleDownload(story._id, story.filename)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedStories;