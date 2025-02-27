import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";
import BinsComponent from "./components/BinsComponent";
// import VehiclesComponent from "./components/VehiclesComponent";
import WasteManagementDashboard from "./components/WasteManagementDashboard";
import MarketPlace from "./components/MarketPlace";
import WasteMap from "./components/WasteMap";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route path="/bins" element={<BinsComponent />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/vehicles" element={<WasteManagementDashboard />} />
        <Route path="/WasteMap" element={<WasteMap />} />
      </Routes>
    </Router>
  );
};

export default App;
