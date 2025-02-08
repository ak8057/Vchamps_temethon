import React, { useState } from "react";
import {
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
  Truck,
  Trash2,
  Recycle,
  AlertTriangle,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

const WasteManagementDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [stats] = useState({
    totalWaste: "2,450",
    recyclable: "1,200",
    organicWaste: "800",
    hazardousWaste: "450",
    activeVehicles: "18",
    pendingCollections: "24",
    completedToday: "45",
    efficiency: "92",
  });

  const [wasteData] = useState([
    { month: "Jan", organic: 800, recyclable: 1200, hazardous: 450 },
    { month: "Feb", organic: 900, recyclable: 1300, hazardous: 400 },
    { month: "Mar", organic: 750, recyclable: 1100, hazardous: 500 },
    { month: "Apr", organic: 850, recyclable: 1400, hazardous: 420 },
  ]);

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen w-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Waste Management Dashboard
        </h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Collection
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            View Map
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Total Waste Collected
            </span>
            <Trash2 className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl text-black font-bold">
            {stats.totalWaste} tons
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Active Vehicles
            </span>
            <Truck className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl  text-black font-bold">
            {stats.activeVehicles}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pending Collections
            </span>
            <Clock className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl  text-black font-bold">
            {stats.pendingCollections}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Efficiency Rate
            </span>
            <TrendingUp className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-2xl  text-black font-bold">
            {stats.efficiency}%
          </div>
        </Card>
      </div>

      {/* Waste Distribution Chart */}
      <Card>
        <h2 className="text-lg  text-black font-semibold mb-4">
          Monthly Waste Distribution
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wasteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="organic" fill="#4CAF50" name="Organic Waste" />
              <Bar
                dataKey="recyclable"
                fill="#2196F3"
                name="Recyclable Waste"
              />
              <Bar dataKey="hazardous" fill="#FF5722" name="Hazardous Waste" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" />
          <h2 className="text-lg font-semibold">Recent Alerts</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-red-600">
                Vehicle MW-2234 requires maintenance
              </span>
            </div>
            <span className="text-sm text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-600">
                High waste volume in Sector 7
              </span>
            </div>
            <span className="text-sm text-gray-500">5h ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WasteManagementDashboard;
