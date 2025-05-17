import React from 'react';
import { FiArrowLeft, FiUser, FiPhone, FiMail, FiMapPin, FiClock, FiCalendar, FiAward } from 'react-icons/fi';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Profile | ThynkPro',
  description: 'Detailed information about the doctor',
};

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
  biography?: string;
  education?: string[];
  certifications?: string[];
  availability?: {
    days: string[];
    hours: string;
  };
}

export default function DoctorDetailsById({ doctorId }: { doctorId: string }) {
  // In a real application, you would fetch the doctor data from an API using the ID
  // For this example, we're using mock data
  
  // Mock data for demonstration - in a real app, this would come from an API
  const doctor: Doctor = {
    id: doctorId,
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
    },
    biography: 'Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management. Dr. Johnson is known for her patient-centered approach and commitment to providing comprehensive cardiac care.',
    education: [
      'MD, Harvard Medical School',
      'Residency in Internal Medicine, Massachusetts General Hospital',
      'Fellowship in Cardiovascular Disease, Stanford University Medical Center'
    ],
    certifications: [
      'Board Certified in Cardiovascular Disease',
      'American College of Cardiology Fellow',
      'Advanced Cardiac Life Support (ACLS)'
    ],
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      hours: '9:00 AM - 5:00 PM'
    }
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <Link href="/doctor/details" className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-700">
        <FiArrowLeft className="mr-2" /> Back to Doctors
      </Link>

      {/* Doctor Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-500 p-6">
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="w-24 h-24 rounded-full border-4 border-white object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left text-white">
              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-blue-100">{doctor.specialty}</p>
              <div className="mt-2">
                <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full bg-white ${doctor.status === 'available' ? 'text-green-800' : doctor.status === 'on leave' ? 'text-orange-800' : 'text-red-800'}`}>
                  {doctor.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Contact & Basic Info */}
        <div>
          {/* Contact Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Contact Information</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{doctor.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{doctor.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hospital</p>
                    <p className="font-medium text-gray-900 dark:text-white">{doctor.hospital}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Key Information</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Patients</p>
                    <p className="text-lg font-semibold">{doctor.patients}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                    <p className="text-lg font-semibold">{doctor.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                    <FiCalendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
                    <p className="text-lg font-semibold">{doctor.availability?.days.join(', ')}</p>
                    <p className="text-sm text-gray-500">{doctor.availability?.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Biography, Education, Certifications */}
        <div className="md:col-span-2">
          {/* Biography */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">About</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {doctor.biography}
              </p>
            </div>
          </div>
          
          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold">Education</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {doctor.education?.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <FiAward className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold">Certifications</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {doctor.certifications?.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <FiAward className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 