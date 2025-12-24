"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import API from "@/service/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const getCurrentWeekOfMonth = () => {
  const day = new Date().getDate();
  if (day <= 7) return "Week 1";
  if (day <= 14) return "Week 2";
  if (day <= 21) return "Week 3";
  return "Week 4";
};

const VisitorsChart = ({ selectedMonth, setSelectedMonth }) => {
  const [selectedWeek, setSelectedWeek] = useState("");

  const [weeklyCounts, setWeeklyCounts] = useState([0, 0, 0, 0, 0, 0, 0]);

  const barColors = [
    "#4F5CA0",
    "#6C7BCF",
    "#8E9AF3",
    "#4DB6AC",
    "#FFB74D",
    "#E57373",
    "#9575CD",
  ];

  // 🔹 SET CURRENT MONTH & WEEK ON LOAD
  useEffect(() => {
    const today = new Date();

    const currentMonth = today.toLocaleString("default", {
      month: "long",
    });

    setSelectedMonth(currentMonth);
    setSelectedWeek(getCurrentWeekOfMonth());
  }, []);

  // 🔥 FETCH WEEKLY DATA
  useEffect(() => {
    if (!selectedMonth || !selectedWeek) return;

    const fetchWeeklyVisitors = async () => {
      try {
        const res = await API.get(
          `/visitors/weekly?month=${selectedMonth}&week=${selectedWeek}`
        );
        console.log(res);

        if (res.data.success) {
          setWeeklyCounts([
            res.data.data.Mon || 0,
            res.data.data.Tue || 0,
            res.data.data.Wed || 0,
            res.data.data.Thu || 0,
            res.data.data.Fri || 0,
            res.data.data.Sat || 0,
            res.data.data.Sun || 0,
          ]);
        }
      } catch (err) {
        console.error("Weekly visitors fetch error:", err);
      }
    };

    fetchWeeklyVisitors();
  }, [selectedMonth, selectedWeek]);

  const weeklyVisitors = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: `${selectedWeek} Visitors`,
        data: weeklyCounts,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 className="text-lg sm:text-sm md:text-lg font-semibold text-[#4e5da9] font-poppins">
          Visitors in {selectedMonth} - {selectedWeek}
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
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

      <div className="bg-white p-4 rounded-xl shadow-md h-[200px] sm:h-[320px]">
        <Bar
          data={weeklyVisitors}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
            },
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VisitorsChart;
