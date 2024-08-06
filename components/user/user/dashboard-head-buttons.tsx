import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardHeadButtons = () => {
  const pathname = usePathname();
  return (
    <div className="my-2 space-x-3 py-2">
      <Button variant={pathname === "/dashboard" ? "default" : "ghost"}>
        <Link href="/">Overview</Link>
      </Button>
      <Button variant={pathname === "/auth" ? "default" : "ghost"}>
        <Link href="/">Needs</Link>
      </Button>
      <Button variant={pathname === "/auth" ? "default" : "ghost"}>
        <Link href="/">Wants</Link>
      </Button>
      <Button variant={pathname === "/auth" ? "default" : "ghost"}>
        <Link href="/">Savings</Link>
      </Button>
    </div>
  );
};

export default DashboardHeadButtons;
