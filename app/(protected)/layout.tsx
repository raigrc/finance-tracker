import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/protected/navbar"), {
  ssr: false,
});

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="fixed top-0 z-10 w-full bg-background">
        <Navbar />
      </div>
      <div className="pt-16">
        <div className="px-3">{children}</div>
      </div>
    </>
  );
};

export default ProtectedLayout;
