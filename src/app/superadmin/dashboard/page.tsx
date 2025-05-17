"use client";
import AuthGuard from "@/components/Auth/AuthGuard";
import SuperAdminDashboard from "@/components/Superadmin/Dashboard";

export default function SuperAdminDashboardPage() {
  return (
    <AuthGuard allowedRoles={["superadmin"]}>
      <SuperAdminDashboard />
    </AuthGuard>
  );
}
