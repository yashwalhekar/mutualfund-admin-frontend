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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cardData.map((item, i) => (
        <Tooltip key={i} title={item.desc} arrow placement="top">
          <div className="bg-gradient-to-r from-[#444F87] to-[#4F5CA0] text-white p-4 sm:p-5 rounded-xl shadow-md text-center transition-all hover:scale-105 cursor-pointer">
            {/* Label */}
            <div className="text-sm sm:text-base md:text-lg opacity-90">
              <p>{item.label}</p>
            </div>

            {/* Count */}
            <div className="text-xl sm:text-2xl font-extrabold mt-1">
              {item.count}
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
