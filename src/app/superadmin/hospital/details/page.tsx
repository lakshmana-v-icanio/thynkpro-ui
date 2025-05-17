"use client";
import React from 'react';
import HospitalDetails from '@/components/Superadmin/Hospital/Details';

const HospitalDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <HospitalDetails />
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
