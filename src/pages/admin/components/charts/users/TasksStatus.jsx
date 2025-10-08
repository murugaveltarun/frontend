import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { StatsContext } from "../../../../../components/context/StatsProvider";

const COLORS = ["var(--color-status-not-started)", "var(--color-status-completed)", "var(--color-status-in-progress)"]; // replace with your own colors

export default function TasksStatus() {
  const { stats } = useContext(StatsContext);
  const authProviders = stats?.tasks?.status || [];

  const data = authProviders.map(([name, value]) => ({ name, value }));

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div
          style={{
            backgroundColor: "var(--chart-tooltip-bg)",
            border: "1px solid var(--chart-grid)",
            borderRadius: "8px",
            padding: "8px",
            color: "var(--chart-tooltip-text)",
            fontSize: "0.875rem",
          }}
        >
          <strong>{name}</strong>: {value}
        </div>
      );
    }
    return null;
  };
  const [outerRadius, setOuterRadius] = useState(80);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setOuterRadius(60);
      else setOuterRadius(100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="sm:text-xl lg:text-2xl xl:text-3xl text-center">Tasks by Priority</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            fill="var(--chart-area)"
            label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-3 sm:gap-5 mt-4 text-sm sm:text-base">
        {data.map((d) => {
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const percent = ((d.value / total) * 100).toFixed(1);
          return (
            <div key={d.name}>
              <strong>{d.name}:</strong> {d.value} ({percent}%)
            </div>
          );
        })}
      </div>
    </div>
  );
}
