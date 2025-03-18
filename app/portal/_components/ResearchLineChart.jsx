// app/portal/_components/ResearchLineChart.jsx
"use client";

import React from "react";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const ResearchLineChart = ({ selectedVets }) => {
  // Aggregate selectedVets by date
  const chartData = Object.entries(
    (selectedVets || []).reduce((acc, vet) => {
      const date = vet.selectedDate
        ? new Date(vet.selectedDate).toLocaleDateString()
        : "Unknown";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, count }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Research Progress Over Time</CardTitle>
        <CardDescription>Selected Veterans by Date</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{ count: { label: "Selected" } }} className="h-[300px]">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FBBF24" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ResearchLineChart;