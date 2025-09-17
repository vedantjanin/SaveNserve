"use client";

import { CheckCircle, XCircle, Clock, Filter, ChevronDown, Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const dummyRequests = [
  {
    id: 1,
    ngoName: "Food For All Foundation",
    requestedItem: "Fresh Apples",
    quantity: "15 kg",
    requestDate: "2025-04-14",
    status: "Pending",
    urgency: "High",
    category: "Fruits",
    value: 450
  },
  {
    id: 2,
    ngoName: "Hunger Relief Trust",
    requestedItem: "Tomatoes",
    quantity: "30 kg",
    requestDate: "2025-04-13",
    status: "Pending",
    urgency: "Medium",
    category: "Vegetables",
    value: 600
  },
  {
    id: 3,
    ngoName: "Community Care",
    requestedItem: "Bread Loaves",
    quantity: "50 pieces",
    requestDate: "2025-04-12",
    status: "Accepted",
    urgency: "Low",
    category: "Bakery",
    value: 750
  },
  {
    id: 4,
    ngoName: "Hope Foundation",
    requestedItem: "Milk Packets",
    quantity: "20 liters",
    requestDate: "2025-04-10",
    status: "Declined",
    urgency: "High",
    category: "Dairy",
    value: 800
  },
  {
    id: 5,
    ngoName: "Green Earth",
    requestedItem: "Rice Bags",
    quantity: "10 kg",
    requestDate: "2025-04-15",
    status: "Pending",
    urgency: "High",
    category: "Grains",
    value: 1200
  },
];

const DonationRequests = () => {
  const [requests, setRequests] = useState(dummyRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isUrgencyFilterOpen, setIsUrgencyFilterOpen] = useState(false);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "requestDate", direction: "desc" });

  const handleResponse = (id, response) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: response } : req
      )
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredRequests = sortedRequests.filter(request => {
    const matchesSearch = request.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.requestedItem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    const matchesUrgency = urgencyFilter === "All" || request.urgency === urgencyFilter;
    const matchesCategory = categoryFilter === "All" || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency && matchesCategory;
  });

  const statusOptions = ["All", "Pending", "Accepted", "Declined"];
  const urgencyOptions = ["All", "High", "Medium", "Low"];
  const categories = ["All", "Fruits", "Vegetables", "Bakery", "Dairy", "Grains"];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Donation Requests</h1>
          <p className="text-gray-600">Manage incoming requests from NGOs</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search requests..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Status Filter */}
        <div className="relative">
          <button 
            onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-700">
              {statusFilter === "All" ? "All Statuses" : statusFilter}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isStatusFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isStatusFilterOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                {statusOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option);
                      setIsStatusFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      statusFilter === option 
                        ? "bg-teal-50 text-teal-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Urgency Filter */}
        <div className="relative">
          <button 
            onClick={() => setIsUrgencyFilterOpen(!isUrgencyFilterOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-700">
              {urgencyFilter === "All" ? "All Urgency Levels" : urgencyFilter}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUrgencyFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isUrgencyFilterOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                {urgencyOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setUrgencyFilter(option);
                      setIsUrgencyFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      urgencyFilter === option 
                        ? "bg-teal-50 text-teal-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button 
            onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-700">
              {categoryFilter === "All" ? "All Categories" : categoryFilter}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isCategoryFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isCategoryFilterOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      setIsCategoryFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      categoryFilter === category 
                        ? "bg-teal-50 text-teal-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setStatusFilter("All");
            setUrgencyFilter("All");
            setCategoryFilter("All");
            setSearchTerm("");
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("ngoName")}
                >
                  <div className="flex items-center">
                    NGO Name
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("requestedItem")}
                >
                  <div className="flex items-center">
                    Requested Item
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("quantity")}
                >
                  <div className="flex items-center">
                    Quantity
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  Category
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("urgency")}
                >
                  Urgency
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("requestDate")}
                >
                  <div className="flex items-center">
                    Request Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("value")}
                >
                  <div className="flex items-center">
                    Value
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No donation requests match your filters
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.ngoName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.requestedItem}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{request.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {request.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.urgency === "High" ? "bg-red-100 text-red-800" :
                        request.urgency === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{request.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        request.status === "Accepted" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.status === "Pending" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleResponse(request.id, "Accepted")}
                            className="text-green-600 hover:text-green-900"
                            title="Accept"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleResponse(request.id, "Declined")}
                            className="text-red-600 hover:text-red-900"
                            title="Decline"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleResponse(request.id, "Pending")}
                          className="text-gray-600 hover:text-gray-900"
                          title="Revert"
                        >
                          <Clock className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-800">Total Requests</h3>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {requests.length}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-900">
            {filteredRequests.length} filtered
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-green-800">Accepted</h3>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {requests.filter(r => r.status === "Accepted").length}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-green-900">
            ₹{requests.filter(r => r.status === "Accepted").reduce((sum, r) => sum + r.value, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-yellow-800">Pending</h3>
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              {requests.filter(r => r.status === "Pending").length}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-yellow-900">
            ₹{requests.filter(r => r.status === "Pending").reduce((sum, r) => sum + r.value, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;