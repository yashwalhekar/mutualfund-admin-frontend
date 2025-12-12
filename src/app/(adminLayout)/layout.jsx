"use client";

import Navbar from "@/components/appbar/Navbar";
import Sidebar from "@/components/appbar/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Navbar always visible */}
      <Navbar />

      {/* Desktop Sidebar (only large screens and above) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className="w-full p-6 bg-gray-50 overflow-y-auto lg:ml-[300px]"
        style={{ marginTop: "64px", height: "calc(100vh - 64px)" }}
      >
        {children}
      </main>
    </div>
  );
}
