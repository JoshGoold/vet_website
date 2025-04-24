import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";

const Visitors = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visitorFilter, setVisitorFilter] = useState("All-Time");
  const [selectedVisitor, setSelectedVisitor] = useState(null);

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
        setFilteredData(result.Visitors); // Initialize with all visitors
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
          const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
          return visitDate >= oneWeekAgo;
        });
        break;
      case "Monthly":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return visitDate >= oneMonthAgo;
        });
        break;
      case "Yearly":
        filtered = data.filter((v) => {
          const visitDate = new Date(v.createdAt);
          const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
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
    <div className="container mx-auto p-4">
      {/* Header and Stats */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Visitors</h1>
        <p className="text-lg text-gray-600">
          Total Visitors: <span className="font-semibold">{data.length}</span> | Filtered: <span className="font-semibold">{filteredData.length}</span>
        </p>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Daily", "Weekly", "Monthly", "Yearly", "All-Time"].map((period) => (
          <button
            key={period}
            onClick={() => visitorFilterer(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              visitorFilter === period
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Filtered Visitors Table */}
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">IP</th>
                <th className="py-3 px-4 text-left">Device</th>
                <th className="py-3 px-4 text-left">Referrer</th>
                <th className="py-3 px-4 text-left">Date Visited</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((visitor, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{visitor.ip}</td>
                  <td className="py-3 px-4">{visitor.deviceType}</td>
                  <td className="py-3 px-4">{visitor.referrer || "Direct"}</td>
                  <td className="py-3 px-4">
                    {new Date(visitor.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openVisitorModal(visitor)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No visitors found for the selected period.</p>
      )}

      {/* Visitor Details Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Visitor Details</h2>
            <div className="space-y-2">
              <p>
                <strong>IP:</strong> {selectedVisitor.ip}
              </p>
              <p>
                <strong>Device:</strong> {selectedVisitor.deviceType}
              </p>
              <p>
                <strong>Referrer:</strong> {selectedVisitor.referrer || "Direct"}
              </p>
              <p>
                <strong>Date Visited:</strong>{" "}
                {new Date(selectedVisitor.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeVisitorModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitors;