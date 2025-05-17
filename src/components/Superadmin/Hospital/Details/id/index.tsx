"use client";
import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiMail, FiUser, FiUsers, FiCalendar, FiX, FiCheck, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

interface HospitalUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Clerk' | 'Nurse';
  status: 'active' | 'inactive';
  lastActive: string;
}

interface Hospital {
  id: string;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  totalDoctors: number;
  totalPatients: number;
  registrationDate: string;
  operatingHours: string;
  facilityType: string;
  licenseNumber: string;
  emergencyServices: boolean;
  specialties: string[];
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Doctor' | 'Clerk' | 'Nurse';
}

interface IndividualHospitalDetailsProps {
  id: string;
}

const IndividualHospitalDetails: React.FC<IndividualHospitalDetailsProps> = ({ id }) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'Admin'
  });
  const [formErrors, setFormErrors] = useState<Partial<UserFormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // New state for users table
  const [users, setUsers] = useState<HospitalUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  useEffect(() => {
    // Fetch hospital details
    // This is mock data, replace with actual API call
    setTimeout(() => {
      const mockData: Hospital = {
        id: id,
        name: 'Metropolitan Hospital',
        location: 'New York, NY',
        contactNumber: '+1 (212) 555-7890',
        email: 'info@metropolitanhospital.com',
        status: 'active',
        totalDoctors: 126,
        totalPatients: 4570,
        registrationDate: '2018-05-12',
        operatingHours: '24/7',
        facilityType: 'General Hospital',
        licenseNumber: 'NY12345',
        emergencyServices: true,
        specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics']
      };
      setHospital(mockData);
      setLoading(false);
      
      // Fetch users for this hospital
      const mockUsers: HospitalUser[] = [
        {
          id: '1',
          name: 'Dr. John Smith',
          email: 'john.smith@metropolitanhospital.com',
          role: 'Doctor',
          status: 'active',
          lastActive: '2023-10-10'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@metropolitanhospital.com',
          role: 'Admin',
          status: 'active',
          lastActive: '2023-10-12'
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'michael.brown@metropolitanhospital.com',
          role: 'Nurse',
          status: 'active',
          lastActive: '2023-10-09'
        },
        {
          id: '4',
          name: 'Lisa Davis',
          email: 'lisa.davis@metropolitanhospital.com',
          role: 'Clerk',
          status: 'inactive',
          lastActive: '2023-09-28'
        },
        {
          id: '5',
          name: 'Dr. Robert Wilson',
          email: 'robert.wilson@metropolitanhospital.com',
          role: 'Doctor',
          status: 'active',
          lastActive: '2023-10-11'
        }
      ];
      setUsers(mockUsers);
    }, 1000);
  }, [id]);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors: Partial<UserFormData> = {};
    if (!userFormData.name.trim()) errors.name = 'Name is required';
    if (!userFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userFormData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!userFormData.password.trim()) {
      errors.password = 'Password is required';
    } else if (userFormData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to API
      console.log('Creating user:', userFormData);
      
      // Simulate successful user creation
      setTimeout(() => {
        setSuccessMessage(`User ${userFormData.name} created successfully as ${userFormData.role}`);
        setUserFormData({
          name: '',
          email: '',
          password: '',
          role: 'Admin'
        });
        setTimeout(() => {
          setSuccessMessage('');
          setShowUserModal(false);
        }, 2000);
      }, 1000);
    }
  };

  // Add new functions for user actions
  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
    // Implement user editing functionality
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId);
    // Implement user deletion functionality
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hospital) {
    return <div className="p-4">Hospital not found</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Hospital header */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">{hospital.name}</h1>
              <div className="flex items-center mt-2">
                <FiMapPin className="mr-2" />
                <span>{hospital.location}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span 
                className={`px-3 py-1 text-sm rounded-full ${
                  hospital.status === 'active' 
                    ? 'bg-green-400 text-white' 
                    : hospital.status === 'inactive' 
                      ? 'bg-red-400 text-white' 
                      : 'bg-yellow-400 text-white'
                }`}
              >
                {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Hospital details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Hospital Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                    <p className="text-gray-800 dark:text-white">{hospital.contactNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-white">{hospital.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiUser className="text-blue-500 mr-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Doctors</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{hospital.totalDoctors}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiUsers className="text-blue-500 mr-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Patients</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{hospital.totalPatients}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg sm:col-span-2">
                  <div className="flex items-center mb-2">
                    <FiCalendar className="text-blue-500 mr-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration Date</p>
                  </div>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{hospital.registrationDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Creation Button */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Hospital Users</h2>
            <button
              onClick={() => setShowUserModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Create User
            </button>
          </div>
          
          {/* Users Table Section */}
          <div className="mt-4">
            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="w-full md:w-48">
                <select
                  value={selectedRole}
                  onChange={handleRoleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Clerk">Clerk</option>
                </select>
              </div>
            </div>
            
            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Admin' 
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                              : user.role === 'Doctor'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                : user.role === 'Nurse'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleEditUser(user.id)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* User Creation Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Create New User</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FiX size={20} />
                </button>
              </div>

              {successMessage && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/30 p-3 rounded-md flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <p className="text-green-800 dark:text-green-400">{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userFormData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userFormData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter email address"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter password"
                    />
                    {formErrors.password && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={userFormData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Clerk">Clerk</option>
                      <option value="Nurse">Nurse</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualHospitalDetails;
