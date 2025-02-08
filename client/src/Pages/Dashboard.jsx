import React from "react";
import { Layout, Menu, Card, Row, Col, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  
} from "recharts";


const { Header, Sider, Content } = Layout;

const pieData = [
  { name: "Cleaned on Time", value: 63, color: "#4caf50" },
  { name: "Cleaned Late", value: 21, color: "#ff9800" },
  { name: "Not Cleaned", value: 16, color: "#f44336" },
];

const barData = [
  { name: "27/01/2023", cleaned: 80, uncleaned: 20 },
  { name: "28/01/2023", cleaned: 90, uncleaned: 10 },
  { name: "29/01/2023", cleaned: 75, uncleaned: 25 },
];

const Dashboard = () => {
   const sidebarItems = [
     { key: "1", label: "Dashboard", path: "/dashboard" },
     { key: "2", label: "Bin Monitoring", path: "/bins" },
     { key: "3", label: "Vehicle Monitoring", path: "/vehicles" },
     { key: "4", label: "Users", path: "/users" },
     { key: "5", label: "Trucks", path: "/trucks" },
     { key: "6", label: "Announcements", path: "/announcements" },
     { key: "7", label: "Chats", path: "/chats" },
     { key: "8", label: "Account", path: "/account" },
   ];
  return (
    <Layout className="min-h-screen w-screen">
      {/* Sidebar */}
      <Sider className="bg-gray-900 text-white">
        <div className="p-4 text-xl font-bold text-center">Smart Waste</div>
        <Menu theme="dark" mode="vertical" className="bg-gray-900">
          {sidebarItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
     

      <Layout>
        {/* Header */}
        <Header className="bg-white shadow-md flex justify-between items-center p-4">
          <span className="text-lg font-bold">
            Smart Waste Management Solution
          </span>
          <div className="flex items-center gap-4">
            <BellOutlined className="text-xl" />
            <Avatar icon={<UserOutlined />} />
          </div>
        </Header>

        {/* Content */}
        <Content className="p-6 bg-gray-100">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Driver Status">Total Drivers: 94</Card>
            </Col>
            <Col span={8}>
              <Card title="Bin Status">Fill Level: 66%</Card>
            </Col>
            <Col span={8}>
              <Card title="Truck Status">Total Distance: 637km</Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col span={12}>
              <Card title="Weekly Cleaning Efficiency">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cleaned" fill="#4caf50" />
                    <Bar dataKey="uncleaned" fill="#f44336" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Total Distance Travelled">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
