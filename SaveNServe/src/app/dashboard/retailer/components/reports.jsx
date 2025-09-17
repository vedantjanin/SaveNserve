"use client";

import { BarChart2, FileText, Download, Calendar, Filter, ArrowUpRight } from "lucide-react";
import { BarChart, LineChart, PieChart } from "@tremor/react";
import { useState } from "react";
import * as XLSX from 'xlsx';

const Reports = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState(null);
  const [chartType, setChartType] = useState({
    sales: "bar",
    profit: "line"
  });

  // Sample data for charts
  const dataByRange = {
    weekly: {
      sales: [
        { date: "Week 1", Sales: 2450, Donations: 800 },
        { date: "Week 2", Sales: 3200, Donations: 1200 },
        { date: "Week 3", Sales: 2800, Donations: 900 },
        { date: "Week 4", Sales: 4100, Donations: 1500 },
      ],
      profit: [
        { date: "Week 1", Profit: 950 },
        { date: "Week 2", Profit: 1350 },
        { date: "Week 3", Profit: 1150 },
        { date: "Week 4", Profit: 1850 },
      ]
    },
    monthly: {
      sales: [
        { date: "Jan", Sales: 3450, Donations: 1200 },
        { date: "Feb", Sales: 4200, Donations: 1800 },
        { date: "Mar", Sales: 5200, Donations: 2100 },
        { date: "Apr", Sales: 4800, Donations: 1900 },
        { date: "May", Sales: 6100, Donations: 2300 },
      ],
      profit: [
        { date: "Jan", Profit: 1250 },
        { date: "Feb", Profit: 1850 },
        { date: "Mar", Profit: 2450 },
        { date: "Apr", Profit: 2100 },
        { date: "May", Profit: 2950 },
      ]
    },
    yearly: {
      sales: [
        { date: "2020", Sales: 28500, Donations: 9800 },
        { date: "2021", Sales: 35200, Donations: 12500 },
        { date: "2022", Sales: 41200, Donations: 15800 },
        { date: "2023", Sales: 49800, Donations: 19200 },
      ],
      profit: [
        { date: "2020", Profit: 11200 },
        { date: "2021", Profit: 15800 },
        { date: "2022", Profit: 19500 },
        { date: "2023", Profit: 24500 },
      ]
    }
  };

  const retailerPerformance = [
    { name: "Retailer A", Performance: 89, Trend: "up" },
    { name: "Retailer B", Performance: 76, Trend: "down" },
    { name: "Retailer C", Performance: 92, Trend: "up" },
    { name: "Retailer D", Performance: 81, Trend: "up" },
    { name: "Retailer E", Performance: 68, Trend: "down" },
  ];

  const donationHistory = [
    { id: 1, date: "2023-05-15", amount: 1200, status: "Completed", recipient: "School A" },
    { id: 2, date: "2023-05-10", amount: 800, status: "Pending", recipient: "Hospital B" },
    { id: 3, date: "2023-05-05", amount: 1500, status: "Completed", recipient: "Shelter C" },
    { id: 4, date: "2023-04-28", amount: 900, status: "Completed", recipient: "Community D" },
    { id: 5, date: "2023-04-20", amount: 600, status: "Cancelled", recipient: "School A" },
  ];

  const handleDownload = (reportType) => {
    let data, fileName;
    
    switch(reportType) {
      case "retailer-performance":
        data = retailerPerformance;
        fileName = "retailer_performance.xlsx";
        break;
      case "donation-history":
        data = donationHistory;
        fileName = "donation_history.xlsx";
        break;
      case "sales-data":
        data = dataByRange[timeRange].sales;
        fileName = `sales_data_${timeRange}.xlsx`;
        break;
      case "profit-data":
        data = dataByRange[timeRange].profit;
        fileName = `profit_data_${timeRange}.xlsx`;
        break;
      default:
        return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, fileName);
    
    setSelectedReport(reportType);
    setTimeout(() => setSelectedReport(null), 2000);
  };

  const toggleChartType = (chart) => {
    setChartType(prev => ({
      ...prev,
      [chart]: prev[chart] === "bar" ? "pie" : prev[chart] === "pie" ? "line" : "bar"
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <BarChart2 className="w-8 h-8 mr-3 text-teal-600" />
          Analytics Dashboard
        </h1>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">Rs.24,750</p>
          <p className="text-teal-100 text-sm mt-1">+12.5% from last month</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium">Total Donations</h3>
          <p className="text-3xl font-bold mt-2">Rs.9,300</p>
          <p className="text-blue-100 text-sm mt-1">+8.2% from last month</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium">Retailer Profit</h3>
          <p className="text-3xl font-bold mt-2">Rs.10,650</p>
          <p className="text-purple-100 text-sm mt-1">+15.3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Donations Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sales & Donations</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange("weekly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "weekly" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange("monthly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "monthly" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeRange("yearly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "yearly" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"}`}
              >
                Year
              </button>
              <button 
                onClick={() => toggleChartType("sales")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                title="Toggle chart type"
              >
               
              </button>
              <button 
                onClick={() => handleDownload("sales-data")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                title="Export data"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-80"> {/* Fixed height container */}
            {chartType.sales === "bar" ? (
              <BarChart
                data={dataByRange[timeRange].sales}
                categories={["Sales", "Donations"]}
                dataKey="date"
                colors={["teal", "blue"]}
                yAxisWidth={60}
                showAnimation={true}
              />
            ) : chartType.sales === "pie" ? (
              <PieChart
                data={dataByRange[timeRange].sales.flatMap(item => [
                  { name: `${item.date} Sales`, value: item.Sales },
                  { name: `${item.date} Donations`, value: item.Donations }
                ])}
                category="value"
                dataKey="name"
                colors={["teal", "blue", "teal-300", "blue-300", "teal-500", "blue-500"]}
                variant="pie"
                showAnimation={true}
              />
            ) : (
              <LineChart
                data={dataByRange[timeRange].sales}
                categories={["Sales", "Donations"]}
                dataKey="date"
                colors={["teal", "blue"]}
                yAxisWidth={60}
                showAnimation={true}
              />
            )}
          </div>
        </div>

        {/* Profit Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Profit Trend</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange("weekly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "weekly" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange("monthly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "monthly" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeRange("yearly")} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === "yearly" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}
              >
                Year
              </button>
              <button 
                onClick={() => toggleChartType("profit")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                title="Toggle chart type"
              >
              </button>
              <button 
                onClick={() => handleDownload("profit-data")}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                title="Export data"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-80"> {/* Fixed height container */}
            {chartType.profit === "bar" ? (
              <BarChart
                data={dataByRange[timeRange].profit}
                categories={["Profit"]}
                dataKey="date"
                colors={["purple"]}
                yAxisWidth={60}
                showAnimation={true}
              />
            ) : chartType.profit === "pie" ? (
              <PieChart
                data={dataByRange[timeRange].profit.map(item => ({
                  name: item.date,
                  value: item.Profit
                }))}
                category="value"
                dataKey="name"
                colors={["purple", "violet", "indigo", "fuchsia"]}
                variant="pie"
                showAnimation={true}
              />
            ) : (
              <LineChart
                data={dataByRange[timeRange].profit}
                categories={["Profit"]}
                dataKey="date"
                colors={["purple"]}
                yAxisWidth={60}
                showAnimation={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Retailer Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Retailer Performance (AI Model)</h2>
          <button 
            onClick={() => handleDownload("retailer-performance")}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {retailerPerformance.map((retailer) => (
                <tr key={retailer.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{retailer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{retailer.Performance}/100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      retailer.Trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {retailer.Trend === "up" ? "↑ Improving" : "↓ Declining"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Donation History</h2>
          <button 
            onClick={() => handleDownload("donation-history")}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationHistory.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {donation.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.recipient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      donation.status === "Completed" ? "bg-green-100 text-green-800" :
                      donation.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success notification */}
      {selectedReport && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {`${selectedReport.replace("-", " ")} report downloaded successfully!`}
        </div>
      )}
    </div>
  );
};

export default Reports;