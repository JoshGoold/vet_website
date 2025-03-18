"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Dashboard from "./_components/Dashboard";
import Research from "./_components/Research";
import Pending from "./_components/Pending";
import Participants from "./_components/Participants";
import Link from "next/link";


// Main Portal component
const PortalContent = () => {
  const searchParams = useSearchParams(); // Get query parameters
  const router = useRouter(); // For navigation
  const [isValid, setIsValid] = useState(false); // Track validation state
  const [navState, setNavState] = useState("dashboard")
  const [selectedVets, setSelectedVets] = useState([])
  useEffect(() => {
    const storedCode = localStorage.getItem("code"); // Get code from localStorage
    const queryCode = searchParams.get("code"); // Get code from URL query (e.g., ?code=123456)

    if (storedCode && queryCode && storedCode === queryCode) {
      // Codes match, allow access
      setIsValid(true);
    } else {
      // Codes don’t match or are missing, redirect away
      router.push("/"); // Redirect to homepage
    }
  }, [searchParams, router]); // Re-run if searchParams or router changes

  const [provinceSpreadChart, setProvinceSpreadChart] = useState({});

// C>A>T Chart <Completed, Active, Total unknown graves research chart
const [catChart, setCatChart] = useState({});
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true); // Track loading state
const [groupedData, setGroupedData] = useState({});
const [totalMia, setTotalMia] = useState(0)

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

  const [stor, setStor] = useState([])

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

   useEffect(() => {
    let sum = 0;
    
    for (let [key, value] of Object.entries(totals)) {
      sum += value;
    }
  
    setTotalMia(sum);
  }, [totals]);
  
    const provinces = new Set([
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland",
      "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    ]);

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
        
      

  if (!isValid) {
    return null; // Or a loading spinner/message while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex lg:flex-row flex-col gap-5 items-center justify-center">
      <div className="pl-6 lg:h-screen lg:w-auto w-full bg-gray-800">
      <h1 className="text-2xl p-6 font-thin  border-b border-b-white">Admin Portal</h1>
        <ul className="bg-gray-800 h-full">
          <li onClick={()=> setNavState("dashboard")} className={`hover:bg-blue-800 p-2 ${navState === "dashboard" && "bg-blue-800"} cursor-pointer border-b border-b-white`}>Dashboard</li>
          <li onClick={()=> setNavState("active research")} className={`hover:bg-blue-800 p-2 ${navState === "active research" && "bg-blue-800"} cursor-pointer border-b border-b-white relative`}> Active Research {<b className="absolute top-0 right-0 bg-red-500 px-2">{selectedVets.length || 0}</b>}</li>
          <li onClick={()=> setNavState("active participants")} className={`hover:bg-blue-800 p-2 ${navState === "active participants" && "bg-blue-800"} cursor-pointer border-b border-b-white relative`}> Active Participants {<b className="absolute top-0 right-0 bg-red-500 px-2">{selectedVets.length || 0}</b>}</li>
          <li onClick={()=> setNavState("pending submissions")} className={`hover:bg-blue-800 p-2 ${navState === "pending submissions" && "bg-blue-800"} cursor-pointer border-b border-b-white relative `}> Pending Submissions {<b className="absolute top-0 right-0 bg-red-500 px-2">{stor.length || 0}</b>}</li>
          <li className={`hover:bg-blue-800 p-2 cursor-pointer border-b border-b-white`}><Link href={"/"}>Exit Portal</Link></li>
        </ul>
      </div>
        <div className="flex-1">
          {navState === "dashboard" && <Dashboard data={data} totals={totals} selectedVets={selectedVets.length || 0}/>}
          {navState === "active research" && <Research />}
          {navState === "active participants" && <Participants />}
          {navState === "pending submissions" && <Pending setStor={setStor}/>}
    
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense
const Portal = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">Loading...</div>}>
      <PortalContent />
    </Suspense>
  );
};

export default Portal;