"use client";
import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi';
import { CommonHospital } from './AdminDashboard';

interface HospitalFormProps {
  isEditMode?: boolean;
  initialData?: CommonHospital;
  onSubmit: (data: CommonHospital) => void;
  onCancel: () => void;
}

interface Department {
  name: string;
  headDoctor?: string;
  staffCount?: number;
}

const HospitalForm: React.FC<HospitalFormProps> = ({
  isEditMode = false,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CommonHospital>({
    name: '',
    location: '',
    contactNumber: '',
    email: '',
    status: 'pending',
    description: '',
    operatingHours: '',
    facilityType: 'General Hospital',
    licenseNumber: '',
    emergencyServices: false,
    specialties: [],
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', type: '' });

  // Load initial data if in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(initialData);
    }
  }, [isEditMode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const showToast = (title: string, message: string, type: string) => {
    setToastMessage({ title, message, type });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() === '') return;
    if (formData.specialties.includes(newSpecialty.trim())) {
      showToast('Specialty already exists', 'This specialty is already in the list.', 'warning');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      specialties: [...prev.specialties, newSpecialty.trim()],
    }));
    setNewSpecialty('');
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty),
    }));
  };

  const addNewDepartment = () => {
    setDepartments(prev => [...prev, { name: '' }]);
  };

  const removeDepartment = (index: number) => {
    setDepartments(prev => prev.filter((_, i) => i !== index));
  };

  const updateDepartment = (index: number, field: keyof Department, value: string | number) => {
    setDepartments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) errors.name = 'Hospital name is required';
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.licenseNumber) errors.licenseNumber = 'License number is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Validation Error', 'Please check the form for errors', 'error');
      return;
    }
    
    // Prepare data for submission
    const formattedData = {
      ...formData,
      // Add any additional data processing here
    };
    
    onSubmit(formattedData);
    
    showToast(
      isEditMode ? 'Hospital Updated' : 'Hospital Added', 
      isEditMode 
        ? `${formData.name} has been successfully updated` 
        : `${formData.name} has been successfully added`,
      'success'
    );
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-6 items-center">
          <button 
            type="button"
            className="inline-flex items-center mr-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={onCancel}
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEditMode ? 'Edit Hospital' : 'Add New Hospital'}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Basic Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Basic Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter hospital name"
                    className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="City, State"
                    className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white ${
                      formErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.location && (
                    <p className="text-sm text-red-500">{formErrors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      +
                    </div>
                    <input 
                      type="tel" 
                      name="contactNumber" 
                      value={formData.contactNumber} 
                      onChange={handleChange} 
                      placeholder="Phone number"
                      className={`flex-1 p-2 border rounded-r-md bg-white dark:bg-gray-700 dark:text-white ${
                        formErrors.contactNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  </div>
                  {formErrors.contactNumber && (
                    <p className="text-sm text-red-500">{formErrors.contactNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="hospital@example.com"
                    className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Brief description of the hospital and its services"
                    rows={3}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Operating Hours
                  </label>
                  <input 
                    type="text"
                    name="operatingHours" 
                    value={formData.operatingHours} 
                    onChange={handleChange} 
                    placeholder="e.g., 24/7 or Mon-Fri: 8AM-5PM"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Additional Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Facility Type
                  </label>
                  <select 
                    name="facilityType" 
                    value={formData.facilityType} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  >
                    <option value="General Hospital">General Hospital</option>
                    <option value="Specialized Hospital">Specialized Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Urgent Care">Urgent Care</option>
                    <option value="Rehabilitation Center">Rehabilitation Center</option>
                    <option value="Mental Health Facility">Mental Health Facility</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="licenseNumber" 
                    value={formData.licenseNumber} 
                    onChange={handleChange} 
                    placeholder="Enter license number"
                    className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white ${
                      formErrors.licenseNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.licenseNumber && (
                    <p className="text-sm text-red-500">{formErrors.licenseNumber}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">
                    Emergency Services
                  </label>
                  <div className="flex items-center">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.emergencyServices}
                        onChange={() => handleSwitchChange('emergencyServices')}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                      Does the hospital provide emergency services?
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              {/* Specialties Section */}
              <div className="mt-4">
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Specialties
                </label>
                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
                  <input 
                    type="text"
                    placeholder="Add specialty (e.g., Cardiology, Neurology)"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <button 
                    type="button"
                    onClick={addSpecialty} 
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <FiPlus className="mr-2" /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.specialties.map((specialty, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                      <button
                        type="button"
                        aria-label={`Remove ${specialty}`}
                        onClick={() => removeSpecialty(specialty)}
                        className="ml-2 focus:outline-none hover:text-blue-500"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.specialties.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No specialties added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Department Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium">Departments</h2>
              <button 
                type="button"
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={addNewDepartment}
              >
                <FiPlus className="mr-1" /> Add Department
              </button>
            </div>
            <div className="p-6">
              {departments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No departments added yet. Click the button above to add departments.</p>
              ) : (
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5 space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Department Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text"
                            value={dept.name} 
                            onChange={(e) => updateDepartment(index, 'name', e.target.value)}
                            placeholder="e.g., Cardiology"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Head Doctor
                          </label>
                          <input 
                            type="text"
                            value={dept.headDoctor || ''} 
                            onChange={(e) => updateDepartment(index, 'headDoctor', e.target.value)}
                            placeholder="e.g., Dr. John Smith"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Staff Count
                          </label>
                          <input 
                            type="number" 
                            value={dept.staffCount || ''} 
                            onChange={(e) => updateDepartment(index, 'staffCount', parseInt(e.target.value) || 0)}
                            placeholder="Number of staff"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            aria-label="Remove department"
                            onClick={() => removeDepartment(index)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isEditMode ? 'Save Changes' : 'Add Hospital'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Toast Notification */}
      {toastVisible && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
          toastMessage.type === 'error' ? 'bg-red-500' : 
          toastMessage.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
        } text-white`}>
          <div className="font-bold">{toastMessage.title}</div>
          <div>{toastMessage.message}</div>
        </div>
      )}
    </div>
  );
};

export default HospitalForm; 