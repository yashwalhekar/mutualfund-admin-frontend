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
    {
      label: "Users",
      count: stats.users,
      desc: "Total Reached users",
    },
    {
      label: "Toady's Visitors",
      count: stats.visitors,
      desc: "Total Reached users",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6">
      {cardData.map((item, i) => (
        <Tooltip key={i} title={item.desc} arrow placement="top">
          <div
            className="bg-gradient-to-r from-[#444F87] to-[#4F5CA0] 
            text-white 
            px-2 py-3 sm:px-4 sm:py-4 
            rounded-lg sm:rounded-xl 
            shadow-md 
            text-center 
            transition-all 
            hover:scale-105 
            cursor-pointer"
          >
            {/* Label */}
            <p className="text-[11px] sm:text-xs md:text-base opacity-90 truncate">
              {item.label}
            </p>

            {/* Count */}
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold mt-1">
              {item.count}
            </p>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
