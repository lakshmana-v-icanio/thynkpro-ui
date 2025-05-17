"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import { useSidebar } from "@/context/SidebarContext";

export default function ClientLayoutWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  const { isExpanded } = useSidebar();
  const isAuthPage = pathname?.includes('/signin') || pathname?.includes('/signup');

  // Render without navigation components for auth pages
  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  // Render with full navigation for regular pages
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-1 relative">
        <div className="fixed top-0 left-0 h-full z-50 pt-[64px]">
          <AppSidebar />
        </div>
        <Backdrop />
        <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'lg:ml-[280px]' : 'lg:ml-[90px]'}`}>
          <main className="p-6 mt-[64px]">{children}</main>
        </div>
      </div>
    </div>
  );
} 