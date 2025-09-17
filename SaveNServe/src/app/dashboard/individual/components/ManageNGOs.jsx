"use client";

import React, { useState, useEffect } from "react";
import { 
  FiEdit, FiTrash2, FiEye, FiSearch, FiFilter, FiPlus, 
  FiX, FiSave, FiCalendar, FiMapPin, FiMail, FiUsers,
  FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiActivity,
  FiDollarSign, FiGlobe, FiHeart, FiBarChart2, FiPhone
} from "react-icons/fi";

const NgoManagementDashboard = () => {
  // Main NGO data and state
  const [ngos, setNgos] = useState([
    { 
      id: 1, 
      name: "Green Earth Initiative", 
      type: "Environmental", 
      location: "New York, USA",
      contact: "contact@greenearth.org",
      established: "2015-05-10",
      status: "active",
      focusAreas: ["Climate Change", "Conservation", "Sustainability"],
      lastActivity: "2023-06-20",
      volunteers: 120,
      budget: "$2.5M",
      projects: 15,
      contactPerson: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      website: "www.greenearth.org",
      impact: "Planted 50,000 trees in 2022"
    },
    { 
      id: 2, 
      name: "Health for All", 
      type: "Medical", 
      location: "Nairobi, Kenya",
      contact: "info@healthforall.org",
      established: "2018-11-03",
      status: "active",
      focusAreas: ["Healthcare", "Disease Prevention", "Nutrition"],
      lastActivity: "2023-06-18",
      volunteers: 85,
      budget: "$1.2M",
      projects: 8,
      contactPerson: "David Mwangi",
      phone: "+254 700 123456",
      website: "www.healthforall.org",
      impact: "Provided healthcare to 10,000 people monthly"
    },
    { 
      id: 3, 
      name: "Education First", 
      type: "Educational", 
      location: "New Delhi, India",
      contact: "support@educationfirst.org",
      established: "2010-03-22",
      status: "inactive",
      focusAreas: ["Literacy", "Girls Education", "Teacher Training"],
      lastActivity: "2023-05-10",
      volunteers: 200,
      budget: "$3.8M",
      projects: 22,
      contactPerson: "Priya Sharma",
      phone: "+91 98765 43210",
      website: "www.educationfirst.org",
      impact: "Built 15 schools in rural areas"
    },
  ]);

  // UI state management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddNgoForm, setShowAddNgoForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [ngoToDelete, setNgoToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // For dashboard tabs

  // Filter NGOs based on search, status and type
  const filteredNgos = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ngo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || ngo.status === selectedStatus;
    const matchesType = selectedType === "all" || ngo.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  // NGO types for filter dropdown
  const ngoTypes = ["All", "Environmental", "Medical", "Educational", "Humanitarian", "Animal Welfare"];

  // NGO actions
  const handleEdit = (ngo) => {
    setSelectedNgo(ngo);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setNgoToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNgos(ngos.filter(ngo => ngo.id !== ngoToDelete));
      setShowDeleteConfirm(false);
      setNgoToDelete(null);
      setIsLoading(false);
      showToast("NGO deleted successfully", "success");
    }, 800);
  };

  const handleView = (ngo) => {
    setSelectedNgo(ngo);
    setIsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNgos(ngos.map(ngo => 
        ngo.id === id ? { ...ngo, status: newStatus } : ngo
      ));
      setIsLoading(false);
      showToast(`Status updated to ${newStatus}`, "success");
    }, 600);
  };

  const handleSaveNgo = (updatedNgo) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (updatedNgo.id) {
        // Update existing NGO
        setNgos(ngos.map(ngo => 
          ngo.id === updatedNgo.id ? updatedNgo : ngo
        ));
        showToast("NGO updated successfully", "success");
      } else {
        // Add new NGO
        const newId = Math.max(...ngos.map(n => n.id), 0) + 1;
        setNgos([...ngos, { 
          ...updatedNgo, 
          id: newId, 
          established: new Date().toISOString().split('T')[0], 
          status: "active",
          lastActivity: new Date().toISOString().split('T')[0],
          volunteers: 0,
          projects: 0,
          budget: "$0"
        }]);
        showToast("New NGO added successfully", "success");
      }
      setIsModalOpen(false);
      setShowAddNgoForm(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddNewNgo = () => {
    setSelectedNgo({
      id: null,
      name: "",
      type: "",
      location: "",
      contact: "",
      status: "active",
      focusAreas: [],
      established: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      volunteers: 0,
      budget: "$0",
      projects: 0,
      contactPerson: "",
      phone: "",
      website: "",
      impact: ""
    });
    setShowAddNgoForm(true);
    setIsModalOpen(true);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  // Modal Component
  const NgoProfileModal = ({ ngo, onClose, onSave, isNew, onStatusChange }) => {
    const [editedNgo, setEditedNgo] = useState(ngo);
    const [newFocusArea, setNewFocusArea] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
      setEditedNgo(ngo);
      setNewFocusArea("");
      setErrors({});
    }, [ngo]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedNgo(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleAddFocusArea = () => {
      if (newFocusArea.trim() && !editedNgo.focusAreas.includes(newFocusArea.trim())) {
        setEditedNgo(prev => ({
          ...prev,
          focusAreas: [...prev.focusAreas, newFocusArea.trim()]
        }));
        setNewFocusArea("");
      }
    };

    const handleRemoveFocusArea = (areaToRemove) => {
      setEditedNgo(prev => ({
        ...prev,
        focusAreas: prev.focusAreas.filter(area => area !== areaToRemove)
      }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (!editedNgo.name.trim()) newErrors.name = "Name is required";
      if (!editedNgo.type.trim()) newErrors.type = "Type is required";
      if (!editedNgo.location.trim()) newErrors.location = "Location is required";
      if (!editedNgo.contact.trim()) newErrors.contact = "Contact is required";
      if (!/^\S+@\S+\.\S+$/.test(editedNgo.contact)) newErrors.contact = "Invalid email format";
      if (!editedNgo.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        onSave(editedNgo);
      }
    };

    const handleStatusUpdate = (newStatus) => {
      if (onStatusChange && ngo.id) {
        onStatusChange(ngo.id, newStatus);
      }
      setEditedNgo(prev => ({ ...prev, status: newStatus }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isNew ? "Register New NGO" : "NGO Profile"}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">NGO Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={editedNgo.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                  <select
                    name="type"
                    value={editedNgo.type}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Type</option>
                    {ngoTypes.filter(t => t !== "All").map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={editedNgo.location}
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
                      value={editedNgo.contact}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={editedNgo.contactPerson}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={editedNgo.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                {!isNew && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                      <div className="relative">
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={new Date(editedNgo.established).toLocaleDateString()}
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
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${editedNgo.status === 'active' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          <div className="flex items-center">
                            <FiCheckCircle className="mr-1" /> Active
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate("inactive")}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${editedNgo.status === 'inactive' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedNgo.focusAreas.map((area, index) => (
                    <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center">
                      <span>{area}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFocusArea(area)}
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
                    value={newFocusArea}
                    onChange={(e) => setNewFocusArea(e.target.value)}
                    placeholder="Add a focus area"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFocusArea()}
                  />
                  <button
                    type="button"
                    onClick={handleAddFocusArea}
                    className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {!isNew && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volunteers</label>
                    <div className="relative">
                      <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="volunteers"
                        value={editedNgo.volunteers}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Budget</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="budget"
                        value={editedNgo.budget}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Active Projects</label>
                    <div className="relative">
                      <FiActivity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="projects"
                        value={editedNgo.projects}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={editedNgo.website}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact Summary</label>
                <textarea
                  name="impact"
                  value={editedNgo.impact}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Brief description of the NGO's impact"
                />
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
                  {isNew ? "Register NGO" : "Save Changes"}
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
              <p className="text-gray-600 mt-1">Are you sure you want to delete this NGO? This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setNgoToDelete(null);
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

  // Dashboard Tabs
  const DashboardTabs = () => {
    return (
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "all" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          All NGOs
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "active" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "inactive" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Inactive
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`px-4 py-2 font-medium text-sm ${activeTab === "recent" ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Recently Added
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">NGO Management</h1>
            <p className="text-gray-600">Track and manage all registered NGOs</p>
          </div>
          <button 
            onClick={handleAddNewNgo}
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <FiPlus className="mr-2" />
            Register New NGO
          </button>
        </div>

        {/* Dashboard Tabs */}
        <DashboardTabs />

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search NGOs by name, location or contact person..."
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
                </select>
              </div>
              <div className="flex items-center">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="all">All Types</option>
                  {ngoTypes.filter(t => t !== "All").map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total NGOs</h3>
            <p className="text-2xl font-bold text-gray-800">{ngos.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Active NGOs</h3>
            <p className="text-2xl font-bold text-teal-600">{ngos.filter(n => n.status === 'active').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Volunteers</h3>
            <p className="text-2xl font-bold text-blue-600">{ngos.reduce((sum, ngo) => sum + ngo.volunteers, 0)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
            <p className="text-2xl font-bold text-purple-600">{ngos.reduce((sum, ngo) => sum + ngo.projects, 0)}</p>
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

        {/* NGOs Cards */}
        {filteredNgos.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">No NGOs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNgos.map((ngo) => (
              <div key={ngo.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`p-4 ${ngo.status === 'active' ? 'bg-teal-50' : 'bg-orange-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{ngo.name}</h3>
                      <p className="text-gray-600">{ngo.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${ngo.status === 'active' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'}`}>
                      {ngo.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-2 text-gray-400" />
                    <span>{ngo.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiUsers className="mr-2 text-gray-400" />
                    <span>{ngo.volunteers} volunteers</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {ngo.focusAreas.map((area, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <div className="flex items-center mb-1">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>Est: {new Date(ngo.established).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FiActivity className="mr-2 text-gray-400" />
                      <span>Last active: {new Date(ngo.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between border-t pt-3">
                    <button 
                      onClick={() => handleView(ngo)}
                      className="flex items-center text-teal-600 hover:text-teal-800"
                      disabled={isLoading}
                    >
                      <FiEye className="mr-1" /> View
                    </button>
                    <button 
                      onClick={() => handleEdit(ngo)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                      disabled={isLoading}
                    >
                      <FiEdit className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(ngo.id)}
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
        <NgoProfileModal 
          ngo={selectedNgo} 
          onClose={() => {
            setIsModalOpen(false);
            setShowAddNgoForm(false);
          }} 
          onSave={handleSaveNgo}
          isNew={showAddNgoForm}
          onStatusChange={handleStatusChange}
        />
      )}

      {showDeleteConfirm && <ConfirmationModal />}
      <ToastNotification />
    </div>
  );
};

export default NgoManagementDashboard;