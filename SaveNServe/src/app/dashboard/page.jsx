"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';

export default function RetailerDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'retailer')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout title="Retailer Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-gray-600">You are logged in as a retailer</p>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add retailer-specific dashboard components here */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium">Food Surplus</h3>
              <p className="text-gray-500 mt-2">Manage your food surplus donations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium">Schedule Pickups</h3>
              <p className="text-gray-500 mt-2">Arrange for food collection</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-medium">Donation History</h3>
              <p className="text-gray-500 mt-2">View your past donations</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}