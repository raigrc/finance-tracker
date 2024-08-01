import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Signout</button>
      </form>
    </div>
  );
};

export default Dashboard;
