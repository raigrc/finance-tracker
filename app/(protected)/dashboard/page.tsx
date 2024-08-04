"use client";

import { logout } from "@/actions/logout";
import AdminDashboard from "@/components/user/admin/dashboard";
import UserDashboard from "@/components/user/user/dashboard";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const signOut = () => {
    logout();
  };

  return (
    <div>
      {session?.user.role === "ADMIN" && <AdminDashboard />}
      {session?.user.role === "USER" && <UserDashboard />}
      <button type="submit" onClick={signOut}>
        Signout
      </button>
    </div>
  );
};

export default Dashboard;
