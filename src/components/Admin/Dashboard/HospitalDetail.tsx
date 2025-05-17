"use client";
import React, { useState, useEffect } from 'react';
import {
  FiArrowLeft, 
  FiMail, 
  FiPhone, 
  FiEdit, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiClock,
} from 'react-icons/fi';
import { CommonHospital } from './AdminDashboard';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  status: string;
  imageUrl: string;
}

interface Stats {
  occupancyRate: number;
  avgPatientStay: number;
  emergencyCases: number;
  scheduledAppointments: number;
}

interface HospitalDetailProps {
  hospital?: CommonHospital | null;
  onBack?: () => void;
  onEdit?: () => void;
}

const HospitalDetail: React.FC<HospitalDetailProps> = ({ 
  hospital: initialHospital, 
  onBack, 
  onEdit 
}) => {
  const [hospital, setHospital] = useState<CommonHospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  // Fetch hospital data if not provided through props
  useEffect(() => {
    if (initialHospital) {
      setHospital(initialHospital);
      setLoading(false);
      fetchAdditionalData();
    } else {
      // Simulate API call
      setTimeout(() => {
        const mockHospital: CommonHospital = {
          id: '1',
          name: 'General Hospital',
          location: 'New York, NY',
          contactNumber: '+1 (123) 456-7890',
          email: 'info@generalhospital.com',
          status: 'active',
          totalDoctors: 120,
          totalPatients: 5400,
          totalStaff: 350,
          registrationDate: '2021-05-12',
          description: 'General Hospital is a premier healthcare facility providing comprehensive medical services to the greater New York area. Specializing in emergency care, surgical procedures, and preventive medicine.',
          operatingHours: '24/7',
          facilityType: 'General Care',
          licenseNumber: 'NY-MED-1234-GH',
          emergencyServices: true,
          specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
        };

        setHospital(mockHospital);
        setLoading(false);
        fetchAdditionalData();
      }, 1000);
    }
  }, [initialHospital]);

  const fetchAdditionalData = () => {
    // Fetch doctors
    const mockDoctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        patients: 78,
        status: 'available',
        imageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Neurology',
        patients: 64,
        status: 'available',
        imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      {
        id: '3',
        name: 'Dr. Lisa Rodriguez',
        specialty: 'Pediatrics',
        patients: 92,
        status: 'on leave',
        imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      {
        id: '4',
        name: 'Dr. Robert Smith',
        specialty: 'Orthopedics',
        patients: 55,
        status: 'available',
        imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    ];

    const mockStats: Stats = {
      occupancyRate: 72,
      avgPatientStay: 4.5,
      emergencyCases: 128,
      scheduledAppointments: 456,
    };

    setDoctors(mockDoctors);
    setStats(mockStats);
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-medium">Hospital not found</h1>
        <button 
          className="mt-4 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
          onClick={onBack}
        >
          <FiArrowLeft className="mr-2" /> Back to Hospitals
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center mb-6">
        <button 
          className="inline-flex items-center mr-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
          onClick={onBack}
        >
          <FiArrowLeft className="mr-2" /> Back to Hospitals
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{hospital.name}</h1>
        <span className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(hospital.status)}`}>
          {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
        </span>
        <button 
          className="ml-auto inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onEdit}
        >
          <FiEdit className="mr-2" /> Edit Hospital
        </button>
      </div>

      {/* Hospital Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Hospital Information</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{hospital.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-700 dark:text-gray-300">{hospital.location}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Registration Date</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {hospital.registrationDate ? new Date(hospital.registrationDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Operating Hours</p>
                    <p className="text-gray-700 dark:text-gray-300">{hospital.operatingHours}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Facility Type</p>
                    <p className="text-gray-700 dark:text-gray-300">{hospital.facilityType}</p>
                  </div>
                  <div>
                    <p className="font-semibold">License Number</p>
                    <p className="text-gray-700 dark:text-gray-300">{hospital.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Emergency Services</p>
                    <p className="text-gray-700 dark:text-gray-300">{hospital.emergencyServices ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 my-4" />
                
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FiPhone className="mr-2" /> {hospital.contactNumber}
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FiMail className="mr-2" /> {hospital.email}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Stats */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Quick Stats</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Doctors</p>
                  <p className="text-xl font-bold">{hospital.totalDoctors}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Medical Professionals</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patients</p>
                  <p className="text-xl font-bold">{hospital.totalPatients}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Registered Patients</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Staff</p>
                  <p className="text-xl font-bold">{hospital.totalStaff}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Supporting Staff</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Occupancy</p>
                  <div className="relative flex justify-center items-center h-12">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3182CE"
                          strokeWidth="3"
                          strokeDasharray={`${stats?.occupancyRate || 0}, 100`}
                        />
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{stats?.occupancyRate || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            <button 
              className={`py-4 px-6 text-sm font-medium ${activeTab === 0 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab(0)}
            >
              Doctors
            </button>
            <button 
              className={`py-4 px-6 text-sm font-medium ${activeTab === 1 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab(1)}
            >
              Performance
            </button>
            <button 
              className={`py-4 px-6 text-sm font-medium ${activeTab === 2 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab(2)}
            >
              Facilities
            </button>
            <button 
              className={`py-4 px-6 text-sm font-medium ${activeTab === 3 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab(3)}
            >
              Reports
            </button>
          </div>
        </div>
        <div className="p-4">
          {/* Doctors Tab */}
          {activeTab === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 flex flex-col items-center">
                      <img 
                        src={doctor.imageUrl} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full mb-3 object-cover" 
                      />
                      <h3 className="text-sm font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
                      <hr className="border-gray-200 dark:border-gray-700 w-full my-2" />
                      <div className="flex justify-between w-full">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{doctor.patients} patients</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${doctor.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {doctor.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  View All Doctors
                </button>
              </div>
            </>
          )}

          {/* Performance Tab */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold">Monthly Statistics</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Emergency Cases</span>
                      <span className="font-bold">{stats?.emergencyCases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduled Appointments</span>
                      <span className="font-bold">{stats?.scheduledAppointments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Patient Stay</span>
                      <span className="font-bold">{stats?.avgPatientStay} days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold">Resource Utilization</h3>
                </div>
                <div className="p-4">
                  <p className="mb-4">Resource utilization metrics would be displayed here with charts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This section can include bed utilization, equipment usage, and staff allocation metrics.</p>
                </div>
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 2 && (
            <div className="p-4">
              <p>Facilities information would be displayed here</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This section can include details about available medical equipment, specialized departments,
                operation theaters, emergency facilities, etc.
              </p>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 3 && (
            <div className="p-4">
              <p>Reports and analytics would be displayed here</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This section can include financial reports, patient satisfaction metrics, 
                treatment outcomes, and other key performance indicators.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Send Notification
        </button>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
          Generate Report
        </button>
        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
          Review Compliance
        </button>
        <button className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-md">
          Deactivate Hospital
        </button>
      </div>
    </div>
  );
};

export default HospitalDetail; 