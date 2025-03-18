// app/portal/_components/Research.jsx
"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import Canada from "@/assets/canada-flag.png";
import Link from "next/link";

const Research = () => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-all-selected", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.Success) {
          setSelections(data.Data);
        } else {
          alert(data.Message);
        }
      } catch (error) {
        console.error("Error fetching selected veterans:", error);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-2">
          <Image src={Canada} alt="Canada Flag" width={40} height={24} className="rounded" />
          Active Research
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Currently Researched Veterans: <span className="text-blue-400 font-semibold">{selections.length}</span>
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {selections.length > 0 ? (
          <div className="space-y-4">
            {selections.map((selection, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Researcher Info */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white">
                      Researcher: <span className="text-gray-300">{selection?.name || "Unknown"}</span>
                    </h2>
                    <p>
                      <a
                        href={`mailto:${selection?.email || ""}`}
                        className="inline-block bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm"
                      >
                        Contact Researcher
                      </a>
                    </p>
                  </div>

                  {/* Veteran Info */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white">
                      Veteran: <span className="text-gray-300">{selection?.veteran?.name || "Unknown"}</span>
                    </h2>
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {selection?.veteran?.full_description || "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400 mb-4">
              No veterans are currently being researched.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {selections.length > 0 && (
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Data updated: {new Date().toLocaleDateString()}</p>
          <p>Active research efforts on {selections.length} veterans</p>
        </div>
      )}
    </div>
  );
};

export default Research;