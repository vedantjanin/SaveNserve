"use client";

import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsInsights = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  
  // Sample data for different time ranges
  const dataByTimeRange = {
    weekly: {
      totalRequests: 320,
      totalDonations: 1200,
      totalNGOs: 32,
      totalFarmers: 180,
      requestsTrend: [40, 45, 50, 55, 60, 70, 80],
      ngoDistribution: [12, 15, 5], // Small, Medium, Large NGOs
      farmerDistribution: [120, 60], // Active, Inactive farmers
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    monthly: {
      totalRequests: 1200,
      totalDonations: 4500,
      totalNGOs: 32,
      totalFarmers: 500,
      requestsTrend: [150, 180, 200, 220, 250, 300],
      ngoDistribution: [18, 10, 4], // Small, Medium, Large NGOs
      farmerDistribution: [350, 150], // Active, Inactive farmers
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    },
    yearly: {
      totalRequests: 8500,
      totalDonations: 32000,
      totalNGOs: 32,
      totalFarmers: 500,
      requestsTrend: [600, 800, 950, 1100, 1300, 1500, 1800, 2000],
      ngoDistribution: [20, 8, 4], // Small, Medium, Large NGOs
      farmerDistribution: [420, 80], // Active, Inactive farmers
      labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
    }
  };

  const currentData = dataByTimeRange[timeRange] || dataByTimeRange.monthly;

  // Line chart data for requests trend
  const lineChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Food Requests",
        data: currentData.requestsTrend,
        borderColor: "rgba(16, 185, 129, 0.8)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Pie chart data for NGO distribution
  const ngoPieData = {
    labels: ["Small NGOs", "Medium NGOs", "Large NGOs"],
    datasets: [
      {
        data: currentData.ngoDistribution,
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)"
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  // Pie chart data for Farmer status
  const farmerPieData = {
    labels: ["Active Farmers", "Inactive Farmers"],
    datasets: [
      {
        data: currentData.farmerDistribution,
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(239, 68, 68, 0.7)"
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(239, 68, 68, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        padding: 12,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.5)"
        }
      },
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.5)"
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        padding: 12,
        usePointStyle: true,
      }
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Analytics and Insights</h2>
        
        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
          <button
            onClick={() => setTimeRange("weekly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "weekly" 
                ? "bg-teal-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "monthly" 
                ? "bg-teal-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "yearly" 
                ? "bg-teal-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-600">Total Requests</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {currentData.totalRequests.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +12% from last {timeRange.replace("ly", "")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-600">Total Donations (kg)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {currentData.totalDonations.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +24% from last {timeRange.replace("ly", "")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-600">Total NGOs</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {currentData.totalNGOs.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +5% from last {timeRange.replace("ly", "")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-600">Total Farmers</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {currentData.totalFarmers.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +8% from last {timeRange.replace("ly", "")}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Trend Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Food Requests Trend ({timeRange})
          </h3>
          <div className="h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* NGO Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            NGO Distribution by Size
          </h3>
          <div className="h-80">
            <Pie data={ngoPieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farmer Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Farmer Status Distribution
          </h3>
          <div className="h-80">
            <Pie data={farmerPieData} options={pieOptions} />
          </div>
        </div>

        {/* Additional Chart Placeholder */}
        
      </div>
    </div>
  );
};

export default AnalyticsInsights;