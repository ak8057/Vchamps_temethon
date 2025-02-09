import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Trash2,
  AlertTriangle,
  Battery,
  ThermometerSun,
  RefreshCw,
  Settings,
} from "lucide-react";

const BinsComponent = () => {
  const [bins, setBins] = useState([]);
  const [fillHistory, setFillHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your ESP8266's IP Address
  const ESP8266_URL = "http://192.168.24.86/fill";

  const fetchBinsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ESP8266_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("ESP8266 Data:", data);

      // Update bins state with current data
      setBins(data.bins || []);

      // Update fill history by adding new data point
      setFillHistory((prevHistory) => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          ...data.bins.reduce(
            (acc, bin) => ({
              ...acc,
              [bin.id]: bin.fillLevel,
            }),
            {}
          ),
        };

        // Keep last 10 data points
        const updatedHistory = [...prevHistory, newDataPoint].slice(-10);
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBinsData();

    // Set up interval for periodic fetching
    const interval = setInterval(fetchBinsData, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Smart Bin Management
            </h1>
            <p className="text-gray-500">Real-time monitoring and analytics</p>
            {error && (
              <p className="text-red-500 text-sm mt-1">Error: {error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              onClick={fetchBinsData}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Rest of your component remains the same */}
        {/* ... Overview Stats and Charts sections ... */}
      </div>
    </div>
  );
};

export default BinsComponent;
