"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Filter,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Package,
  Users
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const dummyData = {
  weeklySurplus: [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 18 },
    { name: "Wed", value: 10 },
    { name: "Thu", value: 22 },
    { name: "Fri", value: 30 },
    { name: "Sat", value: 25 },
    { name: "Sun", value: 15 }
  ],
  monthlySurplus: [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 220 },
    { name: "May", value: 300 },
    { name: "Jun", value: 250 }
  ],
  yearlySurplus: [
    { name: "2020", value: 1200 },
    { name: "2021", value: 1800 },
    { name: "2022", value: 2200 },
    { name: "2023", value: 3500 }
  ],
  topItems: [
    { name: "Bread", value: 120 },
    { name: "Milk", value: 100 },
    { name: "Vegetables", value: 85 },
    { name: "Fruits", value: 75 },
    { name: "Eggs", value: 60 }
  ],
  donationImpact: [
    { name: "Pre-AI", value: 1200 },
    { name: "Post-AI", value: 3500 }
  ],
  profitGrowth: [
    { name: "Jan", preAI: 1200, postAI: 1500 },
    { name: "Feb", preAI: 1300, postAI: 1800 },
    { name: "Mar", preAI: 1100, postAI: 2000 },
    { name: "Apr", preAI: 1400, postAI: 2200 },
    { name: "May", preAI: 1500, postAI: 2500 },
    { name: "Jun", preAI: 1600, postAI: 3000 }
  ],
  trendSummary:
    "AI implementation has increased donations by 192% and profits by 87% compared to last year. Thursday remains the peak donation day, with Bread and Milk being the most donated items.",
  kpis: [
    { title: "Total Donations", value: "3,500", change: "+192%", icon: <Package className="w-5 h-5" /> },
    { title: "Profit Growth", value: "₹28,500", change: "+87%", icon: <DollarSign className="w-5 h-5" /> },
    { title: "New Beneficiaries", value: "1,250", change: "+45%", icon: <Users className="w-5 h-5" /> },
    { title: "Waste Reduction", value: "62%", change: "+38%", icon: <TrendingUp className="w-5 h-5" /> }
  ]
};

const AIInsights = () => {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState("week");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setData(dummyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const renderChart = () => {
    switch (timeRange) {
      case "week":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data.weeklySurplus}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" name="Items Donated" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case "month":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data.monthlySurplus}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                name="Items Donated"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "year":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data.yearlySurplus}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" name="Items Donated" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-indigo-600" />
            Insights
          </h1>
          <p className="text-gray-500 mt-1"> Maximize your donations and profits</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : data ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {data.kpis.map((kpi, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    {kpi.icon}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    {kpi.change} <ArrowUpRight className="w-4 h-4 ml-1" />
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 hover:shadow-md transition-all border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              {timeRange === "week" ? (
                <LineChart className="w-5 h-5 mr-2 text-blue-600" />
              ) : (
                <BarChart className="w-5 h-5 mr-2 text-blue-600" />
              )}
              Donation Trends ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
            </h2>
            <div className="h-80">{renderChart()}</div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Items */}
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                Top Donated Items
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={data.topItems}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.topItems.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Impact */}
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                 Impact on Donations
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data.donationImpact}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" name="Items Donated" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profit Growth */}
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
                Profit Growth Comparison
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={data.profitGrowth}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="preAI"
                      stroke="#F59E0B"
                      name="Before AI"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="postAI"
                      stroke="#10B981"
                      name="After AI"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights Summary */}
          <div className="bg-white rounded-xl shadow-sm p-4 mt-6 hover:shadow-md transition-all border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">📊 Insights Summary</h2>
            <p className="text-gray-700">{data.trendSummary}</p>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <h3 className="font-medium text-indigo-800">Recommendation</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Based on trends, we recommend increasing Bread and Milk inventory on Thursdays and Fridays to maximize
                donation potential. Consider targeted promotions for these high-donation items.
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-10">Loading  insights...</p>
      )}
    </div>
  );
};

export default AIInsights;