import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
