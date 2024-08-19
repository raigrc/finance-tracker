"use client";
import DashboardSummary from "@/components/protected/dashboard/dashboard-summary";
import { Budget, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DefaultUserDashboardSummary = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [income, setIncome] = useState<number | undefined>(undefined);
  const [savings, setSavings] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/user_summary`);
        if (!response.ok) setError("Failed to fetch user data");

        const data = await response.json();

        setBalance(data.balance);
        setIncome(data.income);
        setSavings(data.savings);
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

  if (loading) return <h1>Loading...</h1>;
  if (!balance || !income || !savings) return <h1>Money not found</h1>;
  if (error) return <h1>Error loading data</h1>;

  return (
    <DashboardSummary balance={balance} income={income} savings={savings} />
  );
};

export default DefaultUserDashboardSummary;
