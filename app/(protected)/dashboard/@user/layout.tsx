import React from "react";

const UserLayout = ({
  children,
  userdashboard,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  userdashboard: React.ReactNode;
}) => {
  return <div>{userdashboard}</div>;
};

export default UserLayout;
