"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserRole } from "@/context/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    // If roles are specified, check if user has permission
    if (allowedRoles && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        // User doesn't have required role, redirect to dashboard
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  // Don't render anything until we've checked auth
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If roles are specified and user doesn't have required role, show loading
  if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and has the required role(s)
  return <>{children}</>;
} 