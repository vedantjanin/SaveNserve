"use client";

import { Trash2, Edit, Clock, MapPin, Box, Star, Thermometer, Filter, Search, Sliders, ChevronDown, Check, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const qualityIcons = {
  "excellent": <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />,
  "good": <Star className="h-4 w-4 text-yellow-500" />,
  "average": <Star className="h-4 w-4 text-gray-400" />,
  "needs-quick-sale": <Clock className="h-4 w-4 text-red-500" />,
};

const storageIcons = {
  "room-temperature": <Thermometer className="h-4 w-4 text-orange-500" />,
  "refrigerated": <Thermometer className="h-4 w-4 text-blue-500" />,
  "frozen": <Thermometer className="h-4 w-4 text-indigo-500" />,
  "dry-storage": <Box className="h-4 w-4 text-amber-700" />,
};

// Sample NGO listings data
const sampleListings = [
  {
    id: "1",
    foodName: "Fresh Vegetables Pack",
    foodType: "Vegetables",
    quantity: 50,
    quantityUnit: "kg",
    mspPerUnit: 1.5,
    description: "Assorted fresh vegetables including carrots, potatoes, and onions. Perfect for soup kitchens.",
    location: "Downtown Food Bank",
    quality: "excellent",
    storageCondition: "room-temperature",
    expiryDate: "2023-12-15",
    bestBeforeDate: "2023-12-10",
    listedDate: "2023-11-01",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
  },
  {
    id: "2",
    foodName: "Frozen Chicken",
    foodType: "Meat",
    quantity: 20,
    quantityUnit: "kg",
    mspPerUnit: 3.0,
    description: "High-quality frozen chicken breasts. Must be kept frozen until use.",
    location: "Community Kitchen",
    quality: "good",
    storageCondition: "frozen",
    expiryDate: "2024-02-28",
    bestBeforeDate: "2024-02-20",
    listedDate: "2023-11-05",
    image: "https://images.unsplash.com/photo-1603048719537-7a4c85b455be"
  },
  {
    id: "3",
    foodName: "Rice Bags",
    foodType: "Grains",
    quantity: 100,
    quantityUnit: "bags",
    mspPerUnit: 5.0,
    description: "Dry storage rice bags, 5kg each. Long shelf life.",
    location: "Homeless Shelter",
    quality: "average",
    storageCondition: "dry-storage",
    expiryDate: "2025-01-01",
    listedDate: "2023-10-20",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  },
  {
    id: "4",
    foodName: "Dairy Products",
    foodType: "Dairy",
    quantity: 30,
    quantityUnit: "litres",
    mspPerUnit: 2.5,
    description: "Assorted dairy products including milk and yogurt. Needs refrigeration.",
    location: "Children's Center",
    quality: "needs-quick-sale",
    storageCondition: "refrigerated",
    expiryDate: "2023-11-20",
    bestBeforeDate: "2023-11-15",
    listedDate: "2023-11-10",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150"
  },
  {
    id: "5",
    foodName: "Bread and Pastries",
    foodType: "Bakery",
    quantity: 15,
    quantityUnit: "boxes",
    mspPerUnit: 0.5,
    description: "Day-old bread and pastries. Perfect for immediate consumption.",
    location: "Senior Center",
    quality: "good",
    storageCondition: "room-temperature",
    expiryDate: "2023-11-18",
    listedDate: "2023-11-15",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  }
];

const Listings = ({ listings: initialListings = [], onDelete, onEdit }) => {
  const [listings, setListings] = useState(initialListings.length > 0 ? initialListings : sampleListings);
  const [filteredListings, setFilteredListings] = useState(initialListings.length > 0 ? initialListings : sampleListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    foodType: [],
    quality: [],
    storageCondition: [],
    expiryStatus: "all",
  });
  const [sortOption, setSortOption] = useState("newest");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    foodName: "",
    quantity: "",
    quantityUnit: "kg",
    mspPerUnit: "",
    description: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListing, setNewListing] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    quantityUnit: "kg",
    mspPerUnit: "",
    description: "",
    location: "",
    quality: "good",
    storageCondition: "room-temperature",
    expiryDate: "",
    bestBeforeDate: "",
    image: ""
  });

  // Get all unique food types from listings
  const foodTypes = [...new Set(listings.map(item => item?.foodType).filter(Boolean))];
  const qualityOptions = ["excellent", "good", "average", "needs-quick-sale"];
  const storageOptions = ["room-temperature", "refrigerated", "frozen", "dry-storage"];

  useEffect(() => {
    if (initialListings.length > 0) {
      setListings(initialListings);
      setFilteredListings(initialListings);
    }
  }, [initialListings]);

  useEffect(() => {
    filterListings();
  }, [searchTerm, selectedFilters, sortOption, listings]);

  const filterListings = () => {
    setIsLoading(true);
    
    let results = [...listings];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(item =>
        item?.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply food type filter
    if (selectedFilters.foodType.length > 0) {
      results = results.filter(item =>
        selectedFilters.foodType.includes(item?.foodType)
      );
    }
    
    // Apply quality filter
    if (selectedFilters.quality.length > 0) {
      results = results.filter(item =>
        selectedFilters.quality.includes(item?.quality)
      );
    }
    
    // Apply storage condition filter
    if (selectedFilters.storageCondition.length > 0) {
      results = results.filter(item =>
        selectedFilters.storageCondition.includes(item?.storageCondition)
      );
    }
    
    // Apply expiry status filter
    if (selectedFilters.expiryStatus !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedFilters.expiryStatus === "expired") {
        results = results.filter(item => item?.expiryDate && new Date(item.expiryDate) < today);
      } else if (selectedFilters.expiryStatus === "expiring-soon") {
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        results = results.filter(item => 
          item?.expiryDate &&
          new Date(item.expiryDate) >= today && 
          new Date(item.expiryDate) <= nextWeek
        );
      } else if (selectedFilters.expiryStatus === "valid") {
        results = results.filter(item => item?.expiryDate && new Date(item.expiryDate) > today);
      }
    }
    
    // Apply sorting
    results = sortListings(results, sortOption);
    
    setFilteredListings(results);
    setIsLoading(false);
  };

  const sortListings = (items, option) => {
    const sorted = [...items];
    
    switch (option) {
      case "newest":
        return sorted.sort((a, b) => new Date(b?.listedDate || 0) - new Date(a?.listedDate || 0));
      case "oldest":
        return sorted.sort((a, b) => new Date(a?.listedDate || 0) - new Date(b?.listedDate || 0));
      case "expiry-asc":
        return sorted.sort((a, b) => new Date(a?.expiryDate || 0) - new Date(b?.expiryDate || 0));
      case "expiry-desc":
        return sorted.sort((a, b) => new Date(b?.expiryDate || 0) - new Date(a?.expiryDate || 0));
      case "price-asc":
        return sorted.sort((a, b) => (Number(a?.mspPerUnit) || 0) - (Number(b?.mspPerUnit) || 0));
      case "price-desc":
        return sorted.sort((a, b) => (Number(b?.mspPerUnit) || 0) - (Number(a?.mspPerUnit) || 0));
      case "quantity-asc":
        return sorted.sort((a, b) => (Number(a?.quantity) || 0) - (Number(b?.quantity) || 0));
      case "quantity-desc":
        return sorted.sort((a, b) => (Number(b?.quantity) || 0) - (Number(a?.quantity) || 0));
      default:
        return sorted;
    }
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }
      
      return {
        ...prev,
        [filterType]: currentFilters
      };
    });
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredListings.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredListings.map(item => item?.id).filter(Boolean));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length > 0 && window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      const updatedListings = listings.filter(item => !selectedItems.includes(item.id));
      setListings(updatedListings);
      setSelectedItems([]);
      if (onDelete) {
        onDelete(selectedItems);
      }
    }
  };

  const handleDelete = (ids) => {
    const updatedListings = listings.filter(item => !ids.includes(item.id));
    setListings(updatedListings);
    setSelectedItems(selectedItems.filter(id => !ids.includes(id)));
    if (onDelete) {
      onDelete(ids);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item?.id || null);
    setEditFormData({
      foodName: item?.foodName || "",
      quantity: item?.quantity?.toString() || "",
      quantityUnit: item?.quantityUnit || "kg",
      mspPerUnit: item?.mspPerUnit?.toString() || "",
      description: item?.description || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (id) => {
    if (id && editFormData) {
      const formattedData = {
        ...editFormData,
        quantity: Number(editFormData.quantity) || 0,
        mspPerUnit: Number(editFormData.mspPerUnit) || 0
      };
      
      const updatedListings = listings.map(item => 
        item.id === id ? { ...item, ...formattedData } : item
      );
      
      setListings(updatedListings);
      setEditingId(null);
      setEditFormData(null);
      
      if (onEdit) {
        onEdit(id, formattedData);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleNewListingChange = (e) => {
    const { name, value } = e.target;
    setNewListing(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddListing = () => {
    const newId = Math.max(...listings.map(item => parseInt(item.id)), 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const listingToAdd = {
      ...newListing,
      id: newId.toString(),
      quantity: Number(newListing.quantity) || 0,
      mspPerUnit: Number(newListing.mspPerUnit) || 0,
      listedDate: today,
      image: newListing.image || "https://via.placeholder.com/300"
    };
    
    setListings([listingToAdd, ...listings]);
    setNewListing({
      foodName: "",
      foodType: "",
      quantity: "",
      quantityUnit: "kg",
      mspPerUnit: "",
      description: "",
      location: "",
      quality: "good",
      storageCondition: "room-temperature",
      expiryDate: "",
      bestBeforeDate: "",
      image: ""
    });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Surplus Listings</h1>
          <p className="text-gray-600">
            {filteredListings.length} {filteredListings.length === 1 ? "item" : "items"} found
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg text-center"
          >
            + Add New Listing
          </button>
          
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      {/* Add New Listing Form */}
      {showAddForm && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Listing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
              <input
                type="text"
                name="foodName"
                value={newListing.foodName}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
              <input
                type="text"
                name="foodType"
                value={newListing.foodType}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <div className="flex">
                <input
                  type="number"
                  name="quantity"
                  value={newListing.quantity}
                  onChange={handleNewListingChange}
                  className="w-3/4 p-2 border rounded-l-lg focus:ring-teal-500 focus:border-teal-500"
                  min="0"
                  required
                />
                <select
                  name="quantityUnit"
                  value={newListing.quantityUnit}
                  onChange={handleNewListingChange}
                  className="w-1/4 p-2 border-t border-b border-r rounded-r-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="litres">litres</option>
                  <option value="pieces">pieces</option>
                  <option value="boxes">boxes</option>
                  <option value="bags">bags</option>
                  <option value="cartons">cartons</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (Rs)</label>
              <input
                type="number"
                name="mspPerUnit"
                value={newListing.mspPerUnit}
                onChange={handleNewListingChange}
                step="0.01"
                min="0"
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={newListing.location}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
              <select
                name="quality"
                value={newListing.quality}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="needs-quick-sale">Needs Quick Sale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Storage Condition</label>
              <select
                name="storageCondition"
                value={newListing.storageCondition}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="room-temperature">Room Temperature</option>
                <option value="refrigerated">Refrigerated</option>
                <option value="frozen">Frozen</option>
                <option value="dry-storage">Dry Storage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={newListing.expiryDate}
                onChange={handleNewListingChange}
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newListing.description}
                onChange={handleNewListingChange}
                rows="3"
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={newListing.image}
                onChange={handleNewListingChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddListing}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              disabled={!newListing.foodName || !newListing.foodType || !newListing.quantity || !newListing.mspPerUnit || !newListing.location}
            >
              Add Listing
            </button>
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* ... (keep the existing search and filter bar code) ... */}
      </div>

      {/* Listings Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="No listings"
            className="h-32 mx-auto mb-6 opacity-70"
          />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No matching items found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilters({
                foodType: [],
                quality: [],
                storageCondition: [],
                expiryStatus: "all",
              });
            }}
            className="inline-flex items-center px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item?.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition hover:-translate-y-1 relative ${
                item?.expiryDate && new Date(item.expiryDate) < new Date() ? "border-red-200 bg-red-50/30" : ""
              }`}
            >
              {/* Selection checkbox */}
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item?.id)}
                  onChange={() => toggleSelectItem(item?.id)}
                  className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
              </div>
              
              {/* Expired badge */}
              {item?.expiryDate && new Date(item.expiryDate) < new Date() && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  EXPIRED
                </div>
              )}
              
              <div className="relative">
                <img
                  src={item?.image || "https://via.placeholder.com/300"}
                  alt={item?.foodName || "Food item"}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => item?.id && handleDelete([item.id])}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                {editingId === item?.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="foodName"
                      value={editFormData.foodName}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        name="quantity"
                        value={editFormData.quantity}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        min="0"
                      />
                      <select
                        name="quantityUnit"
                        value={editFormData.quantityUnit}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="litres">litres</option>
                        <option value="pieces">pieces</option>
                        <option value="boxes">boxes</option>
                        <option value="bags">bags</option>
                        <option value="cartons">cartons</option>
                      </select>
                    </div>
                    
                    <input
                      type="number"
                      name="mspPerUnit"
                      value={editFormData.mspPerUnit}
                      onChange={handleEditChange}
                      step="0.01"
                      min="0"
                      className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                    
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      rows="2"
                      className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditSubmit(item.id)}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg font-semibold text-gray-800">{item?.foodName}</h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {item?.foodType}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="font-medium">{item?.quantity} {item?.quantityUnit}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-emerald-600">${Number(item?.mspPerUnit || 0).toFixed(2)}/unit</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item?.location}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm mb-4">
                      <div className="flex items-center">
                        {item?.quality && qualityIcons[item.quality]}
                        <span className="ml-1 capitalize">{item?.quality?.replace('-', ' ') || ""}</span>
                      </div>
                      <div className="flex items-center">
                        {item?.storageCondition && storageIcons[item.storageCondition]}
                        <span className="ml-1 capitalize">{item?.storageCondition?.replace('-', ' ') || ""}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className={`flex items-center ${
                        item?.expiryDate && new Date(item.expiryDate) < new Date() ? "text-red-600" : "text-gray-600"
                      }`}>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Expires: {item?.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}</span>
                      </div>
                      {item?.bestBeforeDate && (
                        <div className="text-gray-500">
                          <span>Best before: {new Date(item.bestBeforeDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item?.description}</p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => item?.id && handleDelete([item.id])}
                        className="flex-1 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg transition"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg transition"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Bulk actions footer */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === filteredListings.length}
                onChange={selectAllItems}
                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 mr-3"
              />
              <span className="font-medium">
                {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
              </span>
            </div>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;