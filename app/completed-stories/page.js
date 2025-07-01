"use client";
import Alberta from "@/assets/Flags/Alberta.png";
import Newfoundland from "@/assets/Flags/Newfoundland.png";
import NovaScotia from "@/assets/Flags/Nova Scotia.png";
import Manitoba from "@/assets/Flags/Manitoba.png";
import PEI from "@/assets/Flags/Prince Edward Island.webp";
import Quebec from "@/assets/Flags/Quebec.png";
import Ontario from "@/assets/Flags/Ontario.png";
import Saskatchewan from "@/assets/Flags/Saskatchewan.png";
import NewBrunswick from "@/assets/Flags/New Brunswick.png";
import BritishColumbia from "@/assets/Flags/British Columbia.png";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

const CompletedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [viewState, setViewState] = useState("listProvinces");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [totals, setTotals] = useState({
    "Prince Edward Island": 0,
    "Alberta": 0,
    "Newfoundland": 0,
    "Nova Scotia": 0,
    "Manitoba": 0,
    "Quebec": 0,
    "Ontario": 0,
    "Saskatchewan": 0,
    "New Brunswick": 0,
    "British Columbia": 0,
  });

  const flags = {
    "Prince Edward Island": PEI,
    "Alberta": Alberta,
    "Newfoundland": Newfoundland,
    "Nova Scotia": NovaScotia,
    "Manitoba": Manitoba,
    "Quebec": Quebec,
    "Ontario": Ontario,
    "Saskatchewan": Saskatchewan,
    "New Brunswick": NewBrunswick,
    "British Columbia": BritishColumbia,
  };

  const provinces = new Set([
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-story", {
          method: "GET",
        });
        const data = await response.json();
        if (data.Success) {
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

  useEffect(() => {
    buildDocument();
  }, [stories]);

  function buildDocument() {
    const grouped = {};
    const provinceTotals = { ...totals };

    // Reset counts
    Object.keys(provinceTotals).forEach((province) => {
      provinceTotals[province] = 0;
    });

    stories.forEach((story) => {
      // Use veteran.from for location data
      const parts = story.veteran?.from.split(",") || ["Unknown City", "Unknown"];
      const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
      const region = parts[parts.length - 1].trim();

      if (provinces.has(region)) {
        if (!grouped[region]) {
          grouped[region] = {};
        }
        if (!grouped[region][city]) {
          grouped[region][city] = [];
        }
        grouped[region][city].push(story);
        provinceTotals[region] += 1;
      }
    });

    setGroupedData(grouped);
    setTotals(provinceTotals);
  }

  // Find the most recent story
  const mostRecentStory = stories.reduce((latest, story) => {
    if (!latest || new Date(story.createdAt) > new Date(latest.createdAt)) {
      return story;
    }
    return latest;
  }, null);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Completed Stories</h1>

        {viewState === "listProvinces" && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(totals)
              .sort()
              .map((region) => (
                <li
                  key={region}
                  title={`View ${region}`}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if(totals[region] > 0){
                    setSelectedProvince(region);
                    setViewState("listCities");
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{region}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        totals[region] < 5
                          ? "bg-gray-500"
                          : totals[region] < 10
                          ? "bg-blue-500"
                          : totals[region] < 20
                          ? "bg-purple-700"
                          : totals[region] < 50
                          ? "bg-green-500"
                          : "bg-green-700"
                      }`}
                    >
                      {totals[region] || 0}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Image
                      src={flags[region]}
                      height={40}
                      width={60}
                      alt={`${region} flag`}
                      className="rounded"
                    />
                  </div>
                </li>
              ))}
          </ul>
        )}

        {viewState === "listCities" && selectedProvince && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                alt={`${selectedProvince} flag`}
                height={80}
                width={120}
                src={flags[selectedProvince]}
                className="rounded"
              />
              <h2 className="text-xl font-semibold">
                {selectedProvince} - {totals[selectedProvince]} Stories
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <button
                onClick={() => {
                  if(totals[selectedProvince] > 0){
                  setViewState("listProvinces");
                  setSearchQuery("");
                  }
                }}
                className="border border-gray-600 text-gray-100 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Provinces
              </button>
              <input
                className="p-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search cities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <ul className="flex flex-col gap-3">
              {Object.keys(groupedData[selectedProvince])
                .filter((city) => city.toLowerCase().includes(searchQuery))
                .sort()
                .map((city) => (
                  <li
                    key={city}
                    title={`View ${city}`}
                    className="bg-gray-800 p-3 rounded-md hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchQuery("");
                      setViewState("showStories");
                    }}
                  >
                    {city} - {groupedData[selectedProvince][city].length}{" "}
                    {groupedData[selectedProvince][city].length === 1 ? "Story" : "Stories"}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {viewState === "showStories" && selectedProvince && selectedCity && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                alt={`${selectedProvince} flag`}
                height={80}
                width={120}
                src={flags[selectedProvince]}
                className="rounded"
              />
              <h2 className="text-xl font-semibold">
                {selectedProvince} | {selectedCity} | Total -{" "}
                {groupedData[selectedProvince][selectedCity].length}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <button
                onClick={() => {
                  setViewState("listCities");
                  setSearchQuery("");
                }}
                className="border border-gray-600 text-gray-100 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Cities
              </button>
              <input
                className="p-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by summary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {groupedData[selectedProvince][selectedCity]
                .filter((story) =>
                  story.summary.toLowerCase().includes(searchQuery)
                )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date, newest first
                .map((story) => (
                  <div
                    key={story._id}
                    className={`bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow ${
                      mostRecentStory?._id === story._id
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    {story.img && (
                      <Image
                        src={`data:image/jpeg;base64,${Buffer.from(story.img).toString(
                          "base64"
                        )}`}
                        alt={story.summary}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    )}
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {story.summary}
                    </h2>
                    <p className="text-gray-300 mb-2">
                      <strong>Veteran:</strong>{" "}
                      {story.veteran.name.substring(0, story.veteran.name.length - 1).split(", ")[1]}{" "}
                      {story.veteran.name
                        .substring(0, story.veteran.name.length - 1)
                        .split(", ")[0]}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Location:</strong> {story.veteran.from}
                    </p>
                    <a
                      href={story.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Read Story
                    </a>
                    <p className="text-gray-400 text-sm mt-2">
                      Published: {new Date(story.createdAt).toLocaleDateString()}
                    </p>
                    {mostRecentStory?._id === story._id && (
                      <p className="text-blue-400 text-sm font-bold mt-2">
                        Most Recent Story
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedStories;