import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
