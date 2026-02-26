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
  FiLayers,
  FiDroplet,
} from "react-icons/fi";
import { TbWindow } from "react-icons/tb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const GlassSetup = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const glassThickness = [
    { thickness: "6mm" },
    { thickness: "8mm" },
    { thickness: "10mm" },
    { thickness: "12mm" },
    { thickness: "5+5mm laminated" },
    { thickness: "6+6mm laminated" },
    { thickness: "5+5mm temper laminated" },
    { thickness: "6+6mm temper laminated" },
    { thickness: "5-8-5 insulated" },
    { thickness: "5-8-6 insulated" },
  ];

  const glassColors = [
    { color: "clear" },
    { color: "green" },
    { color: "black" },
  ];

  const [glassTypes, setGlassTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGlass, setEditingGlass] = useState(null);
  const [deleteGlass, setDeleteGlass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterThickness, setFilterThickness] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [formData, setFormData] = useState({
    thickness: "",
    color: "",
    price: "",
  });

  // Fetch all glass data
  const fetchAllGlassData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/glass/getAll");
      if (response.status === 200) {
        setGlassTypes(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch glass data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGlassData();
  }, []);

  const filteredGlassTypes = glassTypes.filter((glass) => {
    const matchesSearch =
      glass.Glass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      glass.Colour?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesThickness =
      filterThickness === "all" || glass.Glass === filterThickness;
    const matchesColor = filterColor === "all" || glass.Colour === filterColor;

    return matchesSearch && matchesThickness && matchesColor;
  });

  const handleReset = () => {
    setSelectedRowId(null);
    setEditingGlass(null);
    setFormData({
      thickness: "",
      color: "",
      price: "",
    });
  };

  const handleRowClick = (glass) => {
    if (selectedRowId === glass.id) {
      handleReset();
      return;
    }
    setSelectedRowId(glass.id);
    setEditingGlass(glass);
    setFormData({
      thickness: glass.Glass || "",
      color: glass.Colour || "",
      price: glass.Price || "",
    });
  };

  const handleCreateNew = () => {
    setEditingGlass(null);
    setSelectedRowId(null);
    setFormData({
      thickness: "",
      color: "",
      price: "",
    });
    setShowModal(true);
  };

  const handleEdit = (glass) => {
    setEditingGlass(glass);
    setSelectedRowId(glass.id);
    setFormData({
      thickness: glass.Glass || "",
      color: glass.Colour || "",
      price: glass.Price || "",
    });
    setShowModal(true);
  };

  const handleDelete = (glass) => {
    setDeleteGlass(glass);
  };

  // Add new glass
  const addGlass = async () => {
    try {
      if (!formData.thickness || !formData.color || !formData.price) {
        toast.error("All fields are required!");
        return;
      }

      const encodedGlass = encodeURIComponent(formData.thickness);

      const response = await axiosInstance.post(
        `/glass/postGlass?Glass=${encodedGlass}&Colour=${formData.color}&Price=${formData.price}`,
      );

      if (response.status === 200) {
        toast.success("Glass added successfully!");
        fetchAllGlassData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error adding glass:", error);
      toast.error("Failed to add glass");
    }
  };

  // Update glass
  const updateGlass = async () => {
    try {
      if (!selectedRowId && !editingGlass) {
        toast.error("Please select a glass to edit!");
        return;
      }

      if (!formData.thickness || !formData.color || !formData.price) {
        toast.error("All fields are required!");
        return;
      }

      const id = editingGlass?.id || selectedRowId;
      const encodedGlass = encodeURIComponent(formData.thickness);

      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/glass/updateGlassTableByID?id=${id}&Glass=${encodedGlass}&Colour=${formData.color}&Price=${formData.price}`,
      );

      if (response.status === 200) {
        toast.success("Glass updated successfully!");
        fetchAllGlassData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error updating glass:", error);
      toast.error("Failed to update glass");
    }
  };

  // Delete glass
  const deleteGlassConfirm = async () => {
    try {
      if (!deleteGlass) {
        toast.error("Please select a glass to delete!");
        return;
      }

      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/glass/deleteUserPasswordByID?id=${deleteGlass.id}`,
      );

      if (response.status === 200) {
        toast.success("Glass deleted successfully!");
        fetchAllGlassData();
        setDeleteGlass(null);
        if (selectedRowId === deleteGlass.id) {
          handleReset();
        }
      }
    } catch (error) {
      console.error("Error deleting glass:", error);
      toast.error("Failed to delete glass");
    }
  };

  const handleSubmit = () => {
    if (editingGlass || selectedRowId) {
      updateGlass();
    } else {
      addGlass();
    }
  };

  const getColorBadge = (color) => {
    const colorMap = {
      clear: "bg-red-100 text-red-800 border-red-200",
      green: "bg-yellow-100 text-yellow-800 border-yellow-200",
      black: "bg-black text-white border-black",
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  const getThicknessColor = (thickness) => {
    if (thickness?.includes("laminated")) return "bg-red-600";
    if (thickness?.includes("insulated")) return "bg-yellow-600";
    if (thickness?.includes("temper")) return "bg-red-700";
    return "bg-red-600";
  };

  const calculateAveragePrice = () => {
    if (glassTypes.length === 0) return 0;
    const sum = glassTypes.reduce(
      (acc, glass) => acc + parseFloat(glass.Price || 0),
      0,
    );
    return (sum / glassTypes.length).toFixed(2);
  };

  const getUniqueColors = () => {
    return new Set(glassTypes.map((glass) => glass.Colour)).size;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <ToastContainer autoClose={1000} position="top-right" />

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Glass Setup</h1>
            <p className="text-gray-600 mt-2">
              Manage glass types, thickness, colors, and pricing
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center shadow-sm"
          >
            <FiPlus className="mr-2" />
            Add New Glass Type
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Glass Types</p>
              <p className="text-2xl font-bold text-black">
                {glassTypes.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <TbWindow className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Average Price</p>
              <p className="text-2xl font-bold text-red-600">
                ${calculateAveragePrice()}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiDollarSign className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Color Variants</p>
              <p className="text-2xl font-bold text-yellow-600">
                {getUniqueColors()}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiDroplet className="text-2xl text-yellow-600" />
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
              placeholder="Search glass types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <select
            value={filterThickness}
            onChange={(e) => setFilterThickness(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Thickness</option>
            {glassThickness.map((thickness, index) => (
              <option key={index} value={thickness.thickness}>
                {thickness.thickness}
              </option>
            ))}
          </select>

          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Colors</option>
            {glassColors.map((color, index) => (
              <option key={index} value={color.color}>
                {color.color}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterThickness("all");
              setFilterColor("all");
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
              <tr className="bg-gradient-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Glass Type
                </th>
                <th className="px-6 py-4 text-left font-semibold">Thickness</th>
                <th className="px-6 py-4 text-left font-semibold">Color</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGlassTypes.map((glass, index) => (
                <tr
                  key={glass.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedRowId === glass.id ? "bg-red-50" : ""
                  }`}
                  onClick={() => handleRowClick(glass)}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${getThicknessColor(
                          glass.Glass,
                        )} rounded-full flex items-center justify-center text-white font-semibold mr-3`}
                      >
                        <TbWindow />
                      </div>
                      <div>
                        <p className="font-semibold text-black capitalize">
                          {glass.Colour} Glass
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                      <FiLayers className="mr-2" />
                      {glass.Glass}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border capitalize ${getColorBadge(
                        glass.Colour,
                      )}`}
                    >
                      <FiDroplet className="mr-2" />
                      {glass.Colour}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white mr-3">
                        <FiDollarSign />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-red-600">
                          ${glass.Price}
                        </p>
                        <p className="text-xs text-gray-500">
                          per square meter
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(glass);
                        }}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Glass Type"
                      >
                        <FiEdit3 className="text-lg" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(glass);
                        }}
                        className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Glass Type"
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
            <p className="text-gray-500 mt-4">Loading glass data...</p>
          </div>
        )}

        {!loading && filteredGlassTypes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLayers className="text-2xl text-red-600" />
            </div>
            <p className="text-gray-500 text-lg">No glass types found</p>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Add First Glass Type
            </button>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">
                  {editingGlass ? "Edit Glass Type" : "Add New Glass Type"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Glass Thickness *
                  </label>
                  <div className="relative">
                    <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.thickness}
                      onChange={(e) =>
                        setFormData({ ...formData, thickness: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Thickness</option>
                      {glassThickness.map((thickness, index) => (
                        <option key={index} value={thickness.thickness}>
                          {thickness.thickness}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Glass Color *
                  </label>
                  <div className="relative">
                    <FiDroplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Color</option>
                      {glassColors.map((color, index) => (
                        <option key={index} value={color.color}>
                          {color.color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (per m²) *
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
                  <p className="text-xs text-gray-500 mt-1">
                    Price per square meter
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {editingGlass ? "Update Glass" : "Add Glass"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteGlass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-xl text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black text-center mb-2">
                Delete Glass Type
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>
                  {deleteGlass.Glass} {deleteGlass.Colour}
                </strong>{" "}
                glass? This action cannot be undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteGlass(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteGlassConfirm}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Glass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlassSetup;
