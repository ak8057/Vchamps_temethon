import React from "react";
import { Layout, Card, Menu, Row, Col, Avatar,Dropdown } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { LogoutOutlined, DollarCircleOutlined, DeleteOutlined,UserSwitchOutlined, CarOutlined, WarningOutlined } from "@ant-design/icons";
import {
  Bell,
  User,
  DollarSign,
  Truck,
  Users,
  Trash2,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import QRCodeGenerator from "../components/QRCodeGenerator";
// import sendRequest from "../utils/sendRequest";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ModernSidebar from "../components/ModernSidebar";

import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  
} from "recharts";


const { Header, Sider, Content } = Layout;

const pieData = [
  { name: "North Route", value: 230, color: "#10B981" },
  { name: "South Route", value: 180, color: "#3B82F6" },
  { name: "East Route", value: 120, color: "#6366F1" },
  { name: "West Route", value: 107, color: "#8B5CF6" },
];

const barData = [
  { name: "Mon", cleaned: 65, uncleaned: 12 },
  { name: "Tue", cleaned: 72, uncleaned: 8 },
  { name: "Wed", cleaned: 68, uncleaned: 15 },
  { name: "Thu", cleaned: 78, uncleaned: 5 },
  { name: "Fri", cleaned: 82, uncleaned: 7 },
  { name: "Sat", cleaned: 55, uncleaned: 20 },
  { name: "Sun", cleaned: 70, uncleaned: 10 },
];


  const lineData = [
    { name: "6am", value: 20 },
    { name: "9am", value: 45 },
    { name: "12pm", value: 78 },
    { name: "3pm", value: 56 },
    { name: "6pm", value: 89 },
    { name: "9pm", value: 65 },
  ];

const Dashboard = () => {
   const user = useSelector((state) => state.auth.user);
   const token = useSelector((state) => state.auth.token);
   const collapse = useSelector((state) => state.sidebar.collapse);
   const [qrData, setQrData] = useState("");
   const [isModalVisible, setIsModalVisible] = useState(false);
   const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("authToken"); // Clear authentication token
      sessionStorage.clear(); // Clear session data
      navigate("/login"); // Redirect to login page
    };


    const handleScan = (data) => {
  if (data) {
    setQrData(data);
    setStats((prevStats) => ({ ...prevStats, user_coins: prevStats.user_coins + 10 }));
    setIsModalVisible(false);

    // Open the scanned URL
    window.location.href = data;
  }
};
   const [stats, setStats] = useState({
     users_count: 0,
     admins_count: 0,
     drivers_count: 0,
     bins_count: 0,
     general_bins_count: 0,
     recyclables_bins_count: 0,
     hazardous_bins_count: 0,
     trucks_count: 0,
     collected_bins_per_day: [{ date: new Date().toISOString(), count: 0 }],
     user_coins: 0,
   });

   const getAnalytics = async () => {
     try {
       const response = await sendRequest({ route: `analytics`, token });
       if (response.status === 200) {
         setStats(response.data);
       }
     } catch (err) {
       console.log(err);
     }
   };

   useEffect(() => {
     getAnalytics();
   }, []);

    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LogoutOutlined />}>
         <button size="large" type="primary" className="profile-btn" onClick={handleLogout}>Logout</button>
        </Menu.Item>
      </Menu>
    );
   const sidebarItems = [
     { key: "1", label: "Dashboard", path: "/dashboard" },
     { key: "2", label: "Bin Monitoring", path: "/bins" },
     { key: "3", label: "Vehicle Monitoring", path: "/vehicles" },
     { key: "4", label: "Your Market Place", path: "/MarketPlace" },
    //  { key: "5", label: "Trucks", path: "/trucks" },
    //  { key: "6", label: "Announcements", path: "/announcements" },
    //  { key: "7", label: "Chats", path: "/chats" },
     { key: "8", label: "Account", path: "/account" },
   ];
  return (
    <Layout className=" w-screen">
      {/* Sidebar */}
      <ModernSidebar />

      <Card title="Claim Reward">
        <QRCodeGenerator value="https://yourwebsite.com/claim-reward?code=UNIQUE_CODE" />
      </Card>

      <div className="min-h-screen w-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-2">
              <DeleteOutlined style={{ fontSize: "24px", color: "#10B981" }} />
              <span className="text-xl text-black font-bold">Eco System 360</span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <DollarCircleOutlined
                  style={{ fontSize: "20px", color: "#10B981" }}
                />
                <span className="font-semibold text-green-700">1,234</span>
              </div>
              <div className="relative">
                <BellOutlined style={{ fontSize: "24px", color: "#666" }} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              <Avatar icon={<UserOutlined />} className="cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card bodyStyle={{ padding: "20px" }}>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                    <UserSwitchOutlined
                      style={{ fontSize: "24px", color: "#3B82F6" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Drivers</p>
                    <h3 className="text-2xl font-bold">94</h3>
                    <p className="text-xs text-green-600">
                      +12% from last month
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bodyStyle={{ padding: "20px" }}>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    <DeleteOutlined
                      style={{ fontSize: "24px", color: "#10B981" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bin Fill Level</p>
                    <h3 className="text-2xl font-bold">66%</h3>
                    <p className="text-xs text-red-600">Critical in 3 areas</p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bodyStyle={{ padding: "20px" }}>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                    <CarOutlined
                      style={{ fontSize: "24px", color: "#8B5CF6" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Distance</p>
                    <h3 className="text-2xl font-bold">637 km</h3>
                    <p className="text-xs text-green-600">-8% fuel usage</p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card bodyStyle={{ padding: "20px" }}>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center mr-4">
                    <WarningOutlined
                      style={{ fontSize: "24px", color: "#F59E0B" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Alerts</p>
                    <h3 className="text-2xl font-bold">7</h3>
                    <p className="text-xs text-yellow-600">3 high priority</p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card title="Weekly Cleaning Efficiency">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="cleaned"
                        name="Cleaned Bins"
                        fill="#10B981"
                      />
                      <Bar
                        dataKey="uncleaned"
                        name="Pending Bins"
                        fill="#EF4444"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Route Distribution">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Real-time Activity */}
          <Card title="Real-time Collection Activity">
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Collection Rate"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
