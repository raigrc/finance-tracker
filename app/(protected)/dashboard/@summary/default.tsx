"use client";
import DashboardSummary from "@/components/protected/dashboard/dashboard-summary";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DefaultUserDashboardSummary = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) setError("Failed to fetch user data");

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user.id) {
      fetchData(session?.user.id);
    }
  }, [session]);

  if (!user?.totalMoney) return <h1>User not found</h1>;
  if (error) return <h1>Error loading data</h1>;
  if (loading) return <h1>Loading...</h1>;

  return <DashboardSummary totalMoney={user.totalMoney} />;
};

export default DefaultUserDashboardSummary;
