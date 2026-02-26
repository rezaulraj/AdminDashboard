import React, { useState } from "react";
import {
  FiSearch,
  FiRefreshCw,
  FiPhone,
  FiUser,
  FiMapPin,
} from "react-icons/fi";

const PhoneData = () => {
  const [phones, setPhones] = useState([
    {
      id: 1,
      number: "+1 (555) 123-4567",
      country: "United States",
      type: "Mobile",
      status: "active",
      createdAt: "2024-01-15 10:30:00",
    },
    {
      id: 2,
      number: "+1 (555) 987-6543",
      country: "United States",
      type: "Home",
      status: "active",
      createdAt: "2024-01-14 14:22:00",
    },
    {
      id: 3,
      number: "+44 20 7946 0958",
      country: "United Kingdom",
      type: "Mobile",
      status: "inactive",
      createdAt: "2024-01-13 09:15:00",
    },
    {
      id: 4,
      number: "+1 (555) 234-5678",
      country: "United States",
      type: "Work",
      status: "active",
      createdAt: "2024-01-12 16:45:00",
    },
    {
      id: 5,
      number: "+61 2 9876 5432",
      country: "Australia",
      type: "Mobile",
      status: "active",
      createdAt: "2024-01-11 11:20:00",
    },
    {
      id: 6,
      number: "+49 30 12345678",
      country: "Germany",
      type: "Home",
      status: "inactive",
      createdAt: "2024-01-10 08:00:00",
    },
    {
      id: 7,
      number: "+1 (555) 345-6789",
      country: "United States",
      type: "Mobile",
      status: "active",
      createdAt: "2024-01-09 13:45:00",
    },
    {
      id: 8,
      number: "+33 1 42 86 83 27",
      country: "France",
      type: "Work",
      status: "active",
      createdAt: "2024-01-08 15:30:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch =
      phone.number.includes(searchTerm) ||
      phone.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || phone.status === filterStatus;
    const matchesType = filterType === "all" || phone.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-black text-white border-black";
  };

  const getTypeColor = (type) => {
    const typeMap = {
      Mobile: "bg-red-600",
      Home: "bg-yellow-600",
      Work: "bg-black",
    };
    return typeMap[type] || "bg-red-600";
  };

  const getCountryFlag = (country) => {
    const flagMap = {
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      Australia: "🇦🇺",
      Germany: "🇩🇪",
      France: "🇫🇷",
    };
    return flagMap[country] || "🌍";
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Phone Data</h1>
        <p className="text-gray-600 mt-2">
          View all phone numbers and their details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Numbers</p>
              <p className="text-2xl font-bold text-black">{phones.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiPhone className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Active Numbers</p>
              <p className="text-2xl font-bold text-red-600">
                {phones.filter((p) => p.status === "active").length}
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
              <p className="text-gray-600 text-sm">Mobile Numbers</p>
              <p className="text-2xl font-bold text-yellow-600">
                {phones.filter((p) => p.type === "Mobile").length}
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
              <p className="text-gray-600 text-sm">Countries</p>
              <p className="text-2xl font-bold text-black">
                {new Set(phones.map((p) => p.country)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FiMapPin className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search phone numbers..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Types</option>
            <option value="Mobile">Mobile</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
              setFilterType("all");
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
                  Phone Number
                </th>
                <th className="px-6 py-4 text-left font-semibold">Country</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Added Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPhones.map((phone) => (
                <tr
                  key={phone.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${getTypeColor(
                          phone.type
                        )} rounded-full flex items-center justify-center text-white font-semibold mr-3`}
                      >
                        <FiPhone />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {phone.number}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {phone.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {getCountryFlag(phone.country)}
                      </span>
                      <div>
                        <p className="text-gray-900 font-medium">
                          {phone.country}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                        phone.type === "Mobile"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : phone.type === "Home"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      {phone.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        phone.status
                      )}`}
                    >
                      {phone.status.charAt(0).toUpperCase() +
                        phone.status.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(phone.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(phone.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPhones.length === 0 && (
          <div className="text-center py-12">
            <FiPhone className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No phone numbers found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneData;
