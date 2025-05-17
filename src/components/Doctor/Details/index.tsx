"use client";
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiUser, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import Link from 'next/link';

// Doctor interface defining minimum details
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  patients: number;
  experience: string;
  status: 'available' | 'on leave' | 'busy';
  hospital: string;
  contact: {
    email: string;
    phone: string;
  };
}

const DoctorDetails: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [specialty, setSpecialty] = useState('all');

  useEffect(() => {
    // Simulate fetching doctors from an API
    const fetchDoctors = () => {
      setIsLoading(true);
      // This would be replaced with an actual API call
      setTimeout(() => {
        setDoctors(mockDoctors);
        setIsLoading(false);
      }, 1000);
    };

    fetchDoctors();
  }, []);

  // Mock data - would be replaced with API data in production
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patients: 78,
      experience: '10 years',
      status: 'available',
      hospital: 'City Medical Center',
      imageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
      contact: {
        email: 'sarah.johnson@hospital.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      patients: 64,
      experience: '8 years',
      status: 'available',
      hospital: 'University Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      contact: {
        email: 'michael.chen@hospital.com',
        phone: '+1 (555) 234-5678'
      }
    },
    {
      id: '3',
      name: 'Dr. Lisa Rodriguez',
      specialty: 'Pediatrics',
      patients: 92,
      experience: '12 years',
      status: 'on leave',
      hospital: 'Children\'s Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      contact: {
        email: 'lisa.rodriguez@hospital.com',
        phone: '+1 (555) 345-6789'
      }
    },
    {
      id: '4',
      name: 'Dr. Robert Smith',
      specialty: 'Orthopedics',
      patients: 55,
      experience: '15 years',
      status: 'busy',
      hospital: 'Sports Medicine Center',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      contact: {
        email: 'robert.smith@hospital.com',
        phone: '+1 (555) 456-7890'
      }
    },
    {
      id: '5',
      name: 'Dr. Amanda Lewis',
      specialty: 'Dermatology',
      patients: 68,
      experience: '6 years',
      status: 'available',
      hospital: 'Skin Health Clinic',
      imageUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
      contact: {
        email: 'amanda.lewis@hospital.com',
        phone: '+1 (555) 567-8901'
      }
    },
    {
      id: '6',
      name: 'Dr. James Wilson',
      specialty: 'Psychiatry',
      patients: 45,
      experience: '9 years',
      status: 'available',
      hospital: 'Mental Health Institute',
      imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
      contact: {
        email: 'james.wilson@hospital.com',
        phone: '+1 (555) 678-9012'
      }
    }
  ];

  // Filter doctors based on search query and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = specialty === 'all' || doctor.specialty === specialty;
    
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties for the filter dropdown
  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))];

  // Function to determine status badge color
  const getStatusColor = (status: Doctor['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on leave': return 'bg-orange-100 text-orange-800';
      case 'busy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hospital Doctors</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage hospital doctors</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search doctors by name, specialty or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            {specialties.map((spec, index) => (
              <option key={index} value={spec}>
                {spec === 'all' ? 'All Specialties' : spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <Link 
                  href={`/doctor/details/${doctor.id}`} 
                  key={doctor.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex flex-col items-center mb-4">
                      <img 
                        src={doctor.imageUrl} 
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-blue-500" 
                      />
                      <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
                      <span className={`mt-2 px-2 py-1 text-xs rounded-full ${getStatusColor(doctor.status)}`}>
                        {doctor.status}
                      </span>
                    </div>
                    
                    <hr className="border-gray-200 dark:border-gray-700 my-3" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.patients} patients</span>
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{doctor.hospital}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorDetails;
