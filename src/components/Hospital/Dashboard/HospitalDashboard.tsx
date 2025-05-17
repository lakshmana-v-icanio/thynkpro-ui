"use client";
import React, { useState } from 'react';
import { 
  FiUser, 
  FiUsers, 
  FiActivity, 
  FiCalendar, 
  FiClock, 
  FiAlertCircle, 
  FiCheckCircle,
  FiPieChart,
  FiTrendingUp,
  FiBell,
  FiChevronDown,
  FiHeart,
  FiClipboard,
  FiUserPlus,
  FiX
} from 'react-icons/fi';

const HospitalDashboard: React.FC = () => {
  // Sample dashboard stats
  const stats = {
    totalDoctors: 42,
    totalPatients: 1250,
    doctorOnDuty: 10,
    totalStaff: 87,
    pendingAppointments: 28,
    todayAppointments: 15,
    emergencyCases: 3,
    occupancyRate: 76, // percentage
    averageWaitTime: 22, // minutes
  };

  const [recentActivities, setRecentActivities] = useState([
    { 
      type: 'new-patient', 
      title: 'New Patient Admitted', 
      description: 'Patient ID: 12345 - 30 minutes ago',
      icon: FiUser
    },
    { 
      type: 'appointment', 
      title: 'Appointment Completed', 
      description: 'Dr. Smith with Patient ID: 12340 - 1 hour ago',
      icon: FiCalendar
    },
    { 
      type: 'emergency', 
      title: 'Emergency Case Resolved', 
      description: 'Patient ID: 12335 - 2 hours ago',
      icon: FiAlertCircle
    },
    { 
      type: 'staff', 
      title: 'Shift Change Completed', 
      description: 'Evening shift started - 3 hours ago',
      icon: FiClock
    },
  ]);

  // Top performing doctors
  const topDoctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", patientsSeen: 43, rating: 4.9 },
    { id: 2, name: "Dr. Mark Williams", specialty: "Neurology", patientsSeen: 38, rating: 4.8 },
    { id: 3, name: "Dr. Emily Chen", specialty: "Pediatrics", patientsSeen: 52, rating: 4.7 },
  ];

  // Department performance
  const departmentStats = [
    { name: "Cardiology", patients: 145, efficiency: 87 },
    { name: "Orthopedics", patients: 122, efficiency: 82 },
    { name: "Pediatrics", patients: 198, efficiency: 91 },
    { name: "Neurology", patients: 87, efficiency: 78 },
    { name: "Oncology", patients: 68, efficiency: 85 },
  ];

  // State for modal and form
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [doctorFormData, setDoctorFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    experience: '',
  });
  
  // Define interface for form errors
  interface FormErrorType {
    name?: string;
    specialty?: string;
    email?: string;
    phone?: string;
    experience?: string;
  }
  
  const [formErrors, setFormErrors] = useState<FormErrorType>({});

  const handleAddDoctor = () => {
    setShowAddDoctorModal(true);
  };

  const closeModal = () => {
    setShowAddDoctorModal(false);
    setDoctorFormData({
      name: '',
      specialty: '',
      email: '',
      phone: '',
      experience: '',
    });
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDoctorFormData({
      ...doctorFormData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors: FormErrorType = {};
    let isValid = true;

    if (!doctorFormData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!doctorFormData.specialty.trim()) {
      errors.specialty = "Specialty is required";
      isValid = false;
    }

    if (!doctorFormData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(doctorFormData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!doctorFormData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would normally save the doctor data to your backend
      console.log("Saving doctor:", doctorFormData);
      
      // Update local state (simulate saving to backend)
      const newDoctor = {
        id: topDoctors.length + 1,
        name: doctorFormData.name,
        specialty: doctorFormData.specialty,
        patientsSeen: 0,
        rating: 0
      };
      
      // In a real app, you would call an API and then update state based on the response
      // For this example, we'll just update the local state
      stats.totalDoctors += 1;
      
      // Close the modal
      closeModal();
    }
  };

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hospital Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Hospital operations overview</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddDoctor}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
          >
            <FiUserPlus /> Add Doctor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md font-medium text-blue-600 dark:text-blue-400">Total Doctors</p>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold">{stats.totalDoctors}</span>
                <span className="ml-2 p-1 rounded-full bg-blue-100">
                  <FiUser className="text-blue-500" />
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">5 new this month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md font-medium text-blue-600 dark:text-blue-400">Total Patients</p>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold">{stats.totalPatients}</span>
                <span className="ml-2 p-1 rounded-full bg-green-100">
                  <FiUsers className="text-green-500" />
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+12% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md font-medium text-blue-600 dark:text-blue-400">Doctor's On Duty</p>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold">{stats.doctorOnDuty}</span>
                <span className="ml-2 p-1 rounded-full bg-green-100">
                  <FiUsers className="text-green-500" />
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          {/* Top Doctors */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mt-6">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <h2 className="text-lg font-medium">Top Performing Doctors</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients Seen</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="px-4 py-3 whitespace-nowrap">{doctor.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{doctor.specialty}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{doctor.patientsSeen}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {doctor.rating}/5
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-blue-500 text-sm hover:underline">
                View all doctors
              </button>
            </div>
          </div>
        </div>
        
        {/* Hospital Overview */}
        <div>
          
          {/* Department Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
            <h2 className="text-lg font-medium mb-4">Department Performance</h2>
            
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{dept.name}</span>
                    <span>{dept.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${dept.efficiency}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {dept.patients} patients this month
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                View Detailed Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 max-h-90vh overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Doctor</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveDoctor}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Dr. John Doe"
                    value={doctorFormData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={doctorFormData.specialty}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 ${
                      formErrors.specialty ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Gynecology">Gynecology</option>
                  </select>
                  {formErrors.specialty && <p className="text-red-500 text-xs mt-1">{formErrors.specialty}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="doctor@hospital.com"
                    value={doctorFormData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    value={doctorFormData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    placeholder="5"
                    value={doctorFormData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard; 