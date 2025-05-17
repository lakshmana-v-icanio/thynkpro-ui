import React from 'react';
import DoctorDetails from '@/components/Doctor/Details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospital Doctors | ThynkPro',
  description: 'View and manage hospital doctors',
};

export default function DoctorDetailsPage() {
  return <DoctorDetails />;
}
