import React from "react";

const UserLayout = ({
  children,
  navbar,
  userdashboard,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  userdashboard: React.ReactNode;
}) => {
  return (
    <div>
      {navbar}
      {userdashboard}
    </div>
  );
};

export default UserLayout;
