import { useState } from "react";
import {
  Leaf,
  BarChart2,
  Truck,
  CheckCircle,
  CloudRain,
  Sun,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Download,
  Settings,
  User,
  Database,
  Shield,
  TrendingUp
} from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const AIInsights = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedWeatherMetric, setSelectedWeatherMetric] = useState("rainfall");
  const [exporting, setExporting] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // Sample data for charts
  const wasteReductionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Food Saved (kg)",
        data: [320, 450, 510, 600, 720, 850],
        backgroundColor: "#10b981",
        borderColor: "#059669",
        tension: 0.3
      },
      {
        label: "Food Wasted (kg)",
        data: [180, 150, 120, 90, 70, 50],
        backgroundColor: "#ef4444",
        borderColor: "#dc2626",
        tension: 0.3
      }
    ]
  };

  const wasteCompositionData = {
    labels: ["Vegetables", "Fruits", "Grains", "Dairy", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6",
          "#64748b"
        ],
        borderWidth: 0
      }
    ]
  };

  const weatherImpactData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [120, 90, 150, 200],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        yAxisID: "y"
      },
      {
        label: "Temperature (°C)",
        data: [28, 32, 30, 35],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        yAxisID: "y1"
      },
      {
        label: "Food Waste (kg)",
        data: [80, 60, 110, 150],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        yAxisID: "y2"
      }
    ]
  };

  const seasonalDemandData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Grains",
        data: [65, 59, 80, 81],
        backgroundColor: "rgba(245, 158, 11, 0.6)"
      },
      {
        label: "Vegetables",
        data: [28, 48, 40, 19],
        backgroundColor: "rgba(16, 185, 129, 0.6)"
      },
      {
        label: "Fruits",
        data: [45, 25, 35, 55],
        backgroundColor: "rgba(139, 92, 246, 0.6)"
      }
    ]
  };

  const profitabilityData = {
    labels: ["Traditional", "Savenserve"],
    datasets: [
      {
        label: "Cost Recovery (%)",
        data: [45, 78],
        backgroundColor: ["#94a3b8", "#10b981"]
      }
    ]
  };

  const farmerBenefitsData = {
    labels: ["Increased Income", "Reduced Waste", "Market Access", "Risk Mitigation"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6"
        ],
        borderWidth: 0
      }
    ]
  };

  // Handle export functionality
  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        dashboardData: {
          timeRange,
          activeTab,
          stats: [
            { title: "Total Food Saved", value: "2,450 kg" },
            { title: "Potential Earnings", value: "₹68,500" },
            { title: "Reduced Waste", value: "1,200 kg" },
            { title: "NGOs Connected", value: "24" }
          ]
        }
      }));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `savenserve-insights-${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setExporting(false);
    }, 1500);
  };

  // Handle recommendation selection
  const handleRecommendationSelect = (index) => {
    setSelectedRecommendation(selectedRecommendation === index ? null : index);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Insights Dashboard</h1>
          <p className="text-gray-600">
            Data-driven recommendations to optimize your food surplus management
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center disabled:opacity-50"
          >
            {exporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Export
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "weather", label: "Weather Impact" },
            { id: "seasonal", label: "Seasonal Trends" },
            { id: "benefits", label: "Farmer Benefits" },
            { id: "recommendations", label: "AI Recommendations" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Food Saved",
            value: "2,450 kg",
            change: "+12%",
            trend: "up",
            icon: <Leaf className="h-6 w-6 text-teal-600" />,
            onClick: () => alert("View detailed food savings report")
          },
          {
            title: "Potential Earnings",
            value: "₹68,500",
            change: "+23%",
            trend: "up",
            icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
            onClick: () => alert("View earnings breakdown")
          },
          {
            title: "Reduced Waste",
            value: "1,200 kg",
            change: "-18%",
            trend: "down",
            icon: <Truck className="h-6 w-6 text-green-600" />,
            onClick: () => alert("View waste reduction strategies")
          },
          {
            title: "NGOs Connected",
            value: "24",
            change: "+5",
            trend: "up",
            icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
            onClick: () => alert("View NGO network")
          }
        ].map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div
              className={`mt-4 flex items-center text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change}
              {stat.trend === "up" ? (
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              )}
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Waste Reduction */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Food Waste Reduction</h3>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-sm"
              onChange={(e) => alert(`Viewing data by ${e.target.value}`)}
            >
              <option>By Month</option>
              <option>By Quarter</option>
              <option>By Crop Type</option>
            </select>
          </div>
          <div className="h-80">
            <Bar
              data={wasteReductionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top"
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Kilograms (kg)"
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => alert("View detailed waste reduction analysis")}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
            >
              View detailed analysis <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Waste Composition */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Waste Composition</h3>
          <div className="h-80">
            <Pie
              data={wasteCompositionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right"
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button 
              onClick={() => alert("View waste reduction strategies")}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
            >
              Reduction strategies <ArrowRight className="h-4 w-4 ml-1" />
            </button>
            <button 
              onClick={() => alert("View donation opportunities")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              Donate surplus <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Weather Impact Section */}
      {activeTab === "weather" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Weather Impact Analysis</h3>
              <p className="text-gray-600">
                How rainfall and temperature affect your food surplus
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedWeatherMetric("rainfall")}
                className={`px-3 py-1 rounded-lg flex items-center ${
                  selectedWeatherMetric === "rainfall" 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                <CloudRain className="h-4 w-4 mr-1" />
                Rainfall
              </button>
              <button 
                onClick={() => setSelectedWeatherMetric("temperature")}
                className={`px-3 py-1 rounded-lg flex items-center ${
                  selectedWeatherMetric === "temperature" 
                    ? "bg-amber-100 text-amber-600" 
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                }`}
              >
                <Sun className="h-4 w-4 mr-1" />
                Temperature
              </button>
            </div>
          </div>
          <div className="h-96">
            <Line
              data={{
                ...weatherImpactData,
                datasets: weatherImpactData.datasets.filter(dataset => 
                  selectedWeatherMetric === "rainfall" 
                    ? dataset.label.includes("Rainfall") || dataset.label.includes("Food Waste")
                    : dataset.label.includes("Temperature") || dataset.label.includes("Food Waste")
                )
              }}
              options={{
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false
                },
                scales: {
                  y: {
                    type: "linear",
                    display: true,
                    position: "left",
                    title: {
                      display: true,
                      text: selectedWeatherMetric === "rainfall" ? "Rainfall (mm)" : "Temperature (°C)"
                    }
                  },
                  y1: {
                    type: "linear",
                    display: true,
                    position: "right",
                    title: {
                      display: true,
                      text: "Food Waste (kg)"
                    },
                    grid: {
                      drawOnChartArea: false
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 flex items-center">
                <CloudRain className="h-5 w-5 mr-2" />
                Rainfall Alert
              </h4>
              <p className="mt-2 text-sm text-blue-700">
                Expected heavy rainfall next week may affect 15-20% of your stored grains.
              </p>
              <button 
                onClick={() => alert("View rainfall protection measures")}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                Protection measures <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800 flex items-center">
                <Sun className="h-5 w-5 mr-2" />
                Heatwave Warning
              </h4>
              <p className="mt-2 text-sm text-amber-700">
                Temperatures rising to 38°C may accelerate spoilage of perishables.
              </p>
              <button 
                onClick={() => alert("View cooling storage options")}
                className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
              >
                Cooling solutions <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h4 className="font-medium text-teal-800 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Storage Advice
              </h4>
              <p className="mt-2 text-sm text-teal-700">
                Move 30% of vegetables to climate-controlled storage this week.
              </p>
              <button 
                onClick={() => alert("View storage partners")}
                className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                Storage partners <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Trends Section */}
      {activeTab === "seasonal" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Seasonal Demand Patterns</h3>
            <div className="h-96">
              <Bar
                data={seasonalDemandData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top"
                    },
                    title: {
                      display: true,
                      text: "Average Monthly Demand by Food Category"
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Demand Index"
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => alert("View seasonal planning calendar")}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                View seasonal calendar <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-medium mb-4">Upcoming Festival Impact</h4>
              <div className="space-y-4">
                {[
                  {
                    festival: "Diwali",
                    date: "Nov 12, 2023",
                    impact: "High demand for grains, sweets (+40%)",
                    icon: "🪔",
                    action: () => alert("View Diwali demand forecast")
                  },
                  {
                    festival: "Christmas",
                    date: "Dec 25, 2023",
                    impact: "Increased demand for dairy (+25%)",
                    icon: "🎄",
                    action: () => alert("View Christmas demand forecast")
                  },
                  {
                    festival: "Pongal",
                    date: "Jan 15, 2024",
                    impact: "Sugar, rice demand peaks (+35%)",
                    icon: "🍚",
                    action: () => alert("View Pongal demand forecast")
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                    onClick={item.action}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <p className="font-medium">{item.festival}</p>
                      <p className="text-sm text-gray-600">
                        {item.date} • {item.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-medium mb-4">Profitability Analysis</h4>
              <div className="h-64">
                <Bar
                  data={profitabilityData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Using Savenserve increases your cost recovery by 33% compared to traditional methods.
              </p>
              <button 
                onClick={() => alert("View profitability breakdown")}
                className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                View full report <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Benefits Section */}
      {activeTab === "benefits" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">How Savenserve Benefits Farmers</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96">
                <Pie
                  data={farmerBenefitsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "right"
                      },
                      title: {
                        display: true,
                        text: "Farmer Benefit Distribution",
                        position: "top"
                      }
                    }
                  }}
                />
              </div>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-800 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Increased Income
                  </h4>
                  <p className="mt-2 text-sm text-green-700">
                    Farmers using Savenserve report 35% higher income on average by connecting directly with buyers and reducing middlemen.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Reduced Waste
                  </h4>
                  <p className="mt-2 text-sm text-blue-700">
                    Our platform helps farmers reduce food waste by 25% through better demand matching and surplus redistribution.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Market Access
                  </h4>
                  <p className="mt-2 text-sm text-purple-700">
                    Access to 200+ verified buyers including restaurants, caterers, and NGOs across the region.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-amber-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Risk Mitigation
                  </h4>
                  <p className="mt-2 text-sm text-amber-700">
                    Weather alerts and demand forecasts help farmers plan better and reduce crop failure risks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Farmer Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Kumar",
                  location: "Punjab",
                  story: "Increased income by 40% by selling surplus through Savenserve",
                  image: "👨‍🌾"
                },
                {
                  name: "Priya Sharma",
                  location: "Maharashtra",
                  story: "Reduced waste from 30% to 8% using our demand forecasting",
                  image: "👩‍🌾"
                },
                {
                  name: "Singh Farms",
                  location: "Haryana",
                  story: "Connected with 15 new buyers in first 3 months",
                  image: "🏡"
                }
              ].map((farmer, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => alert(`View ${farmer.name}'s full story`)}
                >
                  <div className="text-4xl mb-3">{farmer.image}</div>
                  <h4 className="font-medium">{farmer.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{farmer.location}</p>
                  <p className="text-sm">{farmer.story}</p>
                  <button className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center">
                    Read more <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations Section */}
      {activeTab === "recommendations" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">AI-Powered Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Storage Optimization",
                  description:
                    "Based on weather forecasts, we recommend increasing refrigeration capacity by 15% for tomatoes next week.",
                  details: "Our analysis shows that current storage capacity may be insufficient for the upcoming heatwave. Investing in additional refrigeration could prevent ₹12,500 in potential losses.",
                  icon: "❄️",
                  urgency: "medium",
                  action: "View storage options"
                },
                {
                  title: "Festival Preparation",
                  description:
                    "Diwali demand expected to increase by 30% for pulses. Consider increasing production by 20%.",
                  details: "Historical data indicates pulse prices rise by 18-22% during Diwali. Early planning could increase your profits by ₹8,000-₹12,000 this season.",
                  icon: "🎆",
                  urgency: "high",
                  action: "Plan production"
                },
                {
                  title: "NGO Partnership",
                  description:
                    "3 NGOs in your area have high demand for vegetables. Connect now to reduce potential waste.",
                  details: "These NGOs can absorb up to 150kg of surplus produce weekly, providing a steady secondary market and potential tax benefits.",
                  icon: "🤝",
                  urgency: "low",
                  action: "View NGOs"
                },
                {
                  title: "Transport Optimization",
                  description:
                    "New route available that reduces delivery time to Mumbai markets by 2 hours.",
                  details: "This optimized route could save ₹1,200-₹1,800 monthly in fuel costs and reduce spoilage during transit by 5-7%.",
                  icon: "🚚",
                  urgency: "medium",
                  action: "Optimize routes"
                },
                {
                  title: "Price Adjustment",
                  description:
                    "Current market rates suggest 8% higher MSP for wheat this month.",
                  details: "Local market prices are trending 12% above last month. Adjusting your prices could increase revenue by ₹4,500-₹6,000 per ton.",
                  icon: "💰",
                  urgency: "low",
                  action: "Adjust prices"
                },
                {
                  title: "Crop Rotation",
                  description:
                    "Soil analysis suggests rotating legumes with your current crops next season.",
                  details: "This rotation could improve soil nitrogen levels by 30-35%, potentially increasing next season's yield by 8-12%.",
                  icon: "🌱",
                  urgency: "medium",
                  action: "View plan"
                }
              ].map((rec, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-lg border ${
                    rec.urgency === "high"
                      ? "border-red-200 bg-red-50"
                      : rec.urgency === "medium"
                      ? "border-amber-200 bg-amber-50"
                      : "border-green-200 bg-green-50"
                  } cursor-pointer`}
                  onClick={() => handleRecommendationSelect(index)}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{rec.icon}</span>
                    <div>
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {rec.description}
                      </p>
                      {selectedRecommendation === index && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm">{rec.details}</p>
                        </div>
                      )}
                      <button 
                        className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Action: ${rec.action}`);
                        }}
                      >
                        {rec.action} <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Risk Alerts</h3>
            <div className="space-y-4">
              <div 
                className="flex items-start p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100"
                onClick={() => alert("View pest control measures")}
              >
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">
                    Pest Alert: Tomato Leaf Miner
                  </h4>
                  <p className="mt-1 text-sm text-red-700">
                    Increased activity detected in your region. Recommended preventive
                    measures should be applied within 7 days.
                  </p>
                </div>
              </div>
              <div 
                className="flex items-start p-4 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100"
                onClick={() => alert("View labor solutions")}
              >
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">
                    Labor Shortage Warning
                  </h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Upcoming festival season may cause 20-25% harvest labor shortage.
                    Plan workforce in advance.
                  </p>
                </div>
              </div>
              <div 
                className="flex items-start p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100"
                onClick={() => alert("View market trends")}
              >
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    Market Price Fluctuation
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Onion prices expected to drop 15-18% next month due to increased supply.
                    Consider adjusting your sales strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;