"use client";
import Form from "@/components/Form";
import Loader from "@/components/Loader"; // Import Loader
import { useEffect, useState } from "react";
import Alberta from "@/assets/Flags/Alberta.png"
import Newfoundland from "@/assets/Flags/Newfoundland.png"
import NovaScotia from "@/assets/Flags/Nova Scotia.png"
import Manitoba from "@/assets/Flags/Manitoba.png"
import PEI from "@/assets/Flags/Prince Edward Island.webp"
import Quebec from "@/assets/Flags/Quebec.png"
import Ontario from "@/assets/Flags/Ontario.png"
import Saskatchewan from "@/assets/Flags/Saskatchewan.png"
import NewBrunswick from "@/assets/Flags/New Brunswick.png"
import BritishColumbia from "@/assets/Flags/British Columbia.png"
import Image from "next/image";
import logVisit from "@/utils/logVisit";

const page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [formState, setFormState] = useState(false);
    const [viewState, setViewState] = useState("listProvinces");
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedVets, setSelectedVets] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedVeteran, setSelectedVeteran] = useState({});
    const [groupedData, setGroupedData] = useState({});
    const [geoData, setGeoData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchOption, setSearchOption] = useState("manual")
    const [totalMia, setTotalMia] = useState(0)
    const MIA = 1888;
    // const [values, setValues] = useState([0,10])
  
    // const handlePagination = (action, length) => {
    //   switch (action) {
    //     case "fwd":
    //       if (values[1] + 10 <= length) {
    //         setValues([values[0] + 10, values[1] + 10]);
    //       }
    //       break;
    //     case "back":
    //       if (values[0] - 10 >= 0) {
    //         setValues([values[0] - 10, values[1] - 10]);
    //       }
    //       break;
    //   }
    // };
  
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
    "British Columbia": BritishColumbia
   }
   const[totals, setTotals] = useState({
    "Prince Edward Island": 0,
    "Alberta": 0,
    "Newfoundland": 0,
    "Nova Scotia": 0,
    "Manitoba": 0,
    "Quebec": 0,
    "Ontario": 0,
    "Saskatchewan": 0,
    "New Brunswick": 0,
    "British Columbia": 0
   })
  
    const provinces = new Set([
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland",
      "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    ]);
  
  
    const handleClick = (boolean, veteran, index) => {
      if (boolean) {
        return alert("This Veteran has already been taken");
      }
      setFormState(true);
      setSelectedVeteran({...veteran, index});
    };


  useEffect(() => {
    logVisit("/database");
  }, []);

  
    useEffect(() => {
      const initialize = async () => {
        try {
          setLoading(true); // Start loading
    
          // Fetch all data
          const response = await fetch("https://veteran-api-for-kim.vercel.app/get-all-data", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          const data = await response.json();
    
          if (data.Success) {
            setData(data.Data);
    
            // Fetch selected vets
            const selectedResponse = await fetch("https://veteran-api-for-kim.vercel.app/get-all-selected", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
    
            const info = await selectedResponse.json();
    
            if (info.Success) {
              setSelectedVets(info.Data);
            } else {
              alert(info.Message); // Corrected alert message
            }
          } else {
            alert(data.Message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
    
      initialize();
    }, []);
    
  
    useEffect(() => {
      const handleLocationData = async () => {
        try {
          const response = await fetch("/coords.geojson"); // Fetch from public folder
          const data = await response.json();
          setGeoData(data); // Store data in state
        } catch (error) {
          console.error("Error fetching GeoJSON:", error);
        }
      };
  
      handleLocationData(); // Call the function inside useEffect
    }, []); // Empty dependency array runs it only once
  
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      // Ensure code runs only on the client
      setIsClient(true);
  
  
    }, []);
  
    useEffect(() => {
      let sum = 0;
      
      for (let [key, value] of Object.entries(totals)) {
        sum += value;
      }
    
      setTotalMia(sum);
    }, [totals]);
  
    useEffect(() => {
      if (isClient) {
        window.scrollTo(0, 0); // Scroll to top whenever the viewState changes
      }
    }, [viewState, isClient]);
    
  
    useEffect(() => {
      buildDocument();
    }, [data]);
  
    function buildDocument() {
      const grouped = {};
      const nonCanadian = {};
      const provinceTotals = { ...totals }; // Initialize with existing structure
    
      // Reset counts before recalculating
      Object.keys(provinceTotals).forEach((province) => {
        provinceTotals[province] = 0;
      });
    
      data.forEach((doc) => {
        const parts = doc.from.split(",");
        const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
        const region = parts[parts.length - 1].trim();
    
        if (provinces.has(region)) {
          if (!grouped[region]) {
            grouped[region] = {};
          }
          if (!grouped[region][city]) {
            grouped[region][city] = [];
          }
          grouped[region][city].push(doc);
    
          // Update total count for the province
          provinceTotals[region] += 1;
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
      setTotals(provinceTotals); // Update totals state
    }
  
    if (loading) return <Loader />; // Show loader while fetching
  return (
    <div id="top" className="flex flex-col items-center min-h-[calc(100vh-100px)] bg-gray-900 text-gray-100 p-4">
  {viewState === "listProvinces" && (
    <div className="container mx-auto p-5">
     
      <div className="p-6 mb-5 bg-gray-800 rounded-lg  shadow-lg">
      <div className="flex flex-col sm:flex-row justify-around gap-6 mb-6">
        <h2 className="flex items-center gap-3 text-lg font-semibold">
          <span>Available Names:</span>
          <span className="bg-red-600 px-4 py-1 rounded-full text-xl font-bold">
            {Number(totalMia) + 3 || 0}
          </span>
        </h2>
        <h2 className="flex items-center gap-3 text-lg font-semibold">
          <span># of Names Being Researched:</span>
          <span className="bg-green-600 px-4 py-1 rounded-full text-xl font-bold">
            {selectedVets.length || 0}
          </span>
        </h2>
        <h2 className="flex items-center gap-3 text-lg font-semibold">
          <span>Completed Stories:</span>
          <span className="bg-blue-600 px-4 py-1 rounded-full text-xl font-bold">
            {0}
          </span>
        </h2>
      </div>

        <p className="mb-4 border-l-2 pl-2">The 10 Canadian provinces are listed below, each showing the number of MIA aircrew associated with that province. Within each province, towns are listed alphabetically, along with the number of MIA aircrew from each town.</p>
        <p className="mb-4">To get started, click on a name to view the available information. When you're ready to begin your research, click “Select” to register your commitment to researching that individual.</p>
        <p className="mb-4">Once registered, you’ll receive a confirmation email acknowledging your contribution to the program and a link to a research guide to help you begin. After a couple of weeks, we will follow-up to see how the research is progressing.</p>
        <p className="mb-4">Use the buttons to navigate the database.</p>
        <p className="mb-4"><i>Note:</i> While multiple people can collaborate on a single name, only one person needs to register their name with us. Teachers are encouraged to work with their students to research a name.</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(groupedData).sort().map((region) => (
          <li
            key={region}
            title={`View ${region}`}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedProvince(region);
              setViewState("listCities");
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">{region}</span>
              <span
                className={`px-3 py-1 rounded-full text-white font-semibold ${
                  totals[region] < 100
                    ? "bg-yellow-500"
                    : totals[region] < 200
                    ? "bg-orange-500"
                    : totals[region] < 400
                    ? "bg-orange-700"
                    : totals[region] < 800
                    ? "bg-red-500"
                    : "bg-red-700"
                }`}
              >
                {totals[region] || 0}
              </span>
            </div>
            <div className="mt-2">
              <Image src={flags[region]} height={40} width={60} alt={`${region} flag`} className="rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}

  {searchOption === "manual" && (
    <div className="container mx-auto p-5 max-w-4xl">
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
              {selectedProvince} - {totals[selectedProvince]} Unknown Graves
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <button
              onClick={() => {
                setViewState("listProvinces");
                setSearchQuery("");
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
                    setViewState("showData");
                  }}
                >
                  {city} - {groupedData[selectedProvince][city].length} {groupedData[selectedProvince][city].length === 1 ? "Person" : "People"}
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
          <div className="flex items-center gap-4 mb-4">
            <Image
              alt={`${selectedProvince} flag`}
              height={80}
              width={120}
              src={flags[selectedProvince]}
              className="rounded"
            />
            <h2 className="text-xl font-semibold">
              {selectedProvince} | {selectedCity} | Total - {groupedData[selectedProvince][selectedCity].length}
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
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
          <ul className="flex flex-col gap-4">
            {groupedData[selectedProvince][selectedCity]
              .filter((veteran) =>
                veteran.name
                  .substring(0, veteran.name.length - 1)
                  .split(",")[1]
                  ?.trim()
                  .toLowerCase()
                  .startsWith(searchQuery)
              )
              .map((veteran, index) => (
                <li
                  key={veteran._id}
                  className="bg-gray-800 p-5 rounded-md shadow-md hover:bg-gray-700 transition-colors"
                >
                  <h2 className="text-xl font-bold underline">
                    {veteran.name.substring(0, veteran.name.length - 1).split(", ")[1]}{" "}
                    {veteran.name.substring(0, veteran.name.length - 1).split(", ")[0]}
                  </h2>
                  <p><strong>From:</strong> {veteran.from}</p>
                  <p><strong>Death:</strong> {veteran.death}</p>
                  <p><strong>Squadron:</strong> {veteran.squadron}</p>
                  <p><strong>Inscribed:</strong> {veteran.inscribed}</p>
                  <p><strong>Grave:</strong> {veteran.grave}</p>
                  <p className="max-w-[400px] py-2 text-sm">
                    <strong>Description:</strong> {veteran.full_description}
                  </p>
                  <button
                    onClick={() => handleClick(veteran.taken, veteran, index)}
                    className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
                      veteran.taken
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    } transition-colors`}
                  >
                    {veteran.taken ? "Unavailable" : "Select"}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )}
</div>
  )
}

export default page
