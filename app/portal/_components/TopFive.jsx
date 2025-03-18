"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const CityStackedBarChart = ({ groupedData }) => {
  const chartData = Object.entries(groupedData || {}).flatMap(([province, cities]) => {
    const topCities = Object.entries(cities)
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, 5); // Top 5 cities
    return topCities.map(([city, vets]) => ({
      province,
      city,
      count: vets.length,
    }));
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>City Breakdown by Province</CardTitle>
        <CardDescription>Top 5 Cities per Province</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{ count: { label: "Veterans" } }} className="h-[300px]">
          <BarChart data={chartData}>
            <XAxis dataKey="city" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" stackId="a" fill="#34D399" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CityStackedBarChart;