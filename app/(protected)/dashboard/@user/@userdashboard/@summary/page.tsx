"use client";
import CardDashboard from "@/components/user/card-dashboard";
import { FaGamepad, FaHouse, FaUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/lib/format-currency";

const UserSummary = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between space-x-3 pb-10">
      <CardDashboard
        headerTitle="Total Money"
        headerIcon={<TbMoneybag />}
        content={`${formatCurrency(session?.user.budget?.totalAmount)}`}
        footerTitle="Overall Money"
        footerValue=""
      />
      <CardDashboard
        headerTitle={`Total Needs`}
        headerIcon={<FaHouse />}
        content={`${formatCurrency(session?.user.budget?.totalNeeds)}`}
        footerTitle="Total Spending"
        footerValue=""
      />
      <CardDashboard
        headerTitle={`Total Want`}
        headerIcon={<FaGamepad />}
        content={`${formatCurrency(session?.user.budget?.totalWants)}`}
        footerTitle="Total Spending"
        footerValue=""
      />
      <CardDashboard
        headerTitle={`Total Savings`}
        headerIcon={<MdOutlineSavings />}
        content={`${formatCurrency(session?.user.budget?.totalSavings)}`}
        footerTitle="Total Spending"
        footerValue=""
      />
    </div>
  );
};

export default UserSummary;
