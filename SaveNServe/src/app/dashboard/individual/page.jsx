"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building,
  Activity,
  BarChart2,
  Clock,
  MessageSquare,
  HelpCircle,
  Menu
} from "lucide-react";
import Overview from "./components/Overview";
import FarmerManagementDashboard from "./components/ManageFarmers";
import NgoManagementDashboard from "./components/ManageNGOs";
import AnalyticsInsights from "./components/AnalyticsInsights";
import ActivityLogsDashboard from "./components/ActivityLogs";
import History from "./components/HistoryPage";
import FeedbacksAndDisputes from "./components/FeedbackDisputes";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Overview />;
      case "manage-farmers":
        return <FarmerManagementDashboard />;
      case "manage-ngos":
        return <  NgoManagementDashboard/>;
      case "activity-logs":
        return <ActivityLogsDashboard />;
      case "analytics":
        return <AnalyticsInsights />;
      case "history":
        return <History />;
      case "feedbacks":
        return <FeedbacksAndDisputes/>;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
          </div>
        );
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50 mt-20">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          {mobileSidebarOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 md:z-0 w-64 h-full bg-white border-r border-gray-200 transform ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                {
                  id: "dashboard",
                  icon: <LayoutDashboard className="h-5 w-5" />,
                  label: "Overview",
                },
                {
                  id: "manage-farmers",
                  icon: <Users className="h-5 w-5" />,
                  label: "Manage Farmers",
                },
                {
                  id: "manage-ngos",
                  icon: <Building className="h-5 w-5" />,
                  label: "Manage NGOs",
                },
                {
                  id: "activity-logs",
                  icon: <Activity className="h-5 w-5" />,
                  label: "Activity Logs",
                },
                {
                  id: "analytics",
                  icon: <BarChart2 className="h-5 w-5" />,
                  label: "Analytics & Insights",
                },
                {
                  id: "history",
                  icon: <Clock className="h-5 w-5" />,
                  label: "History",
                },
                {
                  id: "feedbacks",
                  icon: <MessageSquare className="h-5 w-5" />,
                  label: "Feedbacks & Disputes",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === item.id
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6 md:p-8 max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
