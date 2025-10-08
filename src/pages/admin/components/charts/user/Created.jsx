import { format } from "date-fns";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Created({ tasks }) {
  // Count tasks per date
  const counts = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Generate all dates between min and max
  const dates = Object.keys(counts).sort();
  if (dates.length === 0) return null; // handle empty tasks

  const minDate = new Date(dates[0]);
  const maxDate = new Date(dates[dates.length - 1]);
  const allDates = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d).toISOString().split("T")[0]);
  }

  const data = allDates.map((date) => ({
    date: format(new Date(date), "dd-MM-yy"), // visible label
    count: counts[date] || 0,
  }));

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="var(--chart-text)"
            fontSize={12}
            tickMargin={10}
          />
          <YAxis
            stroke="var(--chart-text)"
            fontSize={12}
            tickMargin={10}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--chart-tooltip-bg)",
              border: "1px solid var(--chart-grid)",
              borderRadius: "8px",
              color: "var(--chart-tooltip-text)",
              fontSize: "0.875rem",
            }}
            itemStyle={{ color: "var(--chart-tooltip-text)" }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--chart-line)"
            fill="var(--chart-area)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Created;
