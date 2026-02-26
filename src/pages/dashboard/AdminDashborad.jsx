import React from "react";
import {
  FiUsers,
  FiUser,
  FiHome,
  FiShield,
  FiDollarSign,
  FiMail,
  FiPhone,
  FiPieChart,
  FiTrendingUp,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const AdminDashboard = () => {
  // Mock data - replace with your actual data
  const dashboardData = {
    quotations: {
      total: 245,
      pending: 12,
      approved: 198,
      rejected: 35,
      trend: "up",
    },
    customers: {
      total: 1567,
      active: 1423,
      newThisMonth: 89,
      trend: "up",
    },
    revenue: {
      total: "$124,567",
      thisMonth: "$12,345",
      lastMonth: "$11,234",
      trend: "up",
    },
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const quickLinks = [
    {
      name: "User",
      icon: <FiUsers className="text-2xl" />,
      path: "/users",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Profile",
      icon: <FiUser className="text-2xl" />,
      path: "/profiles",
      color: "from-red-500 to-yellow-500",
    },
    {
      name: "Glass",
      icon: <FiHome className="text-2xl" />,
      path: "/glasss",
      color: "from-gray-800 to-gray-900",
    },
    {
      name: "Mosquito Net",
      icon: <FiShield className="text-2xl" />,
      path: "/mosquito-net",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Vat & Installation",
      icon: <FiDollarSign className="text-2xl" />,
      path: "/vat-setup",
      color: "from-red-500 to-yellow-500",
    },
    {
      name: "Customer",
      icon: <FiUsers className="text-2xl" />,
      path: "/my-customer",
      color: "from-gray-800 to-gray-900",
    },
    {
      name: "Mail Data",
      icon: <FiMail className="text-2xl" />,
      path: "/mail-data",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Phone Data",
      icon: <FiPhone className="text-2xl" />,
      path: "/phone-data",
      color: "from-red-500 to-yellow-500",
    },
  ];

  const statsCards = [
    {
      title: "Total Quotations",
      value: dashboardData.quotations.total,
      icon: <FiPieChart className="text-2xl" />,
      trend: dashboardData.quotations.trend,
      change: "+12%",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
    },
    {
      title: "Total Customers",
      value: dashboardData.customers.total.toLocaleString(),
      icon: <FiUsers className="text-2xl" />,
      trend: dashboardData.customers.trend,
      change: "+8%",
      color: "bg-gradient-to-r from-red-500 to-yellow-500",
    },
    {
      title: "Active Customers",
      value: dashboardData.customers.active.toLocaleString(),
      icon: <FiUser className="text-2xl" />,
      trend: "up",
      change: "+5%",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
    },
    {
      title: "Total Revenue",
      value: dashboardData.revenue.total,
      icon: <FiTrendingUp className="text-2xl" />,
      trend: dashboardData.revenue.trend,
      change: "+15%",
      color: "bg-gradient-to-r from-red-500 to-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold">
              {dashboardData.date}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <FiArrowUp className="text-green-300 mr-1" />
                  ) : (
                    <FiArrowDown className="text-red-300 mr-1" />
                  )}
                  <span className="text-sm text-white/80">{stat.change}</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Links</h2>
              <FiHome className="text-gray-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className={`bg-gradient-to-r ${link.color} rounded-xl p-4 text-white text-center transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl`}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2">{link.icon}</div>
                    <span className="text-sm font-medium">{link.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Analytics Overview
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quotation Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-red-500">
                  {dashboardData.quotations.pending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved</span>
                <span className="font-semibold text-green-500">
                  {dashboardData.quotations.approved}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rejected</span>
                <span className="font-semibold text-gray-500">
                  {dashboardData.quotations.rejected}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Customer Growth
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New This Month</span>
                <span className="font-semibold text-yellow-500">
                  {dashboardData.customers.newThisMonth}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Rate</span>
                <span className="font-semibold text-green-500">
                  {(
                    (dashboardData.customers.active /
                      dashboardData.customers.total) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                  <FiUser className="text-sm" />
                </div>
                <span className="text-gray-700">New quotation request</span>
              </div>
              <span className="text-sm text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-3">
                  <FiMail className="text-sm" />
                </div>
                <span className="text-gray-700">Customer inquiry</span>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Today's Overview</h2>
              <p className="text-white/80">{dashboardData.date}</p>
              <p className="text-white/80 mt-2">
                Everything is running smoothly
              </p>
            </div>
            <FiCalendar className="text-3xl text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
