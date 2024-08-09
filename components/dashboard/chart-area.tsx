"use client";

import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";
import { IoTrendingUp } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartAreaProps } from "@/types";
import { monthNow } from "@/lib/dates";
import { getMonthName } from "@/lib/get-month-name";

const ChartArea = ({
  title,
  description,
  data,
  config,
  className
}: ChartAreaProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Showing total money for the last 6 months
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="needs"
              type="natural"
              fill="var(--color-needs)"
              fillOpacity={0.4}
              stroke="var(--color-needs)"
              stackId="a"
            />
            <Area
              dataKey="wants"
              type="natural"
              fill="var(--color-wants)"
              fillOpacity={0.4}
              stroke="var(--color-wants)"
              stackId="b"
            />
            <Area
              dataKey="savings"
              type="natural"
              fill="var(--color-savings)"
              fillOpacity={0.4}
              stroke="var(--color-savings)"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              <IoTrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {getMonthName(monthNow)} - {getMonthName(monthNow + 6)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartArea;
