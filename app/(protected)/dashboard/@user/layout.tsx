import React from "react";

const UserLayout = ({
  children,
  userdashboard,
}: {
  children: React.ReactNode;
  userdashboard: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      {userdashboard}
    </div>
  );
};

export default UserLayout;
