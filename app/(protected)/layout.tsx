import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import dynamic from "next/dynamic";

const ProtectedLayout = async ({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
}) => {
  const NavBar = dynamic(() => import("./@navbar/page"), { ssr: false });
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
