import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiPercent,
  FiCheck,
  FiX,
  FiSearch,
  FiUserCheck,
  FiUserX,
  FiEdit3,
  FiClock,
  FiSave,
  FiRefreshCw,
} from "react-icons/fi";

const SalesAccountApproval = () => {
  const [salesAccounts, setSalesAccounts] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@sales.com",
      phone: "+1 (555) 123-4567",
      maxDiscount: 15,
      accessStatus: "approved",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@sales.com",
      phone: "+1 (555) 987-6543",
      maxDiscount: 0,
      accessStatus: "denied",
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@sales.com",
      phone: "+1 (555) 456-7890",
      maxDiscount: 0,
      accessStatus: "pending",
      createdDate: "2024-01-12",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@sales.com",
      phone: "+1 (555) 234-5678",
      maxDiscount: 10,
      accessStatus: "approved",
      createdDate: "2024-01-08",
    },
    {
      id: 5,
      name: "Alex Chen",
      email: "alex.chen@sales.com",
      phone: "+1 (555) 345-6789",
      maxDiscount: 0,
      accessStatus: "denied",
      createdDate: "2024-01-14",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [actionType, setActionType] = useState("");
  const filteredAccounts = salesAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || account.accessStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (account) => {
    setSelectedAccount(account);
    setMaxDiscount(account.maxDiscount || 10);
    setActionType("approve");
    setShowAccessModal(true);
  };

  const handleDeny = (account) => {
    setSelectedAccount(account);
    setActionType("deny");
    setShowAccessModal(true);
  };

  const handleUpdate = (account) => {
    setSelectedAccount(account);
    setMaxDiscount(account.maxDiscount || 0);
    setActionType("update");
    setShowAccessModal(true);
  };

  const confirmAction = () => {
    if (selectedAccount) {
      let newStatus = selectedAccount.accessStatus;
      let newDiscount = selectedAccount.maxDiscount;

      if (actionType === "approve") {
        newStatus = "approved";
        newDiscount = maxDiscount;
      } else if (actionType === "deny") {
        newStatus = "denied";
        newDiscount = 0;
      } else if (actionType === "update") {
        newDiscount = maxDiscount;
      }

      setSalesAccounts(
        salesAccounts.map((account) =>
          account.id === selectedAccount.id
            ? {
                ...account,
                accessStatus: newStatus,
                maxDiscount: newDiscount,
              }
            : account
        )
      );
      setShowAccessModal(false);
      setSelectedAccount(null);
      setMaxDiscount(0);
      setActionType("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-red-100 text-red-800 border-red-200";
      case "denied":
        return "bg-black text-white border-black";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FiCheck className="mr-1" />;
      case "denied":
        return <FiX className="mr-1" />;
      case "pending":
        return <FiClock className="mr-1" />;
      default:
        return <FiUser className="mr-1" />;
    }
  };

  const getActionButtons = (account) => {
    switch (account.accessStatus) {
      case "pending":
        return (
          <>
            <button
              onClick={() => handleApprove(account)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
            >
              <FiUserCheck className="mr-1" />
              Approve
            </button>
            <button
              onClick={() => handleDeny(account)}
              className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center text-sm"
            >
              <FiUserX className="mr-1" />
              Deny
            </button>
          </>
        );
      case "approved":
        return (
          <>
            <button
              onClick={() => handleDeny(account)}
              className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center text-sm"
            >
              <FiUserX className="mr-1" />
              Deny Access
            </button>
            <button
              onClick={() => handleUpdate(account)}
              className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center text-sm"
            >
              <FiEdit3 className="mr-1" />
              Update
            </button>
          </>
        );
      case "denied":
        return (
          <>
            <button
              onClick={() => handleApprove(account)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
            >
              <FiUserCheck className="mr-1" />
              Approve Access
            </button>
            <button
              onClick={() => handleUpdate(account)}
              className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center text-sm"
            >
              <FiEdit3 className="mr-1" />
              Update
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (actionType) {
      case "approve":
        return "Approve Account Access";
      case "deny":
        return "Deny Account Access";
      case "update":
        return "Update Account Settings";
      default:
        return "Account Action";
    }
  };

  const getModalDescription = () => {
    switch (actionType) {
      case "approve":
        return "This will grant login access to the sales account";
      case "deny":
        return "This will revoke login access from the sales account";
      case "update":
        return "Update discount and settings for this account";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          Sales Account Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage sales account access permissions and discount limits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {
                  salesAccounts.filter((a) => a.accessStatus === "pending")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiClock className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Approved Accounts</p>
              <p className="text-2xl font-bold text-red-600">
                {
                  salesAccounts.filter((a) => a.accessStatus === "approved")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiUserCheck className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Denied Accounts</p>
              <p className="text-2xl font-bold text-black">
                {
                  salesAccounts.filter((a) => a.accessStatus === "denied")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FiUserX className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>


          <div className="flex space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="denied">Denied</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            >
              <FiRefreshCw className="mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">
                  Sales Person
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Contact Information
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Max Discount
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Access Status
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {account.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-black">
                          {account.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(account.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMail className="mr-2 text-red-500" />
                        {account.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="mr-2 text-red-500" />
                        {account.phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* <FiPercent className="text-red-500 mr-2" /> */}
                      <span
                        className={`text-lg font-bold ${
                          account.maxDiscount > 0
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {account.maxDiscount}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        account.accessStatus
                      )}`}
                    >
                      {getStatusIcon(account.accessStatus)}
                      {account.accessStatus.charAt(0).toUpperCase() +
                        account.accessStatus.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      {getActionButtons(account)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <FiUser className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No sales accounts found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {showAccessModal && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3">
                  {selectedAccount.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {getModalTitle()}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {getModalDescription()}
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-black">{selectedAccount.name}</p>
                <p className="text-sm text-gray-600">{selectedAccount.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Current Status:{" "}
                  <span className="font-medium capitalize">
                    {selectedAccount.accessStatus}
                  </span>
                </p>
              </div>

              {(actionType === "approve" || actionType === "update") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Set Maximum Discount (%)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
                    />
                    <span className="text-xl font-bold text-red-600 min-w-12 text-center">
                      {maxDiscount}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>
              )}

              {actionType === "deny" && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Warning:</strong> Denying access will revoke login
                    permissions and reset discount to 0%.
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAccessModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center ${
                    actionType === "approve"
                      ? "bg-red-600 hover:bg-red-700"
                      : actionType === "deny"
                      ? "bg-black hover:bg-gray-800"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {actionType === "approve" && <FiUserCheck className="mr-2" />}
                  {actionType === "deny" && <FiUserX className="mr-2" />}
                  {actionType === "update" && <FiSave className="mr-2" />}

                  {actionType === "approve" && "Approve Access"}
                  {actionType === "deny" && "Deny Access"}
                  {actionType === "update" && "Update Settings"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesAccountApproval;
