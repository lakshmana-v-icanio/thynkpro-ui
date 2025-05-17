"use client";
import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock,
} from 'react-icons/fi';
import { useUser } from '@/context/UserContext';

// Interface for Hospital data
export interface Hospital {
  id: string;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  totalDoctors: number;
  totalPatients: number;
  totalStaff: number;
  registrationDate: string;
  description: string;
  operatingHours: string;
  facilityType: string;
  licenseNumber: string;
  emergencyServices: boolean;
  specialties: string[];
}

// Interface for hospital creation form
interface HospitalFormData {
  name: string;
  location: string;
  contactNumber: string;
  email: string;
}

const SuperAdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<HospitalFormData>({
    name: '',
    location: '',
    contactNumber: '',
    email: '',
  });
  
  // Stats
  const [stats, setStats] = useState({
    totalHospitals: 0,
    activeHospitals: 0,
    pendingHospitals: 0,
    totalDoctors: 0,
    totalPatients: 0,
  });
  
  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
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
  ]);

  // Fetch hospital data
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockData: Hospital[] = [
        {
          id: '1',
          name: 'General Hospital',
          location: 'New York, NY',
          contactNumber: '+1 (123) 456-7890',
          email: 'info@generalhospital.com',
          status: 'active',
          totalDoctors: 120,
          totalPatients: 5400,
          totalStaff: 320,
          registrationDate: '2021-05-12',
          description: 'A leading healthcare provider in New York',
          operatingHours: '24/7',
          facilityType: 'General Hospital',
          licenseNumber: 'NY12345',
          emergencyServices: true,
          specialties: ['Cardiology', 'Neurology'],
        },
        {
          id: '2',
          name: 'City Medical Center',
          location: 'Los Angeles, CA',
          contactNumber: '+1 (987) 654-3210',
          email: 'contact@citymedical.com',
          status: 'active',
          totalDoctors: 85,
          totalPatients: 3200,
          totalStaff: 250,
          registrationDate: '2022-02-18',
          description: 'Providing quality healthcare to LA residents',
          operatingHours: '24/7',
          facilityType: 'General Hospital',
          licenseNumber: 'CA12345',
          emergencyServices: true,
          specialties: ['Pediatrics', 'Orthopedics'],
        },
        {
          id: '3',
          name: 'Community Healthcare',
          location: 'Chicago, IL',
          contactNumber: '+1 (555) 123-4567',
          email: 'admin@communityhealthcare.org',
          status: 'inactive',
          totalDoctors: 45,
          totalPatients: 1800,
          totalStaff: 120,
          registrationDate: '2020-11-05',
          description: 'Community-focused healthcare services',
          operatingHours: '8AM-6PM',
          facilityType: 'Clinic',
          licenseNumber: 'IL12345',
          emergencyServices: false,
          specialties: ['Family Medicine'],
        },
        {
          id: '4',
          name: 'Regional Medical Center',
          location: 'Houston, TX',
          contactNumber: '+1 (281) 555-7890',
          email: 'info@regionalmed.com',
          status: 'pending',
          totalDoctors: 70,
          totalPatients: 2700,
          totalStaff: 180,
          registrationDate: '2023-01-20',
          description: 'Specialized care for cancer patients',
          operatingHours: '24/7',
          facilityType: 'Specialized Hospital',
          licenseNumber: 'TX12345',
          emergencyServices: true,
          specialties: ['Oncology'],
        },
        {
          id: '5',
          name: 'Memorial Hospital',
          location: 'Phoenix, AZ',
          contactNumber: '+1 (602) 555-1234',
          email: 'contact@memorialhospital.com',
          status: 'active',
          totalDoctors: 95,
          totalPatients: 4100,
          totalStaff: 280,
          registrationDate: '2021-09-14',
          description: 'Full-service medical facility',
          operatingHours: '24/7',
          facilityType: 'General Hospital',
          licenseNumber: 'AZ12345',
          emergencyServices: true,
          specialties: ['Surgery', 'Cardiology'],
        },
      ];
      
      setHospitals(mockData);
      
      // Calculate stats
      const totalHospitals = mockData.length;
      const activeHospitals = mockData.filter(h => h.status === 'active').length;
      const pendingHospitals = mockData.filter(h => h.status === 'pending').length;
      const totalDoctors = mockData.reduce((sum, h) => sum + h.totalDoctors, 0);
      const totalPatients = mockData.reduce((sum, h) => sum + h.totalPatients, 0);
      
      setStats({
        totalHospitals,
        activeHospitals,
        pendingHospitals,
        totalDoctors,
        totalPatients
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  // Handle adding a new hospital
  const handleAddHospital = () => {
    setShowAddHospitalModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to create the hospital
    const newHospital: Hospital = {
      id: (hospitals.length + 1).toString(),
      name: formData.name,
      location: formData.location,
      contactNumber: formData.contactNumber,
      email: formData.email,
      status: 'pending',
      totalDoctors: 0,
      totalPatients: 0,
      totalStaff: 0,
      registrationDate: new Date().toISOString().split('T')[0],
      description: '',
      operatingHours: '24/7',
      facilityType: 'General Hospital',
      licenseNumber: '',
      emergencyServices: false,
      specialties: []
    };
    
    // Add the new hospital to the list
    setHospitals(prev => [...prev, newHospital]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalHospitals: prev.totalHospitals + 1,
      pendingHospitals: prev.pendingHospitals + 1
    }));
    
    // Reset form and close modal
    setFormData({
      name: '',
      location: '',
      contactNumber: '',
      email: '',
    });
    setShowAddHospitalModal(false);
  };

  // Filter hospitals based on search query
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Super Admin Dashboard</h1>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back,</p>
            <p className="font-medium">{user?.name || 'Super Admin'}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 mr-2">
              <FiHome className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Hospitals</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalHospitals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registered hospitals</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2 mr-2">
              <FiCheckCircle className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Hospitals</span>
          </div>
          <p className="text-2xl font-bold">{stats.activeHospitals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((stats.activeHospitals / stats.totalHospitals) * 100).toFixed(1)}% of total
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-2 mr-2">
              <FiClock className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</span>
          </div>
          <p className="text-2xl font-bold">{stats.pendingHospitals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Awaiting verification</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-2 mr-2">
              <FiUsers className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Doctors</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalDoctors}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all hospitals</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-2 mr-2">
              <FiUsers className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Patients</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalPatients}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registered patients</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
