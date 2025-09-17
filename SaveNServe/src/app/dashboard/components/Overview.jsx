import { 
    Leaf,
    CheckCircle,
    AlertCircle,
    Heart,
    Cloud,
    PlusCircle,
    Inbox,
    FileText,
    BarChart2,
    Truck,
    Eye,
    MoreHorizontal
  } from 'lucide-react';
  const OverviewPage = () => {
    const [stats, setStats] = useState({
      activeListings: 12,
      fulfilledDonations: 24,
      pendingRequests: 3,
      totalImpact: 3720, // meals provided
      carbonSaved: 2.8, // tons
      foodSaved: 1240 // lbs
    });
  
    const [recentActivity, setRecentActivity] = useState([
      { id: 1, type: 'pickup', description: 'Community Kitchen picked up 150 lbs of vegetables', time: '2 hours ago', icon: <Truck className="h-5 w-5 text-teal-600" /> },
      { id: 2, type: 'request', description: 'New request from Food Rescue for 200 lbs of dairy', time: '5 hours ago', icon: <Inbox className="h-5 w-5 text-blue-600" /> },
      { id: 3, type: 'view', description: 'Your listing for tomatoes was viewed 15 times', time: '1 day ago', icon: <Eye className="h-5 w-5 text-purple-600" /> },
      { id: 4, type: 'insight', description: 'AI recommendation: List surplus earlier for better visibility', time: '2 days ago', icon: <BarChart2 className="h-5 w-5 text-amber-600" /> }
    ]);
  
    const [quickActions] = useState([
      { id: 1, title: 'Add New Listing', icon: <PlusCircle className="h-6 w-6" />, action: () => navigate('/add-surplus') },
      { id: 2, title: 'View Requests', icon: <Inbox className="h-6 w-6" />, action: () => navigate('/requests') },
      { id: 3, title: 'Generate Report', icon: <FileText className="h-6 w-6" />, action: () => navigate('/reports') },
      { id: 4, title: 'Check Insights', icon: <BarChart2 className="h-6 w-6" />, action: () => navigate('/insights') }
    ]);
  
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Farmer!</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your surplus food donations</p>
            </div>
            <button 
              className="mt-4 md:mt-0 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              onClick={() => navigate('/add-surplus')}
            >
              Add New Surplus
            </button>
          </div>
        </div>
  
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Active Listings"
            value={stats.activeListings}
            change="+2 this week"
            icon={<Leaf className="h-6 w-6 text-teal-600" />}
            color="bg-teal-50"
          />
          <MetricCard 
            title="Fulfilled Donations"
            value={stats.fulfilledDonations}
            change="+5 this month"
            icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
            color="bg-emerald-50"
          />
          <MetricCard 
            title="Pending Requests"
            value={stats.pendingRequests}
            change="Needs attention"
            icon={<AlertCircle className="h-6 w-6 text-amber-600" />}
            color="bg-amber-50"
          />
          <MetricCard 
            title="Meals Provided"
            value={stats.totalImpact.toLocaleString() + "+"}
            change="30% increase"
            icon={<Heart className="h-6 w-6 text-red-600" />}
            color="bg-red-50"
          />
        </div>
  
        {/* Environmental Impact */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImpactCard 
              title="Food Saved From Waste"
              value={`${stats.foodSaved} lbs`}
              description="Equivalent to feeding 3,720+ people"
              icon={<Leaf className="h-6 w-6 text-teal-600" />}
            />
            <ImpactCard 
              title="Carbon Emissions Saved"
              value={`${stats.carbonSaved} tons`}
              description="Equivalent to 6,500 miles not driven"
              icon={<Cloud className="h-6 w-6 text-blue-600" />}
            />
          </div>
        </div>
  
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-3 bg-teal-100 rounded-full text-teal-600 mb-3">
                  {action.icon}
                </div>
                <span className="font-medium text-gray-900">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
  
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium">
              View All Activity
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Helper Components
  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${color}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white rounded-lg border border-gray-200">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{change}</p>
    </div>
  );
  
  const ImpactCard = ({ title, value, description, icon }) => (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="p-3 bg-teal-50 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
  
  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="p-2 bg-gray-100 rounded-lg">
        {activity.icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-800">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
      <button 
        className="text-gray-400 hover:text-gray-600"
        onClick={() => toast(activity.description)}
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
  
  export default OverviewPage;