"use client";
import React, { useState } from 'react';
import { 
  FiHome,
  FiUsers,  
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiChevronDown,
} from 'react-icons/fi';

// Create a shared Hospital interface to fix type errors
export interface CommonHospital {
  id?: string;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  description: string;
  operatingHours: string;
  facilityType: string;
  licenseNumber: string;
  emergencyServices: boolean;
  specialties: string[];
  totalDoctors?: number;
  totalPatients?: number;
  totalStaff?: number;
  registrationDate?: string;
  [key: string]: string | string[] | boolean | undefined | number;
}

import HospitalsList from './HospitalsList';
import HospitalDetail from './HospitalDetail';
import HospitalForm from './HospitalForm';

type ViewMode = 'dashboard' | 'hospitals-list' | 'hospital-detail' | 'hospital-form';

const AdminDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedHospital, setSelectedHospital] = useState<CommonHospital | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Sample dashboard stats
  const stats = {
    totalHospitals: 23,
    activeHospitals: 19,
    pendingApprovals: 4,
    totalDoctors: 872,
    totalPatients: 43285,
    alertsCount: 7,
  };

  const recentActivities = [
    { 
      type: 'new-hospital', 
      title: 'New Hospital Registered', 
      description: 'Memorial Hospital - 3 hours ago',
      icon: FiHome
    },
    { 
      type: 'new-doctors', 
      title: '15 New Doctors Added', 
      description: 'General Hospital - Yesterday',
      icon: FiUsers
    },
    { 
      type: 'license-alert', 
      title: 'License Expiration Alert', 
      description: 'City Medical Center - 2 days ago',
      icon: FiAlertCircle
    },
    { 
      type: 'compliance', 
      title: 'Compliance Check Completed', 
      description: 'Regional Medical Center - 3 days ago',
      icon: FiCheckCircle
    },
  ];

  const handleViewHospitalsList = () => {
    setViewMode('hospitals-list');
  };

  const handleViewHospitalDetail = (hospital: CommonHospital) => {
    setSelectedHospital(hospital);
    setViewMode('hospital-detail');
  };

  const handleEditHospital = (hospital: CommonHospital) => {
    setIsEditMode(true);
    setSelectedHospital(hospital);
    setViewMode('hospital-form');
  };

  const handleFormSubmit = (data: CommonHospital) => {
    // Handle form submission logic here
    console.log('Form submitted with data:', data);
    setViewMode('hospitals-list');
  };

  const handleFormCancel = () => {
    setViewMode(selectedHospital ? 'hospital-detail' : 'hospitals-list');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'hospitals-list':
        return <HospitalsList onViewDetail={handleViewHospitalDetail} onEdit={handleEditHospital} />;
      case 'hospital-detail':
        return <HospitalDetail hospital={selectedHospital} onBack={handleViewHospitalsList} onEdit={() => selectedHospital && handleEditHospital(selectedHospital)} />;
      case 'hospital-form':
        return (
          <HospitalForm
            isEditMode={isEditMode}
            initialData={selectedHospital || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      default:
        return (
          <div className="w-full">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Hospital management system</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                >
                  Actions <FiChevronDown />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-md font-medium text-blue-600 dark:text-blue-400">Active Hospitals</p>
                    <div className="flex items-center mt-1">
                      <span className="text-3xl font-bold">{stats.activeHospitals}</span>
                      <span className="ml-2 p-1 rounded-full bg-green-100">
                        <FiCheckCircle className="text-green-500" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">83% active</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-md font-medium text-blue-600 dark:text-blue-400">Pending Approvals</p>
                    <div className="flex items-center mt-1">
                      <span className="text-3xl font-bold">{stats.pendingApprovals}</span>
                      <span className="ml-2 p-1 rounded-full bg-orange-100">
                        <FiClock className="text-orange-500" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <a href="#" className="text-orange-500 hover:underline">Review pending</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
                  <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h2 className="text-lg font-medium">Recent Activity</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <span className={`p-2 mr-3 rounded-full flex-shrink-0 ${
                          activity.type === 'license-alert' ? 'bg-red-100 text-red-500' :
                          activity.type === 'compliance' ? 'bg-green-100 text-green-500' :
                          'bg-blue-100 text-blue-500'
                        }`}>
                          <activity.icon size={16} />
                        </span>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-blue-500 text-sm hover:underline">
                      View all activity
                    </button>
                  </div>
                </div>
              </div>
              
              {/* System Overview */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
                  <h2 className="text-lg font-medium mb-4">System Overview</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Doctors</p>
                      <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Patients</p>
                      <p className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default AdminDashboard; 