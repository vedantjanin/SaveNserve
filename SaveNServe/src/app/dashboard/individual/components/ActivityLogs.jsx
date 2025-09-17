"use client";

import React, { useState, useEffect } from "react";
import { 
  FiMapPin,
  FiFilter, FiSearch, FiCalendar, FiUser, FiUsers, 
  FiActivity, FiBarChart2, FiPieChart, FiRefreshCw,
  FiCheckCircle, FiAlertCircle, FiX, FiTrash2, FiEdit
} from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ActivityLogsDashboard = () => {
  // Sample activity data
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "farmer",
      name: "John Doe",
      entityId: 101,
      action: "registration",
      date: "2023-06-15",
      status: "active",
      details: "New farmer registered with Organic Farm",
      location: "California"
    },
    {
      id: 2,
      type: "ngo",
      name: "Green Earth Initiative",
      entityId: 201,
      action: "project_assignment",
      date: "2023-06-18",
      status: "active",
      details: "Assigned to Tree Planting Project",
      location: "New York"
    },
    {
      id: 3,
      type: "farmer",
      name: "Jane Smith",
      entityId: 102,
      action: "status_change",
      date: "2023-06-20",
      status: "inactive",
      details: "Status changed to inactive",
      location: "Texas"
    },
    {
      id: 4,
      type: "ngo",
      name: "Health for All",
      entityId: 202,
      action: "enquiry",
      date: "2023-06-22",
      status: "enquiry",
      details: "New enquiry about partnership",
      location: "Nairobi"
    },
    {
      id: 5,
      type: "farmer",
      name: "Mark Lee",
      entityId: 103,
      action: "removed",
      date: "2023-06-25",
      status: "removed",
      details: "Farmer removed from system",
      location: "Florida"
    },
    {
      id: 6,
      type: "ngo",
      name: "Education First",
      entityId: 203,
      action: "update",
      date: "2023-06-28",
      status: "active",
      details: "Updated volunteer count to 200",
      location: "New Delhi"
    },
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });

  // Analytics view state
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'analytics'
  const [timeframe, setTimeframe] = useState("monthly"); // 'daily', 'weekly', 'monthly'

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || activity.type === selectedType;
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus;
    const matchesAction = selectedAction === "all" || activity.action === selectedAction;
    
    // Date filtering
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const activityDate = new Date(activity.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = activityDate >= startDate && activityDate <= endDate;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesAction && matchesDate;
  });

  // Prepare data for charts
  const prepareChartData = () => {
    // Activity by type
    const farmerCount = activities.filter(a => a.type === "farmer").length;
    const ngoCount = activities.filter(a => a.type === "ngo").length;

    // Activity by status
    const statusCounts = {
      active: activities.filter(a => a.status === "active").length,
      inactive: activities.filter(a => a.status === "inactive").length,
      enquiry: activities.filter(a => a.status === "enquiry").length,
      removed: activities.filter(a => a.status === "removed").length
    };

    // Activity over time (simplified)
    const monthlyCounts = {
      "Jun 1-7": 12,
      "Jun 8-14": 18,
      "Jun 15-21": 22,
      "Jun 22-28": 15,
      "Jun 29-30": 8
    };

    return {
      typeData: {
        labels: ["Farmers", "NGOs"],
        datasets: [{
          data: [farmerCount, ngoCount],
          backgroundColor: ["#4FD1C5", "#4299E1"],
          borderWidth: 1
        }]
      },
      statusData: {
        labels: ["Active", "Inactive", "Enquiry", "Removed"],
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ["#48BB78", "#ED8936", "#9F7AEA", "#F56565"],
          borderWidth: 1
        }]
      },
      timelineData: {
        labels: Object.keys(monthlyCounts),
        datasets: [{
          label: "Activities",
          data: Object.values(monthlyCounts),
          backgroundColor: "#4FD1C5",
          borderColor: "#38B2AC",
          borderWidth: 2
        }]
      }
    };
  };

  const chartData = prepareChartData();

  // Handle activity status change
  const handleStatusChange = (id, newStatus) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: newStatus } : activity
    ));
  };

  // Handle activity deletion
  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSelectedAction("all");
    setDateRange({ start: "", end: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Activity Logs</h1>
            <p className="text-gray-600">Track all farmer and NGO activities</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg ${viewMode === "list" ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("analytics")}
              className={`px-4 py-2 rounded-lg ${viewMode === "analytics" ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="farmer">Farmers</option>
                <option value="ngo">NGOs</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="enquiry">Enquiry</option>
                <option value="removed">Removed</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="registration">Registration</option>
                <option value="status_change">Status Change</option>
                <option value="project_assignment">Project Assignment</option>
                <option value="enquiry">Enquiry</option>
                <option value="update">Update</option>
                <option value="removed">Removed</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetFilters}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiRefreshCw />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2" />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                placeholder="Start date"
              />
              <span className="mx-2 text-gray-500">to</span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                placeholder="End date"
              />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Activities</h3>
            <p className="text-2xl font-bold text-gray-800">{activities.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Farmer Activities</h3>
            <p className="text-2xl font-bold text-teal-600">{activities.filter(a => a.type === "farmer").length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">NGO Activities</h3>
            <p className="text-2xl font-bold text-blue-600">{activities.filter(a => a.type === "ngo").length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Active Entities</h3>
            <p className="text-2xl font-bold text-green-500">{activities.filter(a => a.status === "active").length}</p>
          </div>
        </div>

        {viewMode === "analytics" ? (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Activity Analytics</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-700 font-medium mb-3 flex items-center">
                  <FiUser className="mr-2" /> Activity by Type
                </h3>
                <div className="h-64">
                  <Pie 
                    data={chartData.typeData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false
                    }} 
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-700 font-medium mb-3 flex items-center">
                  <FiActivity className="mr-2" /> Activity by Status
                </h3>
                <div className="h-64">
                  <Pie 
                    data={chartData.statusData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false
                    }} 
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-700 font-medium mb-3 flex items-center">
                  <FiBarChart2 className="mr-2" /> Activity Timeline
                </h3>
                <div className="h-64">
                  <Bar 
                    data={chartData.timelineData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-700 font-medium mb-3">Recent Activities</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Date</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Type</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Action</th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.slice(0, 5).map(activity => (
                      <tr key={activity.id} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4 text-sm text-gray-800">{new Date(activity.date).toLocaleDateString()}</td>
                        <td className="py-2 px-4 text-sm text-gray-800 capitalize">{activity.type}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{activity.name}</td>
                        <td className="py-2 px-4 text-sm text-gray-800 capitalize">{activity.action.replace('_', ' ')}</td>
                        <td className="py-2 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            activity.status === 'active' ? 'bg-green-100 text-green-800' :
                            activity.status === 'inactive' ? 'bg-orange-100 text-orange-800' :
                            activity.status === 'enquiry' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Activity Logs</h2>
              <p className="text-gray-600">{filteredActivities.length} records found</p>
            </div>

            {filteredActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No activities match your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map(activity => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          {activity.type === "farmer" ? (
                            <FiUser className="text-teal-600 mr-2" />
                          ) : (
                            <FiUsers className="text-blue-600 mr-2" />
                          )}
                          <h3 className="font-medium text-gray-800">{activity.name}</h3>
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                            {activity.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <FiCalendar className="mr-1" />
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <FiMapPin className="mr-1" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === 'active' ? 'bg-green-100 text-green-800' :
                          activity.status === 'inactive' ? 'bg-orange-100 text-orange-800' :
                          activity.status === 'enquiry' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {activity.status}
                        </span>
                        <div className="flex space-x-1">
                          <select
                            value={activity.status}
                            onChange={(e) => handleStatusChange(activity.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="enquiry">Enquiry</option>
                            <option value="removed">Removed</option>
                          </select>
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogsDashboard;