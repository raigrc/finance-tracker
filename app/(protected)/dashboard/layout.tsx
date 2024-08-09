"use client";
import { useSession } from "next-auth/react";

const DashboardLayout = ({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status == "loading") return <div>...</div>;

  return <div>{session?.user.role == "ADMIN" ? admin : user}</div>;
};

export default DashboardLayout;
