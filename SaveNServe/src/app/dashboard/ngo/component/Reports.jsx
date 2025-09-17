// "use client";
// import { useState, useRef } from "react";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// } from "chart.js";
// import * as XLSX from "xlsx";
// import { Download, Filter, Calendar, Users, Package, ArrowRight } from "lucide-react";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// const ReportsPage = () => {
//   // Date range filter state
//   const [dateRange, setDateRange] = useState({
//     start: "2023-01-01",
//     end: "2023-12-31"
//   });

//   // Report data (would come from API in real app)
//   const [reportData, setReportData] = useState({
//     totalFoodRedirected: 5240, // kg
//     totalBeneficiaries: 12450,
//     farmersContacted: 86,
//     successfulCollections: 142,
//     failedCollections: 8,
//     collectionEfficiency: 94.7, // %
//     programDistribution: {
//       "School Meals": 45,
//       "Community Kitchen": 30,
//       "Elderly Care": 15,
//       "Disaster Relief": 10
//     },
//     foodTypeDistribution: {
//       "Vegetables": 35,
//       "Grains": 25,
//       "Fruits": 20,
//       "Dairy": 12,
//       "Other": 8
//     },
//     monthlyTrends: {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       foodCollected: [320, 380, 420, 450, 510, 580, 620, 590, 550, 480, 430, 390],
//       beneficiaries: [850, 920, 1050, 1100, 1250, 1400, 1450, 1350, 1200, 1050, 950, 850]
//     }
//   });

//   // Export to Excel function
//   const exportToExcel = () => {
//     // Prepare data for export
//     const exportData = [
//       ["Metric", "Value"],
//       ["Total Food Redirected (kg)", reportData.totalFoodRedirected],
//       ["Total Beneficiaries", reportData.totalBeneficiaries],
//       ["Farmers Contacted", reportData.farmersContacted],
//       ["Successful Collections", reportData.successfulCollections],
//       ["Failed Collections", reportData.failedCollections],
//       ["Collection Efficiency (%)", reportData.collectionEfficiency],
//       [],
//       ["Program Distribution", ""],
//       ...Object.entries(reportData.programDistribution).map(([program, percent]) => [program, `${percent}%`]),
//       [],
//       ["Food Type Distribution", ""],
//       ...Object.entries(reportData.foodTypeDistribution).map(([type, percent]) => [type, `${percent}%`])
//     ];

//     // Create workbook and worksheet
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet(exportData);
//     XLSX.utils.book_append_sheet(wb, ws, "NGO_Report");

//     // Export the workbook
//     XLSX.writeFile(wb, `NGO_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   // Chart data generators
//   const generateProgramDistributionData = () => ({
//     labels: Object.keys(reportData.programDistribution),
//     datasets: [
//       {
//         data: Object.values(reportData.programDistribution),
//         backgroundColor: [
//           "#10B981",
//           "#3B82F6",
//           "#F59E0B",
//           "#8B5CF6"
//         ],
//         borderWidth: 0
//       }
//     ]
//   });

//   const generateFoodTypeDistributionData = () => ({
//     labels: Object.keys(reportData.foodTypeDistribution),
//     datasets: [
//       {
//         data: Object.values(reportData.foodTypeDistribution),
//         backgroundColor: [
//           "#10B981",
//           "#F59E0B",
//           "#3B82F6",
//           "#8B5CF6",
//           "#EC4899"
//         ],
//         borderWidth: 0
//       }
//     ]
//   });

//   const generateMonthlyTrendsData = () => ({
//     labels: reportData.monthlyTrends.labels,
//     datasets: [
//       {
//         label: "Food Collected (kg)",
//         data: reportData.monthlyTrends.foodCollected,
//         borderColor: "#10B981",
//         backgroundColor: "rgba(16, 185, 129, 0.1)",
//         yAxisID: "y"
//       },
//       {
//         label: "Beneficiaries",
//         data: reportData.monthlyTrends.beneficiaries,
//         borderColor: "#3B82F6",
//         backgroundColor: "rgba(59, 130, 246, 0.1)",
//         yAxisID: "y1"
//       }
//     ]
//   });

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Impact Report</h1>
//           <p className="text-gray-600">Comprehensive overview of your food redistribution efforts</p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Calendar className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="date"
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//               value={dateRange.start}
//               onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
//             />
//           </div>
//           <div className="flex items-center justify-center text-gray-500">
//             to
//           </div>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Calendar className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="date"
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//               value={dateRange.end}
//               onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
//             />
//           </div>
//           <button
//             onClick={exportToExcel}
//             className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center"
//           >
//             <Download className="h-5 w-5 mr-2" />
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center">
//             <div className="p-3 rounded-lg bg-teal-100 mr-4">
//               <Package className="h-6 w-6 text-teal-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Food Redirected</p>
//               <p className="text-2xl font-semibold text-gray-900">{reportData.totalFoodRedirected} kg</p>
//               <p className="text-sm text-teal-600">+12% vs last period</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center">
//             <div className="p-3 rounded-lg bg-blue-100 mr-4">
//               <Users className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Beneficiaries</p>
//               <p className="text-2xl font-semibold text-gray-900">{reportData.totalBeneficiaries.toLocaleString()}</p>
//               <p className="text-sm text-blue-600">+15% vs last period</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center">
//             <div className="p-3 rounded-lg bg-amber-100 mr-4">
//               <Users className="h-6 w-6 text-amber-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Farmers Contacted</p>
//               <p className="text-2xl font-semibold text-gray-900">{reportData.farmersContacted}</p>
//               <p className="text-sm text-amber-600">+8 new this month</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <div className="flex items-center">
//             <div className="p-3 rounded-lg bg-green-100 mr-4">
//               {/* <CheckCircle className="h-6 w-6 text-green-600" /> */}
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Collection Rate</p>
//               <p className="text-2xl font-semibold text-gray-900">{reportData.collectionEfficiency}%</p>
//               <p className="text-sm text-green-600">{reportData.failedCollections} failed</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Monthly Trends */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h2>
//         <div className="h-96">
//           <Line
//             data={generateMonthlyTrendsData()}
//             options={{
//               responsive: true,
//               interaction: {
//                 mode: "index",
//                 intersect: false
//               },
//               plugins: {
//                 legend: {
//                   position: "top"
//                 }
//               },
//               scales: {
//                 y: {
//                   type: "linear",
//                   display: true,
//                   position: "left",
//                   title: {
//                     display: true,
//                     text: "Food Collected (kg)"
//                   }
//                 },
//                 y1: {
//                   type: "linear",
//                   display: true,
//                   position: "right",
//                   title: {
//                     display: true,
//                     text: "Beneficiaries"
//                   },
//                   grid: {
//                     drawOnChartArea: false
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>

//       {/* Distribution Breakdown */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">Program Distribution</h2>
//           <div className="h-80">
//             <Pie
//               data={generateProgramDistributionData()}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: "right"
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function(context) {
//                         return `${context.label}: ${context.raw}%`;
//                       }
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">Food Type Distribution</h2>
//           <div className="h-80">
//             <Pie
//               data={generateFoodTypeDistributionData()}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: "right"
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function(context) {
//                         return `${context.label}: ${context.raw}%`;
//                       }
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Farmer Engagement */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Farmer Engagement</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">Total Farmers Engaged</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.farmersContacted}</p>
//             <p className="text-sm text-gray-500 mt-1">Across all programs</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">Most Active Farmer</p>
//             <p className="text-xl font-bold text-gray-900 mt-2">Green Fields Co-op</p>
//             <p className="text-sm text-gray-500 mt-1">Contributed 1,250kg</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">New Farmers This Month</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
//             <p className="text-sm text-gray-500 mt-1">Added to network</p>
//           </div>
//         </div>
//         <div className="mt-6">
//           <button className="text-teal-600 hover:text-teal-800 font-medium flex items-center">
//             View farmer engagement details <ArrowRight className="h-4 w-4 ml-1" />
//           </button>
//         </div>
//       </div>

//       {/* Collection Efficiency */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Collection Performance</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">Successful Collections</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.successfulCollections}</p>
//             <p className="text-sm text-green-600 mt-1">94.7% success rate</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">Average Collection Time</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">5.2 hrs</p>
//             <p className="text-sm text-gray-500 mt-1">From request to delivery</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm font-medium text-gray-500">Failed Collections</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.failedCollections}</p>
//             <p className="text-sm text-gray-500 mt-1">5.3% of total</p>
//           </div>
//         </div>
//         <div className="mt-6 h-64">
//           <Bar
//             data={{
//               labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//               datasets: [
//                 {
//                   label: "Collection Time (hrs)",
//                   data: [6.2, 5.8, 5.5, 5.1, 4.9, 4.7],
//                   backgroundColor: "#10B981"
//                 }
//               ]
//             }}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: false
//                 }
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: "Hours"
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportsPage;
"use client";
import { useState, useRef, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import * as XLSX from "xlsx";
import { Download, Filter, Calendar, Users, Package, ArrowRight } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data generator functions
const generateMonthlyData = (startDate, endDate) => {
  const months = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  
  while (current <= end) {
    months.push(current.toLocaleString('default', { month: 'short' }));
    current.setMonth(current.getMonth() + 1);
  }
  
  return {
    labels: months,
    foodCollected: months.map(() => Math.floor(Math.random() * 500) + 200),
    beneficiaries: months.map(() => Math.floor(Math.random() * 1000) + 500)
  };
};

const generateProgramDistribution = () => {
  const programs = ["School Meals", "Community Kitchen", "Elderly Care", "Disaster Relief"];
  const total = programs.reduce((sum, _, i) => sum + (40 - i * 5), 0);
  return programs.reduce((acc, program, i) => {
    acc[program] = Math.round(((40 - i * 5) / total) * 100);
    return acc;
  }, {});
};

const generateFoodTypeDistribution = () => {
  const types = ["Vegetables", "Grains", "Fruits", "Dairy", "Other"];
  const total = types.reduce((sum, _, i) => sum + (35 - i * 5), 0);
  return types.reduce((acc, type, i) => {
    acc[type] = Math.round(((35 - i * 5) / total) * 100);
    return acc;
  }, {});
};

const ReportsPage = () => {
  // Date range filter state
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: "2023-12-31"
  });

  // Report data state
  const [reportData, setReportData] = useState({
    totalFoodRedirected: 0,
    totalBeneficiaries: 0,
    farmersContacted: 0,
    successfulCollections: 0,
    failedCollections: 0,
    collectionEfficiency: 0,
    programDistribution: {},
    foodTypeDistribution: {},
    monthlyTrends: {
      labels: [],
      foodCollected: [],
      beneficiaries: []
    }
  });

  // Calculate derived data based on date range
  useEffect(() => {
    const monthlyData = generateMonthlyData(dateRange.start, dateRange.end);
    const totalFood = monthlyData.foodCollected.reduce((sum, val) => sum + val, 0);
    const totalBeneficiaries = monthlyData.beneficiaries.reduce((sum, val) => sum + val, 0);
    const farmersContacted = Math.floor(totalFood / 50);
    const successfulCollections = Math.floor(farmersContacted * 0.95);
    const failedCollections = farmersContacted - successfulCollections;
    const collectionEfficiency = Math.round((successfulCollections / farmersContacted) * 100);

    setReportData({
      totalFoodRedirected: totalFood,
      totalBeneficiaries: totalBeneficiaries,
      farmersContacted: farmersContacted,
      successfulCollections: successfulCollections,
      failedCollections: failedCollections,
      collectionEfficiency: collectionEfficiency,
      programDistribution: generateProgramDistribution(),
      foodTypeDistribution: generateFoodTypeDistribution(),
      monthlyTrends: monthlyData
    });
  }, [dateRange]);

  // Export to Excel function
  const exportToExcel = () => {
    // Prepare data for export
    const exportData = [
      ["Metric", "Value"],
      ["Date Range", `${dateRange.start} to ${dateRange.end}`],
      ["Total Food Redirected (kg)", reportData.totalFoodRedirected],
      ["Total Beneficiaries", reportData.totalBeneficiaries],
      ["Farmers Contacted", reportData.farmersContacted],
      ["Successful Collections", reportData.successfulCollections],
      ["Failed Collections", reportData.failedCollections],
      ["Collection Efficiency (%)", reportData.collectionEfficiency],
      [],
      ["Program Distribution", ""],
      ...Object.entries(reportData.programDistribution).map(([program, percent]) => [program, `${percent}%`]),
      [],
      ["Food Type Distribution", ""],
      ...Object.entries(reportData.foodTypeDistribution).map(([type, percent]) => [type, `${percent}%`]),
      [],
      ["Monthly Trends", ""],
      ["Month", "Food Collected (kg)", "Beneficiaries"],
      ...reportData.monthlyTrends.labels.map((month, i) => [
        month,
        reportData.monthlyTrends.foodCollected[i],
        reportData.monthlyTrends.beneficiaries[i]
      ])
    ];

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "NGO_Report");

    // Export the workbook
    XLSX.writeFile(wb, `NGO_Report_${dateRange.start}_to_${dateRange.end}.xlsx`);
  };

  // Chart data generators
  const generateProgramDistributionData = () => ({
    labels: Object.keys(reportData.programDistribution),
    datasets: [
      {
        data: Object.values(reportData.programDistribution),
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F59E0B",
          "#8B5CF6"
        ],
        borderWidth: 0
      }
    ]
  });

  const generateFoodTypeDistributionData = () => ({
    labels: Object.keys(reportData.foodTypeDistribution),
    datasets: [
      {
        data: Object.values(reportData.foodTypeDistribution),
        backgroundColor: [
          "#10B981",
          "#F59E0B",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899"
        ],
        borderWidth: 0
      }
    ]
  });

  const generateMonthlyTrendsData = () => ({
    labels: reportData.monthlyTrends.labels,
    datasets: [
      {
        label: "Food Collected (kg)",
        data: reportData.monthlyTrends.foodCollected,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        yAxisID: "y"
      },
      {
        label: "Beneficiaries",
        data: reportData.monthlyTrends.beneficiaries,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        yAxisID: "y1"
      }
    ]
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impact Report</h1>
          <p className="text-gray-600">Comprehensive overview of your food redistribution efforts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          <div className="flex items-center justify-center text-gray-500">
            to
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-teal-100 mr-4">
              <Package className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Food Redirected</p>
              <p className="text-2xl font-semibold text-gray-900">{reportData.totalFoodRedirected} kg</p>
              <p className="text-sm text-teal-600">
                {reportData.monthlyTrends.labels.length} months
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Beneficiaries</p>
              <p className="text-2xl font-semibold text-gray-900">{reportData.totalBeneficiaries.toLocaleString()}</p>
              <p className="text-sm text-blue-600">
                Avg {Math.round(reportData.totalBeneficiaries / reportData.monthlyTrends.labels.length)}/month
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-amber-100 mr-4">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Farmers Contacted</p>
              <p className="text-2xl font-semibold text-gray-900">{reportData.farmersContacted}</p>
              <p className="text-sm text-amber-600">
                ~{Math.round(reportData.totalFoodRedirected / reportData.farmersContacted)}kg/farmer
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 mr-4">
              {/* <CheckCircle className="h-6 w-6 text-green-600" /> */}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Collection Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{reportData.collectionEfficiency}%</p>
              <p className="text-sm text-green-600">
                {reportData.failedCollections} failed of {reportData.farmersContacted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h2>
        <div className="h-96">
          <Line
            data={generateMonthlyTrendsData()}
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
                    text: "Food Collected (kg)"
                  }
                },
                y1: {
                  type: "linear",
                  display: true,
                  position: "right",
                  title: {
                    display: true,
                    text: "Beneficiaries"
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

      {/* Distribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Program Distribution</h2>
          <div className="h-80">
            <Pie
              data={generateProgramDistributionData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right"
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
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Food Type Distribution</h2>
          <div className="h-80">
            <Pie
              data={generateFoodTypeDistributionData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right"
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

      {/* Collection Performance */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Collection Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Successful Collections</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.successfulCollections}</p>
            <p className="text-sm text-green-600 mt-1">{reportData.collectionEfficiency}% success rate</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Average Collection Time</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {Math.floor(reportData.monthlyTrends.labels.length / 3) + 4.2} hrs
            </p>
            <p className="text-sm text-gray-500 mt-1">From request to delivery</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Failed Collections</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{reportData.failedCollections}</p>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((reportData.failedCollections / reportData.farmersContacted) * 100)}% of total
            </p>
          </div>
        </div>
        <div className="mt-6 h-64">
          <Bar
            data={{
              labels: reportData.monthlyTrends.labels,
              datasets: [
                {
                  label: "Collections per Month",
                  data: reportData.monthlyTrends.labels.map((_, i) => 
                    Math.floor(reportData.farmersContacted / reportData.monthlyTrends.labels.length) + 
                    (i % 2 === 0 ? 2 : -1)
                  ),
                  backgroundColor: "#10B981"
                }
              ]
            }}
            options={{
              responsive: true,
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
                    text: "Collections"
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;