"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DocumentFile {
  id: string;
  name: string;
  size: string;
  preview?: string | null;
  imageUrl?: string;
}

// Define all required interfaces locally instead of importing from API
interface Medicine {
  medicine_name: string;
  dosage: string;
  frequency: string;
}

interface Summary {
  id: string;
  summary: string;
  created_at: string;
}

interface Note {
  id: string;
  content: string;
  created_at: string;
}

interface PatientFile {
  id: string;
  file_name: string;
  file_size: number;
  file_url: string;
}

interface Patient {
  id: string;
  patient_name: string;
  patient_age?: number;
  patient_gender?: string;
  hospital_name?: string;
  diagnosis?: string;
  doctor_name?: string;
  doctor_advice?: string;
  created_at?: string;
  date?: string;
  medicines?: Medicine[];
  summaries?: Summary[];
  notes?: Note[];
  files?: PatientFile[];
}

// Use the Patient type from the previous definition
type PatientData = Patient;

// Mock patient data
const mockPatientsData: Patient[] = [
  {
    id: "P001",
    patient_name: "John Doe",
    patient_age: 45,
    patient_gender: "Male",
    hospital_name: "City General Hospital",
    diagnosis: "Hypertension",
    doctor_name: "Dr. Sarah Johnson",
    doctor_advice: "Maintain a low-sodium diet and exercise regularly. Follow up in 3 months.",
    created_at: "2023-06-15T10:30:00Z",
    medicines: [
      { medicine_name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { medicine_name: "Aspirin", dosage: "81mg", frequency: "Once daily" }
    ],
    summaries: [
      { id: "S001", summary: "Patient presented with elevated blood pressure. Initial readings: 150/95 mmHg.", created_at: "2023-06-15T10:30:00Z" }
    ],
    notes: [
      { id: "N001", content: "Patient reports occasional headaches in the morning. Will monitor and adjust medication if needed.", created_at: "2023-06-15T11:00:00Z" }
    ],
    files: [
      { id: "F001", file_name: "BP_Chart.pdf", file_size: 1024 * 150, file_url: "#" }
    ]
  },
  {
    id: "P002",
    patient_name: "Jane Smith",
    patient_age: 35,
    patient_gender: "Female",
    hospital_name: "Metro Medical Center",
    diagnosis: "Asthma",
    doctor_name: "Dr. Michael Brown",
    doctor_advice: "Use inhaler as prescribed. Avoid triggers like dust and smoke.",
    created_at: "2023-07-22T09:15:00Z",
    medicines: [
      { medicine_name: "Albuterol", dosage: "90mcg", frequency: "As needed" },
      { medicine_name: "Fluticasone", dosage: "110mcg", frequency: "Twice daily" }
    ],
    summaries: [
      { id: "S002", summary: "Patient experiencing increased frequency of asthma attacks. Adjusted medication regimen.", created_at: "2023-07-22T09:15:00Z" }
    ],
    notes: [
      { id: "N002", content: "Patient reports improvement after changing inhaler. Continue current treatment plan.", created_at: "2023-07-22T09:45:00Z" }
    ],
    files: [
      { id: "F002", file_name: "Lung_Function_Test.pdf", file_size: 1024 * 200, file_url: "#" }
    ]
  }
];

// Define a new interface for extracted prescription data
interface ExtractedPrescription {
  hospital: string;
  doctor: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    condition?: string;
  }[];
  instructions: string[];
}

const DocumentDetailPage = () => {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientData | null>(null);
  const [editedPatientDetails, setEditedPatientDetails] = useState<PatientData | null>(null);
  const [patientsData, setPatientsData] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [newMedicine, setNewMedicine] = useState<Medicine>({ medicine_name: '', dosage: '', frequency: '' });
  const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
  const [showImageViewer, setShowImageViewer] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('/images/116.jpg');
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Create temporary document list from mock patient data
      const tempDocuments = mockPatientsData.map(patient => {
        return {
          id: patient.id,
          name: `${patient.patient_name}.pdf`,
          size: 'N/A',
          preview: null,
          imageUrl: '/images/116.jpg'
        };
      });
      
      setDocuments(tempDocuments);
      
      // Set the first document as selected by default
      if (tempDocuments.length > 0) {
        setSelectedDocument(tempDocuments[0].id);
        setSelectedImage(tempDocuments[0].imageUrl || '/images/116.jpg');
      }
      
      // Set patient data from mock data
      fetchPatientDetails();
    }, 1000); // Simulate a 1-second loading time
  }, []);

  const fetchPatientDetails = () => {
    try {
      setLoading(true);
      
      // Use mock data instead of API call
      const patients = mockPatientsData;
      
      if (patients && patients.length > 0) {
        setPatientsData(patients);
        
        // Select first patient by default
        setPatientDetails(patients[0]);
        setEditedPatientDetails(patients[0]);
        setSelectedDocument(patients[0].id);
        setSelectedImage('/images/116.jpg');
      } else {
        setError('No patient data available');
      }
    } catch (error) {
      console.error('Error loading patient details:', error);
      setError('Error loading patient details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentClick = (id: string) => {
    if (id === selectedDocument) return; // Don't reload if already selected
    
    setSelectedDocument(id);
    // Find patient details for the selected document
    const selectedPatient = patientsData.find(p => p.id === id);
    if (selectedPatient) {
      setPatientDetails(selectedPatient);
      setEditedPatientDetails(selectedPatient);
      
      // Find the document to get its image URL
      const selectedDoc = documents.find(d => d.id === id);
      if (selectedDoc && selectedDoc.imageUrl) {
        setSelectedImage(selectedDoc.imageUrl);
      }
    } else {
      setPatientDetails(null);
      setEditedPatientDetails(null);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (editedPatientDetails) {
      setEditedPatientDetails({
        ...editedPatientDetails,
        [field]: value
      });
    }
  };

  const handleMedicineChange = (index: number, field: keyof Medicine, value: string) => {
    if (editedPatientDetails && editedPatientDetails.medicines) {
      const updatedMedicines = [...editedPatientDetails.medicines];
      updatedMedicines[index] = {
        ...updatedMedicines[index],
        [field]: value
      };
      
      setEditedPatientDetails({
        ...editedPatientDetails,
        medicines: updatedMedicines
      });
    }
  };

  const handleAddMedicine = () => {
    if (editedPatientDetails) {
      if (!newMedicine.medicine_name.trim()) return;
      
      const updatedMedicines = editedPatientDetails.medicines ? 
        [...editedPatientDetails.medicines, newMedicine] : 
        [newMedicine];
      
      setEditedPatientDetails({
        ...editedPatientDetails,
        medicines: updatedMedicines
      });
      
      // Reset the new medicine form
      setNewMedicine({ medicine_name: '', dosage: '', frequency: '' });
    }
  };

  const handleRemoveMedicine = (index: number) => {
    if (editedPatientDetails && editedPatientDetails.medicines) {
      const updatedMedicines = [...editedPatientDetails.medicines];
      updatedMedicines.splice(index, 1);
      
      setEditedPatientDetails({
        ...editedPatientDetails,
        medicines: updatedMedicines
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!editedPatientDetails || !editedPatientDetails.id) return;
    
    try {
      setSaveLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state with edited data
      setPatientDetails(editedPatientDetails);
      
      // Update in patients data array
      setPatientsData(prev => 
        prev.map(p => p.id === editedPatientDetails.id ? editedPatientDetails : p)
      );
      
      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating patient details:', error);
      setError('Error updating patient details. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset edited details to original
    setEditedPatientDetails(patientDetails);
    setIsEditing(false);
  };

  // Image viewer functions
  const handleZoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleImageViewer = () => {
    setShowImageViewer(prev => !prev);
  };

  // Add a new function to handle adding extracted medicines to patient record

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Document Details
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              View and manage patient documents and information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all shadow-sm hover:shadow flex items-center gap-2"
              onClick={toggleImageViewer}
            >
              <span>{showImageViewer ? 'Hide Image' : 'Show Image'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                {showImageViewer ? 
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /> :
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                }
                {showImageViewer ? 
                  <path d="M5.94 5.99l.944.979a7 7 0 0110.132 0l.944-.979A8 8 0 005.94 5.99zm7.126 6.02l-.944.979a7 7 0 01-10.132 0l-.944-.979a8 8 0 0012.02 0z" /> :
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                }
              </svg>
            </button>
            <button
              className="px-6 py-2.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-all shadow-sm hover:shadow flex items-center gap-2"
              onClick={() => setShowConfirmationPopup(true)}
            >
              <span>Done</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-brand-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Content</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Are all the extracted contents correct?
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowConfirmationPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                onClick={() => {
                  setShowConfirmationPopup(false);
                  router.push('/patient/details');
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading patient details...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-sm border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${showImageViewer ? 'md:grid-cols-6' : 'md:grid-cols-3'} gap-6`}>
          {/* Documents list - now displayed at the top */}
          <div className={`${showImageViewer ? 'md:col-span-6' : 'md:col-span-3'} order-1`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Documents ({documents.length})</h3>
                <div className="flex items-center gap-2">
                  <div className="relative w-40 sm:w-64 hidden sm:block">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-8 pr-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button className="p-1.5 sm:hidden bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Mobile view - horizontal scrolling */}
              <div className="sm:hidden overflow-x-auto pb-2 -mx-1 px-1">
                <div className="flex space-x-2">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex-shrink-0 p-2 w-40 rounded-lg border cursor-pointer transition-all ${
                          selectedDocument === doc.id 
                            ? 'border-brand-500 bg-brand-50 dark:bg-gray-700 shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        }`}
                        onClick={() => handleDocumentClick(doc.id)}
                      >
                        <div className="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${selectedDocument === doc.id ? 'text-brand-500' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className={`block text-xs font-medium truncate ${
                            selectedDocument === doc.id 
                              ? 'text-brand-600 dark:text-brand-400' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {doc.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">
                          ID: {doc.id}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center w-full">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">No documents</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Desktop view - vertical list */}
              <div className="hidden sm:block space-y-2 max-h-[calc(100vh-480px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-2 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                        selectedDocument === doc.id 
                          ? 'border-brand-500 bg-brand-50 dark:bg-gray-700 shadow-sm' 
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-300'
                      }`}
                      onClick={() => handleDocumentClick(doc.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${selectedDocument === doc.id ? 'text-brand-500' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-sm font-medium truncate ${
                            selectedDocument === doc.id 
                              ? 'text-brand-600 dark:text-brand-400' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {doc.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">
                            ID: {doc.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">No documents available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Viewer - now displayed below the documents list */}
          {showImageViewer && (
            <div className="order-2 md:col-span-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Document Image</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-lg"
                      title="Zoom Out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-lg"
                      title="Reset Zoom"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-lg"
                      title="Zoom In"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div 
                  className="bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-lg h-[calc(100vh-240px)] flex items-center justify-center relative"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <div
                    style={{
                      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageZoom})`,
                      transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                    }}
                    className="origin-center"
                  >
                    <Image 
                      src={selectedImage} 
                      alt="Document" 
                      width={800} 
                      height={1000} 
                      className="max-w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                  <span>Zoom: {Math.round(imageZoom * 100)}%</span>
                  <span>Drag to pan image</span>
                </div>
              </div>
            </div>
          )}

          {/* Right side - Patient details */}
          <div className={`order-3 ${showImageViewer ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 h-full">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Patient Details</h2>
                  </div>

                  {patientDetails ? (
                    <>
                      {/* Tabs navigation - redesigned to match screenshot */}
                      <div className="mb-4">
                        <div className="grid grid-cols-4 gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                          <button
                            className={`flex items-center justify-center px-3 py-2 text-sm rounded-md transition-all ${
                              activeTab === 'general'
                                ? 'bg-white dark:bg-gray-800 text-brand-500 shadow-sm font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveTab('general')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${activeTab === 'general' ? 'text-brand-500' : 'text-gray-500'} mr-1.5`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span>General</span>
                          </button>
                          <button
                            className={`flex items-center justify-center px-3 py-2 text-sm rounded-md transition-all ${
                              activeTab === 'medical'
                                ? 'bg-white dark:bg-gray-800 text-brand-500 shadow-sm font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveTab('medical')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${activeTab === 'medical' ? 'text-brand-500' : 'text-gray-500'} mr-1.5`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>Medical</span>
                          </button>
                          <button
                            className={`flex items-center justify-center px-3 py-2 text-sm rounded-md transition-all ${
                              activeTab === 'documents'
                                ? 'bg-white dark:bg-gray-800 text-brand-500 shadow-sm font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveTab('documents')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${activeTab === 'documents' ? 'text-brand-500' : 'text-gray-500'} mr-1.5`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span>Documents</span>
                          </button>
                          <button
                            className={`flex items-center justify-center px-3 py-2 text-sm rounded-md transition-all ${
                              activeTab === 'notes'
                                ? 'bg-white dark:bg-gray-800 text-brand-500 shadow-sm font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setActiveTab('notes')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${activeTab === 'notes' ? 'text-brand-500' : 'text-gray-500'} mr-1.5`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            <span>Notes</span>
                          </button>
                        </div>
                      </div>

                      {/* Tab content */}
                      <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
                      {activeTab === 'general' && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Patient Name</h4>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={editedPatientDetails?.patient_name || ''}
                                    onChange={(e) => handleInputChange('patient_name', e.target.value)}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                  />
                                ) : (
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {patientDetails?.patient_name || 'N/A'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Age</h4>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    value={editedPatientDetails?.patient_age || ''}
                                    onChange={(e) => handleInputChange('patient_age', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                  />
                                ) : (
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {patientDetails?.patient_age ? `${patientDetails.patient_age} years` : 'N/A'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Gender</h4>
                                {isEditing ? (
                                  <select
                                    value={editedPatientDetails?.patient_gender || ''}
                                    onChange={(e) => handleInputChange('patient_gender', e.target.value)}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                  </select>
                                ) : (
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {patientDetails?.patient_gender || 'N/A'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Patient ID</h4>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {patientDetails?.id || 'N/A'}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Hospital</h4>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={editedPatientDetails?.hospital_name || ''}
                                    onChange={(e) => handleInputChange('hospital_name', e.target.value)}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                  />
                                ) : (
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {patientDetails?.hospital_name || 'N/A'}
                                  </p>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Created Date</h4>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {patientDetails?.created_at 
                                    ? new Date(patientDetails.created_at).toLocaleDateString() 
                                    : patientDetails?.date || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'medical' && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Diagnosis</h4>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editedPatientDetails?.diagnosis || ''}
                                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                              />
                            ) : (
                              <p className="text-sm text-gray-900 dark:text-white">
                                {patientDetails?.diagnosis || 'N/A'}
                              </p>
                            )}
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Doctor Name</h4>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editedPatientDetails?.doctor_name || ''}
                                onChange={(e) => handleInputChange('doctor_name', e.target.value)}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                              />
                            ) : (
                              <p className="text-sm text-gray-900 dark:text-white">
                                {patientDetails?.doctor_name || 'N/A'}
                              </p>
                            )}
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Doctor&apos;s Advice</h4>
                            {isEditing ? (
                              <textarea
                                value={editedPatientDetails?.doctor_advice || ''}
                                onChange={(e) => handleInputChange('doctor_advice', e.target.value)}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                rows={2}
                              />
                            ) : (
                              <p className="text-sm text-gray-900 dark:text-white">
                                {patientDetails?.doctor_advice || 'N/A'}
                              </p>
                            )}
                          </div>

                          {patientDetails.medicines && patientDetails.medicines.length > 0 && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Medicines</h4>
                                {isEditing && (
                                  <button
                                    type="button"
                                    className="text-xs text-brand-500 hover:text-brand-600 flex items-center"
                                    onClick={() => document.getElementById('add-medicine-panel')?.scrollIntoView({ behavior: 'smooth' })}
                                  >
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add
                                  </button>
                                )}
                              </div>
                              
                              <div className="space-y-2 mt-2">
                                {(!isEditing ? patientDetails?.medicines : editedPatientDetails?.medicines)?.map((medicine: Medicine, index: number) => (
                                  <div key={index} className="bg-white dark:bg-gray-800 p-2 rounded-md text-sm border border-gray-200 dark:border-gray-700">
                                    {isEditing ? (
                                      <div className="space-y-2">
                                        <div className="flex gap-2">
                                          <input
                                            type="text"
                                            placeholder="Medicine"
                                            value={medicine.medicine_name}
                                            onChange={(e) => handleMedicineChange(index, 'medicine_name', e.target.value)}
                                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Dosage"
                                            value={medicine.dosage}
                                            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                                            className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                          />
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <input
                                            type="text"
                                            placeholder="Frequency"
                                            value={medicine.frequency}
                                            onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                                            className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveMedicine(index)}
                                            className="text-red-500 hover:text-red-700 text-xs p-1"
                                          >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="font-medium">{medicine.medicine_name}</div>
                                        <div className="flex text-xs text-gray-600 dark:text-gray-400 mt-1 justify-between">
                                          <span>Dosage: {medicine.dosage || 'N/A'}</span>
                                          <span>Frequency: {medicine.frequency || 'N/A'}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'documents' && (
                        <div className="space-y-3">
                          {patientDetails?.files && patientDetails.files.length > 0 ? (
                            patientDetails.files.map((file: PatientFile) => (
                              <div key={file.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-brand-100 dark:bg-brand-800/30 p-1.5 rounded-md mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                      {file.file_name}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {Math.round(file.file_size / 1024)} KB
                                    </p>
                                  </div>
                                </div>
                                <button 
                                  className="px-2 py-1 bg-brand-500 text-white rounded hover:bg-brand-600 text-xs flex items-center"
                                  onClick={() => window.open(file.file_url, '_blank')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                No documents available
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'notes' && (
                        <div className="space-y-3">
                          {patientDetails?.notes && patientDetails.notes.length > 0 ? (
                            patientDetails.notes.map((note: Note) => (
                              <div key={note.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap mb-2">
                                  {note.content}
                                </p>
                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2">
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {note.created_at ? new Date(note.created_at).toLocaleString() : 'N/A'}
                                  </span>
                                  <span className="px-1.5 py-0.5 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded">
                                    Note
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                No notes available
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      </div>

                      {/* Footer with action buttons */}
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                        <button
                          className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 shadow-sm text-sm flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                          onClick={() => router.back()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                          </svg>
                          Back
                        </button>
                        {isEditing ? (
                          <>
                            <button
                              className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 shadow-sm text-sm flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                              onClick={handleCancelEdit}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                            <button
                              className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 shadow-sm text-sm flex items-center disabled:opacity-50 disabled:pointer-events-none"
                              onClick={handleSaveChanges}
                              disabled={saveLoading}
                            >
                              {saveLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Save
                                </>
                              )}
                            </button>
                          </>
                        ) : (
                          <button
                            className="px-3 py-1.5 bg-brand-500 text-white rounded hover:bg-brand-600 shadow-sm text-sm flex items-center"
                            onClick={() => setIsEditing(true)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-900 dark:text-white font-medium mb-1">
                        No patient details available
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Select a document from the list to view patient details
                      </p>
                    </div>
                  )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetailPage; 