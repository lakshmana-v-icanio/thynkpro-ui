"use client";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function AdminDashboard() {

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Hospital Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Summary of hospital metrics and activities</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Departments</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Staff</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">245</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Patient Statistics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Current patient data</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1,245</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">New Today</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">34</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">System Status</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">System health and updates</p>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-gray-700 dark:text-gray-300">All systems operational</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last update: Today, 9:45 AM</p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
} 