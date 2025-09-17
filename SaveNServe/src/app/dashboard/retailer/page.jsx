// "use client";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   PlusSquare,
//   List,
//   Handshake,
//   Lightbulb,
//   MessageSquare,
//   BarChart2,
//   HelpCircle,
//   Menu,
//   X
// } from "lucide-react";

// // Dummy Components (Replace with actual ones)
// import RetailerOverview from "./components/overview";
// import AddSurplus from "./components/addsurplus";
// import Listings from "./components/listings";
// import DonationRequests from "./components/donationrequests";
// import AIInsights from "./components/aiinsights";
// import Messages from "./components/messages";
// import Reports from "./components/reports";
// import RetailerHelpCenter from "./components/help";
// const RetailerDashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <RetailerOverview />;
//       case "add-surplus":
//         return <AddSurplus />;
//       case "listings":
//         return <Listings />;
//       case "donation-requests":
//         return <DonationRequests />;
//       case "ai-insights":
//         return <AIInsights/>;
//       case "messages":
//         return <Messages />;
//       case "reports":
//         return <Reports />;
//       case "help":
//         return <RetailerHelpCenter />;
//       default:
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//             </h2>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-screen bg-gray-50 mt-20">
//         {/* Mobile sidebar toggle */}
//         <button
//           className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
//           onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
//         >
//           {mobileSidebarOpen ? (
//             <X className="h-6 w-6 text-gray-700" />
//           ) : (
//             <Menu className="h-6 w-6 text-gray-700" />
//           )}
//         </button>

//         {/* Sidebar */}
//         <div
//           className={`fixed md:relative z-40 md:z-0 w-64 h-full bg-white border-r border-gray-200 transform ${
//             mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 transition-transform duration-200 ease-in-out`}
//         >
//           <div className="flex items-center h-16 px-6 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-900">
//               Retailer Dashboard
//             </h1>
//           </div>
//           <div className="flex flex-col flex-grow p-4 overflow-y-auto">
//             <nav className="flex-1 space-y-2">
//               {[
//                 { id: "overview", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
//                 { id: "add-surplus", icon: <PlusSquare className="h-5 w-5" />, label: "Add Surplus" },
//                 { id: "listings", icon: <List className="h-5 w-5" />, label: "Listings" },
//                 { id: "donation-requests", icon: <Handshake className="h-5 w-5" />, label: "Donation Requests" },
//                 { id: "ai-insights", icon: <Lightbulb className="h-5 w-5" />, label: "AI Insights" },
//                 { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
//                 { id: "reports", icon: <BarChart2 className="h-5 w-5" />, label: "Reports" },
//                 { id: "help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" }
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setMobileSidebarOpen(false);
//                   }}
//                   className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
//                     activeTab === item.id
//                       ? "bg-teal-50 text-teal-700"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="p-4 border-t border-gray-200">
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
//                 RET
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">Retailer User</p>
//                 <p className="text-xs text-gray-500">Shop & Restaurant</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-x-hidden overflow-y-auto">
//           <div className="p-6 md:p-8 max-w-6xl mx-auto">{renderContent()}</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default RetailerDashboard;


// "use client";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useState, useEffect } from "react"; // Add useEffect
// import { useSearchParams } from 'next/navigation'; // Add this import
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   PlusSquare,
//   List,
//   Handshake,
//   Lightbulb,
//   MessageSquare,
//   BarChart2,
//   HelpCircle,
//   Menu,
//   X
// } from "lucide-react";

// // Dummy Components (Replace with actual ones)
// import RetailerOverview from "./components/overview";
// import AddSurplus from "./components/addsurplus";
// import Listings from "./components/listings";
// import DonationRequests from "./components/donationrequests";
// import AIInsights from "./components/aiinsights";
// import Messages from "./components/messages";
// import Reports from "./components/reports";
// import RetailerHelpCenter from "./components/help";

// const RetailerDashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [listings, setListings] = useState([]);

//   // Function to handle adding a new listing
//   const handleAddListing = (newListing) => {
//     setListings([newListing, ...listings]);
//   };

//   // Function to handle deleting listings
//   const handleDeleteListings = (idsToDelete) => {
//     setListings(listings.filter(listing => !idsToDelete.includes(listing.id)));
//   };

//   // Function to handle editing a listing
//   const handleEditListing = (id, updatedData) => {
//     setListings(listings.map(listing => 
//       listing.id === id ? { ...listing, ...updatedData } : listing
//     ));
//   };
//  // Add useEffect to handle tab query parameter
//  useEffect(() => {
//   const tab = searchParams.get('tab');
//   if (tab && ['overview', 'add-surplus', 'listings', 'donation-requests', 'ai-insights', 'messages', 'reports', 'help'].includes(tab)) {
//     setActiveTab(tab);
//   }
// }, [searchParams]);
//   const renderContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <RetailerOverview />;
//       case "add-surplus":
//         return <AddSurplus onAddListing={handleAddListing} />;
//       case "listings":
//         return (
//           <Listings 
//             listings={listings} 
//             onDelete={handleDeleteListings} 
//             onEdit={handleEditListing} 
//           />
//         );
//       case "donation-requests":
//         return <DonationRequests />;
//       case "ai-insights":
//         return <AIInsights/>;
//       case "messages":
//         return <Messages />;
//       case "reports":
//         return <Reports />;
//       case "help":
//         return <RetailerHelpCenter />;
//       default:
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//             </h2>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-screen bg-gray-50 mt-20">
//         {/* Mobile sidebar toggle */}
//         <button
//           className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
//           onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
//         >
//           {mobileSidebarOpen ? (
//             <X className="h-6 w-6 text-gray-700" />
//           ) : (
//             <Menu className="h-6 w-6 text-gray-700" />
//           )}
//         </button>

//         {/* Sidebar */}
//         <div
//           className={`fixed md:relative z-40 md:z-0 w-64 h-full bg-white border-r border-gray-200 transform ${
//             mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 transition-transform duration-200 ease-in-out`}
//         >
//           <div className="flex items-center h-16 px-6 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-900">
//               Retailer Dashboard
//             </h1>
//           </div>
//           <div className="flex flex-col flex-grow p-4 overflow-y-auto">
//             <nav className="flex-1 space-y-2">
//               {[
//                 { id: "overview", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
//                 { id: "add-surplus", icon: <PlusSquare className="h-5 w-5" />, label: "Add Surplus" },
//                 { id: "listings", icon: <List className="h-5 w-5" />, label: "Listings" },
//                 { id: "donation-requests", icon: <Handshake className="h-5 w-5" />, label: "Donation Requests" },
//                 { id: "ai-insights", icon: <Lightbulb className="h-5 w-5" />, label: "AI Insights" },
//                 { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
//                 { id: "reports", icon: <BarChart2 className="h-5 w-5" />, label: "Reports" },
//                 { id: "help", icon: <HelpCircle className="h-5 w-5" />, label: "Help" }
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setMobileSidebarOpen(false);
//                   }}
//                   className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
//                     activeTab === item.id
//                       ? "bg-teal-50 text-teal-700"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//           <div className="p-4 border-t border-gray-200">
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
//                 RET
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">Retailer User</p>
//                 <p className="text-xs text-gray-500">Shop & Restaurant</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-x-hidden overflow-y-auto">
//           <div className="p-6 md:p-8 max-w-6xl mx-auto">{renderContent()}</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default RetailerDashboard;
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  PlusSquare,
  List,
  Handshake,
  Lightbulb,
  MessageSquare,
  BarChart2,
  HelpCircle,
  Menu,
  X
} from "lucide-react";

// Components
import RetailerOverview from "./components/overview";
import AddSurplus from "./components/addsurplus";
import Listings from "./components/listings";
import DonationRequests from "./components/donationrequests";
import AIInsights from "./components/aiinsights";
import Messages from "./components/messages";
import Reports from "./components/reports";
import RetailerHelpCenter from "./components/help";

// Initial sample data
const sampleListings = [
  {
    id: 1,
    foodName: "Fresh Apples",
    foodType: "Fruits",
    quantity: 50,
    quantityUnit: "kg",
    mspPerUnit: 1.2,
    description: "Fresh organic apples from local farm",
    location: "Main Warehouse",
    quality: "excellent",
    storageCondition: "refrigerated",
    expiryDate: "2023-12-15",
    listedDate: "2023-11-01",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb"
  },
  {
    id: 2,
    foodName: "Whole Grain Bread",
    foodType: "Bakery",
    quantity: 20,
    quantityUnit: "loaves",
    mspPerUnit: 2.5,
    description: "Freshly baked whole grain bread",
    location: "Downtown Store",
    quality: "good",
    storageCondition: "room-temperature",
    expiryDate: "2023-11-10",
    listedDate: "2023-11-05",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  }
];

const RetailerDashboard = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [listings, setListings] = useState(() => {
    // Initialize with sample data or from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surplus-listings');
      return saved ? JSON.parse(saved) : sampleListings;
    }
    return sampleListings;
  });

  // Save listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('surplus-listings', JSON.stringify(listings));
  }, [listings]);

  // Handle tab changes from URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = [
      'overview', 'add-surplus', 'listings', 
      'donation-requests', 'ai-insights',
      'messages', 'reports', 'help'
    ];
    
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Handle adding a new listing (preserves existing listings)
  const handleAddListing = (newListing) => {
    setListings(prevListings => {
      // Check for duplicates
      const exists = prevListings.some(listing => listing.id === newListing.id);
      return exists ? prevListings : [newListing, ...prevListings];
    });
    // Navigate to listings tab after adding
    setActiveTab("listings");
  };

  // Handle deleting listings
  const handleDeleteListings = (idsToDelete) => {
    setListings(prevListings => 
      prevListings.filter(listing => !idsToDelete.includes(listing.id))
    );
  };

  // Handle editing a listing
  const handleEditListing = (id, updatedData) => {
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === id ? { ...listing, ...updatedData } : listing
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <RetailerOverview listings={listings} />;
      case "add-surplus":
        return <AddSurplus onAddListing={handleAddListing} />;
      case "listings":
        return (
          <Listings 
            listings={listings} 
            onDelete={handleDeleteListings} 
            onEdit={handleEditListing} 
          />
        );
      case "donation-requests":
        return <DonationRequests listings={listings} />;
      case "ai-insights":
        return <AIInsights listings={listings} />;
      case "messages":
        return <Messages />;
      case "reports":
        return <Reports listings={listings} />;
      case "help":
        return <RetailerHelpCenter />;
      default:
        return <RetailerOverview listings={listings} />;
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
        <div
          className={`fixed md:relative z-40 md:z-0 w-64 h-full bg-white border-r border-gray-200 transform ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Retailer Dashboard
            </h1>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {[
                { id: "overview", icon: <LayoutDashboard className="h-5 w-5" />, label: "Overview" },
                { id: "add-surplus", icon: <PlusSquare className="h-5 w-5" />, label: "Add Surplus" },
                { id: "listings", icon: <List className="h-5 w-5" />, label: "Listings" },
                { id: "donation-requests", icon: <Handshake className="h-5 w-5" />, label: "Donation Requests" },
                { id: "ai-insights", icon: <Lightbulb className="h-5 w-5" />, label: "Insights" },
                { id: "messages", icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
                { id: "reports", icon: <BarChart2 className="h-5 w-5" />, label: "Reports" },
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
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-600 hover:bg-gray-100"
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
              <div className="ml-3">
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
  );s
};

export default RetailerDashboard;