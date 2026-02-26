import React, { useState } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSave,
  FiX,
  FiSearch,
  FiRefreshCw,
  FiDollarSign,
  FiPercent,
  FiTag,
} from "react-icons/fi";

const ProfileSetup = () => {
  const materials = [
    { material: "sliding window" },
    { material: "sliding door" },
    { material: "sliding window with fix" },
    { material: "sliding door with fix" },
    { material: "opening window" },
    { material: "opening door" },
    { material: "push opening" },
    { material: "opening window with fix" },
    { material: "fix window" },
    { material: "folding" },
  ];

  const categories = [
    { category: "upvc" },
    { category: "Thai Aluminium" },
    { category: "Euro Aluminium" },
  ];

  const profileColour = [
    { color: "black" },
    { color: "white" },
    { color: "sahara" },
    { color: "wood design" },
    { color: "normal colour" },
  ];

  const finishing = [
    {
      finish: "Powder Coated",
    },
    {
      finish: "Anodized",
    },
    {
      finish: "Laminate Foid",
    },
    {
      finish: "Painted Wood",
    },
  ];

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      material: "sliding window",
      category: "upvc",
      color: "white",
      finishing: "Powder Coated",
      price: 1250,
      maxDiscount: 15,
    },
    {
      id: 2,
      material: "sliding door",
      category: "Thai Aluminium",
      color: "black",
      finishing: "Anodized",
      price: 1850,
      maxDiscount: 10,
    },
    {
      id: 3,
      material: "opening window",
      category: "Euro Aluminium",
      color: "sahara",
      finishing: "Laminate Foid",
      price: 950,
      maxDiscount: 12,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [deleteProfile, setDeleteProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [formData, setFormData] = useState({
    material: "",
    category: "",
    color: "",
    finishing: "",
    price: "",
    maxDiscount: "",
  });

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.finishing.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || profile.category === filterCategory;
    

    return matchesSearch && matchesCategory;
  });

  const handleCreateNew = () => {
    setEditingProfile(null);
    setFormData({
      material: "",
      category: "",
      color: "",
      finishing: "",
      price: "",
      maxDiscount: "",
    });
    setShowModal(true);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({
      material: profile.material,
      category: profile.category,
      color: profile.color,
      finishing: profile.finishing,
      price: profile.price,
      maxDiscount: profile.maxDiscount,
    });
    setShowModal(true);
  };

  const handleDelete = (profile) => {
    setDeleteProfile(profile);
  };

  const confirmDelete = () => {
    setProfiles(profiles.filter((profile) => profile.id !== deleteProfile.id));
    setDeleteProfile(null);
  };

  const handleSubmit = () => {
    if (editingProfile) {
      setProfiles(
        profiles.map((profile) =>
          profile.id === editingProfile.id
            ? {
                ...profile,
                ...formData,
                price: parseFloat(formData.price),
                maxDiscount: parseFloat(formData.maxDiscount),
              }
            : profile
        )
      );
    } else {
      const newProfile = {
        id: Math.max(...profiles.map((p) => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        maxDiscount: parseFloat(formData.maxDiscount),
      };
      setProfiles([...profiles, newProfile]);
    }
    setShowModal(false);
    setEditingProfile(null);
    setFormData({
      material: "",
      category: "",
      color: "",
      finishing: "",
      price: "",
      maxDiscount: "",
    });
  };

  const getColorBadge = (color) => {
    const colorMap = {
      black: "bg-black text-white",
      white: "bg-white text-gray-800 border border-gray-300",
      sahara: "bg-amber-100 text-amber-800",
      "wood design": "bg-orange-100 text-orange-800",
      "normal colour": "bg-blue-100 text-blue-800",
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  const getFinishingBadge = (finishing) => {
    const finishingMap = {
      "Powder Coated": "bg-purple-100 text-purple-800",
      Anodized: "bg-indigo-100 text-indigo-800",
      "Laminate Foid": "bg-pink-100 text-pink-800",
      "Painted Wood": "bg-amber-100 text-amber-800",
    };
    return finishingMap[finishing] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Setup</h1>
            <p className="text-gray-600 mt-2">
              Manage material profiles, pricing, and discounts
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-linear-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center shadow-lg"
          >
            <FiPlus className="mr-2" />
            Create New Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Profiles</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.length}
              </p>
            </div>
            <FiTag className="text-3xl text-red-500" />
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Active Profiles</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter((p) => p.status === "active").length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {(
                  profiles.reduce((sum, p) => sum + p.price, 0) /
                  profiles.length
                ).toFixed(0)}
              </p>
            </div>
            <FiDollarSign className="text-3xl text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Avg. Discount</p>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  profiles.reduce((sum, p) => sum + p.maxDiscount, 0) /
                  profiles.length
                ).toFixed(1)}
                %
              </p>
            </div>
            <FiPercent className="text-3xl text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>

          {/* <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select> */}

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <FiRefreshCw className="mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">Material</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Color</th>
                <th className="px-6 py-4 text-left font-semibold">Finishing</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Max Discount
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProfiles.map((profile) => (
                <tr
                  key={profile.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 capitalize">
                      {profile.material}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {profile.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getColorBadge(
                        profile.color
                      )}`}
                    >
                      {profile.color}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getFinishingBadge(
                        profile.finishing
                      )}`}
                    >
                      {profile.finishing}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-400 mr-1" />
                      <span className="font-semibold text-gray-900">
                        {profile.price}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiPercent className="text-gray-400 mr-1" />
                      <span className="font-semibold text-red-600">
                        {profile.maxDiscount}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(profile)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Profile"
                      >
                        <FiEdit3 className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(profile)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Profile"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <FiTag className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No profiles found matching your criteria
            </p>
            <button
              onClick={handleCreateNew}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Create First Profile
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProfile ? "Edit Profile" : "Create New Profile"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material Type *
                  </label>
                  <select
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Material</option>
                    {materials.map((material, index) => (
                      <option key={index} value={material.material}>
                        {material.material}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Color</option>
                    {profileColour.map((color, index) => (
                      <option key={index} value={color.color}>
                        {color.color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finishing *
                  </label>
                  <select
                    value={formData.finishing}
                    onChange={(e) =>
                      setFormData({ ...formData, finishing: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Finishing</option>
                    {finishing.map((finish, index) => (
                      <option key={index} value={finish.finish}>
                        {finish.finish}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Discount (%) *
                  </label>
                  <div className="relative">
                    <FiPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.maxDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDiscount: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {editingProfile ? "Update Profile" : "Create Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete Profile
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete the profile for{" "}
                <strong>{deleteProfile.material}</strong>? This action cannot be
                undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteProfile(null)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSetup;
