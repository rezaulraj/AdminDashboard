import axios from "axios";
import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify"

const ProfileSetup = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

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
    { finish: "Powder Coated" },
    { finish: "Anodized" },
    { finish: "Laminate Foid" },
    { finish: "Painted Wood" },
  ];

  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [deleteProfile, setDeleteProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [toastId, setToastId] = useState(null);

  const [formData, setFormData] = useState({
    material: "",
    category: "",
    color: "",
    finishing: "",
    price: "",
    maxDiscount: "",
  });

  // Fetch all profile data
  const fetchAllProfileData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/material/getAll");
      if (response.status === 200) {
        setProfiles(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfileData();
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.Material?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.Category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.Colour?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || profile.Category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleReset = () => {
    setSelectedRowId(null);
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

  const handleRowClick = (profile) => {
    if (selectedRowId === profile.id) {
      handleReset();
      return;
    }
    setSelectedRowId(profile.id);
    setEditingProfile(profile);
    setFormData({
      material: profile.Material || "",
      category: profile.Category || "",
      color: profile.Colour || "",
      finishing: profile.Finishing || "",
      price: profile.Price || "",
      maxDiscount: profile.MaxDiscount || "",
    });
  };

  const handleCreateNew = () => {
    setEditingProfile(null);
    setSelectedRowId(null);
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
    setSelectedRowId(profile.id);
    setFormData({
      material: profile.Material || "",
      category: profile.Category || "",
      color: profile.Colour || "",
      finishing: profile.Finishing || "",
      price: profile.Price || "",
      maxDiscount: profile.MaxDiscount || "",
    });
    setShowModal(true);
  };

  const handleDelete = (profile) => {
    setDeleteProfile(profile);
  };

  // Add new profile
  const addProfile = async () => {
    try {
      if (
        !formData.material ||
        !formData.category ||
        !formData.color ||
        !formData.price ||
        !formData.maxDiscount
      ) {
        toast.error("All fields are required!");
        return;
      }

      const response = await axiosInstance.post(
        `/material/postMaterial?Material=${formData.material}&Category=${formData.category}&Colour=${formData.color}&Price=${formData.price}&MaxDiscount=${formData.maxDiscount}`,
      );

      if (response.status === 200) {
        toast.success("Profile added successfully!");
        fetchAllProfileData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error("Failed to add profile");
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      if (!selectedRowId && !editingProfile) {
        toast.error("Please select a profile to edit!");
        return;
      }

      if (
        !formData.material ||
        !formData.category ||
        !formData.color ||
        !formData.price ||
        !formData.maxDiscount
      ) {
        toast.error("All fields are required!");
        return;
      }

      const id = editingProfile?.id || selectedRowId;

      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/material/updateMaterialTableByID?Material=${formData.material}&Category=${formData.category}&Colour=${formData.color}&Price=${formData.price}&MaxDiscount=${formData.maxDiscount}&id=${id}`,
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        fetchAllProfileData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Delete profile
  const deleteProfileConfirm = async () => {
    try {
      if (!deleteProfile) {
        toast.error("Please select a profile to delete!");
        return;
      }

      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/material/deleteMaterialByID?id=${deleteProfile.id}`,
      );

      if (response.status === 200) {
        toast.success("Profile deleted successfully!");
        fetchAllProfileData();
        setDeleteProfile(null);
        if (selectedRowId === deleteProfile.id) {
          handleReset();
        }
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    }
  };

  const handleSubmit = () => {
    if (editingProfile || selectedRowId) {
      updateProfile();
    } else {
      addProfile();
    }
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

  const calculateAveragePrice = () => {
    if (profiles.length === 0) return 0;
    const sum = profiles.reduce(
      (acc, profile) => acc + parseFloat(profile.Price || 0),
      0,
    );
    return (sum / profiles.length).toFixed(0);
  };

  const calculateAverageDiscount = () => {
    if (profiles.length === 0) return 0;
    const sum = profiles.reduce(
      (acc, profile) => acc + parseFloat(profile.MaxDiscount || 0),
      0,
    );
    return (sum / profiles.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer autoClose={1000} position="top-right" />

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
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center shadow-lg"
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

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${calculateAveragePrice()}
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
                {calculateAverageDiscount()}$
              </p>
            </div>
            <FiDollarSign className="text-3xl text-blue-500" />
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
              <tr className="bg-gradient-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Material</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Color</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Max Discount
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProfiles.map((profile, index) => (
                <tr
                  key={profile.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedRowId === profile.id ? "bg-red-50" : ""
                  }`}
                  onClick={() => handleRowClick(profile)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 capitalize">
                      {profile.Material}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {profile.Category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getColorBadge(
                        profile.Colour,
                      )}`}
                    >
                      {profile.Colour}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-400 mr-1" />
                      <span className="font-semibold text-gray-900">
                        {profile.Price}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-400 mr-1" />
                      <span className="font-semibold text-red-600">
                        {profile.MaxDiscount}$
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(profile);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Profile"
                      >
                        <FiEdit3 className="text-lg" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(profile);
                        }}
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

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading profile data...</p>
          </div>
        )}

        {!loading && filteredProfiles.length === 0 && (
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

      {/* Modal for Add/Edit */}
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
                    Maximum Discount ($) *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

      {/* Delete Confirmation Modal */}
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
                <strong>{deleteProfile.Material}</strong>? This action cannot be
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
                  onClick={deleteProfileConfirm}
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
