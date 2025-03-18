"use client";

import React from "react";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const CumulativeAreaChart = ({ selectedVets }) => {
  const chartData = (selectedVets || [])
    .sort((a, b) => new Date(a.selectedDate) - new Date(b.selectedDate))
    .map((vet, idx) => ({
      date: vet.selectedDate ? new Date(vet.selectedDate).toLocaleDateString() : "Unknown",
      count: idx + 1,
    }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cumulative Research Progress</CardTitle>
        <CardDescription>Total Selected Over Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{ count: { label: "Cumulative" } }} className="h-[300px]">
          <AreaChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" fill="#2DD4BF" stroke="#2DD4BF" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CumulativeAreaChart;