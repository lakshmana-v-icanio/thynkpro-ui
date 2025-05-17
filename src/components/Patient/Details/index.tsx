"use client";

import React, { useState } from 'react';
import { FiSearch, FiUser, FiPhone, FiCalendar, FiActivity, FiFilter, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Patient interface
interface Patient {
  id: string;
  name: string;
  diagnosis: string;
  age: number;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  admissionDate?: string;
  doctor?: string;
  status?: 'Active' | 'Discharged' | 'Critical';
}

// Filter state interface
interface FilterState {
  gender: string;
  status: string;
  ageRange: string;
}

const PatientDetails = () => {
  const router = useRouter();
  // Sample patient data (in a real app, this would come from an API)
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      diagnosis: 'Hypertension',
      age: 65,
      phoneNumber: '(555) 123-4567',
      gender: 'Male',
      admissionDate: '2023-06-12',
      doctor: 'Dr. Sarah Johnson',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Emily Davis',
      diagnosis: 'Diabetes Type 2',
      age: 52,
      phoneNumber: '(555) 987-6543',
      gender: 'Female',
      admissionDate: '2023-05-28',
      doctor: 'Dr. Mark Williams',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Michael Wilson',
      diagnosis: 'Pneumonia',
      age: 71,
      phoneNumber: '(555) 456-7890',
      gender: 'Male',
      admissionDate: '2023-06-02',
      doctor: 'Dr. Emily Chen',
      status: 'Critical'
    },
    {
      id: '4',
      name: 'Sarah Thompson',
      diagnosis: 'Acute Appendicitis',
      age: 34,
      phoneNumber: '(555) 234-5678',
      gender: 'Female',
      admissionDate: '2023-06-08',
      doctor: 'Dr. Robert Lee',
      status: 'Discharged'
    },
    {
      id: '5',
      name: 'David Brown',
      diagnosis: 'Migraine',
      age: 42,
      phoneNumber: '(555) 345-6789',
      gender: 'Male',
      admissionDate: '2023-06-10',
      doctor: 'Dr. Emma White',
      status: 'Active'
    },
    {
      id: '6',
      name: 'Lisa Garcia',
      diagnosis: 'Bronchitis',
      age: 58,
      phoneNumber: '(555) 567-8901',
      gender: 'Female',
      admissionDate: '2023-06-05',
      doctor: 'Dr. William Parker',
      status: 'Active'
    },
    {
      id: '7',
      name: 'Robert Martinez',
      diagnosis: 'Fractured Femur',
      age: 47,
      phoneNumber: '(555) 678-9012',
      gender: 'Male',
      admissionDate: '2023-06-01',
      doctor: 'Dr. Linda Evans',
      status: 'Active'
    },
    {
      id: '8',
      name: 'Jennifer Lopez',
      diagnosis: 'Influenza',
      age: 39,
      phoneNumber: '(555) 789-0123',
      gender: 'Female',
      admissionDate: '2023-06-09',
      doctor: 'Dr. Thomas Campbell',
      status: 'Discharged'
    },
    {
      id: '9',
      name: 'James Williams',
      diagnosis: 'Gastritis',
      age: 61,
      phoneNumber: '(555) 890-1234',
      gender: 'Male',
      admissionDate: '2023-06-06',
      doctor: 'Dr. Lisa Wilson',
      status: 'Active'
    },
    {
      id: '10',
      name: 'Patricia Miller',
      diagnosis: 'Kidney Stones',
      age: 54,
      phoneNumber: '(555) 901-2345',
      gender: 'Female',
      admissionDate: '2023-06-04',
      doctor: 'Dr. Richard Moore',
      status: 'Critical'
    },
    {
      id: '11',
      name: 'Kevin Taylor',
      diagnosis: 'Viral Infection',
      age: 28,
      phoneNumber: '(555) 012-3456',
      gender: 'Male',
      admissionDate: '2023-06-11',
      doctor: 'Dr. Anna Johnson',
      status: 'Active'
    },
    {
      id: '12',
      name: 'Amanda Clark',
      diagnosis: 'Asthma Exacerbation',
      age: 36,
      phoneNumber: '(555) 123-4567',
      gender: 'Female',
      admissionDate: '2023-06-07',
      doctor: 'Dr. Michael Brown',
      status: 'Active'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(8);
  const [filters, setFilters] = useState<FilterState>({
    gender: '',
    status: '',
    ageRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filtering patients based on search term and filters
  const filteredPatients = patients.filter(patient => {
    // Text search filter
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phoneNumber.includes(searchTerm) ||
      patient.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.age.toString().includes(searchTerm);

    if (!matchesSearch) return false;

    // Gender filter
    if (filters.gender && patient.gender !== filters.gender) return false;

    // Status filter
    if (filters.status && patient.status !== filters.status) return false;

    // Age range filter
    if (filters.ageRange) {
      const [min, max] = filters.ageRange.split('-').map(Number);
      if (max) {
        if (patient.age < min || patient.age > max) return false;
      } else {
        // Handle "61+" type ranges
        if (patient.age < min) return false;
      }
    }

    return true;
  });

  // Get current patients for pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handler for filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      gender: '',
      status: '',
      ageRange: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Status badge color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Discharged':
        return 'bg-blue-100 text-blue-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(val => val !== '') || searchTerm !== '';

  // Handler to view patient details
  const handleViewPatientDetails = (patientId: string) => {
    router.push(`/patient/details/${patientId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Directory</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage and view patient information</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, diagnosis, phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                showFilters || hasActiveFilters 
                  ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                  : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
              }`}
            >
              <FiFilter size={16} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="flex items-center justify-center bg-blue-500 text-white text-xs rounded-full h-5 w-5 ml-1">
                  {Object.values(filters).filter(val => val !== '').length + (searchTerm !== '' ? 1 : 0)}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button 
                onClick={handleResetFilters}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <FiX size={16} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter Patients</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gender Filter */}
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Gender</label>
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              {/* Age Range Filter */}
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Age Range</label>
                <select
                  name="ageRange"
                  value={filters.ageRange}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Ages</option>
                  <option value="0-18">0-18 years</option>
                  <option value="19-40">19-40 years</option>
                  <option value="41-60">41-60 years</option>
                  <option value="61-120">61+ years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPatients.length > 0 ? indexOfFirstPatient + 1 : 0}-
          {Math.min(indexOfLastPatient, filteredPatients.length)} of {filteredPatients.length} patients
          {hasActiveFilters && ' (filtered)'}
        </div>
      </div>

      {/* Patient Cards Grid */}
      {currentPatients.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <FiUser className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No patients found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {currentPatients.map(patient => (
            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{patient.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ID: {patient.id}</p>
                  </div>
                  {patient.status && (
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center">
                  <FiActivity className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{patient.diagnosis}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{patient.age} years</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <FiUser className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{patient.gender}</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <button 
                  onClick={() => handleViewPatientDetails(patient.id)}
                  className="w-full text-center py-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredPatients.length > patientsPerPage && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, Math.ceil(filteredPatients.length / patientsPerPage)) }).map((_, index) => {
              // Calculate page number for pagination display
              let pageNumber = currentPage;
              if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= Math.ceil(filteredPatients.length / patientsPerPage) - 2) {
                pageNumber = Math.ceil(filteredPatients.length / patientsPerPage) - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              
              // Only show pages that exist
              if (pageNumber <= Math.ceil(filteredPatients.length / patientsPerPage) && pageNumber > 0) {
                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 border border-gray-300 text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    } -ml-px dark:border-gray-700`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
            <button
              onClick={() => paginate(Math.min(Math.ceil(filteredPatients.length / patientsPerPage), currentPage + 1))}
              disabled={currentPage === Math.ceil(filteredPatients.length / patientsPerPage)}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed -ml-px dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
