import PrescriptionUpload from "@/components/Upload";

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <PrescriptionUpload />
        </div>
      </div>
    </div>
  );
}
