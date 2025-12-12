"use client";

import { Tooltip } from "@mui/material";

export const StatCards = ({ stats }) => {
  const cardData = [
    {
      label: "Blogs",
      count: stats.blogs,
      desc: "Total number of blogs published",
    },
    {
      label: "Testimonials",
      count: stats.testimonials,
      desc: "Total client testimonials received",
    },
    { label: "Users", count: stats.users, desc: "Total Reached users" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cardData.map((item, i) => (
        <Tooltip key={i} title={item.desc} arrow placement="top">
          <div className="bg-gradient-to-r from-[#444F87] to-[#4F5CA0] text-white p-5 rounded-xl shadow-md text-center text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-300/40 cursor-pointer">
            {/* Count */}
            <div className="text-2xl font-extrabold mt-2">{item.count}</div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
