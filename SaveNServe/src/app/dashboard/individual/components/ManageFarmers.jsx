"use client";

import React, { useState, useEffect } from "react";
import { 
  FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiPlus, 
  FiX, FiSave, FiCalendar, FiMapPin, FiMail, 
  FiCheckCircle, FiAlertCircle, FiAlertTriangle 
} from "react-icons/fi";

const FarmerManagementDashboard = () => {
  // Main farmers data and state
  const [farmers, setFarmers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      farm: "Organic Farm", 
      location: "California",
      contact: "john@organicfarm.com",
      joined: "2023-01-15",
      status: "active",
      crops: ["Tomatoes", "Lettuce", "Carrots"],
      lastActivity: "2023-06-20"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      farm: "Green Acres", 
      location: "Texas",
      contact: "jane@greenacres.com",
      joined: "2022-11-03",
      status: "active",
      crops: ["Wheat", "Corn"],
      lastActivity: "2023-06-18"
    },
    { 
      id: 3, 
      name: "Mark Lee", 
      farm: "Sunny Farm", 
      location: "Florida",
      contact: "mark@sunnyfarm.com",
      joined: "2023-03-22",
      status: "inactive",
      crops: ["Oranges", "Grapefruit"],
      lastActivity: "2023-05-10"
    },
  ]);

  // UI state management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddFarmerForm, setShowAddFarmerForm] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    farm: "",
    location: "",
    contact: "",
    crops: []
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [farmerToDelete, setFarmerToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Filter farmers based on search and status
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         farmer.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || farmer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Farmer actions
  const handleEdit = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setFarmerToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFarmers(farmers.filter(farmer => farmer.id !== farmerToDelete));
      setShowDeleteConfirm(false);
      setFarmerToDelete(null);
      setIsLoading(false);
      showToast("Farmer deleted successfully", "success");
    }, 800);
  };

  const handleView = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFarmers(farmers.map(farmer => 
        farmer.id === id ? { ...farmer, status: newStatus } : farmer
      ));
      setIsLoading(false);
      showToast(`Status updated to ${newStatus}`, "success");
    }, 600);
  };

  const handleSaveFarmer = (updatedFarmer) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (updatedFarmer.id) {
        // Update existing farmer
        setFarmers(farmers.map(farmer => 
          farmer.id === updatedFarmer.id ? updatedFarmer : farmer
        ));
        showToast("Farmer updated successfully", "success");
      } else {
        // Add new farmer
        const newId = Math.max(...farmers.map(f => f.id), 0) + 1;
        setFarmers([...farmers, { 
          ...updatedFarmer, 
          id: newId, 
          joined: new Date().toISOString().split('T')[0], 
          status: "active",
          lastActivity: new Date().toISOString().split('T')[0]
        }]);
        showToast("New farmer added successfully", "success");
      }
      setIsModalOpen(false);
      setShowAddFarmerForm(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddNewFarmer = () => {
    setSelectedFarmer({
      id: null,
      name: "",
      farm: "",
      location: "",
      contact: "",
      status: "active",
      crops: [],
      joined: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    });
    setShowAddFarmerForm(true);
    setIsModalOpen(true);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  // Modal Component
  const FarmerProfileModal = ({ farmer, onClose, onSave, isNew, onStatusChange }) => {
    const [editedFarmer, setEditedFarmer] = useState(farmer);
    const [newCrop, setNewCrop] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
      setEditedFarmer(farmer);
      setNewCrop("");
      setErrors({});
    }, [farmer]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedFarmer(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleAddCrop = () => {
      if (newCrop.trim() && !editedFarmer.crops.includes(newCrop.trim())) {
        setEditedFarmer(prev => ({
          ...prev,
          crops: [...prev.crops, newCrop.trim()]
        }));
        setNewCrop("");
      }
    };

    const handleRemoveCrop = (cropToRemove) => {
      setEditedFarmer(prev => ({
        ...prev,
        crops: prev.crops.filter(crop => crop !== cropToRemove)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!editedFarmer.name.trim()) newErrors.name = "Name is required";
      if (!editedFarmer.farm.trim()) newErrors.farm = "Farm name is required";
      if (!editedFarmer.location.trim()) newErrors.location = "Location is required";
      if (!editedFarmer.contact.trim()) newErrors.contact = "Contact is required";
      if (!/^\S+@\S+\.\S+$/.test(editedFarmer.contact)) newErrors.contact = "Invalid email format";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        onSave(editedFarmer);
      }
    };

    const handleStatusUpdate = (newStatus) => {
      if (onStatusChange && farmer.id) {
        onStatusChange(farmer.id, newStatus);
      }
      setEditedFarmer(prev => ({ ...prev, status: newStatus }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isNew ? "Add New Farmer" : "Farmer Profile"}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={editedFarmer.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name*</label>
                  <input
                    type="text"
                    name="farm"
                    value={editedFarmer.farm}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.farm ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.farm && <p className="mt-1 text-sm text-red-600">{errors.farm}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={editedFarmer.location}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email*</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="contact"
                      value={editedFarmer.contact}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                </div>

                {!isNew && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={new Date(editedFarmer.joined).toLocaleDateString()}
                          readOnly
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-50 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate("active")}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${editedFarmer.status === 'active' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          <div className="flex items-center">
                            <FiCheckCircle className="mr-1" /> Active
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate("inactive")}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${editedFarmer.status === 'inactive' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          <div className="flex items-center">
                            <FiAlertCircle className="mr-1" /> Inactive
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedFarmer.crops.map((crop, index) => (
                    <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center">
                      <span>{crop}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCrop(crop)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    placeholder="Add a crop"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCrop()}
                  />
                  <button
                    type="button"
                    onClick={handleAddCrop}
                    className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {isNew ? "Create Farmer" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Modal Component
  const ConfirmationModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
          <div className="flex items-start mb-4">
            <FiAlertTriangle className="text-yellow-500 text-2xl mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Confirm Deletion</h3>
              <p className="text-gray-600 mt-1">Are you sure you want to delete this farmer? This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setFarmerToDelete(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toast Notification Component
  const ToastNotification = () => {
    if (!toast.show) return null;

    return (
      <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-start ${toast.type === 'success' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
        <div className="mr-3 mt-0.5">
          {toast.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={() => setToast({ show: false, message: "", type: "" })}
          className="ml-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Farmer Management</h1>
          <button 
            onClick={handleAddNewFarmer}
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <FiPlus className="mr-2" />
            Add New Farmer
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmers by name, farm or location..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-500 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Farmers</h3>
            <p className="text-2xl font-bold text-gray-800">{farmers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Active Farmers</h3>
            <p className="text-2xl font-bold text-teal-600">{farmers.filter(f => f.status === 'active').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Inactive Farmers</h3>
            <p className="text-2xl font-bold text-orange-500">{farmers.filter(f => f.status === 'inactive').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">New This Month</h3>
            <p className="text-2xl font-bold text-blue-600">{farmers.filter(f => {
              const joinDate = new Date(f.joined);
              const currentDate = new Date();
              return joinDate.getMonth() === currentDate.getMonth() && 
                     joinDate.getFullYear() === currentDate.getFullYear();
            }).length}</p>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
              <div className="h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mr-4"></div>
              <span className="text-gray-800">Processing...</span>
            </div>
          </div>
        )}

        {/* Farmers Cards */}
        {filteredFarmers.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">No farmers found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`p-4 ${farmer.status === 'active' ? 'bg-teal-50' : 'bg-orange-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{farmer.name}</h3>
                      <p className="text-gray-600">{farmer.farm}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${farmer.status === 'active' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'}`}>
                      {farmer.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-2 text-gray-400" />
                    <span>{farmer.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMail className="mr-2 text-gray-400" />
                    <span>{farmer.contact}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Crops:</h4>
                    <div className="flex flex-wrap gap-1">
                      {farmer.crops.map((crop, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <div className="flex items-center mb-1">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>Joined: {new Date(farmer.joined).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>Last Activity: {new Date(farmer.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between border-t pt-3">
                    <button 
                      onClick={() => handleView(farmer)}
                      className="flex items-center text-teal-600 hover:text-teal-800"
                      disabled={isLoading}
                    >
                      <FiEye className="mr-1" /> View
                    </button>
                    <button 
                      onClick={() => handleEdit(farmer)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                      disabled={isLoading}
                    >
                      <FiEdit className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(farmer.id)}
                      className="flex items-center text-red-600 hover:text-red-800"
                      disabled={isLoading}
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <FarmerProfileModal 
          farmer={selectedFarmer} 
          onClose={() => {
            setIsModalOpen(false);
            setShowAddFarmerForm(false);
          }} 
          onSave={handleSaveFarmer}
          isNew={showAddFarmerForm}
          onStatusChange={handleStatusChange}
        />
      )}

      {showDeleteConfirm && <ConfirmationModal />}
      <ToastNotification />
    </div>
  );
};

export default FarmerManagementDashboard;