// Dashboard.js
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

const Dashboard = ({ data, totals, selectedVets }) => {
  // Fallback if totals is undefined/null
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

  // Calculate totalMia from totals
  const totalMia = useMemo(() => {
    return Object.values(safeTotals).reduce((sum, count) => sum + count, 0);
  }, [safeTotals]);

  // Chart 1: MIA Stats
  const miaChartData = useMemo(() => {
    return [
      { category: "Total MIAs", count: totalMia, fill: "hsl(var(--chart-1))" },
      { category: "Researched", count: selectedVets ? selectedVets.length : 0, fill: "hsl(var(--chart-2))" },
      { category: "Completed", count: 0, fill: "hsl(var(--chart-3))" },
    ];
  }, [totalMia, selectedVets]);

  const miaChartConfig = {
    count: { label: "Count" },
    "Total MIAs": { label: "Total MIAs", color: "hsl(var(--chart-1))" },
    Researched: { label: "Researched", color: "hsl(var(--chart-2))" },
    Completed: { label: "Completed", color: "hsl(var(--chart-3))" },
  };

  const provinceColors = {
    "Alberta": "#F87171", // Soft red (Tailwind red-400)
    "British Columbia": "#60A5FA", // Light blue (Tailwind blue-400)
    "Manitoba": "#FBBF24", // Warm yellow (Tailwind amber-400)
    "New Brunswick": "#34D399", // Teal-green (Tailwind emerald-400)
    "Newfoundland": "#A78BFA", // Purple (Tailwind purple-400)
    "Nova Scotia": "#2DD4BF", // Cyan (Tailwind teal-400)
    "Ontario": "#10B981", // Deep green (Tailwind green-500)
    "Prince Edward Island": "#F472B6", // Pink (Tailwind pink-400)
    "Quebec": "#60E7FF", // Sky blue (Tailwind cyan-300)
    "Saskatchewan": "#F59E0B", // Golden (Tailwind yellow-500)
  };

  const provinceChartData = useMemo(() => {
    return Object.entries(safeTotals).map(([province, count]) => ({
      province,
      count,
      fill: provinceColors[province] || "#6B7280", // Fallback to gray-500 if province not in map
    }));
  }, [safeTotals]);
  
  const provinceChartConfig = {
    count: { label: "Count" },
    ...Object.fromEntries(
      Object.keys(safeTotals).map((province) => [
        province,
        {
          label: province,
          color: provinceColors[province] || "#6B7280", // Consistent with fill
        },
      ])
    ),
  };

  // Optional: Show loading if data isn’t ready
  if (!data) {
    return <div className="p-6 text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 flex justify-center gap-6">
      {/* Chart 1: MIA Stats */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>MIA Research Overview</CardTitle>
          <CardDescription>Total, Researched, and Completed</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={miaChartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={miaChartData}
                dataKey="count"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalMia.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Total MIAs
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing MIA research totals
          </div>
        </CardFooter>
      </Card>

      {/* Chart 2: Province Totals */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Province Distribution</CardTitle>
          <CardDescription>MIA Counts by Province</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={provinceChartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={provinceChartData}
                dataKey="count"
                nameKey="province"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalMia.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Total by Province
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing MIA distribution across provinces
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;