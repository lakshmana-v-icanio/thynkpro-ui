"use client";
import React from 'react';
import IndividualHospitalDetails from '@/components/Superadmin/Hospital/Details/id';

interface HospitalDetailPageProps {
  params: {
    id: string;
  };
}

const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({ params }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <IndividualHospitalDetails id={params.id} />
      </div>
    </div>
  );
};

export default HospitalDetailPage;
