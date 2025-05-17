"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserRole } from "@/context/UserContext";

// Dashboard redirects based on user role
const roleBasedRoutes: Record<UserRole, string> = {
  admin: "/hospital/dashboard",
  doctor: "/doctor/dashboard",
  nurse: "/nurse/dashboard",
  patient: "/patient/dashboard",
  superadmin: "/superadmin/dashboard",
};

export default function DashboardRedirect() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      router.push("/auth/signin");
    } else if (user) {
      // Redirect based on user role
      const targetRoute = roleBasedRoutes[user.role] || "/admin/dashboard";
      router.push(targetRoute);
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
} 