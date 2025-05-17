import DoctorDetailsById from '@/components/Doctor/Details/id';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ThynkPro - Doctor Details',
  description: 'View detailed information for a specific doctor',
};

type Props = {
  params: {
    id: string;
  };
};

export default async function DoctorDetailPage({ params }: Props) {
  const id = params.id;
  return <DoctorDetailsById doctorId={id} />;
} 