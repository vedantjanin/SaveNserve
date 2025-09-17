import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Reports = () => {
  // Sample data - replace with actual API data
  const [reportData, setReportData] = useState({
    donations: [],
    surplus: [],
    monthlySummary: []
  });

  const [timeRange, setTimeRange] = useState('yearly');
  const [isLoading, setIsLoading] = useState(true);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        const mockData = {
          donations: [
            { id: 1, date: '2023-01-15', item: 'Wheat', quantity: 50, unit: 'kg', recipient: 'Food Bank A' },
            { id: 2, date: '2023-02-20', item: 'Rice', quantity: 30, unit: 'kg', recipient: 'Shelter B' },
            { id: 3, date: '2023-03-10', item: 'Vegetables', quantity: 20, unit: 'kg', recipient: 'Community Center' },
            { id: 4, date: '2023-04-05', item: 'Fruits', quantity: 15, unit: 'kg', recipient: 'Food Bank A' },
            { id: 5, date: '2023-05-12', item: 'Milk', quantity: 10, unit: 'liters', recipient: 'Orphanage' },
          ],
          surplus: [
            { id: 1, date: '2023-01-10', item: 'Wheat', quantity: 100, unit: 'kg', price: '$50', status: 'Sold' },
            { id: 2, date: '2023-02-15', item: 'Rice', quantity: 80, unit: 'kg', price: '$40', status: 'Sold' },
            { id: 3, date: '2023-03-05', item: 'Vegetables', quantity: 60, unit: 'kg', price: '$30', status: 'Donated' },
            { id: 4, date: '2023-04-20', item: 'Fruits', quantity: 40, unit: 'kg', price: '$20', status: 'Sold' },
            { id: 5, date: '2023-05-08', item: 'Milk', quantity: 30, unit: 'liters', price: '$15', status: 'Donated' },
          ],
          monthlySummary: [
            { month: 'Jan', donations: 50, surplus: 100, profit: 50 },
            { month: 'Feb', donations: 30, surplus: 80, profit: 40 },
            { month: 'Mar', donations: 20, surplus: 60, profit: 30 },
            { month: 'Apr', donations: 15, surplus: 40, profit: 20 },
            { month: 'May', donations: 10, surplus: 30, profit: 15 },
          ]
        };
        setReportData(mockData);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  // Calculate totals
  const totalDonated = reportData.donations.reduce((sum, item) => sum + item.quantity, 0);
  const totalSurplus = reportData.surplus.reduce((sum, item) => sum + item.quantity, 0);
  const donatedPercentage = Math.round((totalDonated / (totalDonated + totalSurplus)) * 100);
  const profit = reportData.surplus
    .filter(item => item.status === 'Sold')
    .reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  // Prepare data for charts
  const donationByItem = reportData.donations.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.item);
    if (existing) {
      existing.value += item.quantity;
    } else {
      acc.push({ name: item.item, value: item.quantity });
    }
    return acc;
  }, []);

  const handleDownload = (format) => {
    // Prepare data for export
    const data = [
      ['Report Type', 'Item', 'Quantity', 'Unit', 'Date', 'Recipient/Status', 'Price'],
      ...reportData.donations.map(item => [
        'Donation',
        item.item,
        item.quantity,
        item.unit,
        item.date,
        item.recipient,
        '-'
      ]),
      ...reportData.surplus.map(item => [
        'Surplus',
        item.item,
        item.quantity,
        item.unit,
        item.date,
        item.status,
        item.price
      ])
    ];

    if (format === 'excel') {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Farm Report");
      XLSX.writeFile(wb, `farm_report_${new Date().toISOString().split('T')[0]}.xlsx`);
    } else {
      // CSV
      const csvContent = data.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `farm_report_${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports...</div>;
  }

  return (
    <div className="space-y-8 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Farm Reports & Analytics</h2>
        <div className="flex gap-2">
        
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Donated</h3>
          <p className="text-2xl font-bold mt-2">{totalDonated} kg</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm">12% from last {timeRange}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Surplus</h3>
          <p className="text-2xl font-bold mt-2">{totalSurplus} kg</p>
          <div className="flex items-center mt-2">
            <TrendingDown className="text-red-500 mr-1" size={16} />
            <span className="text-red-500 text-sm">5% from last {timeRange}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Donated Percentage</h3>
          <p className="text-2xl font-bold mt-2">{donatedPercentage}%</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm">8% increase</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Profit</h3>
          <p className="text-2xl font-bold mt-2">${profit.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm">15% from last {timeRange}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.monthlySummary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donations" fill="#8884d8" name="Donations (kg)" />
                <Bar dataKey="surplus" fill="#82ca9d" name="Surplus (kg)" />
                <Bar dataKey="profit" fill="#ffc658" name="Profit ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donation Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Donation Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donationByItem}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {donationByItem.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 gap-6">
        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Donation History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.quantity} {donation.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.recipient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Surplus Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Surplus History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.surplus.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Sold' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;