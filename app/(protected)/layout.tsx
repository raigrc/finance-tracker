import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./@navbar/page"), { ssr: false });

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProtectedLayout;
