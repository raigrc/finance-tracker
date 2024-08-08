import CardDashboard from "@/components/user/card-dashboard";
import { FaGamepad, FaHouse, FaUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import NavBar from "@/components/user/user/navbar";
import { MdOutlineSavings } from "react-icons/md";
import { useSession } from "next-auth/react";
import DashboardAnalytics from "./dashboard-analytics";
import Header from "../header";
import DashboardHeadButtons from "./dashboard-head-buttons";
import TransactionButton from "../transaction-form";
import BudgetForm from "../budget-form";
import { formatCurrency } from "@/lib/format-currency";

const UserDashboard = () => {

  const { data: session } = useSession();
  return (
    <div className="space-y-3">
      <NavBar />
      <Header title="Dashboard" />
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
      <div className="flex items-center justify-between">
        <DashboardHeadButtons />
        <div className="flex items-center gap-x-2">
          <TransactionButton />
          <BudgetForm />
        </div>
      </div>

      <DashboardAnalytics />
    </div>
  );
};

export default UserDashboard;
