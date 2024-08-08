import React from "react";

const AdminLayout = ({
  admindashboard,
}: {
  admindashboard?: React.ReactNode;
}) => {
  return <div>{admindashboard}</div>;
};

export default AdminLayout;
