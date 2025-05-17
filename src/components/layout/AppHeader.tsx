"use client";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 h-16">
      <div className={`flex items-center justify-between h-full px-4 lg:px-6 transition-all duration-300 ${isExpanded ? 'lg:ml-[280px]' : 'lg:ml-[90px]'}`}>
        <div className="flex items-center gap-3 flex-1">
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <Link href="/" className="mr-4 lg:hidden">
            <div className="relative h-8 w-32">
              <Image
                fill
                className="dark:hidden"
                src="/logo.svg"
                alt="ThynkPro Logo"
              />
              <Image
                fill
                className="hidden dark:block"
                src="/logo-dark.svg"
                alt="ThynkPro Logo"
              />
            </div>
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="ml-auto flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className={`${isApplicationMenuOpen ? "flex" : "hidden"} lg:flex items-center justify-end gap-3`}>
          
          {/* Notification button */}
          <button className="relative flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.0835 2.75C6.5683 2.75 3.66683 5.65147 3.66683 9.16667V11.6933L2.60203 13.8229C2.27521 14.4762 2.75474 15.2273 3.48867 15.2273H16.6783C17.4123 15.2273 17.8918 14.4762 17.565 13.8229L16.5002 11.6933V9.16667C16.5002 5.65147 13.5987 2.75 10.0835 2.75ZM10.0835 1.25C5.73997 1.25 2.16683 4.82311 2.16683 9.16667V11.3033L1.10203 13.4329C0.275214 14.9929 1.48141 16.7273 3.48867 16.7273H16.6783C18.6856 16.7273 19.8918 14.9929 19.065 13.4329L18.0002 11.3033V9.16667C18.0002 4.82311 14.427 1.25 10.0835 1.25ZM7.33366 17.4167C7.33366 16.5882 8.00516 15.9167 8.8335 15.9167H11.3335C12.1618 15.9167 12.8335 16.5882 12.8335 17.4167C12.8335 18.245 12.1618 18.9167 11.3335 18.9167H8.8335C8.00516 18.9167 7.33366 18.245 7.33366 17.4167Z" fill="currentColor"/>
            </svg>
            <span className="absolute top-2 right-2.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 