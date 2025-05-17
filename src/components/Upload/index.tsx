"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FileItem {
  id: string;
  file: File;
  name: string;
  preview: string;
  status: 'pending' | 'completed';
}

const UploadPage = () => {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Function to check if any file has been processed
  const hasProcessedFiles = () => {
    return fileItems.some(item => item.status === 'completed');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addFilesToQueue(Array.from(files));
    }
  };
  
  const addFilesToQueue = (files: File[]) => {
    const newFileItems = files.map(file => {
      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
        status: 'pending' as const
      };
    });
    
    setFileItems(prev => [...prev, ...newFileItems]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      addFilesToQueue(Array.from(files));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      fileItems.forEach(item => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [fileItems]); // Add fileItems to dependency array to properly track changes

  const handleProcessFiles = () => {
    if (fileItems.length === 0) return;
    
    // Mark all pending files as completed
    setFileItems(prev => 
      prev.map(item => 
        item.status === 'pending' 
          ? { ...item, status: 'completed' } 
          : item
      )
    );
  };
  
  const handleRemoveFile = (id: string) => {
    setFileItems(prev => {
      // Clean up preview URL before removing the item
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove?.preview) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      
      return prev.filter(item => item.id !== id);
    });
  };
  
  const handleRemoveAllFiles = () => {
    // Clean up object URLs to prevent memory leaks
    fileItems.forEach(item => URL.revokeObjectURL(item.preview));
    setFileItems([]);
  };

  const handleViewDocumentData = () => {
    router.push("/document");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Upload Patient Prescription</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Upload your patient prescriptions by dragging and dropping files or clicking the upload button.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <div
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] transition-colors ${isDragging ? "border-brand-500 bg-brand-50 dark:bg-gray-800" : "border-gray-300 dark:border-gray-700"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Multiple prescriptions supported - PNG, JPG, GIF up to 10MB each
          </p>
          <button
            onClick={handleUploadClick}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Select File
          </button>
        </div>
      </div>

      {/* File Queue Section */}
      {fileItems.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Selected Files ({fileItems.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={handleRemoveAllFiles}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Remove All
              </button>
              <button
                onClick={handleProcessFiles}
                className="px-3 py-1.5 text-xs font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={fileItems.length === 0}
              >
                Process Files
              </button>
            </div>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {fileItems.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <div className="h-12 w-12 rounded bg-gray-200 dark:bg-gray-600 mr-3 overflow-hidden flex-shrink-0">
                    {item.preview && (
                      <Image 
                        src={item.preview} 
                        alt={item.name} 
                        width={48} 
                        height={48} 
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.status === 'pending' && 'Ready to process'}
                      {item.status === 'completed' && 'Processed successfully'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(item.id)}
                    className="ml-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                
                {item.status === 'completed' && (
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Processed</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300 ease-in-out bg-green-500"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* View Document Data Button */}
          {hasProcessedFiles() && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleViewDocumentData}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Document Data
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;