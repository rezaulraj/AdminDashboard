import React, { useState } from "react";
import { FiSearch, FiRefreshCw, FiMail, FiUser } from "react-icons/fi";

const MailData = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      to: "john.smith@email.com",
      subject: "Welcome to Our Service",
      message:
        "Thank you for joining our service. We're excited to have you on board!",
      status: "sent",
      createdAt: "2024-01-15 10:30:00",
    },
    {
      id: 2,
      to: "sarah.j@email.com",
      subject: "Password Reset Request",
      message:
        "We received a request to reset your password. Click the link below to proceed.",
      status: "sent",
      createdAt: "2024-01-14 14:22:00",
    },
    {
      id: 3,
      to: "mike.wilson@email.com",
      subject: "Order Confirmation #12345",
      message:
        "Your order has been confirmed and will be shipped within 2 business days.",
      status: "draft",
      createdAt: "2024-01-13 09:15:00",
    },
    {
      id: 4,
      to: "emily.brown@email.com",
      subject: "Payment Received",
      message:
        "We have successfully received your payment. Thank you for your business!",
      status: "sent",
      createdAt: "2024-01-12 16:45:00",
    },
    {
      id: 5,
      to: "alex.chen@email.com",
      subject: "Account Verification Required",
      message:
        "Please verify your email address to complete your account setup.",
      status: "failed",
      createdAt: "2024-01-11 11:20:00",
    },
    {
      id: 6,
      to: "lisa.johnson@email.com",
      subject: "Monthly Newsletter",
      message:
        "Check out our latest updates and featured products in this month's newsletter.",
      status: "sent",
      createdAt: "2024-01-10 08:00:00",
    },
    {
      id: 7,
      to: "david.wilson@email.com",
      subject: "Special Offer Just for You",
      message:
        "As a valued customer, we're offering you an exclusive 20% discount.",
      status: "sent",
      createdAt: "2024-01-09 13:45:00",
    },
    {
      id: 8,
      to: "maria.garcia@email.com",
      subject: "Appointment Reminder",
      message:
        "This is a reminder for your upcoming appointment tomorrow at 2:00 PM.",
      status: "draft",
      createdAt: "2024-01-08 15:30:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = email.to
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || email.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-black text-white border-black";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInitials = (email) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  const getDomain = (email) => {
    return email.split("@")[1];
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Mail Data</h1>
        <p className="text-gray-600 mt-2">
          View all email addresses and their status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Emails</p>
              <p className="text-2xl font-bold text-black">{emails.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiMail className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Sent Emails</p>
              <p className="text-2xl font-bold text-red-600">
                {emails.filter((e) => e.status === "sent").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Draft Emails</p>
              <p className="text-2xl font-bold text-yellow-600">
                {emails.filter((e) => e.status === "draft").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Failed Emails</p>
              <p className="text-2xl font-bold text-black">
                {emails.filter((e) => e.status === "failed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search email addresses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="draft">Draft</option>
            <option value="failed">Failed</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <FiRefreshCw className="mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">
                  Email Address
                </th>
                <th className="px-6 py-4 text-left font-semibold">Subject</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Sent Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmails.map((email) => (
                <tr
                  key={email.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {getInitials(email.to)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {email.to}
                        </p>
                        <p className="text-sm text-gray-500">
                          {getDomain(email.to)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="text-gray-900 font-medium truncate">
                        {email.subject}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {email.message}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        email.status
                      )}`}
                    >
                      {email.status.charAt(0).toUpperCase() +
                        email.status.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(email.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <FiMail className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No email addresses found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailData;
