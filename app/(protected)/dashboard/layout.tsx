"use client";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

const DashboardLayout = ({
  children,
  admin,
  user,
  navbar,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
  navbar: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status == "loading") return <div>...</div>;

  return (
    <div>
      {navbar}
      {session?.user.role == "ADMIN" ? admin : user}
    </div>
  );
};

export default DashboardLayout;
