"use client";
import React, { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiMail, FiChevronRight, FiPlus, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Import the hospital interface
interface Hospital {
  id: string;
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
}

interface HospitalFormData {
  name: string;
  location: string;
  contactNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  operatingHours: string;
  facilityType: string;
  licenseNumber: string;
  emergencyServices: boolean;
}

const HospitalDetails: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<HospitalFormData>({
    name: '',
    location: '',
    contactNumber: '',
    email: '',
    status: 'active',
    operatingHours: '',
    facilityType: '',
    licenseNumber: '',
    emergencyServices: false
  });
  const [formErrors, setFormErrors] = useState<Partial<HospitalFormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Fetch hospitals data
    // This is mock data, replace with actual API call
    setTimeout(() => {
      const mockData: Hospital[] = [
        {
          id: '1',
          name: 'Metropolitan Hospital',
          location: 'New York, NY',
          contactNumber: '+1 (212) 555-7890',
          email: 'info@metropolitanhospital.com',
          status: 'active',
        },
        {
          id: '2',
          name: 'Pacific Medical Center',
          location: 'San Francisco, CA',
          contactNumber: '+1 (415) 555-1234',
          email: 'contact@pacificmedical.org',
          status: 'active',
        },
        {
          id: '3',
          name: 'Community Healthcare',
          location: 'Chicago, IL',
          contactNumber: '+1 (555) 123-4567',
          email: 'admin@communityhealthcare.org',
          status: 'inactive',
        },
        {
          id: '4',
          name: 'Regional Medical Center',
          location: 'Houston, TX',
          contactNumber: '+1 (281) 555-7890',
          email: 'info@regionalmed.com',
          status: 'pending',
        },
        {
          id: '5',
          name: 'Memorial Hospital',
          location: 'Phoenix, AZ',
          contactNumber: '+1 (602) 555-1234',
          email: 'contact@memorialhospital.com',
          status: 'active',
        },
      ];
      setHospitals(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCardClick = (hospitalId: string) => {
    router.push(`/superadmin/hospital/details/${hospitalId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors: Partial<HospitalFormData> = {};
    if (!formData.name.trim()) errors.name = 'Hospital name is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.operatingHours.trim()) errors.operatingHours = 'Operating hours are required';
    if (!formData.facilityType.trim()) errors.facilityType = 'Facility type is required';
    if (!formData.licenseNumber.trim()) errors.licenseNumber = 'License number is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to API
      console.log('Creating hospital:', formData);
      
      // Simulate successful hospital creation
      setTimeout(() => {
        // Add the new hospital to the list
        const newHospital: Hospital = {
          id: (hospitals.length + 1).toString(),
          name: formData.name,
          location: formData.location,
          contactNumber: formData.contactNumber,
          email: formData.email,
          status: formData.status
        };
        
        setHospitals([...hospitals, newHospital]);
        setSuccessMessage(`Hospital ${formData.name} created successfully`);
        
        // Reset form and close modal after a delay
        setTimeout(() => {
          setFormData({
            name: '',
            location: '',
            contactNumber: '',
            email: '',
            status: 'active',
            operatingHours: '',
            facilityType: '',
            licenseNumber: '',
            emergencyServices: false
          });
          setSuccessMessage('');
          setShowAddModal(false);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Hospitals</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
        >
          <FiPlus />
          Add Hospital
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(hospital.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{hospital.name}</h2>
                  <FiChevronRight className="text-gray-400 mt-1" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiMapPin className="mr-2 flex-shrink-0" />
                    <span>{hospital.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiPhone className="mr-2 flex-shrink-0" />
                    <span>{hospital.contactNumber}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiMail className="mr-2 flex-shrink-0" />
                    <span>{hospital.email}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      hospital.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : hospital.status === 'inactive' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">View details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Hospital Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Hospital</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FiX size={20} />
                </button>
              </div>

              {successMessage && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/30 p-3 rounded-md">
                  <p className="text-green-800 dark:text-green-400">{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Hospital Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter hospital name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter location"
                    />
                    {formErrors.location && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Number*
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.contactNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter contact number"
                    />
                    {formErrors.contactNumber && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.contactNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter email address"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Operating Hours*
                    </label>
                    <input
                      type="text"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.operatingHours ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="e.g. 24/7 or 8AM-9PM"
                    />
                    {formErrors.operatingHours && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.operatingHours}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Facility Type*
                    </label>
                    <input
                      type="text"
                      name="facilityType"
                      value={formData.facilityType}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.facilityType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="e.g. General Hospital, Clinic"
                    />
                    {formErrors.facilityType && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.facilityType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      License Number*
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.licenseNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter license number"
                    />
                    {formErrors.licenseNumber && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.licenseNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="emergencyServices"
                        checked={formData.emergencyServices}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Emergency Services Available
                      </label>
                    </div>
                  </div> */}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Create Hospital
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

export default HospitalDetails;
