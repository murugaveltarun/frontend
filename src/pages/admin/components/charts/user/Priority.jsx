import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Priority({ tasks }) {
  const data = [
    { name: "low", count: 0 },
    { name: "medium", count: 0 },
    { name: "high", count: 0 },
  ];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].priority == "low") {
      data[0].count = data[0].count + 1;
    } else if (tasks[i].priority == "medium") {
      data[1].count = data[1].count + 1;
    } else if (tasks[i].priority == "high") {
      data[2].count = data[2].count + 1;
    }
  }
  return (
      <div style={{ width: 350, height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="25%" // spacing between bars
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="var(--chart-text)" fontSize={12} tickMargin={10} />
            <YAxis stroke="var(--chart-text)" fontSize={12} tickMargin={10} allowDecimals={false} />
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
            <Bar
              dataKey="count"
              fill="var(--chart-bar)"
              activeBar={<Rectangle fill="var(--chart-bar-hover)" />}
              radius={[8, 8, 0, 0]} // rounded top corners
              barSize={30} // bar thickness
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}

export default Priority;
