import React, { useEffect, useState } from "react";
import CardDashboard from "@/components/user/card-dashboard";
import { FaGamepad, FaHouse, FaUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import NavBar from "@/components/user/user/navbar";
import { MdOutlineSavings } from "react-icons/md";
import { Button } from "@/components/ui/button";
import CurrentDateTime from "@/components/current-date-time";

const UserDashboard = () => {
  return (
    <div className="space-y-3">
      <NavBar />
      <div className="flex items-center justify-between">
        <h1 className="py-2 text-3xl font-bold tracking-tight drop-shadow-md">
          Dashboard
        </h1>
        <CurrentDateTime />
      </div>

      <div className="flex justify-between space-x-3">
        <CardDashboard
          headerTitle="Total Amount"
          headerIcon={<TbMoneybag />}
          content="1"
        />
        <CardDashboard
          headerTitle="Savings"
          headerIcon={<MdOutlineSavings />}
          content="2"
        />
        <CardDashboard
          headerTitle="Needs"
          headerIcon={<FaHouse />}
          content="3"
        />
        <CardDashboard
          headerTitle="Wants"
          headerIcon={<FaGamepad />}
          content="4"
        />
      </div>
    </div>
  );
};

export default UserDashboard;
