import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  DeleteOutlined,
  CarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  PieChartOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const ModernSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <DeleteOutlined />,
      label: "Bin Monitoring",
      path: "/bins",
    },
    {
      key: "3",
      icon: <CarOutlined />,
      label: "Vehicle Monitoring",
      path: "/vehicles",
    },
    {
      key: "4",
      icon: <TeamOutlined />,
      label: "Your Market Place",
      path: "/MarketPlace",
    },
    // {
    //   key: "5",
    //   icon: <EnvironmentOutlined />,
    //   label: "Routes",
    //   path: "/routes",
    // },
    // {
    //   key: "6",
    //   icon: <PieChartOutlined />,
    //   label: "Analytics",
    //   path: "/analytics",
    // },
    // {
    //   key: "7",
    //   icon: <BellOutlined />,
    //   label: "Alerts",
    //   path: "/alerts",
    // },
    // {
    //   key: "8",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    //   path: "/settings",
    // },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      className="min-h-screen transition-all duration-300 ease-in-out"
      style={{
        background: "linear-gradient(180deg, #1a1f37 0%, #111827 100%)",
      }}
    >
      {/* Logo and Title */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <DeleteOutlined className="text-white text-lg" />
          </div>
          {!collapsed && (
            <span className="text-white font-bold text-lg tracking-wide">
              EcoWaste
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* Active User Status */}
      {!collapsed && (
        <div className="mx-4 mb-6 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <TeamOutlined className="text-green-500" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm font-medium">Active Drivers</h3>
              <p className="text-gray-400 text-xs">16 on duty</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => setSelectedKey(key)}
        className="border-none"
        style={{
          background: "transparent",
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="menu-item-custom"
          >
            <Link to={item.path} className="text-gray-300 hover:text-white">
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      {/* Bottom Section */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">System Status</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-white text-sm">All Systems Normal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .menu-item-custom {
          margin: 4px 8px !important;
          border-radius: 8px !important;
          color: #94a3b8 !important;
        }

        .menu-item-custom:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }

        .ant-menu-item-selected {
          background: linear-gradient(
            90deg,
            #10b981 0%,
            #3b82f6 100%
          ) !important;
          color: white !important;
        }

        .ant-menu {
          background: transparent !important;
        }

        .ant-menu-item {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </Sider>
  );
};

export default ModernSidebar;
