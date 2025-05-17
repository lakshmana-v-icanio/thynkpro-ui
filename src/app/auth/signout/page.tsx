"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function SignOutPage() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Log the user out
    logout();
    
    // Redirect to sign in page
    router.push("/auth/signin");
  }, [logout, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500">Signing out...</p>
      </div>
    </div>
  );
} 