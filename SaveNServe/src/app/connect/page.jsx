"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Phone, MapPin, Mail, HandHeart, ShieldCheck, Calendar } from "lucide-react";

export default function ConnectPage() {
  // Mock data for NGOs
  const ngos = [
    {
      id: 1,
      name: "Feed the Future Foundation",
      description: "Dedicated to eliminating hunger through food redistribution",
      location: "Mumbai, Maharashtra",
      phone: "+91 9876543210",
      email: "contact@feedthefuture.org",
      focusAreas: ["Hunger Relief", "Food Security", "Community Development"],
      beneficiaries: "5000+ monthly",
      verificationStatus: "Verified",
      established: 2010,
      website: "www.feedthefuture.org"
    },
    {
      id: 2,
      name: "Green Harvest Initiative",
      description: "Connecting farmers with surplus to communities in need",
      location: "Bangalore, Karnataka",
      phone: "+91 8765432109",
      email: "info@greenharvest.org",
      focusAreas: ["Food Redistribution", "Farmer Support", "Sustainability"],
      beneficiaries: "3000+ monthly",
      verificationStatus: "Verified",
      established: 2015,
      website: "www.greenharvest.org"
    },
    {
      id: 3,
      name: "Annapurna Seva Trust",
      description: "Providing meals to underprivileged communities across India",
      location: "Delhi",
      phone: "+91 7654321098",
      email: "support@annapurnaseva.org",
      focusAreas: ["Meal Programs", "Nutrition", "Child Welfare"],
      beneficiaries: "10000+ daily",
      verificationStatus: "Verified",
      established: 2005,
      website: "www.annapurnaseva.org"
    },
    {
      id: 4,
      name: "Rural Upliftment Society",
      description: "Empowering rural communities through food and education",
      location: "Hyderabad, Telangana",
      phone: "+91 6543210987",
      email: "connect@ruralupliftment.org",
      focusAreas: ["Rural Development", "Education", "Food Security"],
      beneficiaries: "2000+ monthly",
      verificationStatus: "Verified",
      established: 2012,
      website: "www.ruralupliftment.org"
    },
    {
      id: 5,
      name: "Sustainable Food Network",
      description: "Creating sustainable food systems to reduce waste",
      location: "Chennai, Tamil Nadu",
      phone: "+91 9432109876",
      email: "hello@sustainablefood.org",
      focusAreas: ["Food Waste Reduction", "Sustainability", "Community Kitchens"],
      beneficiaries: "4000+ monthly",
      verificationStatus: "Verified",
      established: 2018,
      website: "www.sustainablefood.org"
    },
    {
      id: 6,
      name: "Health & Nutrition Foundation",
      description: "Improving community health through proper nutrition",
      location: "Pune, Maharashtra",
      phone: "+91 8321098765",
      email: "contact@healthnutrition.org",
      focusAreas: ["Nutrition", "Healthcare", "Child Development"],
      beneficiaries: "2500+ monthly",
      verificationStatus: "Verified",
      established: 2008,
      website: "www.healthnutrition.org"
    },
    {
      id: 7,
      name: "Farm to Fork Alliance",
      description: "Bridging the gap between farmers and food insecure populations",
      location: "Ahmedabad, Gujarat",
      phone: "+91 7210987654",
      email: "info@farmtofork.org",
      focusAreas: ["Food Redistribution", "Farmer Partnerships", "Logistics"],
      beneficiaries: "6000+ monthly",
      verificationStatus: "Verified",
      established: 2016,
      website: "www.farmtofork.org"
    },
    {
      id: 8,
      name: "No Child Hungry India",
      description: "Ensuring no child goes to bed hungry",
      location: "Kolkata, West Bengal",
      phone: "+91 6109876543",
      email: "support@nochildhungry.org",
      focusAreas: ["Child Nutrition", "School Meals", "Family Support"],
      beneficiaries: "8000+ daily",
      verificationStatus: "Verified",
      established: 2007,
      website: "www.nochildhungry.org"
    },
    {
      id: 9,
      name: "Urban Food Collective",
      description: "Addressing urban food insecurity through community efforts",
      location: "Delhi NCR",
      phone: "+91 5098765432",
      email: "contact@urbanfood.org",
      focusAreas: ["Urban Poverty", "Food Banks", "Skill Development"],
      beneficiaries: "3500+ monthly",
      verificationStatus: "Verified",
      established: 2014,
      website: "www.urbanfood.org"
    },
    {
      id: 10,
      name: "The Hunger Project India",
      description: "Sustainable solutions to end hunger and poverty",
      location: "Bengaluru, Karnataka",
      phone: "+91 4987654321",
      email: "india@thp.org",
      focusAreas: ["Women Empowerment", "Community Leadership", "Food Security"],
      beneficiaries: "7000+ monthly",
      verificationStatus: "Verified",
      established: 2000,
      website: "www.thp.org/india"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedFocusArea, setSelectedFocusArea] = useState("All");

  // Get unique locations and focus areas for filters
  const locations = ["All", ...new Set(ngos.map(ngo => ngo.location.split(",")[0]))];
  const focusAreas = ["All", ...new Set(ngos.flatMap(ngo => ngo.focusAreas))];

  // Filter NGOs based on search and filters
  const filteredNgos = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || 
                          ngo.location.includes(selectedLocation);
    const matchesFocusArea = selectedFocusArea === "All" || 
                           ngo.focusAreas.includes(selectedFocusArea);
    
    return matchesSearch && matchesLocation && matchesFocusArea;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">NGO Partners</h1>
          <p className="mt-3 text-lg text-gray-600">
            Connect with verified NGOs working to reduce food waste and hunger
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search NGOs
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or description..."
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
              <label htmlFor="focusArea" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Focus Area
              </label>
              <select
                id="focusArea"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={selectedFocusArea}
                onChange={(e) => setSelectedFocusArea(e.target.value)}
              >
                {focusAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredNgos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
              <strong className="font-bold">No NGOs found. </strong>
              <span className="block sm:inline">Try adjusting your search or filters.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNgos.map((ngo) => (
              <motion.div
                key={ngo.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{ngo.name}</h3>
                      <p className="text-gray-500 text-sm">{ngo.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{ngo.location}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{ngo.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">{ngo.email}</span>
                    </div>
                    <div className="flex items-start">
                      <HandHeart className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-2 text-gray-600">
                        <strong>Beneficiaries:</strong> {ngo.beneficiaries}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-1.5 text-green-500" />
                      Focus Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {ngo.focusAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-blue-500" />
                      Organization Details
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Established:</span> {ngo.established}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> {ngo.verificationStatus}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Website:</span>{" "}
                        <a href={`https://${ngo.website}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          {ngo.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium">
                      Contact NGO
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium">
                      View Projects
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}