// app/portal/_components/Pending.jsx
"use client";

import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";

const Pending = ({ setStor }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/stories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        if (!data.Success) {
          setStories([]);
          return;
        }
        setStories(data.stories);
        setStor(data.stories); // Update parent state
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [setStor]);

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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Pending Submissions</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Awaiting Review: <span className="text-blue-400 font-semibold">{stories.length}</span>
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-400 text-lg">Error: {error}</p>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400 mb-4">No research submissions are pending review.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {stories.map((story) => (
              <li
                key={story._id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-700 transition-colors shadow-md"
              >
                <span className="text-lg text-white font-medium truncate">{story.filename}</span>
                <button
                  onClick={() => handleDownload(story._id, story.filename)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors w-full sm:w-auto"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {stories.length > 0 && (
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Data updated: {new Date().toLocaleDateString()}</p>
          <p>{stories.length} submissions pending approval</p>
        </div>
      )}
    </div>
  );
};

export default Pending;