"use client";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  HeartHandshake,
  BarChart2,
  MessageSquare,
  FileText,
  HelpCircle,
  Bell,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Search,
  Filter,
  Download,
  PlusCircle,
  ArrowLeft
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
import { useState, useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Messages from "../components/Messages";
import ReportsPage from "./component/Reports";
import NGOHelpPage from "./component/Help";

const NGODashboard = () => {
  // Navigation state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Requests state
  const [activeRequestTab, setActiveRequestTab] = useState('all');
  const [expandedRequests, setExpandedRequests] = useState([]);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Food listings state
  // const [foodListings, setFoodListings] = useState([
  //   { 
  //     id: 1, 
  //     name: "Organic Tomatoes", 
  //     quantity: "500", 
  //     unit: "kg",
  //     type: "Vegetables", 
  //     expiry: "2023-12-20", 
  //     status: "available", 
  //     location: "Farm A, Maharashtra",
  //     distance: "15 km",
  //     farmer: "Green Fields Co-op",
  //     contact: "farm@greenfields.com",
  //     qualityGrade: "A",
  //     storageCondition: "Room Temperature",
  //     description: "Fresh organic tomatoes from greenhouse",
  //     image: "/sample-tomatoes.jpg"
  //   },
  //   { 
  //     id: 2, 
  //     name: "Whole Grain Bread", 
  //     quantity: "300", 
  //     unit: "kg",
  //     type: "Bakery", 
  //     expiry: "2023-12-18", 
  //     status: "reserved", 
  //     location: "Bakery B, Mumbai",
  //     distance: "8 km",
  //     farmer: "Daily Bread Bakery",
  //     contact: "info@dailybread.com",
  //     qualityGrade: "B",
  //     storageCondition: "Dry Storage",
  //     description: "Day-old whole grain bread, still fresh",
  //     image: "/sample-bread.jpg"
  //   }
  // ]);

  // Donation requests data
  const [donationRequests, setDonationRequests] = useState([
    { 
      id: 1, 
      ngoName: "Food for All", 
      program: "Community Kitchen", 
      beneficiaries: "250",
      foodType: "Vegetables", 
      quantity: "200 kg", 
      status: "pending", 
      location: "Mumbai Central",
      dateRequested: "2023-06-15",
      urgency: "high",
      contact: "foodforall@example.com",
      notes: "For daily meals at homeless shelter"
    },
    { 
      id: 2, 
      ngoName: "Hunger Free India", 
      program: "School Meal Program", 
      beneficiaries: "500",
      foodType: "Grains", 
      quantity: "500 kg", 
      status: "approved", 
      location: "Delhi",
      dateRequested: "2023-06-18",
      urgency: "medium",
      contact: "contact@hungerfree.org",
      notes: "Weekly meals for underprivileged children"
    }
  ]);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    program: "",
    foodType: "",
    quantity: "",
    unit: "kg",
    urgency: "medium",
    requiredDate: "",
    location: "",
    beneficiaries: "",
    notes: ""
  });

  // Constants
  const foodTypes = [
    "Grains (Wheat, Rice, etc.)",
    "Vegetables",
    "Fruits",
    "Dairy Products",
    "Pulses",
    "Bakery",
    "Prepared Meals",
    "Other"
  ];

  const urgencyLevels = [
    { value: "high", label: "High (Immediate need)" },
    { value: "medium", label: "Medium (Within 3 days)" },
    { value: "low", label: "Low (Planning ahead)" }
  ];

  const units = ["kg", "lbs", "liters", "pieces", "boxes", "crates"];

  // AI Insights state
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("distribution");
  const [activeChartTab, setActiveChartTab] = useState("impact");
  const [forecastPeriod, setForecastPeriod] = useState("1month");

  // ======================
  // REQUESTS SECTION LOGIC
  // ======================

  // Filter requests based on active tab and search
  const filteredRequests = donationRequests
    .filter((req) => {
      // Tab filtering
      if (activeRequestTab === 'pending') return req.status === 'pending';
      if (activeRequestTab === 'approved') return req.status === 'approved';
      if (activeRequestTab === 'completed') return req.status === 'completed';
      return true;
    })
    .filter((req) => 
      req.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.foodType.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sorting logic
      if (sortOption === "newest") return new Date(b.dateRequested) - new Date(a.dateRequested);
      if (sortOption === "urgency") {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      if (sortOption === "beneficiaries") return b.beneficiaries - a.beneficiaries;
      return 0;
    });

  // Helper functions
  const toggleRequestDetails = (id) => {
    setExpandedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  const openRequestModal = (req) => {
    setSelectedRequest(req);
    setRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setRequestModalOpen(false);
  };

  const openCollectionModal = (req) => {
    setSelectedRequest(req);
    setCollectionModalOpen(true);
  };

  const closeCollectionModal = () => {
    setCollectionModalOpen(false);
  };

  const handleRequestStatusChange = (id, newStatus) => {
    setDonationRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    setRequestModalOpen(false);
    setCollectionModalOpen(false);
    toast.success(`Request status updated to ${newStatus}`);
  };

  const handleDeleteRequest = (id) => {
    setDonationRequests((prev) => prev.filter((req) => req.id !== id));
    toast.success('Request deleted successfully');
  };

  // ======================
  // FOOD LISTINGS LOGIC
  // ======================

  // const filteredFoodListings = foodListings
  //   .filter((item) => item.status === 'available')
  //   .filter((item) => 
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.type.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     if (sortOption === "newest") return new Date(b.expiry) - new Date(a.expiry);
  //     if (sortOption === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
  //     if (sortOption === "quantity") return b.quantity - a.quantity;
  //     return 0;
  //   });

  const handleReserveFood = (itemId) => {
    setFoodListings(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: "reserved" } : item
      )
    );
    toast.success('Food item reserved successfully');
  };

  // ====================
  // NEW REQUEST LOGIC
  // ====================

  const handleAddRequest = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newRequest.program || !newRequest.foodType || !newRequest.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const newReq = {
        id: donationRequests.length + 1,
        ngoName: "Your NGO Name", // This would come from auth context in real app
        program: newRequest.program,
        foodType: newRequest.foodType,
        quantity: `${newRequest.quantity} ${newRequest.unit}`,
        status: "pending",
        location: newRequest.location,
        beneficiaries: newRequest.beneficiaries,
        dateRequested: new Date().toISOString().split('T')[0],
        urgency: newRequest.urgency,
        contact: "your-ngo@example.com", // From auth context
        notes: newRequest.notes
      };

      setDonationRequests([...donationRequests, newReq]);
      
      // Reset form
      setNewRequest({
        program: "",
        foodType: "",
        quantity: "",
        unit: "kg",
        urgency: "medium",
        requiredDate: "",
        location: "",
        beneficiaries: "",
        notes: ""
      });

      toast.success("Donation request submitted successfully!");
      setActiveTab("requests");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    }
  };

  // ======================
  // RENDER COMPONENTS
  // ======================

  // AI Insights Data Generators
  const generateImpactData = () => {
    const labels = {
      "3months": ["Oct", "Nov", "Dec"],
      "6months": ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "12months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
    
    const data = {
      "3months": [1200, 1500, 1800],
      "6months": [800, 1000, 1200, 1500, 1800, 2100],
      "12months": [500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000, 2200]
    };
    
    return {
      labels: labels[timeRange],
      datasets: [
        {
          label: "Meals Provided",
          data: data[timeRange],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1
        }
      ]
    };
  };

  const generateDistributionData = () => ({
    labels: ["Children", "Homeless", "Elderly", "Families", "Others"],
    datasets: [
      {
        label: "Beneficiaries Served",
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6",
          "#94a3b8"
        ],
        borderWidth: 0
      }
    ]
  });

  const generateEfficiencyData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Food Collected (kg)",
        data: [450, 520, 600, 750, 820, 900],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        yAxisID: "y"
      },
      {
        label: "Distribution Efficiency (%)",
        data: [65, 70, 75, 80, 85, 88],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        yAxisID: "y1"
      }
    ]
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">NGO Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: Today, 10:45 AM</div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-medium">Meals Provided</h3>
          <div className="flex items-end mt-4">
            <span className="text-3xl font-bold">2,450</span>
            <span className="ml-2 text-blue-100">this month</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-200">↑ 12%</span>
            <span className="text-blue-100 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <h3 className="text-lg font-medium text-gray-700">Active Programs</h3>
          <div className="flex items-end mt-4">
            <span className="text-3xl font-bold">8</span>
            <span className="ml-2 text-sm text-green-600">+2 new</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">Serving 5 communities</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500">
          <h3 className="text-lg font-medium text-gray-700">Pending Requests</h3>
          <div className="flex items-end mt-4">
            <span className="text-3xl font-bold">3</span>
            <span className="ml-2 text-sm text-amber-600">Urgent: 1</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">Need approval</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <h3 className="text-lg font-medium text-gray-700">Food Saved</h3>
          <div className="flex items-end mt-4">
            <span className="text-3xl font-bold">1,250</span>
            <span className="ml-2 text-sm text-purple-600">kg</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">From going to waste</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Distribution completed</p>
                <p className="text-sm text-gray-500">200 kg vegetables to Mumbai Central shelter</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                2 hours ago
              </div>
            </div>
            
            <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Collection scheduled</p>
                <p className="text-sm text-gray-500">150 kg bread from Daily Bread Bakery</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                Today, 9:30 AM
              </div>
            </div>
            
            <div className="flex items-start p-4 border rounded-lg hover:bg-gray-50">
              <div className="bg-amber-100 p-2 rounded-lg mr-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Urgent request</p>
                <p className="text-sm text-gray-500">Need 300 kg grains for school program</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                Yesterday
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Distributions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Community Kitchen</p>
                  <p className="text-sm text-gray-600">Tomorrow, 10 AM</p>
                </div>
               
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">School Meal Program</p>
                  <p className="text-sm text-gray-600">Jun 25, 8 AM</p>
                </div>
                
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Elderly Care Center</p>
                  <p className="text-sm text-gray-600">Jun 28, 11 AM</p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequestsList = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Donation Requests</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by program or food type..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {/* Sort Dropdown */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="urgency">Urgency</option>
            <option value="beneficiaries">Beneficiaries</option>
          </select>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['All', 'Pending', 'Approved', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeRequestTab === tab.toLowerCase()
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveRequestTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          {/* <Inbox className="h-12 w-12 mx-auto text-gray-400" /> */}
          <h3 className="mt-2 text-lg font-medium text-gray-900">No requests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeRequestTab === 'pending'
              ? "You currently have no pending requests."
              : activeRequestTab === 'approved'
              ? "No approved requests yet."
              : activeRequestTab === 'completed'
              ? "No completed requests found."
              : "Create your first request to get started."}
          </p>
          {activeRequestTab === 'all' && (
            <button
              onClick={() => setActiveTab('add-request')}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <PlusCircle className="h-5 w-5 inline mr-2" />
              New Request
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Needed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <>
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{request.program}</div>
                        <div className="text-sm text-gray-500">{request.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.foodType}</div>
                        <div className="text-sm text-gray-500">{request.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.beneficiaries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.dateRequested).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : request.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : request.urgency === "high"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {request.status === "pending" ? 
                            (request.urgency === "high" ? "Urgent" : "Pending") : 
                            request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleRequestDetails(request.id)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            {expandedRequests.includes(request.id) ? "Hide" : "View"}
                          </button>
                          {request.status === "approved" && (
                            <button
                              onClick={() => openCollectionModal(request)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Collect
                            </button>
                          )}
                          {request.status === "pending" && (
                            <button
                              onClick={() => openRequestModal(request)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedRequests.includes(request.id) && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                              <p className="text-sm text-gray-600">{request.notes}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Email:</span> {request.contact}
                              </p>
                              {request.status === "approved" && (
                                <button
                                  onClick={() => {
                                    setActiveTab("food-listings");
                                    setSearchQuery(request.foodType);
                                  }}
                                  className="mt-2 text-sm text-teal-600 hover:text-teal-800 flex items-center"
                                >
                                  Find matching food listings <ArrowRight className="h-4 w-4 ml-1" />
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Cancellation Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Cancel Request</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to cancel the request for <span className="font-medium">{selectedRequest?.quantity}</span> of <span className="font-medium">{selectedRequest?.foodType}</span>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeRequestModal}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={() => handleRequestStatusChange(selectedRequest.id, 'cancelled')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collection Confirmation Modal */}
      {collectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Confirm Collection</h3>
            <p className="mt-2 text-gray-600">
              Has the food for <span className="font-medium">{selectedRequest?.program}</span> been collected?
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="confirm-collection" className="mr-2" />
                <label htmlFor="confirm-collection" className="text-sm text-gray-700">
                  I confirm the food has been collected
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="confirm-distribution" className="mr-2" />
                <label htmlFor="confirm-distribution" className="text-sm text-gray-700">
                  Food has been distributed to beneficiaries
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeCollectionModal}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestStatusChange(selectedRequest.id, 'completed')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAddRequestForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">New Donation Request</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form className="space-y-6" onSubmit={handleAddRequest}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. School Meal Program"
                value={newRequest.program}
                onChange={(e) => setNewRequest({...newRequest, program: e.target.value})}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distribution Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. Mumbai Central"
                value={newRequest.location}
                onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                required
              />
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Type Needed <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newRequest.foodType}
                onChange={(e) => setNewRequest({...newRequest, foodType: e.target.value})}
                required
              >
                <option value="">Select Food Type</option>
                {foodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newRequest.urgency}
                onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                required
              >
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Needed <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g. 50"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={newRequest.unit}
                  onChange={(e) => setNewRequest({...newRequest, unit: e.target.value})}
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Required Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required By Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newRequest.requiredDate}
                onChange={(e) => setNewRequest({...newRequest, requiredDate: e.target.value})}
                required
              />
            </div>

            {/* Beneficiaries */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Beneficiaries <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. 100"
                value={newRequest.beneficiaries}
                onChange={(e) => setNewRequest({...newRequest, beneficiaries: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Special requirements, dietary restrictions, etc."
              value={newRequest.notes}
              onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:shadow-md"
              onClick={() => setActiveTab("requests")}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md"
            >
              Submit Request
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
  const renderAIInsights = () => {
    // Additional chart data generators
    const generateBeneficiaryTrendsData = () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Beneficiaries Served",
          data: [450, 520, 600, 750, 820, 900],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.3
        }
      ]
    });

    const generateProgramImpactData = () => ({
      labels: ["School Meals", "Community Kitchen", "Elderly Care", "Disaster Relief"],
      datasets: [
        {
          label: "Impact Score",
          data: [85, 92, 78, 95],
          backgroundColor: [
            "#10b981",
            "#3b82f6",
            "#f59e0b",
            "#8b5cf6"
          ]
        }
      ]
    });

    const generateCollectionEfficiencyData = () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Food Collected (kg)",
          data: [450, 520, 600, 750, 820, 900],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          yAxisID: "y"
        },
        {
          label: "Collection Time (hours)",
          data: [8, 7, 6.5, 6, 5.5, 5],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          yAxisID: "y1"
        }
      ]
    });
    
    return (
      <div className="space-y-8">
        {/* Header with improved styling */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">NGO Impact Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Data-driven insights to optimize your food distribution programs
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
          </div>
        </div>

        {/* Enhanced Stats Cards with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "People Fed This Month",
              value: "2,450",
              change: "+12%",
              trend: "up",
              icon: <Users className="h-6 w-6 text-teal-600" />,
              bgColor: "bg-teal-50"
            },
            {
              title: "Food Collected (kg)",
              value: "1,850",
              change: "+18%",
              trend: "up",
              icon: <Package className="h-6 w-6 text-blue-600" />,
              bgColor: "bg-blue-50"
            },
            {
              title: "Active Programs",
              value: "8",
              change: "+2",
              trend: "up",
              icon: <HeartHandshake className="h-6 w-6 text-purple-600" />,
              bgColor: "bg-purple-50"
            },
            {
              title: "Waste Reduction",
              value: "92%",
              change: "+5%",
              trend: "up",
              icon: <CheckCircle className="h-6 w-6 text-green-600" />,
              bgColor: "bg-green-50"
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className={`${stat.bgColor} rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>
              </div>
              <div className={`mt-4 flex items-center text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
                {stat.trend === "up" ? (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "impact", label: "Impact Analytics" },
              { id: "beneficiaries", label: "Beneficiary Trends" },
              { id: "programs", label: "Program Performance" },
              { id: "efficiency", label: "Collection Efficiency" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChartTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeChartTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Impact Analytics Section */}
        {activeChartTab === "impact" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Impact Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Community Impact</h3>
                <select 
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  <option value="impact">By Month</option>
                  <option value="distribution">By Distribution</option>
                  <option value="program">By Program</option>
                </select>
              </div>
              <div className="h-80">
                {selectedMetric === "distribution" ? (
                  <Pie
                    data={generateDistributionData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "right" },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.label}: ${context.raw}%`;
                            }
                          }
                        }
                      }
                    }}
                  />
                ) : (
                  <Bar
                    data={selectedMetric === "impact" ? generateImpactData() : generateProgramImpactData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        tooltip: { 
                          mode: "index", 
                          intersect: false,
                          callbacks: {
                            label: function(context) {
                              return `${context.dataset.label}: ${context.raw} ${context.dataset.label.includes('Score') ? '' : 'people'}`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: { 
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Beneficiaries"
                          }
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Impact Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Savenserve Impact Comparison</h3>
              <div className="h-80">
                <Bar
                  data={{
                    labels: ["Traditional", "Savenserve"],
                    datasets: [
                      {
                        label: "People Fed Monthly",
                        data: [1200, 2450],
                        backgroundColor: "rgba(16, 185, 129, 0.5)"
                      },
                      {
                        label: "Collection Efficiency (%)",
                        data: [65, 92],
                        backgroundColor: "rgba(59, 130, 246, 0.5)"
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { 
                        position: "top",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle"
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            if (context.datasetIndex === 0) {
                              return `${context.dataset.label}: ${context.raw} people`;
                            } else {
                              return `${context.dataset.label}: ${context.raw}%`;
                            }
                          }
                        }
                      }
                    },
                    scales: {
                      y: { 
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "People / Percentage"
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">Insight:</span> NGOs using Savenserve serve 104% more beneficiaries on average compared to traditional methods.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Beneficiary Trends Section */}
        {activeChartTab === "beneficiaries" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Beneficiary Growth Trends</h3>
              <div className="h-96">
                <Line
                  data={generateBeneficiaryTrendsData()}
                  options={{
                    responsive: true,
                    interaction: {
                      mode: "index",
                      intersect: false
                    },
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          usePointStyle: true
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.raw} people`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Beneficiaries"
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium mb-4">Demographic Distribution</h4>
                <div className="h-64">
                  <Pie
                    data={generateDistributionData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: {
                            usePointStyle: true,
                            padding: 20
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.label}: ${context.raw}%`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium mb-4">Upcoming Community Events</h4>
                <div className="space-y-4">
                  {[
                    {
                      event: "School Reopening",
                      date: "Jun 15, 2023",
                      impact: "Expected +200 children",
                      icon: "📚",
                      color: "text-blue-600"
                    },
                    {
                      event: "Monsoon Preparedness",
                      date: "Jun 20, 2023",
                      impact: "Stockpile dry grains",
                      icon: "🌧️",
                      color: "text-indigo-600"
                    },
                    {
                      event: "Festival Season",
                      date: "Aug 30, 2023",
                      impact: "Increased demand for sweets",
                      icon: "🎉",
                      color: "text-amber-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <span className={`text-2xl mr-3 ${item.color}`}>{item.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{item.event}</p>
                        <p className="text-sm text-gray-600">
                          {item.date} • {item.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Program Performance Section */}
        {activeChartTab === "programs" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Program Impact Scores</h3>
              <div className="h-96">
                <Bar
                  data={generateProgramImpactData()}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `Impact Score: ${context.raw}/100`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: "Impact Score (0-100)"
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium mb-4">Program Funding Sources</h4>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: ["Government Grants", "Private Donations", "Corporate Sponsors", "Other"],
                      datasets: [
                        {
                          data: [40, 30, 20, 10],
                          backgroundColor: [
                            "#10b981",
                            "#3b82f6",
                            "#f59e0b",
                            "#8b5cf6"
                          ]
                        }
                      ]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom"
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm md:col-span-2">
                <h4 className="font-medium mb-4">Program Efficiency Metrics</h4>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ["School Meals", "Community Kitchen", "Elderly Care", "Disaster Relief"],
                      datasets: [
                        {
                          label: "Cost per Beneficiary (₹)",
                          data: [25, 18, 30, 35],
                          backgroundColor: "#10b981"
                        },
                        {
                          label: "Food Waste (%)",
                          data: [5, 8, 12, 3],
                          backgroundColor: "#3b82f6"
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top"
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Cost (₹) / Waste (%)"
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collection Efficiency Section */}
        {activeChartTab === "efficiency" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Collection Efficiency Trends</h3>
              <div className="h-96">
                <Line
                  data={generateCollectionEfficiencyData()}
                  options={{
                    responsive: true,
                    interaction: {
                      mode: "index",
                      intersect: false
                    },
                    plugins: {
                      legend: {
                        position: "top"
                      }
                    },
                    scales: {
                      y: {
                        type: "linear",
                        display: true,
                        position: "left",
                        title: {
                          display: true,
                          text: "Food Collected (kg)"
                        }
                      },
                      y1: {
                        type: "linear",
                        display: true,
                        position: "right",
                        title: {
                          display: true,
                          text: "Collection Time (hours)"
                        },
                        grid: {
                          drawOnChartArea: false
                        },
                        reverse: true
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium mb-4">Top Performing Drivers</h4>
                <div className="space-y-4">
                  {[
                    { driver: "Rajesh Kumar", efficiency: "98%", collections: "42" },
                    { driver: "Priya Patel", efficiency: "95%", collections: "38" },
                    { driver: "Amit Sharma", efficiency: "93%", collections: "35" },
                    { driver: "Sunita Devi", efficiency: "91%", collections: "32" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{item.driver}</p>
                        <p className="text-sm text-gray-600">{item.collections} collections</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {item.efficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-medium mb-4">Route Optimization Tips</h4>
                <div className="space-y-4">
                  {[
                    { tip: "Cluster collections by area", impact: "Reduces travel time by 25%" },
                    { tip: "Prioritize perishables first", impact: "Reduces spoilage by 15%" },
                    { tip: "Use morning hours for dairy", impact: "Maintains freshness" },
                    { tip: "Coordinate with other NGOs", impact: "Shared logistics savings" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 border-b border-gray-100">
                      <div className="bg-teal-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="h-4 w-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{item.tip}</p>
                        <p className="text-sm text-gray-600">{item.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts & Recommendations Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Real-Time Alerts & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">New Food Available</h4>
                  <p className="mt-1 text-sm text-blue-700">
                    200kg vegetables available 5km from your community kitchen.
                  </p>
                 
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">Urgent Need</h4>
                  <p className="mt-1 text-sm text-amber-700">
                    School meal program running low on grains - request more.
                  </p>
                  
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-purple-800">Upcoming Distribution</h4>
                  <p className="mt-1 text-sm text-purple-700">
                    Elderly care center distribution scheduled for tomorrow.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Your Monthly Impact Summary</h3>
          <p className="mb-4">
            Based on your current programs and our data, here's your impact for this month:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm">People Fed</p>
              <p className="text-2xl font-bold">2,450</p>
              <p className="text-sm opacity-80">+12% from last month</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm">Food Collected</p>
              <p className="text-2xl font-bold">1,850</p>
              <p className="text-sm opacity-80">kg</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm">Waste Reduced</p>
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm opacity-80">Of collected food used</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-sm">Program Efficiency</p>
              <p className="text-2xl font-bold">88/100</p>
              <p className="text-sm opacity-80">Impact score</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "requests":
        return renderRequestsList();
      case "add-request":
        return renderAddRequestForm();
      // case "food-listings":
      //   return renderFoodListings();
      case "ai":
        return renderAIInsights();
      case 'messages':
        return <Messages />;
      case 'reports':
        return <ReportsPage />;
      case 'help':
        return <NGOHelpPage/>;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            {/* Add content for other tabs */}
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
        <div className={`fixed md:relative z-40 md:z-0 w-64 h-full bg-white border-r border-gray-200 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">NGO Portal</h1>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
                { id: "add-request", icon: <PlusCircle className="h-5 w-5" />, label: "New Request" },
                { id: "requests", label: "My Requests" },
                { id: "ai", icon: <BarChart2 className="h-5 w-5" />, label: "Impact Analytics" },
                { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
                { id: "reports", icon: <FileText className="h-5 w-5" />, label: "Reports" },
                { id: "help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === item.id 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default NGODashboard;
            