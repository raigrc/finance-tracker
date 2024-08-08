"use client"; // This directive is necessary for client components
import { useSession } from "next-auth/react";

const DashboardLayout = ({
  children,
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status == "loading") return <div>loading...</div>;

  return <div>{session?.user.role == "ADMIN" ? admin : user}</div>;
};

export default DashboardLayout;
