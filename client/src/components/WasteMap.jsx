import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MapPin, Trash2, Factory, Recycle } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "600px", // Increased height for better visibility
  borderRadius: "12px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

const center = {
  lat: 28.6139,
  lng: 77.209,
};

// Enhanced locations with more details and categories
const locations = [
  {
    id: 1,
    name: "Main Recycling Center",
    category: "recycling",
    lat: 28.6448,
    lng: 77.2167,
    status: "Operational",
    capacity: "500 tons/day",
    description: "Primary recycling facility for North Delhi",
  },
  {
    id: 2,
    name: "Central Landfill",
    category: "landfill",
    lat: 28.6139,
    lng: 77.23,
    status: "Active",
    capacity: "75% full",
    description: "Municipal waste landfill site",
  },
  {
    id: 3,
    name: "Smart Bin Station",
    category: "bin",
    lat: 28.61,
    lng: 77.2,
    status: "Available",
    fillLevel: "45%",
    description: "Smart waste collection point with segregation",
  },
  {
    id: 4,
    name: "East Delhi Processing Unit",
    category: "recycling",
    lat: 28.62,
    lng: 77.25,
    status: "Operational",
    capacity: "300 tons/day",
    description: "Waste processing and recycling unit",
  },
];

const WasteMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter locations based on active category
  const filteredLocations = locations.filter(
    (location) =>
      activeCategory === "all" || location.category === activeCategory
  );

  // Get icon color based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case "recycling":
        return "text-green-500";
      case "landfill":
        return "text-yellow-500";
      case "bin":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "available":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Waste Management Facilities
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeCategory === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory("recycling")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeCategory === "recycling"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
          >
            <Recycle className="w-4 h-4" />
            Recycling Centers
          </button>
          <button
            onClick={() => setActiveCategory("landfill")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeCategory === "landfill"
                ? "bg-yellow-500 text-white"
                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
            }`}
          >
            <Factory className="w-4 h-4" />
            Landfills
          </button>
          <button
            onClick={() => setActiveCategory("bin")}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
              activeCategory === "bin"
                ? "bg-blue-500 text-white"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Bins
          </button>
        </div>
      </div>

      {/* Map Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Total Facilities</div>
          <div className="text-2xl font-bold">{locations.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Processing Capacity</div>
          <div className="text-2xl font-bold">800 tons/day</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Active Collection Points</div>
          <div className="text-2xl font-bold">
            {locations.filter((l) => l.category === "bin").length}
          </div>
        </div>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyBP9dKizx2Z8_hl19ciDCbUcoXeuLPCxkI">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={{
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocation(location)}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-800">
                  {selectedLocation.name}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getStatusColor(
                    selectedLocation.status
                  )}`}
                >
                  {selectedLocation.status}
                </span>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedLocation.description}
                </p>
                <div className="mt-2 text-sm">
                  {selectedLocation.capacity && (
                    <div className="text-gray-600">
                      Capacity: {selectedLocation.capacity}
                    </div>
                  )}
                  {selectedLocation.fillLevel && (
                    <div className="text-gray-600">
                      Fill Level: {selectedLocation.fillLevel}
                    </div>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default WasteMap;
