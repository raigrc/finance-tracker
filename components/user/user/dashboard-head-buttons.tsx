import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardHeadButtons = () => {
  const pathname = usePathname();
  return (
    <div className="my-2 space-x-3 py-2">
      <Button variant={pathname === "/dashboard" ? "default" : "ghost"}>
        <Link href="/dashboard">Overview</Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/needs-chart" ? "default" : "ghost"}
      >
        <Link href="/dashboard/needs-chart">Needs</Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/wants-chart" ? "default" : "ghost"}
      >
        <Link href="/dashboard/wants-chart">Wants</Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/savings-chart" ? "default" : "ghost"}
      >
        <Link href="/dashboard/savings-chart">Savings</Link>
      </Button>
    </div>
  );
};

export default DashboardHeadButtons;
