"use client";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function DoctorDashboard() {

  return (
    <AuthGuard allowedRoles={["doctor"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Today&apos;s Appointments</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Your schedule for today</p>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-700 flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-300 text-lg font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">9:30 AM - Checkup</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-700 flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-300 text-lg font-medium">AS</span>
                </div>
                <div>
                  <p className="font-medium">Alice Smith</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">11:00 AM - Follow-up</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Patient Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Your assigned patients</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Patients</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">42</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">New Patients</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Your latest medical records</p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-medium">Prescribed medication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">John Doe - 1 hour ago</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="font-medium">Updated patient record</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Alice Smith - 3 hours ago</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <p className="font-medium">New lab results</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bob Johnson - 5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
} 