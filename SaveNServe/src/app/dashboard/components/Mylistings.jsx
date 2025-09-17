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

  // ====================
  // RENDER COMPONENTS
  // ====================

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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            {/* Add your dashboard content here */}
          </div>
        );
      case "add":
        return renderAddSurplusForm();
      case "listings":
        return renderListings();
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
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Farm Producer</p>
                <p className="text-xs text-gray-500">Premium Member</p>
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

export default FarmerDashboard;