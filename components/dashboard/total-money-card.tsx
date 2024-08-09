import { formatCurrency } from "@/lib/format-currency";
import React, { Suspense } from "react";
import { TbMoneybag } from "react-icons/tb";
import CardDashboard from "./card-dashboard";
import { getAllBudgetByUserId, getBudgetCheck } from "@/data/budget";
import { auth } from "@/auth";

const TotalMoneyCard = async () => {
  const session = await auth();
  if (!session) return null;
  const budgets = await getBudgetCheck(session.user.id as string);

  const overallMoney = budgets.map((budget) => {
    return budget.overallMoney;
  });

  return (
    <CardDashboard
      headerTitle="Total Money"
      headerIcon={<TbMoneybag />}
      content={formatCurrency(overallMoney as any)}
      footerTitle="Overall Money"
      footerValue=""
    />
  );
};

export default TotalMoneyCard;
