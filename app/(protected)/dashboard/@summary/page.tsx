"use client";
import DashboardSummary from "@/components/protected/dashboard/dashboard-summary";
import { Budget, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const UserDashboardSummary = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/user_summary`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        setBalance(data.balance);
        setIncome(data.income);
        setSavings(data.savings);
        setExpenses(data.expenses);
      } catch (error) {
        setError((error as Error).message || "Failed to fetch user data");
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
  if (error) return <h1>Error loading data</h1>;

  return (
    <DashboardSummary
      balance={balance}
      income={income}
      expenses={expenses}
      savings={savings}
    />
  );
};

export default UserDashboardSummary;
