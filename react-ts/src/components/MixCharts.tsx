import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { DailyMix } from "../types";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6666",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

interface Props {
  data: DailyMix[];
}

export const MixCharts: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {/* Wyświetlamy wykresy dla 3 dni - dzisiaj, jutro, pojutrze */}
      {data.map((day, index) => {
        const chartData = Object.entries(day.averageMix).map(
          ([name, value]) => ({ name, value }),
        );

        return (
          <div
            key={day.date}
            className="border p-4 rounded shadow-sm text-center"
          >
            <h3 className="text-xl font-bold mb-2">
              {index === 0 ? "Dzisiaj" : index === 1 ? "Jutro" : "Pojutrze"} (
              {day.date})
            </h3>
            <p className="font-semibold text-green-600 mb-4">
              Udział czystej energii: {day.cleanEnergyPercentage.toFixed(2)}%
            </p>
            <div className="flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((_entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) =>
                    typeof value === "number" ? `${value.toFixed(1)}%` : value
                  }
                />
                <Legend />
              </PieChart>
            </div>
          </div>
        );
      })}
    </div>
  );
};
