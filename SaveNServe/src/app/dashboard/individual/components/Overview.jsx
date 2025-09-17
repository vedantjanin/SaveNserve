"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FiUsers, FiPackage, FiAlertCircle, FiCheckCircle, FiTrendingUp, FiDownload } from "react-icons/fi";

const Overview = () => {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  
  // Sample data that would normally come from an API
  const dashboardData = {
    "Last 7 days": {
      farmers: 32,
      ngos: 15,
      foodDistributed: 4200,
      activeRequests: 12,
      disputesResolved: 5,
      farmerGrowth: [
        { name: "Day 1", farmers: 10 },
        { name: "Day 2", farmers: 15 },
        { name: "Day 3", farmers: 18 },
        { name: "Day 4", farmers: 22 },
        { name: "Day 5", farmers: 25 },
        { name: "Day 6", farmers: 28 },
        { name: "Day 7", farmers: 32 },
      ],
      ngoDistribution: [
        { name: "Small", value: 8 },
        { name: "Medium", value: 5 },
        { name: "Large", value: 2 },
      ],
      foodDistribution: [
        { name: "Day 1", kg: 400 },
        { name: "Day 2", kg: 600 },
        { name: "Day 3", kg: 550 },
        { name: "Day 4", kg: 800 },
        { name: "Day 5", kg: 700 },
        { name: "Day 6", kg: 650 },
        { name: "Day 7", kg: 500 },
      ],
      disputeStatus: [
        { name: "Resolved", value: 5, color: "#10B981" },
        { name: "Pending", value: 3, color: "#F59E0B" },
        { name: "Escalated", value: 1, color: "#EF4444" },
      ]
    },
    "Last 30 days": {
      farmers: 124,
      ngos: 78,
      foodDistributed: 19480,
      activeRequests: 43,
      disputesResolved: 17,
      farmerGrowth: [
        { name: "Week 1", farmers: 45 },
        { name: "Week 2", farmers: 78 },
        { name: "Week 3", farmers: 56 },
        { name: "Week 4", farmers: 89 },
        { name: "Week 5", farmers: 124 },
      ],
      ngoDistribution: [
        { name: "Small", value: 35 },
        { name: "Medium", value: 28 },
        { name: "Large", value: 15 },
      ],
      foodDistribution: [
        { name: "Week 1", kg: 3200 },
        { name: "Week 2", kg: 4200 },
        { name: "Week 3", kg: 3800 },
        { name: "Week 4", kg: 5100 },
        { name: "Week 5", kg: 19480 },
      ],
      disputeStatus: [
        { name: "Resolved", value: 17, color: "#10B981" },
        { name: "Pending", value: 8, color: "#F59E0B" },
        { name: "Escalated", value: 3, color: "#EF4444" },
      ]
    }
  };

  const currentData = dashboardData[timeRange] || dashboardData["Last 30 days"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleExport = () => {
    // Create a CSV string
    const csvContent = 
      "Data Category,Value\n" +
      `Total Farmers,${currentData.farmers}\n` +
      `Total NGOs,${currentData.ngos}\n` +
      `Food Distributed (kg),${currentData.foodDistributed}\n` +
      `Active Requests,${currentData.activeRequests}\n` +
      `Disputes Resolved,${currentData.disputesResolved}`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dashboard_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  return (
    <div className="space-y-8 p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
        <div className="flex space-x-4">
          <select 
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="bg-slate-100 border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="This Year">This Year</option>
          </select>
          <button 
            onClick={handleExport}
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
          >
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-teal-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-600">Total Farmers</h3>
              <p className="text-3xl font-bold text-slate-800 mt-2">{currentData.farmers}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1" /> 12% from last period
              </p>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <FiUsers className="text-teal-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-indigo-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-600">Total NGOs</h3>
              <p className="text-3xl font-bold text-slate-800 mt-2">{currentData.ngos}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1" /> 8% from last period
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <FiUsers className="text-indigo-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-green-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-600">Food Distributed</h3>
              <p className="text-3xl font-bold text-slate-800 mt-2">
                {currentData.foodDistributed.toLocaleString()} kg
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1" /> 24% from last period
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiPackage className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-600">Active Requests</h3>
              <p className="text-3xl font-bold text-slate-800 mt-2">{currentData.activeRequests}</p>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1 transform rotate-180" /> 5% from last period
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiAlertCircle className="text-yellow-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farmers Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Farmers Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.farmerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#f8fafc'
                  }}
                />
                <Legend />
                <Bar dataKey="farmers" fill="#0E9F6E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NGO Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">NGO Distribution by Size</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.ngoDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {currentData.ngoDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#f8fafc'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Distribution Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 col-span-2">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Food Distribution Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData.foodDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#f8fafc'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="kg"
                  stroke="#10B981"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disputes Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Dispute Resolution Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.disputeStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currentData.disputeStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#f8fafc'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: "request", message: "New food distribution request received", time: "2 hours ago" },
            { type: "dispute", message: "New dispute resolved successfully", time: "4 hours ago" },
            { type: "request", message: "Farmers group registration completed", time: "1 day ago" },
            { type: "dispute", message: "Payment dispute escalated", time: "1 day ago" },
            { type: "request", message: "New NGO partnership established", time: "2 days ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-start pb-4 border-b border-slate-100 last:border-0">
              <div className={`p-2 rounded-full mr-4 ${
                activity.type === "dispute" ? "bg-blue-100" : "bg-yellow-100"
              }`}>
                {activity.type === "dispute" ? (
                  <FiCheckCircle className="text-blue-600" />
                ) : (
                  <FiAlertCircle className="text-yellow-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-800">{activity.message}</p>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;