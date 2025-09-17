"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Mail, Wheat, Calendar, Info, X } from "lucide-react";

export default function SurplusPage() {
  // Mock data for 15 farmers
  const farmers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      farmName: "Green Fields Organic Farm",
      location: "Pune, Maharashtra",
      phone: "+91 9876543210",
      email: "rajesh@greenfields.com",
      produce: [
        { name: "Tomatoes", quantity: 120 },
        { name: "Onions", quantity: 80 },
        { name: "Potatoes", quantity: 150 }
      ],
      availability: "Mon-Sat, 8AM-6PM",
      notes: "Prefer bulk orders above 50kg"
    },
    {
      id: 2,
      name: "Priya Patel",
      farmName: "Sunshine Horticulture",
      location: "Nashik, Maharashtra",
      phone: "+91 8765432109",
      email: "priya@sunshinefarm.com",
      produce: [
        { name: "Grapes", quantity: 200 },
        { name: "Pomegranates", quantity: 75 }
      ],
      availability: "Flexible hours",
      notes: "Organic farming practices used"
    },
    {
      id: 3,
      name: "Amit Singh",
      farmName: "Golden Grains Farm",
      location: "Amritsar, Punjab",
      phone: "+91 7654321098",
      email: "amit@goldengrains.com",
      produce: [
        { name: "Wheat", quantity: 500 },
        { name: "Rice", quantity: 300 },
        { name: "Barley", quantity: 150 }
      ],
      availability: "Daily 7AM-5PM",
      notes: "Government certified produce"
    },
    {
      id: 4,
      name: "Sunita Devi",
      farmName: "Mango Grove",
      location: "Lucknow, Uttar Pradesh",
      phone: "+91 6543210987",
      email: "sunita@mangogrove.com",
      produce: [
        { name: "Mangoes", quantity: 350 },
        { name: "Guavas", quantity: 90 }
      ],
      availability: "Seasonal (April-July)",
      notes: "Dasheri and Langra varieties available"
    },
    {
      id: 5,
      name: "Vikram Joshi",
      farmName: "Joshi Dairy & Farm",
      location: "Ahmedabad, Gujarat",
      phone: "+91 9432109876",
      email: "vikram@joshifarm.com",
      produce: [
        { name: "Milk", quantity: 200 },
        { name: "Cheese", quantity: 50 },
        { name: "Wheat", quantity: 180 }
      ],
      availability: "24/7 for dairy products",
      notes: "Free range dairy farm"
    },
    {
      id: 6,
      name: "Meena Iyer",
      farmName: "Kerala Spice Garden",
      location: "Kochi, Kerala",
      phone: "+91 8321098765",
      email: "meena@spicegarden.com",
      produce: [
        { name: "Black Pepper", quantity: 60 },
        { name: "Cardamom", quantity: 40 },
        { name: "Cinnamon", quantity: 30 }
      ],
      availability: "Mon-Fri 9AM-4PM",
      notes: "Export quality spices"
    },
    {
      id: 7,
      name: "Arun Reddy",
      farmName: "Reddy's Citrus Farm",
      location: "Nagpur, Maharashtra",
      phone: "+91 7210987654",
      email: "arun@reddyfarm.com",
      produce: [
        { name: "Oranges", quantity: 400 },
        { name: "Mosambi", quantity: 150 }
      ],
      availability: "Seasonal (Nov-Mar)",
      notes: "Contains seeds"
    },
    {
      id: 8,
      name: "Laxmi Bai",
      farmName: "Bai Vegetables",
      location: "Bhopal, Madhya Pradesh",
      phone: "+91 6109876543",
      email: "laxmi@baivegetables.com",
      produce: [
        { name: "Brinjal", quantity: 70 },
        { name: "Okra", quantity: 60 },
        { name: "Bitter Gourd", quantity: 40 }
      ],
      availability: "Wed-Sun 6AM-2PM",
      notes: "Pesticide-free produce"
    },
    {
      id: 9,
      name: "Sanjay Gupta",
      farmName: "Gupta Rice Mills",
      location: "Chandigarh",
      phone: "+91 5098765432",
      email: "sanjay@guptarice.com",
      produce: [
        { name: "Basmati Rice", quantity: 600 },
        { name: "Brown Rice", quantity: 200 }
      ],
      availability: "All days 8AM-8PM",
      notes: "Minimum order 100kg"
    },
    {
      id: 10,
      name: "Ananya Das",
      farmName: "Das Flower Garden",
      location: "Kolkata, West Bengal",
      phone: "+91 4987654321",
      email: "ananya@dasflowers.com",
      produce: [
        { name: "Roses", quantity: 500 },
        { name: "Marigold", quantity: 300 },
        { name: "Jasmine", quantity: 200 }
      ],
      availability: "Early morning only",
      notes: "Fresh cut flowers daily"
    },
    {
      id: 11,
      name: "Rahul Sharma",
      farmName: "Sharma Tea Estate",
      location: "Darjeeling, West Bengal",
      phone: "+91 3876543210",
      email: "rahul@sharmatea.com",
      produce: [
        { name: "Tea Leaves", quantity: 150 },
        { name: "Lemongrass", quantity: 80 }
      ],
      availability: "Mon-Sat 10AM-4PM",
      notes: "First flush available"
    },
    {
      id: 12,
      name: "Neha Verma",
      farmName: "Verma Organic Farm",
      location: "Jaipur, Rajasthan",
      phone: "+91 2765432109",
      email: "neha@vermaorganic.com",
      produce: [
        { name: "Bajra", quantity: 250 },
        { name: "Jowar", quantity: 180 },
        { name: "Millet", quantity: 120 }
      ],
      availability: "Contact before visiting",
      notes: "100% organic certified"
    },
    {
      id: 13,
      name: "Kiran Bedi",
      farmName: "Bedi Herbal Garden",
      location: "Dehradun, Uttarakhand",
      phone: "+91 1654321098",
      email: "kiran@bediherbal.com",
      produce: [
        { name: "Aloe Vera", quantity: 100 },
        { name: "Tulsi", quantity: 150 },
        { name: "Lemongrass", quantity: 80 }
      ],
      availability: "By appointment",
      notes: "Medicinal plants available"
    },
    {
      id: 14,
      name: "Deepak Malhotra",
      farmName: "Malhotra Apple Orchard",
      location: "Shimla, Himachal Pradesh",
      phone: "+91 9543210987",
      email: "deepak@malhotraapples.com",
      produce: [
        { name: "Apples", quantity: 800 },
        { name: "Peaches", quantity: 120 }
      ],
      availability: "Seasonal (July-Nov)",
      notes: "Cold storage facility available"
    },
    {
      id: 15,
      name: "Smita Nair",
      farmName: "Nair Coconut Plantation",
      location: "Chennai, Tamil Nadu",
      phone: "+91 8432109876",
      email: "smita@naircoconuts.com",
      produce: [
        { name: "Coconuts", quantity: 1000 },
        { name: "Coconut Oil", quantity: 200 }
      ],
      availability: "All days 6AM-6PM",
      notes: "Tender coconuts also available"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedProduce, setSelectedProduce] = useState("All");
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Get unique locations and produce types for filters
  const locations = ["All", ...new Set(farmers.map(farmer => farmer.location.split(",")[0]))];
  const produceTypes = ["All", ...new Set(farmers.flatMap(farmer => farmer.produce.map(p => p.name)))];

  // Filter farmers based on search and filters
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         farmer.farmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || 
                          farmer.location.includes(selectedLocation);
    const matchesProduce = selectedProduce === "All" || 
                          farmer.produce.some(p => p.name === selectedProduce);
    
    return matchesSearch && matchesLocation && matchesProduce;
  });

  const handleContactFarmer = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const closeContactDetails = () => {
    setSelectedFarmer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contact Details Modal */}
        {selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            >
              <button 
                onClick={closeContactDetails}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact {selectedFarmer.name}</h2>
              <p className="text-gray-600 mb-6">{selectedFarmer.farmName}</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="flex-shrink-0 h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{selectedFarmer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="flex-shrink-0 h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{selectedFarmer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="flex-shrink-0 h-5 w-5 text-gray-600 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900">{selectedFarmer.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => window.location.href = `tel:${selectedFarmer.phone.replace(/\D/g, '')}`}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium mb-3"
                >
                  Call Now
                </button>
                <button 
                  onClick={() => window.location.href = `mailto:${selectedFarmer.email}`}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 font-medium"
                >
                  Send Email
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Available Farmers</h1>
          <p className="mt-3 text-lg text-gray-600">
            Connect with farmers who have surplus produce available for donation
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Farmers
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or farm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Location
              </label>
              <select
                id="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="produce" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Produce
              </label>
              <select
                id="produce"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={selectedProduce}
                onChange={(e) => setSelectedProduce(e.target.value)}
              >
                {produceTypes.map((produce) => (
                  <option key={produce} value={produce}>
                    {produce}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredFarmers.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
              <strong className="font-bold">No farmers found. </strong>
              <span className="block sm:inline">Try adjusting your search or filters.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <motion.div
                key={farmer.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{farmer.name}</h3>
                      <p className="text-gray-500 text-sm">{farmer.farmName}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{farmer.location}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{farmer.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{farmer.email}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Wheat className="h-4 w-4 mr-1.5 text-amber-500" />
                      Available Produce
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {farmer.produce.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                        >
                          {item.name} ({item.quantity} kg)
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-blue-500" />
                      Availability
                    </h4>
                    <p className="text-sm text-gray-600">
                      {farmer.availability || "Flexible, please contact for details"}
                    </p>
                  </div>

                  {farmer.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-1.5 text-purple-500" />
                        Additional Notes
                      </h4>
                      <p className="text-sm text-gray-600">{farmer.notes}</p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleContactFarmer(farmer)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium"
                  >
                    Contact Farmer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}