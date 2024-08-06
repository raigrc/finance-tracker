import CardDashboard from "@/components/user/card-dashboard";
import { FaGamepad, FaHouse, FaUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import NavBar from "@/components/user/user/navbar";
import { MdOutlineSavings } from "react-icons/md";
import CurrentDateTime from "@/components/current-date-time";
import { useSession } from "next-auth/react";
import DashboardAnalytics from "./dashboard-analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "../header";
import DashboardHeadButtons from "./dashboard-head-buttons";
import TransactionButton from "../transaction-form";
import BudgetButton from "../budget-form";

const UserDashboard = () => {
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "₱0.00"; // Default value if amount is undefined
    return new Intl.NumberFormat("fil-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const { data: session } = useSession();
  return (
    <div className="space-y-3">
      <NavBar />
      <Header title="Dashboard" />
      <div className="flex justify-between space-x-3 pb-10">
        <CardDashboard
          headerTitle="Total Money"
          headerIcon={<TbMoneybag />}
          content={`${formatCurrency(session?.user.totalMoney)}`}
        />
        <CardDashboard
          headerTitle={`Total Needs`}
          headerIcon={<FaHouse />}
          content={`${formatCurrency(session?.user.budget?.totalNeeds)}`}
        />
        <CardDashboard
          headerTitle={`Total Want`}
          headerIcon={<FaGamepad />}
          content={`${formatCurrency(session?.user.budget?.totalWants)}`}
        />
        <CardDashboard
          headerTitle={`Total Savings`}
          headerIcon={<MdOutlineSavings />}
          content={`${formatCurrency(session?.user.budget?.totalSavings)}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <DashboardHeadButtons />
        <div className="flex items-center gap-x-2">
          <TransactionButton />
          <BudgetButton />
        </div>
      </div>

      <DashboardAnalytics />
    </div>
  );
};

export default UserDashboard;
