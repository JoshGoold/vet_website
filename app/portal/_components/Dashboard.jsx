// app/portal/_components/Dashboard.js
"use client";

import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
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
import CityStackedBarChart from "./TopFive";
import ResearchLineChart from "./ResearchLineChart";
import ProvinceCityHeatmap from "./HeatMap";
import CumulativeAreaChart from "./CulmativeChart";

const Dashboard = ({ data, totals, groupedData, selectedVets }) => {
  const safeTotals = totals || {
    "Prince Edward Island": 0,
    "Alberta": 0,
    "Newfoundland": 0,
    "Nova Scotia": 0,
    "Manitoba": 0,
    "Quebec": 0,
    "Ontario": 0,
    "Saskatchewan": 0,
    "New Brunswick": 0,
    "British Columbia": 0,
  };

  const totalMia = useMemo(() => {
    return Object.values(safeTotals).reduce((sum, count) => sum + count, 0);
  }, [safeTotals]);

  const miaChartData = useMemo(() => {
    return [
      { category: "Total MIAs", count: totalMia, fill: "#F87171" },
      { category: "In Progress", count: selectedVets ? selectedVets.length : 0, fill: "#60A5FA" },
      { category: "Completed", count: 0, fill: "#FBBF24" },
    ];
  }, [totalMia, selectedVets]);

  const miaChartConfig = {
    count: { label: "Count" },
    "Total MIAs": { label: "Total MIAs", color: "#F87171" },
    "In Progress": { label: "In Progress", color: "#60A5FA" },
    Completed: { label: "Completed", color: "#FBBF24" },
  };

  const provinceColors = {
    "Alberta": "#F87171",
    "British Columbia": "#60A5FA",
    "Manitoba": "#FBBF24",
    "New Brunswick": "#34D399",
    "Newfoundland": "#A78BFA",
    "Nova Scotia": "#2DD4BF",
    "Ontario": "#10B981",
    "Prince Edward Island": "#F472B6",
    "Quebec": "#60E7FF",
    "Saskatchewan": "#F59E0B",
  };

  const provinceChartData = useMemo(() => {
    return Object.entries(safeTotals).map(([province, count]) => ({
      province,
      count,
      fill: provinceColors[province] || "#6B7280",
    }));
  }, [safeTotals]);

  const provinceChartConfig = {
    count: { label: "Count" },
    ...Object.fromEntries(
      Object.keys(safeTotals).map((province) => [
        province,
        { label: province, color: provinceColors[province] || "#6B7280" },
      ])
    ),
  };

  if (!data) {
    return <div className="p-6 text-gray-400 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Research Dashboard</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Monitoring MIA Research Efforts Across Canada
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          <span className="text-lg font-semibold">
            Total MIAs: <span className="text-red-400">{totalMia.toLocaleString()}</span>
          </span>
          <span className="text-lg font-semibold">
            In Progress: <span className="text-blue-400">{selectedVets ? selectedVets.length.toLocaleString() : 0}</span>
          </span>
          <span className="text-lg font-semibold">
            Completed: <span className="text-yellow-400">0</span>
          </span>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Research Status</CardTitle>
            <CardDescription className="text-gray-400">Progress Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={miaChartConfig} className="mx-auto aspect-square max-h-[200px] sm:max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={miaChartData} dataKey="count" nameKey="category" innerRadius={50} strokeWidth={4} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">Current research snapshot</CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Province Distribution</CardTitle>
            <CardDescription className="text-gray-400">Regional Breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={provinceChartConfig} className="mx-auto aspect-square max-h-[200px] sm:max-h-[250px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={provinceChartData} dataKey="count" nameKey="province" innerRadius={50} strokeWidth={4} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">MIAs by province</CardFooter>
        </Card>
      </div>

      {/* Detailed Insights */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Detailed Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CityStackedBarChart groupedData={groupedData} />
          <ProvinceCityHeatmap groupedData={groupedData} />
          <ResearchLineChart selectedVets={selectedVets} />
          <CumulativeAreaChart selectedVets={selectedVets} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Data updated: {new Date().toLocaleDateString()}</p>
        <p>Tracking {totalMia.toLocaleString()} MIAs across {Object.keys(safeTotals).length} provinces</p>
      </div>
    </div>
  );
};

export default Dashboard;