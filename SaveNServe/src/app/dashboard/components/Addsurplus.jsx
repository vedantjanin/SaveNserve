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
  Info
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  // Enhanced surplus items state
  const [surplusItems, setSurplusItems] = useState([
    { 
      id: 1, 
      name: "Organic Tomatoes", 
      quantity: "500", 
      unit: "kg",
      type: "Vegetables", 
      expiry: "2023-06-20", 
      status: "available", 
      location: "Farm A",
      costPerKg: "25",
      image: "http://seed2plant.in/cdn/shop/products/tomatoseeds.jpg?v=1604033216",
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
      expiry: "2023-06-18", 
      status: "reserved", 
      location: "Farm B",
      costPerKg: "30",
      image: "https://media.self.com/photos/5daa23395c250800081afa68/4:3/w_2560,c_limit/sprouted-whole-grain-bread.jpg",
      qualityGrade: "B",
      storageCondition: "Dry Storage",
      description: "Day-old whole grain bread, still fresh"
    }
  ]);

  // Enhanced new surplus form state
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

  // Handle file upload
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

  // Enhanced add surplus handler
  const handleAddSurplus = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newSurplus.name || !newSurplus.type || !newSurplus.quantity || !newSurplus.expiry) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // In a real app, you would upload to your backend here
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

  // ... (keep all your existing state and other handlers)

  // Enhanced Add Surplus form component
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

  // ... (keep all your existing renderContent switch cases, just update the 'add' case)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        // ... (keep existing dashboard code)
      case "add":
        return renderAddSurplusForm();
      case "listings":
        // ... (keep existing listings code)
      // ... (keep all other cases)
      default:
        return null;
    }
  };

  // ... (keep all the rest of your existing code including helper components)

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
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
            <h1 className="text-xl font-semibold text-gray-900">Farmer Portal</h1>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
                { id: "add", icon: <PlusCircle className="h-5 w-5" />, label: "Add Surplus" },
                { id: "listings", icon: <List className="h-5 w-5" />, label: "My Listings" },
                { id: "requests", icon: <Inbox className="h-5 w-5" />, label: "Donation Requests" },
                { id: "ai", icon: <BarChart2 className="h-5 w-5" />, label: "AI Insights" },
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
              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
                FP
              </div>
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

// ... (keep all your existing helper components)

export default FarmerDashboard;

