import React from "react";

const RecentUsersTable = () => {
  const recentUsers = [
    { name: "John Doe", email: "john@gmail.com", date: "2025-01-12" },
    { name: "Alice Smith", email: "alice@gmail.com", date: "2025-01-11" },
    { name: "Bob Johnson", email: "bob@gmail.com", date: "2025-01-10" },
    { name: "Riya Patel", email: "riya@gmail.com", date: "2025-01-09" },
    { name: "Aman Kumar", email: "aman@gmail.com", date: "2025-01-08" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-[#4e5da9]">
        Recent Reached Users
      </h2>

      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className=" text-white">
            <tr className="bg-[#4e5da9] text-left">
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Name</th>
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Email</th>
              <th className="p-2 sm:p-3 text-xs sm:text-sm">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-2 sm:p-3 text-xs sm:text-sm">{user.name}</td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm">{user.email}</td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm">{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
