"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.875 10H3.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.125 5L3.125 10L8.125 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
      </div>
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90 sm:text-3xl">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to create an account!
            </p>
          </div>
          
          <div>
            <form>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div className="sm:col-span-1">
                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="sm:col-span-1">
                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label className="mb-2.5 block font-medium text-gray-800 dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
                  />
                </div>
                
                {/* Password */}
                <div>
                  <label className="mb-2.5 block font-medium text-gray-800 dark:text-white">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 dark:fill-gray-400">
                          <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 dark:fill-gray-400">
                          <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                  />
                  <label htmlFor="terms" className="inline-block font-normal text-gray-500 dark:text-gray-400 text-sm">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </label>
                </div>
                
                {/* Button */}
                <div>
                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-blue-500 shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
