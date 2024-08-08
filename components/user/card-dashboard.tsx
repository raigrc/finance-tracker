import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardDashboardProps } from "@/types";
import { Suspense } from "react";

const CardDashboard = ({
  headerTitle,
  headerIcon,
  content,
  footerTitle,
  footerValue,
}: CardDashboardProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm tracking-wide">{headerTitle}</CardTitle>
        <CardDescription className="text-lg">{headerIcon}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<h1>Loading...</h1>}>
          <h1 className="text-2xl">{content}</h1>
        </Suspense>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {footerTitle}: <span>{footerValue}</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default CardDashboard;
