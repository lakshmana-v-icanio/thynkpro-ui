"use client";
import Link from "next/link";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M17.8125 11.4188C17.0531 12.05 16.1094 12.475 15.0688 12.6C14.2266 12.7 13.3688 12.65 12.55 12.4094C10.9312 11.9469 9.6125 10.7031 9.05 9.14375C8.78125 8.35312 8.7 7.54688 8.78125 6.725C8.86875 5.85312 9.13125 5.025 9.5625 4.3C10.0031 3.54688 10.6281 2.91875 11.3563 2.46875C10.4875 2.15625 9.53125 2 8.75 2C4.88125 2 1.75 5.13125 1.75 9C1.75 12.8688 4.88125 16 8.75 16C12.6187 16 15.75 12.8688 15.75 9C15.75 8.5 15.7 8.21875 15.6312 7.9125C16.4531 8.90312 17.2938 10.0875 17.8125 11.4188Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M10 1.25V2.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M10 17.5V18.75" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M3.86328 3.86328L4.76578 4.76578" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M15.2344 15.2344L16.1369 16.1369" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M1.25 10H2.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M17.5 10H18.75" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M3.86328 16.1369L4.76578 15.2344" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M15.2344 4.76578L16.1369 3.86328" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
        {children}
        <div className="lg:w-1/2 w-full h-full bg-blue-950 dark:bg-slate-800/30 lg:grid items-center hidden">
          <div className="relative items-center justify-center flex z-1">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
            
            <div className="flex flex-col items-center max-w-xs">
              <Link href="/" className="block mb-4">
                <div className="flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                    <rect width="48" height="48" rx="8" fill="currentColor"/>
                    <path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10ZM24 18C27.314 18 30 20.686 30 24C30 27.314 27.314 30 24 30C20.686 30 18 27.314 18 24C18 20.686 20.686 18 24 18Z" fill="white"/>
                  </svg>
                  <span className="ml-2 text-2xl font-bold text-white">ThynkPro</span>
                </div>
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Advanced healthcare management platform for clinics and hospitals
              </p>
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </ThemeProvider>
  );
} 