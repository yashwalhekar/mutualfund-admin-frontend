"use client";
import API from "@/service/api";
import React, { useEffect, useState } from "react";

const RecentUsersTable = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  const fetchRecentContactedUsers = async () => {
    try {
      const res = await API.get("/contact-us/recent");
      console.log(res);
      setRecentUsers(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRecentContactedUsers();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-[#4e5da9]">
        Recent Reached Users
      </h2>

      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-white">
            <tr className="bg-[#4e5da9] text-left">
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Name</th>
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Email</th>
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-2 sm:p-3 text-xs sm:text-sm">
                  {user.name || "-"}
                </td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm">
                  {user.email || "-"}
                </td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentUsers.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No recent users found
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentUsersTable;
