// pages/visitors.js
import { useState, useEffect } from "react";

import Loader from "@/components/Loader";


const Visitors = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visitorFilter, setVisitorFilter] = useState("All-Time");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [row, setRow] = useState([0,20])



  // Fetch visitor data
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://veteran-api-for-kim.vercel.app/visitors", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (!result.Success) {
        setMessage(result.Message);
        setData([]);
        setFilteredData([]);
      } else {
        setData(result.Visitors);
        setFilteredData(result.Visitors);
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
      setMessage("Internal Server Error");
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Filter visitors by time period
  const visitorFilterer = (timePeriod) => {
    setVisitorFilter(timePeriod);
    const now = new Date();
    let filtered = [];
    switch (timePeriod) {
      case "Daily":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          return visitDate.toDateString() === now.toDateString();
        });
        break;
      case "Weekly":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return visitDate >= oneWeekAgo;
        });
        break;
      case "Monthly":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return visitDate >= oneMonthAgo;
        });
        break;
      case "Yearly":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          const oneYearAgo = new Date(now);
          oneYearAgo.setFullYear(now.getFullYear() - 1);
          return visitDate >= oneYearAgo;
        });
        break;
      case "All-Time":
        filtered = data;
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  };

  // Open modal with visitor details
  const openVisitorModal = (visitor) => {
    setSelectedVisitor(visitor);
  };

  // Close modal
  const closeVisitorModal = () => {
    setSelectedVisitor(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Visitors</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Total Visitors: <span className="text-blue-400 font-semibold">{data.length}</span> | Filtered: <span className="text-blue-400 font-semibold">{filteredData.length}</span>
        </p>
        {message && <p className="text-red-500 mt-2 text-sm">{message}</p>}
      </div>

      {/* Filter Buttons */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {["Daily", "Weekly", "Monthly", "Yearly", "All-Time"].map((period) => (
            <button
              key={period}
              onClick={() => visitorFilterer(period)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                visitorFilter === period
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Visitors Table */}
      <div className="max-w-4xl mx-auto">
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-xs">
                  <th className="py-3 px-4 text-left">IP</th>
                  <th className="py-3 px-4 text-left">Device</th>
                  <th className="py-3 px-4 text-left">Referrer</th>
                  <th className="py-3 px-4 text-left">Page Visited</th>
                  <th className="py-3 px-4 text-left">Date Visited</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(row[0], row[1]).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((visitor, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-100">{visitor.ip}</td>
                    <td className="py-3 px-4 text-gray-100">{visitor.deviceType}</td>
                    <td className="py-3 px-4 text-gray-100">{visitor.referrer || "Direct"}</td>
                    <td className="py-3 px-4 text-gray-100">{visitor.pageVisited || "Unknown"}</td>
                    <td className="py-3 px-4 text-gray-100">
                      {new Date(visitor.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openVisitorModal(visitor)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center gap-4 mt-4">
                <button onClick={()=> {
                    if(row[0]===0){
                        return;
                    }
                    else{
                        row[0]-=20;
                        row[1]-=20;
                    }
                    
                }} className="bg-gray-700 text-white px-4 py-2 text-2xl border-gray-700 border rounded-md hover:bg-gray-800">←</button>
                <button onClick={()=> {
                    if(row[1]>=data.length){
                        return;
                    }
                    else{
                        row[0]+=20;
                        row[1]+=20;
                    }
                    
                }} className="bg-gray-700 text-white px-4 py-2 text-2xl border-gray-700 border rounded-md hover:bg-gray-800">→</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">No visitors found for the selected period.</p>
          </div>
        )}
      </div>

      {/* Visitor Details Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Visitor Details</h2>
            <div className="space-y-2 text-gray-100">
              <p><strong>IP:</strong> {selectedVisitor.ip}</p>
              <p><strong>Device:</strong> {selectedVisitor.deviceType}</p>
              <p><strong>Referrer:</strong> {selectedVisitor.referrer || "Direct"}</p>
              <p><strong>Page Visited:</strong> {selectedVisitor.pageVisited || "Unknown"}</p>
              <p><strong>Date Visited:</strong> {new Date(selectedVisitor.createdAt).toLocaleString()}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeVisitorModal}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {filteredData.length > 0 && (
        <div className="mt-6 text-center text-xs text-gray-500 max-w-4xl mx-auto">
          <p>Data updated: {new Date().toLocaleDateString()}</p>
          <p>{filteredData.length} visitors displayed</p>
        </div>
      )}
    </div>
  );
};

export default Visitors;