"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const VisitorsChart = ({ selectedMonth, setSelectedMonth }) => {
  const [selectedWeek, setSelectedWeek] = useState("Week 1");

  const weeklyData = {
    "Week 1": [20, 35, 50, 25, 40, 60, 30],
    "Week 2": [30, 40, 55, 35, 50, 70, 40],
    "Week 3": [25, 30, 45, 20, 55, 80, 45],
    "Week 4": [40, 55, 60, 30, 70, 90, 50],
  };

  const barColors = [
    "#4F5CA0",
    "#6C7BCF",
    "#8E9AF3",
    "#4DB6AC",
    "#FFB74D",
    "#E57373",
    "#9575CD",
  ];

  const weeklyVisitors = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: `${selectedWeek} Visitors`,
        data: weeklyData[selectedWeek],
        backgroundColor: barColors,
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#4e5da9] font-poppins">
          Visitors in {selectedMonth} — {selectedWeek}
        </h2>

        <div className="flex gap-3">
          <select
            className="border border-blue-400 px-4 py-1 text-[#4e5da9] rounded-md text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="border border-blue-400 px-4 py-1 text-[#4e5da9] rounded-md text-sm"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            {weeks.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <Bar
          data={weeklyVisitors}
          height={80}
          options={{
            animation: {
              duration: 1200,
              easing: "easeInOutQuad",
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                enabled: true,
                animation: {
                  duration: 400,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VisitorsChart;
