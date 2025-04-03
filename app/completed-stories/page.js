"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

const CompletedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-story", {method: "GET"}); // Adjust URL as needed
        const data = await response.json();
        if(data.Success){
          setStories(data.Stories);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Completed Stories</h1>
        {stories.length === 0 ? (
          <p className="text-lg text-gray-400 text-center">
            No stories have been completed yet. Check back later!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                {story.img && (
                  <Image
                    src={`data:image/jpeg;base64,${Buffer.from(story.img).toString("base64")}`}
                    alt={story.summary}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-white mb-2">{story.summary}</h2>
                <a
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read Story
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  Completed: {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedStories;