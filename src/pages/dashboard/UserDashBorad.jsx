import React from "react";
import {
  FiUsers,
  FiFileText,
  FiUserPlus,
  FiTrendingUp,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiPhone,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const UserDashboard = () => {
  const userData = {
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    quotations: {
      today: 12,
      total: 156,
      pending: 8,
      approved: 132,
      trend: "up",
    },
    customers: {
      total: 89,
      newToday: 3,
      active: 76,
      trend: "up",
    },
    revenue: {
      today: "$2,450",
      monthly: "$28,500",
      trend: "up",
    },
  };

  const quickLinks = [
    {
      name: "My Customers",
      icon: <FiUsers className="text-2xl" />,
      path: "/add-customer",
      description: "Manage customer database",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "New Quotation",
      icon: <FiFileText className="text-2xl" />,
      path: "/quotation",
      description: "Create new quotation",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "New Customer",
      icon: <FiUserPlus className="text-2xl" />,
      path: "/add-customer",
      description: "Add new customer",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Reports",
      icon: <FiBarChart2 className="text-2xl" />,
      path: "/quotation-report",
      description: "View analytics",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const statsCards = [
    {
      title: "Today's Quotations",
      value: userData.quotations.today,
      icon: <FiFileText className="text-2xl" />,
      trend: userData.quotations.trend,
      change: "+18%",
      color: "bg-gradient-to-r from-red-500 to-yellow-500",
      description: "Generated today",
    },
    {
      title: "Total Customers",
      value: userData.customers.total,
      icon: <FiUsers className="text-2xl" />,
      trend: userData.customers.trend,
      change: "+5%",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      description: "Active customers",
    },
    {
      title: "Today's Revenue",
      value: userData.revenue.today,
      icon: <FiDollarSign className="text-2xl" />,
      trend: userData.revenue.trend,
      change: "+12%",
      color: "bg-gradient-to-r from-red-500 to-yellow-500",
      description: "Monthly: $28.5K",
    },
    {
      title: "Pending Approvals",
      value: userData.quotations.pending,
      icon: <FiClock className="text-2xl" />,
      trend: "down",
      change: "-3%",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      description: "Awaiting approval",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "quotation",
      customer: "John Smith",
      amount: "$1,250",
      status: "pending",
      time: "2 hours ago",
      icon: <FiFileText className="text-blue-500" />,
    },
    {
      id: 2,
      type: "customer",
      customer: "Sarah Johnson",
      amount: "-",
      status: "new",
      time: "4 hours ago",
      icon: <FiUserPlus className="text-green-500" />,
    },
    {
      id: 3,
      type: "quotation",
      customer: "Mike Wilson",
      amount: "$3,450",
      status: "approved",
      time: "1 day ago",
      icon: <FiCheckCircle className="text-purple-500" />,
    },
    {
      id: 4,
      type: "quotation",
      customer: "Emily Brown",
      amount: "$890",
      status: "pending",
      time: "1 day ago",
      icon: <FiFileText className="text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 mt-2 flex items-center">
              <FiCalendar className="mr-2" />
              {userData.date}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-white/80 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <FiArrowUp className="text-green-300 mr-1" />
                  ) : (
                    <FiArrowDown className="text-red-300 mr-1" />
                  )}
                  <span className="text-sm text-white/80 mr-2">
                    {stat.change}
                  </span>
                  <span className="text-xs text-white/60">
                    {stat.description}
                  </span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <FiHome className="text-gray-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className={`${link.bgColor} border border-gray-200 rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg ${link.textColor} bg-white shadow-sm group-hover:shadow-md transition-shadow mr-4`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${link.textColor} group-hover:underline`}
                      >
                        {link.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quotation Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">Approved</span>
                  <span className="text-blue-700 font-bold">
                    {userData.quotations.approved}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-orange-700 font-medium">Pending</span>
                  <span className="text-orange-700 font-bold">
                    {userData.quotations.pending}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">
                    Total Generated
                  </span>
                  <span className="text-green-700 font-bold">
                    {userData.quotations.total}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700 font-medium">New Today</span>
                  <span className="text-purple-700 font-bold">
                    {userData.customers.newToday}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">
                    Active Customers
                  </span>
                  <span className="text-green-700 font-bold">
                    {userData.customers.active}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">
                    Conversion Rate
                  </span>
                  <span className="text-blue-700 font-bold">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm mr-3">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.customer}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {activity.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      activity.status === "approved"
                        ? "text-green-600"
                        : activity.status === "pending"
                        ? "text-orange-600"
                        : "text-blue-600"
                    }`}
                  >
                    {activity.amount !== "-" ? activity.amount : "New"}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Monthly Performance</p>
                <p className="text-2xl font-bold mt-1">Excellent</p>
                <p className="text-xs opacity-80 mt-1">
                  Keep up the great work!
                </p>
              </div>
              <FiTrendingUp className="text-3xl opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Quick Quote</p>
              <p className="text-lg font-semibold mt-1">Start New Quotation</p>
            </div>
            <FiFileText className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Customer Support</p>
              <p className="text-lg font-semibold mt-1">Need Help?</p>
            </div>
            <FiPhone className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Settings</p>
              <p className="text-lg font-semibold mt-1">Customize Profile</p>
            </div>
            <FiSettings className="text-2xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
