// app/portal/_components/ProvinceCityHeatmap.jsx
"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const ProvinceCityHeatmap = ({ groupedData }) => {
  const chartData = Object.entries(groupedData || {}).flatMap(([province, cities]) =>
    Object.entries(cities).map(([city, vets]) => ({
      name: `${province} - ${city}`,
      count: vets.length,
    }))
  ).sort((a, b) => b.count - a.count).slice(0, 20); // Top 20 for readability

  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Province-City Density</CardTitle>
        <CardDescription>Top 20 Veteran Counts by Location</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{ count: { label: "Veterans" } }} className="h-[300px]">
          <BarChart data={chartData}>
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgba(16, 185, 129, ${entry.count / maxCount})`} // Green gradient
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProvinceCityHeatmap;