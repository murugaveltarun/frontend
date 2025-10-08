import React, { useContext } from "react";
import { StatsContext } from "../../../../../components/context/StatsProvider";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

function AccountsCreated() {
  let { stats, setStats } = useContext(StatsContext);

  const createdDates = stats?.users?.createdDates || [];

  // Convert createdDates ([date, count]) into object
  const counts = createdDates.reduce((acc, [date, count]) => {
    // skip null entries safely
    if (!date) return acc;
    acc[date] = count;
    return acc;
  }, {});

  // Get all unique date keys and sort them
  const dates = Object.keys(counts).sort();
  if (dates.length === 0) return null; // handle no data

  // Build full date range
  const minDate = new Date(dates[0]);
  const maxDate = new Date(dates[dates.length - 1]);
  const allDates = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d).toISOString().split("T")[0]);
  }

  // fill missing dates with 0
  const data = allDates.map((date) => ({
    date: format(new Date(date), "dd-MM-yy"),
    count: counts[date] || 0,
  }));
  return (
    <div className="w-full h-60 sm:h-100 sm:p-4">
      <h2 className="sm:text-xl lg:text-2xl xl:text-3xl text-center ">No. of Accounts Created on Each Day</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="var(--chart-text)" fontSize={12} tickMargin={10} />
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
          <Area type="monotone" dataKey="count" stroke="var(--chart-line)" fill="var(--chart-area)" strokeWidth={2} dot={{ r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-3 sm:gap-5 mt-4 text-sm sm:text-base">
        <div>
          <strong>Total:</strong> {data.reduce((sum, d) => sum + d.count, 0)}
        </div>
        <div>
          <strong>Average:</strong> {(data.reduce((sum, d) => sum + d.count, 0) / data.length).toFixed(2)}
        </div>
        <div>
          <strong>Highest:</strong> {Math.max(...data.map((d) => d.count))}
        </div>
        <div>
          <strong>Lowest:</strong> {Math.min(...data.map((d) => d.count))}
        </div>
      </div>
    </div>
  );
}

export default AccountsCreated;
