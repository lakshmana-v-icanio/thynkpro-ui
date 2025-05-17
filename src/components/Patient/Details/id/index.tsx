"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FiUser, 
  FiCalendar, 
  FiPhone, 
  FiHome, 
  FiActivity, 
  FiHeart, 
  FiFileText,
  FiArrowLeft,
  FiClock,
  FiAlertCircle,
  FiRefreshCw,
  FiMoreVertical,
  FiEdit,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiX
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued';
  notes?: string;
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'appointment' | 'medication' | 'test' | 'procedure' | 'note';
  provider?: string;
}

interface PatientDetail {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  hospitalName: string;
  diagnosis: string;
  medications: Medication[];
  timelineEvents: TimelineEvent[];
  admissionDate: string;
  dischargeDate?: string;
  bloodType?: string;
  allergies?: string[];
  height?: number;
  weight?: number;
  status: 'Active' | 'Discharged' | 'Critical';
  doctorName: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
}

const PatientDetailsById = ({ patientId }: { patientId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPatientData, setEditPatientData] = useState<PatientDetail | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating API call with setTimeout
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for the patient
        const mockPatient: PatientDetail = {
          id: patientId,
          name: "John Smith",
          age: 65,
          gender: "Male",
          phoneNumber: "(555) 123-4567",
          email: "john.smith@example.com",
          address: "123 Main St, Anytown, USA",
          emergencyContact: "Mary Smith (555) 987-6543",
          hospitalName: "General Hospital",
          diagnosis: "Hypertension, Type 2 Diabetes",
          medications: [
            {
              id: "med1",
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
              startDate: "2023-01-15",
              status: "active",
              notes: "Take in the morning"
            },
            {
              id: "med2",
              name: "Metformin",
              dosage: "500mg",
              frequency: "Twice daily",
              startDate: "2023-01-15",
              status: "active",
              notes: "Take with meals"
            },
            {
              id: "med3",
              name: "Aspirin",
              dosage: "81mg",
              frequency: "Once daily",
              startDate: "2023-01-15",
              status: "active"
            },
            {
              id: "med4",
              name: "Atorvastatin",
              dosage: "20mg",
              frequency: "Once daily",
              startDate: "2023-01-15",
              status: "active",
              notes: "Take in the evening"
            },
            {
              id: "med5",
              name: "Amoxicillin",
              dosage: "500mg",
              frequency: "Three times daily",
              startDate: "2023-03-10",
              endDate: "2023-03-17",
              status: "completed",
              notes: "For bacterial infection"
            }
          ],
          timelineEvents: [
            {
              id: "event1",
              date: "2023-01-15",
              title: "Initial Consultation",
              description: "Patient admitted with complaints of chest pain and shortness of breath.",
              category: "appointment",
              provider: "Dr. Sarah Johnson"
            },
            {
              id: "event2",
              date: "2023-01-16",
              title: "Blood Test",
              description: "Comprehensive blood panel including CBC, lipid profile, and HbA1c.",
              category: "test",
              provider: "Lab Services"
            },
            {
              id: "event3",
              date: "2023-01-18",
              title: "Echocardiogram",
              description: "Evaluation of heart function. Results show mild left ventricular hypertrophy.",
              category: "procedure",
              provider: "Cardiology Department"
            },
            {
              id: "event4",
              date: "2023-01-20",
              title: "Medication Started",
              description: "Started on Lisinopril 10mg for hypertension and Metformin 500mg for diabetes.",
              category: "medication",
              provider: "Dr. Sarah Johnson"
            },
            {
              id: "event5",
              date: "2023-01-22",
              title: "Discharge",
              description: "Patient discharged with stable condition. Follow-up appointment scheduled in 2 weeks.",
              category: "note",
              provider: "Dr. Sarah Johnson"
            },
            {
              id: "event6",
              date: "2023-02-05",
              title: "Follow-up Appointment",
              description: "Blood pressure readings improved. HbA1c still elevated. Continued current medications.",
              category: "appointment",
              provider: "Dr. Sarah Johnson"
            },
            {
              id: "event7",
              date: "2023-03-10",
              title: "Prescription Update",
              description: "Added Amoxicillin 500mg TID for 7 days to treat bacterial infection.",
              category: "medication",
              provider: "Dr. Sarah Johnson"
            }
          ],
          admissionDate: "2023-01-15",
          dischargeDate: "2023-01-22",
          bloodType: "A+",
          allergies: ["Penicillin", "Shellfish"],
          height: 175,
          weight: 82,
          status: "Active",
          doctorName: "Dr. Sarah Johnson",
          insuranceProvider: "HealthPlus Insurance",
          insuranceNumber: "HP-12345678",
          notes: "Patient has been managing hypertension for 5 years. Recently diagnosed with Type 2 Diabetes."
        };
        
        setPatient(mockPatient);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const generateSummary = async () => {
    setGeneratingSummary(true);
    setSummary(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be an actual API call to generate a summary in a real app
      // Here, we're just creating a mock summary
      const mockSummary = `
        ${patient?.name} is a ${patient?.age}-year-old ${patient?.gender?.toLowerCase()} who was admitted to ${patient?.hospitalName} on ${new Date(patient?.admissionDate || '').toLocaleDateString()} with a diagnosis of ${patient?.diagnosis}. 
        
        The patient is currently under the care of ${patient?.doctorName} and is on ${patient?.medications.filter(m => m.status === 'active').length} active medications, including ${patient?.medications.filter(m => m.status === 'active').map(m => m.name).join(', ')}. 
        
        Patient has allergies to ${patient?.allergies?.join(', ') || 'none reported'}. The patient's vital signs have been stable, and they have been responding well to the current treatment regimen. 
        
        Ongoing monitoring is recommended for blood pressure and blood glucose levels due to the patient's hypertension and Type 2 Diabetes. The patient should continue their medication as prescribed and follow up in two weeks for a reassessment.
      `;
      
      setSummary(mockSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleEditPatient = () => {
    // Set the edit patient data to a deep copy of the current patient
    setEditPatientData(JSON.parse(JSON.stringify(patient)));
    setIsEditModalOpen(true);
    setMenuOpen(false);
  };

  // Function to add a new medication row
  const handleAddMedication = () => {
    if (!editPatientData) return;
    
    const newMedication: Medication = {
      id: `med${Date.now()}`, // Generate a unique ID
      name: "",
      dosage: "",
      frequency: "",
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    
    setEditPatientData({
      ...editPatientData,
      medications: [...editPatientData.medications, newMedication]
    });
  };

  // Function to update medication data
  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    if (!editPatientData) return;
    
    const updatedMedications = editPatientData.medications.map(med => {
      if (med.id === id) {
        return { ...med, [field]: value };
      }
      return med;
    });
    
    setEditPatientData({
      ...editPatientData,
      medications: updatedMedications
    });
  };

  // Function to remove a medication
  const handleRemoveMedication = (id: string) => {
    if (!editPatientData) return;
    
    const updatedMedications = editPatientData.medications.filter(med => med.id !== id);
    
    setEditPatientData({
      ...editPatientData,
      medications: updatedMedications
    });
  };

  // Function to save patient data
  const handleSavePatient = () => {
    if (!editPatientData) return;
    
    // In a real app, this would save to an API
    setPatient(editPatientData);
    setIsEditModalOpen(false);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditPatientData(null);
  };

  // Function to download patient summary
  const handleDownloadSummary = () => {
    if (!summary) {
      alert("Please generate a summary first");
      return;
    }

    // Create a text file with the summary
    const element = document.createElement("a");
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${patient?.name.replace(/\s+/g, '_')}_medical_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    if (isEditModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditModalOpen]);

  // Function to get timeline event category icon and color
  const getTimelineEventStyles = (category: string) => {
    switch (category) {
      case 'appointment':
        return { icon: <FiCalendar />, color: 'bg-blue-500' };
      case 'medication':
        return { icon: <FiHeart />, color: 'bg-purple-500' };
      case 'test':
        return { icon: <FiActivity />, color: 'bg-amber-500' };
      case 'procedure':
        return { icon: <FiActivity />, color: 'bg-green-500' };
      case 'note':
        return { icon: <FiFileText />, color: 'bg-gray-500' };
      default:
        return { icon: <FiFileText />, color: 'bg-gray-500' };
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Patient Not Found</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">The patient you're looking for doesn't exist or you don't have permission to view it.</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 mx-auto"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <FiArrowLeft className="mr-2" /> Back to Patients
      </button>

      {/* Edit Modal */}
      {isEditModalOpen && editPatientData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
              <h2 className="text-lg font-medium">Edit Patient Details</h2>
              <button onClick={handleCloseModal} className="text-white hover:text-gray-200">
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Patient Basic Info */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={editPatientData.name}
                      onChange={(e) => setEditPatientData({...editPatientData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                    <input
                      type="number"
                      value={editPatientData.age}
                      onChange={(e) => setEditPatientData({...editPatientData, age: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select
                      value={editPatientData.gender}
                      onChange={(e) => setEditPatientData({...editPatientData, gender: e.target.value as 'Male' | 'Female' | 'Other'})}
                      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editPatientData.phoneNumber}
                      onChange={(e) => setEditPatientData({...editPatientData, phoneNumber: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              {/* Medications Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Medications</h3>
                  <button
                    onClick={handleAddMedication}
                    className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FiPlus className="mr-1" /> Add Medication
                  </button>
                </div>
                
                {editPatientData.medications.length === 0 ? (
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-gray-500 dark:text-gray-400">No medications. Click "Add Medication" to add one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {editPatientData.medications.map((med) => (
                      <div key={med.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Medication Details</h4>
                          <button
                            onClick={() => handleRemoveMedication(med.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                              type="text"
                              value={med.name}
                              onChange={(e) => handleMedicationChange(med.id, 'name', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dosage</label>
                            <input
                              type="text"
                              value={med.dosage}
                              onChange={(e) => handleMedicationChange(med.id, 'dosage', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                            <input
                              type="text"
                              value={med.frequency}
                              onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={med.startDate}
                              onChange={(e) => handleMedicationChange(med.id, 'startDate', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                              value={med.status}
                              onChange={(e) => handleMedicationChange(med.id, 'status', e.target.value as 'active' | 'completed' | 'discontinued')}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="discontinued">Discontinued</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                            <input
                              type="text"
                              value={med.notes || ''}
                              onChange={(e) => handleMedicationChange(med.id, 'notes', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md mr-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePatient}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{patient.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Patient ID: {patient.id} · {patient.status && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  patient.status === 'Discharged' ? 'bg-blue-100 text-blue-800' : 
                  'bg-red-100 text-red-800'}`}>
                {patient.status}
              </span>
            )}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={generateSummary}
            disabled={generatingSummary}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingSummary ? <FiRefreshCw className="animate-spin" /> : <FiFileText />}
            {generatingSummary ? 'Generating Summary...' : 'Generate Summary'}
          </button>
          
          {/* Three-dot menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <FiMoreVertical className="h-5 w-5 text-gray-500" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    onClick={handleEditPatient}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiEdit className="h-4 w-4" />
                    Edit Patient
                  </button>
                  <button
                    onClick={handleDownloadSummary}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiDownload className="h-4 w-4" />
                    Download Summary
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-blue-500 text-white">
            <h2 className="text-lg font-medium">Patient Information</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <FiUser className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiHeart className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Diagnosis</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.diagnosis}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiHome className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hospital</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.hospitalName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiCalendar className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.age} years</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiUser className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.gender}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiPhone className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{patient.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiClock className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Admission Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(patient.admissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {patient.dischargeDate && (
                <div className="flex items-start">
                  <FiClock className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Discharge Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(patient.dischargeDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              
              {patient.doctorName && (
                <div className="flex items-start">
                  <FiUser className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
                    <p className="font-medium text-gray-900 dark:text-white">{patient.doctorName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Medications and Summary */}
        <div className="md:col-span-2">
          {/* Medications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="p-4 bg-purple-500 text-white">
              <h2 className="text-lg font-medium">Medications</h2>
            </div>
            
            <div className="overflow-hidden">
              {patient.medications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No medications found for this patient.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                          Medication
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                          Dosage
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                          Frequency
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {patient.medications.map((medication) => (
                        <tr key={medication.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{medication.name}</div>
                              {medication.notes && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">{medication.notes}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{medication.dosage}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{medication.frequency}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMedicationStatusColor(medication.status)}`}>
                              {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Patient Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 bg-green-500 text-white">
              <h2 className="text-lg font-medium">Patient Summary</h2>
            </div>
            
            <div className="p-4">
              {summary ? (
                <div className="prose dark:prose-invert max-w-none">
                  {summary.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Summary Available</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Click the "Generate Summary" button to create a detailed summary of the patient's condition.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Patient Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
            <div className="p-4 bg-blue-500 text-white">
              <h2 className="text-lg font-medium">Patient Timeline</h2>
            </div>
            
            <div className="p-4">
              {patient.timelineEvents && patient.timelineEvents.length > 0 ? (
                <div className="flow-root">
                  <ul className="-mb-8">
                    {patient.timelineEvents
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((event, eventIdx) => {
                        const { icon, color } = getTimelineEventStyles(event.category);
                        return (
                          <li key={event.id}>
                            <div className="relative pb-8">
                              {eventIdx !== patient.timelineEvents.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${color} text-white`}>
                                    {icon}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{event.title}</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                                    {event.provider && (
                                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Provider: {event.provider}</p>
                                    )}
                                  </div>
                                  <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                    {new Date(event.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-10">
                  <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Timeline Events</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    This patient doesn't have any recorded timeline events yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsById;
