import PatientDetailsById from '@/components/Patient/Details/id';

export const metadata = {
  title: 'ThynkPro - Patient Details',
  description: 'View detailed information for a specific patient',
};

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  return <PatientDetailsById patientId={params.id} />;
} 