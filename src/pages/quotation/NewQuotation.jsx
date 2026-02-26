import React, { useState } from "react";
import {
  FiUser,
  FiTag,
  FiPercent,
  FiDroplet,
  FiArrowRight,
  FiSearch,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NewQuotation = () => {
  const navigate = useNavigate();

  const customers = [
    { id: 1, name: "John Smith", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Sarah Johnson", phone: "+1 (555) 987-6543" },
    { id: 3, name: "Mike Wilson", phone: "+1 (555) 456-7890" },
    { id: 4, name: "Emily Brown", phone: "+1 (555) 234-5678" },
    { id: 5, name: "Alex Chen", phone: "+1 (555) 345-6789" },
  ];

  const profiles = [
    { id: 1, name: "UPVC Sliding Window", category: "UPVC", maxDiscount: 15 },
    {
      id: 2,
      name: "Aluminium Sliding Door",
      category: "Aluminium",
      maxDiscount: 20,
    },
    { id: 3, name: "UPVC Opening Window", category: "UPVC", maxDiscount: 12 },
    {
      id: 4,
      name: "Aluminium Folding Door",
      category: "Aluminium",
      maxDiscount: 18,
    },
    { id: 5, name: "UPVC Fix Window", category: "UPVC", maxDiscount: 10 },
  ];

  const profileColors = [
    {
      id: 1,
      name: "Yellowest",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      id: 2,
      name: "Redest",
      color: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      id: 3,
      name: "Blackest",
      color: "bg-gradient-to-r from-gray-800 to-black",
    },
    {
      id: 4,
      name: "White",
      color:
        "bg-gradient-to-r from-gray-100 to-gray-300 border border-gray-400",
    },
  ];

  const [formData, setFormData] = useState({
    customer: null,
    profile: null,
    maxDiscount: "",
    profileColor: null,
  });

  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [profileSearch, setProfileSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone.includes(customerSearch)
  );

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(profileSearch.toLowerCase()) ||
      profile.category.toLowerCase().includes(profileSearch.toLowerCase())
  );

  const handleNext = () => {
    if (
      formData.customer &&
      formData.profile &&
      formData.maxDiscount &&
      formData.profileColor
    ) {
      navigate("/quotation-details", { state: formData });
    } else {
      alert("Please fill all required fields");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create New Quotation
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-black rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Fill in the details to create a new quotation
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2">
                Basic Info
              </span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                2
              </div>
              <span className="text-sm font-medium text-gray-500 mt-2">
                Details
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiUser className="mr-2 text-red-500" />
                  Select Customer *
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowCustomerDropdown(!showCustomerDropdown)
                    }
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/70 flex items-center justify-between"
                  >
                    {formData.customer ? (
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {getInitials(formData.customer.name)}
                        </div>
                        <span className="font-medium">
                          {formData.customer.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Choose a customer</span>
                    )}
                    <FiChevronDown
                      className={`text-gray-400 transition-transform ${
                        showCustomerDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showCustomerDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search customers..."
                            value={customerSearch}
                            onChange={(e) => setCustomerSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div className="py-2">
                        {filteredCustomers.map((customer) => (
                          <button
                            key={customer.id}
                            onClick={() => {
                              setFormData({ ...formData, customer });
                              setShowCustomerDropdown(false);
                              setCustomerSearch("");
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                              {getInitials(customer.name)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {customer.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {customer.phone}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiTag className="mr-2 text-yellow-500" />
                  Select Profile *
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/70 flex items-center justify-between"
                  >
                    {formData.profile ? (
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          <FiTag />
                        </div>
                        <span className="font-medium">
                          {formData.profile.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Choose a profile</span>
                    )}
                    <FiChevronDown
                      className={`text-gray-400 transition-transform ${
                        showProfileDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search profiles..."
                            value={profileSearch}
                            onChange={(e) => setProfileSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          />
                        </div>
                      </div>
                      <div className="py-2">
                        {filteredProfiles.map((profile) => (
                          <button
                            key={profile.id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                profile,
                                maxDiscount: profile.maxDiscount.toString(),
                              });
                              setShowProfileDropdown(false);
                              setProfileSearch("");
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-yellow-50 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                <FiTag />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {profile.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {profile.category}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-yellow-600">
                              Max {profile.maxDiscount}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiPercent className="mr-2 text-black" />
                  Max Discount (%) *
                </label>
                <div className="relative">
                  <FiPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    max={formData.profile?.maxDiscount || 100}
                    value={formData.maxDiscount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxDiscount: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black bg-white/70"
                    placeholder="Enter discount percentage"
                  />
                </div>
                {formData.profile && (
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum allowed discount for {formData.profile.name}:{" "}
                    {formData.profile.maxDiscount}%
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiDroplet className="mr-2 text-red-500" />
                  Select Profile Color *
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowColorDropdown(!showColorDropdown)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/70 flex items-center justify-between"
                  >
                    {formData.profileColor ? (
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full mr-3 ${formData.profileColor.color}`}
                        ></div>
                        <span className="font-medium">
                          {formData.profileColor.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Choose a color</span>
                    )}
                    <FiChevronDown
                      className={`text-gray-400 transition-transform ${
                        showColorDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showColorDropdown && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl">
                      <div className="p-4 grid grid-cols-2 gap-3">
                        {profileColors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => {
                              setFormData({ ...formData, profileColor: color });
                              setShowColorDropdown(false);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              formData.profileColor?.id === color.id
                                ? "border-red-500 shadow-lg scale-105"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div
                                className={`w-12 h-12 rounded-full ${color.color} shadow-md`}
                              ></div>
                              <span className="text-sm font-medium text-gray-700">
                                {color.name}
                              </span>
                              {formData.profileColor?.id === color.id && (
                                <FiCheck className="text-red-500" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleNext}
              disabled={
                !formData.customer ||
                !formData.profile ||
                !formData.maxDiscount ||
                !formData.profileColor
              }
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-black text-white px-12 py-4 rounded-xl hover:from-red-600 hover:via-yellow-600 hover:to-gray-900 transition-all duration-300 flex items-center shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-2xl"
            >
              <span className="font-bold text-lg mr-3">Next Step</span>
              <FiArrowRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white mx-auto mb-2">
              <FiUser className="text-lg" />
            </div>
            <p className="text-sm text-gray-600">Customers</p>
            <p className="text-xl font-bold text-gray-900">
              {customers.length}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
              <FiTag className="text-lg" />
            </div>
            <p className="text-sm text-gray-600">Profiles</p>
            <p className="text-xl font-bold text-gray-900">{profiles.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center text-white mx-auto mb-2">
              <FiDroplet className="text-lg" />
            </div>
            <p className="text-sm text-gray-600">Color Options</p>
            <p className="text-xl font-bold text-gray-900">
              {profileColors.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuotation;
