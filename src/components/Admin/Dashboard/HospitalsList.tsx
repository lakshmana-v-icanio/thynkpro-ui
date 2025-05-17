"use client";
import React, { useState, useEffect } from 'react';
import { 
  FiSearch,
  FiPlus,
  FiEdit2,
  FiEye,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { CommonHospital } from './AdminDashboard';

interface HospitalsListProps {
  onViewDetail?: (hospital: CommonHospital) => void;
  onEdit?: (hospital: CommonHospital) => void;
}

const HospitalsList: React.FC<HospitalsListProps> = ({ onViewDetail, onEdit }) => {
  const [hospitals, setHospitals] = useState<CommonHospital[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockData: CommonHospital[] = [
        {
          id: '1',
          name: 'General Hospital',
          location: 'New York, NY',
          contactNumber: '+1 (123) 456-7890',
          email: 'info@generalhospital.com',
          status: 'active',
          totalDoctors: 120,
          totalPatients: 5400,
          registrationDate: '2021-05-12',
          description: '',
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
          registrationDate: '2022-02-18',
          description: '',
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
          registrationDate: '2020-11-05',
          description: '',
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
          registrationDate: '2023-01-20',
          description: '',
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
          registrationDate: '2021-09-14',
          description: '',
          operatingHours: '24/7',
          facilityType: 'General Hospital',
          licenseNumber: 'AZ12345',
          emergencyServices: true,
          specialties: ['Surgery', 'Cardiology'],
        },
      ];
      setHospitals(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter hospitals based on search query and status
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || hospital.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHospitals = filteredHospitals.slice(startIndex, startIndex + itemsPerPage);

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Stats summary
  const totalHospitals = hospitals.length;
  const activeHospitals = hospitals.filter(h => h.status === 'active').length;
  const pendingHospitals = hospitals.filter(h => h.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hospitals Management</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Hospitals</p>
            <p className="text-2xl font-bold">{totalHospitals}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Registered hospitals</p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Hospitals</p>
            <p className="text-2xl font-bold">{activeHospitals}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {((activeHospitals / totalHospitals) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Approval</p>
            <p className="text-2xl font-bold">{pendingHospitals}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Awaiting verification</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-1 items-center bg-white dark:bg-gray-800 p-2 rounded-md">
          <FiSearch className="mr-2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search hospitals..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none dark:text-white"
          />
        </div>
        
        <select 
          className="md:w-48 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        
        <button 
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md md:ml-2"
        >
          <FiPlus /> Add Hospital
        </button>
      </div>

      {/* Hospitals Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hospital Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Doctors</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patients</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedHospitals.map((hospital) => (
              <tr key={hospital.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{hospital.name}</td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{hospital.location}</td>
                <td className="py-4 px-4">
                  <div className="text-gray-700 dark:text-gray-300">{hospital.contactNumber}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{hospital.email}</div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(hospital.status)}`}>
                    {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{hospital.totalDoctors}</td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{hospital.totalPatients}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      aria-label="View hospital"
                      className="text-blue-500 hover:text-blue-600 p-1"
                      onClick={() => onViewDetail && onViewDetail(hospital)}
                    >
                      <FiEye />
                    </button>
                    <button
                      aria-label="Edit hospital"
                      className="text-green-500 hover:text-green-600 p-1"
                      onClick={() => onEdit && onEdit(hospital)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      aria-label="Delete hospital"
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft className="mr-2" /> Prev
          </button>
          <div className="flex items-center mx-4 text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <FiChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HospitalsList; 