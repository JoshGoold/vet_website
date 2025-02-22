"use client";
import Form from "@/components/Form";
import Loader from "@/components/Loader"; // Import Loader
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [formState, setFormState] = useState(false);
  const [viewState, setViewState] = useState("listProvinces");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedVeteran, setSelectedVeteran] = useState({});
  const [groupedData, setGroupedData] = useState({});
  const [searchQuery, setSearchQuery] = useState("")

  const provinces = new Set([
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  ]);

  const territories = new Set(["Northwest Territories", "Nunavut", "Yukon"]);

  const handleClick = (boolean, veteran, index) => {
    if (boolean) {
      return alert("This Veteran has already been taken");
    }
    setFormState(true);
    setSelectedVeteran({...veteran, index});
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-all-data", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.Success) {
          setData(data.Data);
        } else {
          alert(data.Message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    buildDocument();
  }, [data]);

  function buildDocument() {
    const grouped = { Territories: {} };
    const nonCanadian = {};

    data.forEach((doc) => {
      const parts = doc.from.split(",");
      const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
      const region = parts[parts.length - 1].trim();

      if (territories.has(region)) {
        if (!grouped["Territories"][city]) {
          grouped["Territories"][city] = [];
        }
        grouped["Territories"][city].push(doc);
      } else if (provinces.has(region)) {
        if (!grouped[region]) {
          grouped[region] = {};
        }
        if (!grouped[region][city]) {
          grouped[region][city] = [];
        }
        grouped[region][city].push(doc);
      } else {
        if (!nonCanadian[region]) {
          nonCanadian[region] = {};
        }
        if (!nonCanadian[region][city]) {
          nonCanadian[region][city] = [];
        }
        nonCanadian[region][city].push(doc);
      }
    });

    setGroupedData(grouped);
  }

  if (loading) return <Loader />; // Show loader while fetching

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold p-10">World War 2: Unknown Graves</h1>

      <div className="max-h-[80%] container p-5">
        {viewState === "listProvinces" && (
          <ul className="flex flex-col gap-2">
            {Object.keys(groupedData).reverse().map((region) => (
              <li
                key={region}
                title={`View ${region}`}
                className="bg-white text-black p-3 hover:scale-105 duration-300 rounded-md cursor-pointer"
                onClick={() => {
                  setSelectedProvince(region);
                  setViewState("listCities");
                }}
              >
                {region}
              </li>
            ))}
          </ul>
        )}

        {viewState === "listCities" && selectedProvince && (
          <div>
            <button
              onClick={() => setViewState("listProvinces")}
              className="border border-white rounded-md p-2 hover:underline mb-3"
            >
              Back to Provinces
            </button>
            <ul className="flex flex-col gap-4">
              {Object.keys(groupedData[selectedProvince]).map((city) => (
                <li
                  key={city}
                  title={`View ${city}`}
                  className="bg-white text-black p-3 hover:scale-105 duration-300 rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedCity(city);
                    setViewState("showData");
                  }}
                >
                  {city} - {groupedData[selectedProvince][city].length} People
                </li>
              ))}
            </ul>
          </div>
        )}

        {formState && (
          <Form
            province={selectedProvince}
            city={selectedCity}
            veteran={selectedVeteran}
            setState={setFormState}
            groupData={groupedData}
          />
        )}

{viewState === "showData" && selectedProvince && selectedCity && (
  <div>
    <button
      onClick={() => setViewState("listCities")}
      className="border border-white rounded-md p-2 hover:underline mb-3"
    >
      Back to Cities
    </button>

    {/* Search Input */}
    <input
      className="p-2 rounded-md text-black border ml-5"
      placeholder="Search here"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} // Update state
    />

    {/* Filtered List */}
    <ul className="flex flex-col gap-4">
      {groupedData[selectedProvince][selectedCity]
        .filter((veteran) =>
          veteran.name.substring(0, veteran.name.length -1 ).split(",")[1]?.trim().toLowerCase().startsWith(searchQuery) // Case-insensitive filtering
        )
        .map((veteran, index) => (
          <li className="bg-white text-black p-5 rounded-md" key={veteran._id}>
            <h2 className="text-2xl font-bold underline">
              {veteran.name.substring(0, veteran.name.length - 1).split(", ")[1]}{" "}
              {veteran.name.substring(0, veteran.name.length - 1).split(", ")[0]}
            </h2>
            <p><strong>From:</strong> {veteran.from}</p>
            <p><strong>Death:</strong> {veteran.death}</p>
            <p><strong>Squadron:</strong> {veteran.squadron}</p>
            <p><strong>Inscribed:</strong> {veteran.inscribed}</p>
            <p><strong>Grave:</strong> {veteran.grave}</p>
            <p className="max-w-[400px] py-3">
              <strong>Description: </strong> {veteran.full_description}
            </p>
            <p className="font-bold underline">Select: </p>
            <button
              onClick={() => handleClick(veteran.taken, veteran, index)}
              className={`text-white p-2 rounded-md ${
                veteran.taken ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {veteran.taken ? "Unavailable" : "Available"}
            </button>
          </li>
        ))}
    </ul>
  </div>
)}
      </div>
    </div>
  );
};

export default Home;
