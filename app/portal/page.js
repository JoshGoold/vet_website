// app/portal/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Dashboard from "./_components/Dashboard";
import Research from "./_components/Research";
import Pending from "./_components/Pending";
import Participants from "./_components/Participants";
import Link from "next/link";

const PortalContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [navState, setNavState] = useState("dashboard");
  const [selectedVets, setSelectedVets] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedData, setGroupedData] = useState({});
  const [stor, setStor] = useState([]);
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

  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    const queryCode = searchParams.get("code");

    if (storedCode && queryCode && storedCode === queryCode) {
      setIsValid(true);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-all-data", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.Success) {
          setData(data.Data);
          const selectedResponse = await fetch("https://veteran-api-for-kim.vercel.app/get-all-selected", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const info = await selectedResponse.json();

          if (info.Success) {
            setSelectedVets(info.Data);
          } else {
            alert(info.Message);
          }
        } else {
          alert(data.Message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);
  
  const provinces = new Set([
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  ]);

  useEffect(() => {
    buildDocument();
  }, [data]);

  function buildDocument() {
    const grouped = {};
    const provinceTotals = { ...totals };
    Object.keys(provinceTotals).forEach((province) => (provinceTotals[province] = 0));

    data.forEach((doc) => {
      const parts = doc.from.split(",");
      const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
      const region = parts[parts.length - 1].trim();

      if (provinces.has(region)) {
        if (!grouped[region]) grouped[region] = {};
        if (!grouped[region][city]) grouped[region][city] = [];
        grouped[region][city].push(doc);
        provinceTotals[region] += 1;
      }
    });

    setGroupedData(grouped);
    setTotals(provinceTotals);
  }

  if (!isValid || loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-gray-800 text-white flex-shrink-0">
        <h1 className="text-2xl font-light p-4 border-b border-gray-700">Admin Portal</h1>
        <ul className="divide-y divide-gray-700">
          <li
            onClick={() => setNavState("dashboard")}
            className={`p-4 hover:bg-blue-800 cursor-pointer ${navState === "dashboard" ? "bg-blue-800" : ""}`}
          >
            Dashboard
          </li>
          <li
            onClick={() => setNavState("active research")}
            className={`p-4 hover:bg-blue-800 cursor-pointer relative ${navState === "active research" ? "bg-blue-800" : ""}`}
          >
            Active Research
            <span className="absolute top-2 right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
              {selectedVets.length || 0}
            </span>
          </li>
          <li
            onClick={() => setNavState("active participants")}
            className={`p-4 hover:bg-blue-800 cursor-pointer relative ${navState === "active participants" ? "bg-blue-800" : ""}`}
          >
            Active Participants
            <span className="absolute top-2 right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
              {selectedVets.length || 0}
            </span>
          </li>
          <li
            onClick={() => setNavState("pending submissions")}
            className={`p-4 hover:bg-blue-800 cursor-pointer relative ${navState === "pending submissions" ? "bg-blue-800" : ""}`}
          >
            Pending Submissions
            <span className="absolute top-2 right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
              {stor.length || 0}
            </span>
          </li>
          <li className="p-4 hover:bg-blue-800 cursor-pointer">
            <Link href="/">Exit Portal</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        {navState === "dashboard" && (
          <Dashboard groupedData={groupedData} data={data} totals={totals} selectedVets={selectedVets} />
        )}
        {navState === "active research" && <Research />}
        {navState === "active participants" && <Participants />}
        {navState === "pending submissions" && <Pending setStor={setStor} />}
      </div>
    </div>
  );
};

const Portal = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">Loading...</div>}>
      <PortalContent />
    </Suspense>
  );
};

export default Portal;