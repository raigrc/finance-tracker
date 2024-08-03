"use client";

import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "loading" ? <span>Loading...</span> : JSON.stringify(session)}
      <form action={logout}>
        <button type="submit">Signout</button>
      </form>
    </div>
  );
};

export default Dashboard;
