"use client";

import React, { useEffect, useState } from "react";

import VisitorsChart from "./VisitorsChart";
import RecentUsersTable from "./RecentUsersTable";
import { StatCards } from "./StatCards";
import API from "@/service/api";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [stats, setStats] = useState({
    blogs: 0,
    testimonials: 0,
    users: 0,
    visitors: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogRes, testRes, userRes, visitorsRes] = await Promise.all([
          API.get("/blogs/count"),
          API.get("/testimonials/count"),
          API.get("/contact-us/count"),
          API.get("/visitors/today"),
        ]);
        console.log(blogRes.data.totalBlogs);

        setStats({
          blogs: blogRes.data.totalBlogs || 0,
          testimonials: testRes.data.totalTestimonials || 0,
          users: userRes.data.totalReachedUsers || 0,
          visitors: visitorsRes.data.todayVisitors || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Top Stats */}
      <StatCards stats={stats} />

      {/* Visitors Chart */}
      <VisitorsChart
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {/* Recent Users Table */}
      <RecentUsersTable />
    </div>
  );
};

export default Dashboard;
