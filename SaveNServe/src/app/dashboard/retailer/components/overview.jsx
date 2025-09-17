"use client";

import { useState, useEffect } from "react";
import { 
  BarChart2, Package, Handshake, Clock, MessageSquare, 
  Users, DollarSign, Filter, ChevronDown, ArrowUpDown 
} from "lucide-react";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const RetailerOverview = () => {
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample data that would change based on filters
  const [dashboardData, setDashboardData] = useState({
    totalSurplus: 128,
    successfulDonations: 94,
    pendingRequests: 14,
    newMessages: 7,
    totalNGOs: 23,
    estimatedProfit: 12500,
    demandData: [65, 59, 80, 81, 56, 55, 40],
    categoryDistribution: [35, 25, 20, 15, 5],
    recentDonations: [
      { item: "Tomatoes", quantity: "50 kg", ngo: "Food For All", status: "Completed", date: "2025-04-12", value: 750 },
      { item: "Bread Loaves", quantity: "100 pcs", ngo: "Zero Hunger Org", status: "Completed", date: "2025-04-10", value: 1200 },
      { item: "Milk Packs", quantity: "30 liters", ngo: "Community Care", status: "Pending", date: "2025-04-14", value: 900 },
      { item: "Rice Bags", quantity: "20 kg", ngo: "Hope Foundation", status: "Completed", date: "2025-04-08", value: 1500 },
      { item: "Vegetables", quantity: "40 kg", ngo: "Green Earth", status: "Completed", date: "2025-04-05", value: 800 },
    ]
  });

  // Simulate filter changes
  useEffect(() => {
    // In a real app, you would fetch data based on the timeFilter
    const newData = {
      monthly: {
        totalSurplus: 128,
        successfulDonations: 94,
        demandData: [65, 59, 80, 81, 56, 55, 40],
      },
      weekly: {
        totalSurplus: 42,
        successfulDonations: 28,
        demandData: [25, 19, 30, 31, 26, 25, 20],
      },
      yearly: {
        totalSurplus: 1560,
        successfulDonations: 1128,
        demandData: [85, 79, 90, 91, 86, 85, 80, 75, 82, 88, 90, 92],
      }
    };

    setDashboardData(prev => ({
      ...prev,
      ...newData[timeFilter],
    }));
  }, [timeFilter]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedDonations = [...dashboardData.recentDonations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const demandChartData = {
    labels: timeFilter === 'yearly' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Predicted Demand',
        data: dashboardData.demandData,
        backgroundColor: 'rgba(13, 148, 136, 0.7)',
        borderColor: 'rgba(13, 148, 136, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: ['Produce', 'Bakery', 'Dairy', 'Meat', 'Other'],
    datasets: [
      {
        data: dashboardData.categoryDistribution,
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(244, 63, 94, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(244, 63, 94, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Retailer Dashboard</h1>
          <p className="text-gray-600">Overview of your surplus management</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {timeFilter === 'weekly' ? 'Last 7 Days' : 
               timeFilter === 'monthly' ? 'Last 30 Days' : 'Last 12 Months'}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button 
                  onClick={() => {
                    setTimeFilter('weekly');
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Last 7 Days
                </button>
                <button 
                  onClick={() => {
                    setTimeFilter('monthly');
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Last 30 Days
                </button>
                <button 
                  onClick={() => {
                    setTimeFilter('yearly');
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Last 12 Months
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[
          {
            title: "Total Surplus Listed",
            count: dashboardData.totalSurplus,
            icon: <Package className="h-6 w-6 text-blue-600" />,
            color: "bg-blue-50 border border-blue-100",
            trend: "12% increase",
            trendColor: "text-green-600"
          },
          {
            title: "Successful Donations",
            count: dashboardData.successfulDonations,
            icon: <Handshake className="h-6 w-6 text-green-600" />,
            color: "bg-green-50 border border-green-100",
            trend: "8% increase",
            trendColor: "text-green-600"
          },
          {
            title: "Pending Requests",
            count: dashboardData.pendingRequests,
            icon: <Clock className="h-6 w-6 text-yellow-600" />,
            color: "bg-yellow-50 border border-yellow-100",
            trend: "3 new today",
            trendColor: "text-yellow-600"
          },
          {
            title: "New Messages",
            count: dashboardData.newMessages,
            icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
            color: "bg-purple-50 border border-purple-100",
            trend: "2 unread",
            trendColor: "text-purple-600"
          },
          {
            title: "NGOs Connected",
            count: dashboardData.totalNGOs,
            icon: <Users className="h-6 w-6 text-teal-600" />,
            color: "bg-teal-50 border border-teal-100",
            trend: "5 new this month",
            trendColor: "text-teal-600"
          },
          {
            title: "Estimated Profit",
            count: `$${dashboardData.estimatedProfit.toLocaleString()}`,
            icon: <DollarSign className="h-6 w-6 text-emerald-600" />,
            color: "bg-emerald-50 border border-emerald-100",
            trend: "15% increase",
            trendColor: "text-emerald-600"
          }
        ].map((item) => (
          <div
            key={item.title}
            className={`p-4 rounded-xl ${item.color} transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg p-2 bg-white shadow-sm">
                {item.icon}
              </div>
              <span className={`text-xs font-medium ${item.trendColor}`}>
                {item.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Demand Prediction */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                AI Demand Prediction
              </h2>
              <p className="text-gray-500 text-sm">
                Forecasted demand for your surplus items
              </p>
            </div>
            <BarChart2 className="h-5 w-5 text-teal-600" />
          </div>
          <div className="h-64 mt-2">
            <Bar 
              data={demandChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Demand Index',
                    },
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Category Distribution
              </h2>
              <p className="text-gray-500 text-sm">
                Breakdown of your surplus items
              </p>
            </div>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="h-64">
            <Pie 
              data={categoryChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Donations
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your most recent surplus donations
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('item')}
                >
                  <div className="flex items-center">
                    Item
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ngo')}
                >
                  <div className="flex items-center">
                    NGO
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center">
                    Value
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedDonations.map((donation, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{donation.item}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{donation.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{donation.ngo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        donation.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{donation.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rs. {donation.value.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
            View all donations →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetailerOverview;