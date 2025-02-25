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
import Canada from "@/assets/canada-flag.png"
import poppy from "@/assets/poppy.png"


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
    window.scrollTo(0, 0); // Scroll to top whenever the viewState changes
  }, [viewState]);

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
    <div id="top" className="flex justify-center flex-col items-center">
      <div className="flex justify-between container items-center  lg:flex-row-reverse flex-col p-5">
        <Image className="w-[100px] h-[60px]"  alt="canada flag" src={Canada}/>
      <h1 className="text-3xl font-bold lg:py-10 py-5">World War 2: Unknown Graves</h1>
      </div>
      {viewState === "listProvinces" &&
      <>
      <h2 className="py-3 flex text-center items-center gap-3 "><b className="underline">Total Missing In Action:</b>  <b className="bg-red-500  p-2 text-3xl">{MIA}</b></h2>
      <div className="container p-5">
        
        <h1 className="text-2xl font-semibold py-3">Why it's important</h1>
        
      <p>Researching World War II Canadian aircrew who have no known graves is crucial for preserving their legacy, honoring their sacrifice, and providing closure to families who never received definitive answers about their loved ones. These airmen played a vital role in the war effort, often undertaking dangerous missions over enemy territory or vast oceans, where many were lost without a trace. By uncovering details about their service, final missions, and commemorations, we ensure that their bravery is not forgotten. This research also contributes to historical records, aiding scholars, genealogists, and military historians in understanding the broader impact of Canada's air force during the war. Furthermore, advancements in technology, such as archival digitization and forensic identification, offer hope that some missing aircrew may one day be properly identified and memorialized.</p>
      </div>
    <div className="flex gap-8">
      <button className="underline">Manual Search</button>
      <button className="hover:underline">Map Search</button>
    </div>
    </>
    }
      <div className="max-h-[80%] container p-5">
        {viewState === "listProvinces" && (
          <ul className="flex flex-col gap-2">
            {Object.keys(groupedData).reverse().map((region) => (
              <li
                key={region}
                title={`View ${region}`}
                className="bg-white  font-bold relative text-black p-3 hover:scale-105 duration-300 rounded-md cursor-pointer"
                onClick={() => {
                  setSelectedProvince(region);
                  setViewState("listCities");
                }}
              >
                <div className="flex justify-between">
                <span>{region}</span>
                <span className="flex items-center gap-5 flex-row-reverse"><b className={`${totals[region]< 100 && "bg-yellow-500"} ${totals[region] > 100 && totals[region] < 200  && "bg-orange-500"} ${totals[region] > 200 && totals[region] < 400  && "bg-orange-700"} ${totals[region] > 400 && totals[region] < 800  && "bg-red-500"} ${totals[region] > 800 && "bg-red-700"} p-2 text-white rounded-full `}>{totals[region]|| 0}</b>  Unknown Graves</span>
                </div>
                <div className="">
                  <Image src={flags[region]} height={50} width={75} alt="flag"/>
                </div>
              </li>
            ))}
          </ul>
        )}

{viewState === "listCities" && selectedProvince && (
  <div>
    <Image alt="flag" height={200} src={selectedProvince && viewState !== "listProvinces" ? flags[selectedProvince] : null }/>
    <h2 className="text-2xl py-2">{selectedProvince&& viewState !== "listProvinces" ? `${selectedProvince} - ${totals[selectedProvince]} Unknown Graves` : ""}</h2>
    <div className="flex justify-between mb-10">
    <button
      onClick={() => {
        setViewState("listProvinces")
        setSearchQuery("")
      }}
      className="border border-white rounded-md p-2 hover:underline mb-3"
    >
      Back to Provinces
    </button>
     
    {/* Search Input for Cities */}
    <input
      className="p-2 rounded-md text-black border mb-3"
      placeholder="Search cities"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
    />
</div>

    <ul className="flex flex-col gap-4">
      {Object.keys(groupedData[selectedProvince])
        .filter((city) => city.toLowerCase().includes(searchQuery))
        
        .map((city) => (
          <li
            key={city}
            title={`View ${city}`}
            className="bg-white text-black p-3 hover:scale-105 duration-300 rounded-md cursor-pointer"
            onClick={() => {
              setSelectedCity(city);
              setSearchQuery("")
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
    <Image alt="flag" height={200} src={selectedProvince && viewState !== "listProvinces" ? flags[selectedProvince] : null }/>
    <h2 className="text-2xl py-5">{selectedProvince} | {selectedCity} | Total - {groupedData[selectedProvince][selectedCity].length}</h2>
    <div className="flex justify-between mb-10">
    <button
      onClick={() => {
        setViewState("listCities")
        setSearchQuery("")
      }}
      className="border border-white rounded-md p-2 hover:underline mb-3"
    >
      Back to Cities
    </button>

    {/* Search Input */}
    <input
      className="p-2 rounded-md text-black border ml-5"
      placeholder="Search by name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} // Update state
    />
</div>
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
            <button
              onClick={() => handleClick(veteran.taken, veteran, index)}
              className={`text-white p-2 rounded-md ${
                veteran.taken ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {veteran.taken ? "Unavailable" : "Select"}
            </button>
          </li>
        ))}
        {/* <li className="flex gap-3 justify-center items-center">
          <button className="text-3xl bg-white text-black p-3 rounded-md" onClick={()=> handlePagination("back", groupedData[selectedProvince][selectedCity].length)}>{"<"}</button>
          <button className="text-3xl bg-white text-black p-3 rounded-md" onClick={()=> handlePagination("fwd", groupedData[selectedProvince][selectedCity].length)}>{">"}</button>
        </li> */}
    </ul>
  </div>
)}
      </div>
    </div>
  );
};

export default Home;
