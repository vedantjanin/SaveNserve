"use client";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  Inbox, 
  BarChart2, 
  MessageSquare,
  FileText,
  HelpCircle,
  Leaf,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Image as ImageIcon,
  Upload,
  Info,
  CloudRain,
  Sun,
  Calendar,ArrowLeft
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
import 'react-toastify/dist/ReactToastify.css';
import Messages from "../components/Messages";
import Reports from "../components/Reports";
import Help from "../components/Help";
import OverviewPage from "../components/Overview";
const FarmerDashboard = () => {
  // Navigation state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Listings state
  const [activeListingTab, setActiveListingTab] = useState('all');
  const [expandedDetails, setExpandedDetails] = useState([]);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [collectedModalOpen, setCollectedModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Surplus items data
  const [surplusItems, setSurplusItems] = useState([
    { 
      id: 1, 
      name: "Organic Tomatoes", 
      quantity: "500", 
      unit: "kg",
      type: "Vegetables", 
      expiry: "2023-12-20", 
      status: "available", 
      location: "Farm A",
      costPerKg: "25",
      image: "/sample-tomatoes.jpg",
      qualityGrade: "A",
      storageCondition: "Room Temperature",
      description: "Fresh organic tomatoes from greenhouse"
    },
    { 
      id: 2, 
      name: "Whole Grain Bread", 
      quantity: "300", 
      unit: "kg",
      type: "Bakery", 
      expiry: "2023-12-18", 
      status: "reserved", 
      location: "Farm B",
      costPerKg: "30",
      image: "/sample-bread.jpg",
      qualityGrade: "B",
      storageCondition: "Dry Storage",
      description: "Day-old whole grain bread, still fresh"
    }
  ]);

  // Add surplus form state
  const fileInputRef = useRef(null);
  const [newSurplus, setNewSurplus] = useState({
    name: "",
    type: "",
    quantity: "",
    unit: "kg",
    expiry: "",
    location: "",
    costPerKg: "",
    image: null,
    previewImage: "",
    qualityGrade: "A",
    storageCondition: "Room Temperature",
    description: ""
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

  const qualityGrades = [
    { value: "A", label: "A (Excellent Quality)" },
    { value: "B", label: "B (Good Quality)" },
    { value: "C", label: "C (Average Quality)" }
  ];

  const storageConditions = [
    "Room Temperature",
    "Refrigerated",
    "Frozen",
    "Dry Storage",
    "Controlled Atmosphere"
  ];

  const units = ["kg", "lbs", "liters", "pieces", "boxes", "crates"];
 
  // ======================
  // LISTINGS SECTION LOGIC
  // ======================

  // Filter items based on active tab and search
  const filteredSurplusItems = surplusItems
    .filter((item) => {
      // Tab filtering
      if (activeListingTab === 'available') return item.status === 'available';
      if (activeListingTab === 'reserved') return item.status === 'reserved';
      if (activeListingTab === 'expired') {
        const today = new Date();
        const expiryDate = new Date(item.expiry);
        return expiryDate < today;
      }
      return true;
    })
    .filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sorting logic
      if (sortOption === "newest") return new Date(b.expiry) - new Date(a.expiry);
      if (sortOption === "expiry") return new Date(a.expiry) - new Date(b.expiry);
      if (sortOption === "quantity") return b.quantity - a.quantity;
      return 0;
    });

  // Helper functions
  const toggleDetails = (id) => {
    setExpandedDetails((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const openReserveModal = (item) => {
    setSelectedItem(item);
    setReserveModalOpen(true);
  };

  const closeReserveModal = () => {
    setReserveModalOpen(false);
  };

  const openCollectedModal = (item) => {
    setSelectedItem(item);
    setCollectedModalOpen(true);
  };

  const closeCollectedModal = () => {
    setCollectedModalOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setSurplusItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setReserveModalOpen(false);
    setCollectedModalOpen(false);
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleDeleteItem = (id) => {
    setSurplusItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item deleted successfully');
  };

  const [donationRequests, setDonationRequests] = useState([
    {
      id: 1,
      ngoName: "Food for All",
      requestedItem: "Vegetables",
      quantity: "200 kg",
      requestedDate: "2023-06-15",
      status: "pending",
      contact: "foodforall@example.com",
      location: "Mumbai",
      purpose: "Community kitchen for homeless"
    },
    {
      id: 2,
      ngoName: "Hunger Free India",
      requestedItem: "Grains",
      quantity: "500 kg",
      requestedDate: "2023-06-18",
      status: "approved",
      contact: "contact@hungerfree.org",
      location: "Delhi",
      purpose: "School meal program"
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestActionModalOpen, setRequestActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // 'approve' or 'reject'  

  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("waste");
  const [activeChartTab, setActiveChartTab] = useState("waste");
  const [forecastPeriod, setForecastPeriod] = useState("1month");
  // ====================
  // ADD SURPLUS LOGIC
  // ====================

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewSurplus({
        ...newSurplus,
        image: file,
        previewImage: URL.createObjectURL(file)
      });
    } else {
      toast.warning("Please upload a valid image file");
    }
  };

  const handleAddSurplus = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newSurplus.name || !newSurplus.type || !newSurplus.quantity || !newSurplus.expiry) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const newItem = {
        id: surplusItems.length + 1,
        name: newSurplus.name,
        type: newSurplus.type,
        quantity: newSurplus.quantity,
        unit: newSurplus.unit,
        expiry: newSurplus.expiry,
        status: "available",
        location: newSurplus.location,
        costPerKg: newSurplus.costPerKg,
        image: newSurplus.previewImage || "/default-food.jpg",
        qualityGrade: newSurplus.qualityGrade,
        storageCondition: newSurplus.storageCondition,
        description: newSurplus.description
      };

      setSurplusItems([...surplusItems, newItem]);
      
      // Reset form
      setNewSurplus({
        name: "",
        type: "",
        quantity: "",
        unit: "kg",
        expiry: "",
        location: "",
        costPerKg: "",
        image: null,
        previewImage: "",
        qualityGrade: "A",
        storageCondition: "Room Temperature",
        description: ""
      });

      toast.success("Surplus food added successfully!");
      setActiveTab("listings");
    } catch (error) {
      toast.error("Failed to add surplus. Please try again.");
    }
  };
  const openRequestActionModal = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setRequestActionModalOpen(true);
  };
  
  const handleRequestAction = () => {
    setDonationRequests(prev =>
      prev.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: actionType === "approve" ? "approved" : "rejected" }
          : req
      )
    );
    setRequestActionModalOpen(false);
    toast.success(
      `Request ${actionType === "approve" ? "approved" : "rejected"} successfully`
    );
  };

  // ====================
  // RENDER COMPONENTS
  // ====================
// AI Insights Data Generators
const generateWasteReductionData = () => {
  const labels = {
    "3months": ["Oct", "Nov", "Dec"],
    "6months": ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "12months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };
  
  const data = {
    "3months": [120, 95, 70],
    "6months": [180, 160, 140, 120, 95, 70],
    "12months": [220, 210, 200, 190, 180, 170, 160, 150, 140, 120, 95, 70]
  };
  
  return {
    labels: labels[timeRange],
    datasets: [
      {
        label: "Waste Reduced (kg)",
        data: data[timeRange],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1
      }
    ]
  };
};
const generateWeatherImpactData = () => ({
  labels: ["Sunny", "Rainy", "Cloudy", "Stormy"],
  datasets: [
    {
      label: "Pickup Rate (%)",
      data: [85, 60, 75, 40],
      backgroundColor: [
        "rgba(255, 206, 86, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 99, 132, 0.5)"
      ],
      borderColor: [
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 99, 132, 1)"
      ],
      borderWidth: 1
    }
  ]
});
const generateComparisonData = () => ({
  labels: ["Traditional", "Savenserve"],
  datasets: [
    {
      label: "Food Saved (kg)",
      data: [450, 1200],
      backgroundColor: "rgba(16, 185, 129, 0.5)"
    },
    {
      label: "Cost Recovery (%)",
      data: [45, 82],
      backgroundColor: "rgba(59, 130, 246, 0.5)"
    }
  ]
});
  const renderAddSurplusForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Add Surplus Food</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form className="space-y-6" onSubmit={handleAddSurplus}>
          {/* Food Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="mt-1 flex items-center gap-4">
              <div className="relative">
                {newSurplus.previewImage ? (
                  <div className="group relative">
                    <img 
                      src={newSurplus.previewImage} 
                      alt="Food preview" 
                      className="h-32 w-32 rounded-lg object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setNewSurplus({...newSurplus, image: null, previewImage: ""})}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Upload className="h-4 w-4 mr-2 inline" />
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g. Organic Tomatoes"
                value={newSurplus.name}
                onChange={(e) => setNewSurplus({...newSurplus, name: e.target.value})}
                required
              />
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newSurplus.type}
                onChange={(e) => setNewSurplus({...newSurplus, type: e.target.value})}
                required
              >
                <option value="">Select Food Type</option>
                {foodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g. 50"
                  value={newSurplus.quantity}
                  onChange={(e) => setNewSurplus({...newSurplus, quantity: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={newSurplus.unit}
                  onChange={(e) => setNewSurplus({...newSurplus, unit: e.target.value})}
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry/Best Before Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newSurplus.expiry}
                onChange={(e) => setNewSurplus({...newSurplus, expiry: e.target.value})}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Farm location or address"
                value={newSurplus.location}
                onChange={(e) => setNewSurplus({...newSurplus, location: e.target.value})}
                required
              />
            </div>

            {/* Cost per kg (MSP) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost per kg (MSP) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Minimum support price"
                  value={newSurplus.costPerKg}
                  onChange={(e) => setNewSurplus({...newSurplus, costPerKg: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality Grade
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newSurplus.qualityGrade}
                onChange={(e) => setNewSurplus({...newSurplus, qualityGrade: e.target.value})}
              >
                {qualityGrades.map((grade) => (
                  <option key={grade.value} value={grade.value}>{grade.label}</option>
                ))}
              </select>
            </div>

            {/* Storage Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Condition
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={newSurplus.storageCondition}
                onChange={(e) => setNewSurplus({...newSurplus, storageCondition: e.target.value})}
              >
                {storageConditions.map((condition) => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Special handling instructions, packaging details, etc."
              value={newSurplus.description}
              onChange={(e) => setNewSurplus({...newSurplus, description: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:shadow-md"
              onClick={() => setActiveTab("listings")}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md"
            >
              Submit Surplus
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
  const renderListings = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Surplus Listings</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by food name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {/* Sort Dropdown */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="expiry">Expiry Date</option>
            <option value="quantity">Quantity (High-Low)</option>
          </select>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['All', 'Available', 'Reserved', 'Expired'].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeListingTab === tab.toLowerCase()
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveListingTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Listing Cards Grid */}
      {filteredSurplusItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Inbox className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No surplus listings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeListingTab === 'available'
              ? "You currently have no available surplus food."
              : activeListingTab === 'reserved'
              ? "No reserved listings yet."
              : activeListingTab === 'expired'
              ? "No expired items found."
              : "Add your first surplus food item to get started."}
          </p>
          {activeListingTab === 'all' && (
            <button
              onClick={() => setActiveTab('add')}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <PlusCircle className="h-5 w-5 inline mr-2" />
              Add Surplus
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurplusItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Item Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={item.image || "/default-food.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'reserved'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.status === 'available' ? 'Available' : item.status === 'reserved' ? 'Reserved' : 'Expired'}
                </span>
              </div>

              {/* Item Details */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Leaf className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">{item.quantity}</span> {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      Expires: <span className="font-medium">{new Date(item.expiry).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">₹{item.costPerKg}</span>
                    <span className="text-gray-500 ml-1">per kg</span>
                  </div>
                </div>

                {/* Quality & Storage Info (Collapsible) */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <button
                    onClick={() => toggleDetails(item.id)}
                    className="flex items-center text-sm text-teal-600 hover:text-teal-700"
                  >
                    {expandedDetails.includes(item.id) ? (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1 rotate-180" />
                        Hide details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show details
                      </>
                    )}
                  </button>

                  {expandedDetails.includes(item.id) && (
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Quality:</span> {item.qualityGrade}
                      </p>
                      <p>
                        <span className="font-medium">Storage:</span> {item.storageCondition}
                      </p>
                      {item.description && (
                        <p>
                          <span className="font-medium">Notes:</span> {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  {item.status === 'available' && (
                    <>
                      <button
                        onClick={() => openReserveModal(item)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Mark as Reserved
                      </button>
                    </>
                  )}
                  {item.status === 'reserved' && (
                    <button
                      onClick={() => openCollectedModal(item)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Mark as Collected
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reserve Confirmation Modal */}
      {reserveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Confirm Reservation</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to mark <span className="font-medium">{selectedItem?.name}</span> as reserved?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeReserveModal}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(selectedItem.id, 'reserved')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collected Confirmation Modal */}
      {collectedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Confirm Collection</h3>
            <p className="mt-2 text-gray-600">
              Has <span className="font-medium">{selectedItem?.name}</span> been collected by the recipient?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeCollectedModal}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(selectedItem.id, 'collected')}
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
 
  // ======================
// RENDER REQUESTS FUNCTION
// ======================
const renderRequests = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Donation Requests</h2>
      
    </div>

    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donationRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{request.ngoName}</div>
                  <div className="text-sm text-gray-500">{request.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.requestedItem}</div>
                  <div className="text-sm text-gray-500">{request.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.requestedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : request.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openRequestActionModal(request, "approve")}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openRequestActionModal(request, "reject")}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 ml-2">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Request Action Confirmation Modal */}
    {requestActionModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-lg font-medium text-gray-900">
            Confirm {actionType === "approve" ? "Approval" : "Rejection"}
          </h3>
          <p className="mt-2 text-gray-600">
            Are you sure you want to {actionType} the request from{" "}
            <span className="font-medium">{selectedRequest?.ngoName}</span> for{" "}
            <span className="font-medium">{selectedRequest?.quantity}</span> of{" "}
            <span className="font-medium">{selectedRequest?.requestedItem}</span>?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setRequestActionModalOpen(false)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestAction}
              className={`px-4 py-2 text-white rounded-lg ${
                actionType === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Confirm {actionType === "approve" ? "Approval" : "Rejection"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
const renderAIInsights = () => {
  // Additional chart data generators
  const generateSeasonalTrendsData = () => ({
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Vegetables",
        data: [65, 80, 120, 90],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3
      },
      {
        label: "Fruits",
        data: [45, 60, 85, 50],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        tension: 0.3
      },
      {
        label: "Grains",
        data: [80, 70, 60, 110],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.3
      }
    ]
  });

  const generateFoodCategoryDistribution = () => ({
    labels: ["Vegetables", "Fruits", "Grains", "Dairy", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#3b82f6",
          "#94a3b8"
        ],
        borderWidth: 0
      }
    ]
  });

  const generateProfitTrendsData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [45000, 52000, 60000, 75000, 82000, 90000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        yAxisID: "y"
      },
      {
        label: "Cost Savings (₹)",
        data: [12000, 15000, 18000, 22000, 25000, 30000],
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
          <h2 className="text-2xl font-bold text-gray-900">Insights Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Data-driven recommendations to optimize your food surplus management
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
            title: "Total Food Saved",
            value: "2,450 kg",
            change: "+12%",
            trend: "up",
            icon: <Leaf className="h-6 w-6 text-teal-600" />,
            bgColor: "bg-teal-50"
          },
          {
            title: "Potential Earnings",
            value: "₹68,500",
            change: "+23%",
            trend: "up",
            icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
            bgColor: "bg-blue-50"
          },
          {
            title: "Reduced Waste",
            value: "1,200 kg",
            change: "-18%",
            trend: "down",
            icon: <Truck className="h-6 w-6 text-green-600" />,
            bgColor: "bg-green-50"
          },
          {
            title: "Cost Recovery Rate",
            value: "78%",
            change: "+15%",
            trend: "up",
            icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
            bgColor: "bg-purple-50"
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
            { id: "waste", label: "Waste Analytics" },
            { id: "seasonal", label: "Seasonal Trends" },
            { id: "financial", label: "Financial Impact" },
            { id: "forecast", label: "Demand Forecast" }
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

      {/* Waste Analytics Section */}
      {activeChartTab === "waste" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waste Reduction Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Waste Reduction Progress</h3>
              <select 
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="waste">By Month</option>
                <option value="weather">By Weather</option>
                <option value="category">By Category</option>
              </select>
            </div>
            <div className="h-80">
              {selectedMetric === "category" ? (
                <Pie
                  data={generateFoodCategoryDistribution()}
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
                  data={selectedMetric === "waste" ? generateWasteReductionData() : generateWeatherImpactData()}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: { 
                        mode: "index", 
                        intersect: false,
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.raw} kg`;
                          }
                        }
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
              )}
            </div>
          </div>

          {/* Impact Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Savenserve Impact Comparison</h3>
            <div className="h-80">
              <Bar
                data={generateComparisonData()}
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
                            return `${context.dataset.label}: ${context.raw} kg`;
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
                        text: "Kilograms / Percentage"
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Insight:</span> Farmers using Savenserve see 62% higher cost recovery on average compared to traditional methods.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Trends Section */}
      {activeChartTab === "seasonal" && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Seasonal Demand Trends</h3>
            <div className="h-96">
              <Line
                data={generateSeasonalTrendsData()}
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
                          return `${context.dataset.label}: ${context.raw} kg`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Quantity (kg)"
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-medium mb-4">Upcoming Festival Impact</h4>
              <div className="space-y-4">
                {[
                  {
                    festival: "Diwali",
                    date: "Nov 12, 2023",
                    impact: "High demand for grains, sweets (+40%)",
                    icon: "🪔",
                    color: "text-amber-600"
                  },
                  {
                    festival: "Christmas",
                    date: "Dec 25, 2023",
                    impact: "Increased demand for dairy (+25%)",
                    icon: "🎄",
                    color: "text-green-600"
                  },
                  {
                    festival: "Pongal",
                    date: "Jan 15, 2024",
                    impact: "Sugar, rice demand peaks (+35%)",
                    icon: "🍚",
                    color: "text-red-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <span className={`text-2xl mr-3 ${item.color}`}>{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.festival}</p>
                      <p className="text-sm text-gray-600">
                        {item.date} • {item.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-medium mb-4">Food Category Distribution</h4>
              <div className="h-64">
                <Pie
                  data={generateFoodCategoryDistribution()}
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
          </div>
        </div>
      )}

      {/* Financial Impact Section */}
      {activeChartTab === "financial" && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Profit & Cost Savings Trends</h3>
            <div className="h-96">
              <Line
                data={generateProfitTrendsData()}
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
                        text: "Revenue (₹)"
                      }
                    },
                    y1: {
                      type: "linear",
                      display: true,
                      position: "right",
                      title: {
                        display: true,
                        text: "Cost Savings (₹)"
                      },
                      grid: {
                        drawOnChartArea: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-medium mb-4">Revenue Breakdown</h4>
              <div className="h-64">
                <Pie
                  data={{
                    labels: ["Direct Sales", "NGO Partnerships", "Government Subsidies"],
                    datasets: [
                      {
                        data: [60, 30, 10],
                        backgroundColor: [
                          "#10b981",
                          "#3b82f6",
                          "#f59e0b"
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
              <h4 className="font-medium mb-4">Cost Savings Sources</h4>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ["Reduced Waste", "Optimized Logistics", "Storage Efficiency", "Government Incentives"],
                    datasets: [
                      {
                        label: "Savings (₹)",
                        data: [35000, 18000, 12000, 8000],
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
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Savings (₹)"
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

      {/* Demand Forecast Section */}
      {activeChartTab === "forecast" && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Demand Forecast</h3>
              <select 
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                value={forecastPeriod}
                onChange={(e) => setForecastPeriod(e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
              </select>
            </div>
            <div className="h-96">
              <Line
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
                  datasets: [
                    {
                      label: "Vegetables Demand Forecast (kg)",
                      data: [450, 500, 600, 650, 700, 750],
                      borderColor: "#10b981",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: "Historical Average (kg)",
                      data: [400, 420, 450, 480, 500, 520],
                      borderColor: "#94a3b8",
                      borderDash: [5, 5],
                      backgroundColor: "transparent",
                      tension: 0.1
                    }
                  ]
                }}
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
                      beginAtZero: false,
                      min: 300,
                      title: {
                        display: true,
                        text: "Demand (kg)"
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-medium mb-4">Top Predicted Demands</h4>
              <div className="space-y-4">
                {[
                  { item: "Tomatoes", increase: "+35%", reason: "Festival season" },
                  { item: "Wheat Flour", increase: "+28%", reason: "School reopening" },
                  { item: "Milk", increase: "+22%", reason: "Winter season" },
                  { item: "Potatoes", increase: "+18%", reason: "Price stability" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <p className="text-sm text-gray-600">{item.reason}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {item.increase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-medium mb-4">Inventory Recommendations</h4>
              <div className="space-y-4">
                {[
                  { action: "Increase tomato production", priority: "High", timeframe: "Next 2 weeks" },
                  { action: "Build wheat reserves", priority: "Medium", timeframe: "Next month" },
                  { action: "Secure cold storage", priority: "High", timeframe: "Immediate" },
                  { action: "Connect with dairy NGOs", priority: "Medium", timeframe: "Next 3 weeks" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 border-b border-gray-100">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                      item.priority === "High" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-gray-600">Timeframe: {item.timeframe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather & Market Alerts Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Real-Time Alerts & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <CloudRain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Rainfall Alert</h4>
                <p className="mt-1 text-sm text-blue-700">
                  Expected heavy rainfall (150mm) may affect 15-20% of stored grains next week.
                </p>
                <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                  View storage options →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-lg mr-3">
                <Sun className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-800">Heatwave Warning</h4>
                <p className="mt-1 text-sm text-amber-700">
                  Temperatures rising to 38°C may accelerate spoilage of perishables.
                </p>
                <button className="mt-2 text-sm font-medium text-amber-600 hover:text-amber-800">
                  See cooling solutions →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <BarChart2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800">Market Opportunity</h4>
                <p className="mt-1 text-sm text-purple-700">
                  Tomato prices expected to rise 25% in next 2 weeks due to supply shortage.
                </p>
                <button className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-800">
                  View market trends →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">Your Monthly Summary</h3>
        <p className="mb-4">
          Based on your current trends and our predictions, here's your potential for next month:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm">Potential Earnings</p>
            <p className="text-2xl font-bold">₹92,400</p>
            <p className="text-sm opacity-80">+18% from last month</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm">Waste Reduction</p>
            <p className="text-2xl font-bold">1,450 kg</p>
            <p className="text-sm opacity-80">Saves ₹28,500</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm">NGO Partnerships</p>
            <p className="text-2xl font-bold">8 New</p>
            <p className="text-sm opacity-80">Stable demand</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm">Cost Recovery</p>
            <p className="text-2xl font-bold">82%</p>
            <p className="text-sm opacity-80">Industry avg: 58%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
           <div className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h2>
    <div className="text-sm text-gray-500">Last updated: Today, 10:45 AM</div>
  </div>
  
  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Field Status</h3>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Planted</span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Growing</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Harvest</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
          <div className="flex-1">
            <p className="font-medium">North Field (Wheat)</p>
            <p className="text-sm text-gray-500">Planted 45 days ago | 12.5 acres</p>
          </div>
          <div className="text-right">
            <p className="font-medium">~3 weeks to harvest</p>
            <p className="text-sm text-gray-500">Expected yield: 5.2 tons</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
          <div className="flex-1">
            <p className="font-medium">East Field (Corn)</p>
            <p className="text-sm text-gray-500">Planted 28 days ago | 8.3 acres</p>
          </div>
          <div className="text-right">
            <p className="font-medium">~7 weeks to harvest</p>
            <p className="text-sm text-gray-500">Expected yield: 9.1 tons</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
          <div className="flex-1">
            <p className="font-medium">South Field (Soybeans)</p>
            <p className="text-sm text-gray-500">Ready for harvest | 15.2 acres</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-amber-600">Harvest now</p>
            <p className="text-sm text-gray-500">Expected yield: 6.8 tons</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment Status</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="flex-1 text-sm">Tractor #1</span>
            <span className="text-sm text-gray-500">Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="flex-1 text-sm">Harvester</span>
            <span className="text-sm text-gray-500">Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="flex-1 text-sm">Irrigation System</span>
            <span className="text-sm text-gray-500">Maintenance required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            <span className="flex-1 text-sm">Tractor #2</span>
            <span className="text-sm text-gray-500">Fuel low (15%)</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks & Alerts</h3>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-800">⚠️ Pest alert in North Field</p>
            <p className="text-xs text-red-600">Detected: Aphids | Recommended action</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">🔧 Irrigation maintenance due</p>
            <p className="text-xs text-blue-600">Schedule before Friday</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">🌱 Fertilize East Field</p>
            <p className="text-xs text-green-600">Due in 2 days</p>
          </div>
        </div>
      </div>
    </div>
</div>
 
</div>
          </div>
        );
      case "requests":
         return renderRequests();
      case "add":
        return renderAddSurplusForm();
      case "listings":
        return renderListings();
        case "ai":
        return renderAIInsights();
        case 'messages':
          return <Messages />; // This is where you use the MessageApp
        case 'reports':
          return <Reports />;
        case 'help' :
          return <Help />; 
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
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
                { id: "add", icon: <PlusCircle className="h-5 w-5" />, label: "Add Surplus" },
                { id: "listings", icon: <List className="h-5 w-5" />, label: "My Listings" },
                { id: "requests", icon: <Inbox className="h-5 w-5" />, label: "Donation Requests" },
                { id: "ai", icon: <BarChart2 className="h-5 w-5" />, label: "Insights" },
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
            <div className="flex items-center">
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FarmerDashboard;