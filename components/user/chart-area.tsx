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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getMonthName } from "@/lib/get-month-name";
import { ChartAreaProps } from "@/types";

const ChartArea = ({
  title,
  description,
  data,
  config,
  width,
}: ChartAreaProps) => {
  return (
    <Card className={`w-${width}`}>
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
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartArea;
