"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-news", {method: "GET"}); // Adjust URL as needed
        const data = await response.json();
        if(data.Success){
          setNewsItems(data.News);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
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
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">News</h1>
        {newsItems.length === 0 ? (
          <p className="text-lg text-gray-400 text-center">
            No news items have been uploaded yet. Stay tuned!
          </p>
        ) : (
          <div className="space-y-6">
            {newsItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4 hover:shadow-xl transition-shadow"
              >
                {item.img && (
                  <Image
                    src={`data:image/jpeg;base64,${Buffer.from(item.img).toString("base64")}`}
                    alt={item.summary}
                    width={200}
                    height={150}
                    className="w-full md:w-48 h-36 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{item.summary}</h2>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </a>
                  <p className="text-gray-400 text-sm mt-2">
                    Posted: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;