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
  FiLayers,
  FiDroplet,
  FiGrid,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const MosquitonetSetup = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const mosquitonettingdesign = [
    { design: "Opening" },
    { design: "Sliding" },
    { design: "Folding" },
  ];

  const mosquitonettingcolour = [
    { color: "Non" },
    { color: "White" },
    { color: "Black" },
    { color: "Two tone" },
  ];

  const [mosquitoNets, setMosquitoNets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNet, setEditingNet] = useState(null);
  const [deleteNet, setDeleteNet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDesign, setFilterDesign] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [formData, setFormData] = useState({
    design: "",
    color: "",
    price: "",
    discount: "",
  });

  // Fetch all mosquito netting data
  const fetchAllMosquitoData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mosquitonetting/getAll");
      if (response.status === 200) {
        setMosquitoNets(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch mosquito net data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMosquitoData();
  }, []);

  const filteredMosquitoNets = mosquitoNets.filter((net) => {
    const matchesSearch =
      net.Design?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      net.Colour?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDesign = filterDesign === "all" || net.Design === filterDesign;
    const matchesColor = filterColor === "all" || net.Colour === filterColor;

    return matchesSearch && matchesDesign && matchesColor;
  });

  const handleReset = () => {
    setSelectedRowId(null);
    setFormData({
      design: "",
      color: "",
      price: "",
      discount: "",
    });
  };

  const handleRowClick = (net) => {
    if (selectedRowId === net.id) {
      handleReset();
      return;
    }
    setSelectedRowId(net.id);
    setEditingNet(net);
    setFormData({
      design: net.Design || "",
      color: net.Colour || "",
      price: net.Price || "",
      discount: net.Discount || "",
    });
  };

  const handleCreateNew = () => {
    setEditingNet(null);
    setSelectedRowId(null);
    setFormData({
      design: "",
      color: "",
      price: "",
      discount: "",
    });
    setShowModal(true);
  };

  const handleEdit = (net) => {
    setEditingNet(net);
    setSelectedRowId(net.id);
    setFormData({
      design: net.Design || "",
      color: net.Colour || "",
      price: net.Price || "",
      discount: net.Discount || "",
    });
    setShowModal(true);
  };

  const handleDelete = (net) => {
    setDeleteNet(net);
  };

  // Add new mosquito net
  const addMosquito = async () => {
    try {
      if (
        !formData.design ||
        !formData.color ||
        !formData.price ||
        !formData.discount
      ) {
        toast.error("All fields are required!");
        return;
      }

      const response = await axiosInstance.post(
        `/mosquitonetting/postMosquitoNetting?Design=${formData.design}&Colour=${formData.color}&Price=${formData.price}&Discount=${formData.discount}`,
      );

      if (response.status === 200) {
        toast.success("Mosquito Net added successfully!");
        fetchAllMosquitoData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error adding mosquito net:", error);
      toast.error("Failed to add mosquito net");
    }
  };

  // Update mosquito net
  const updateMosquito = async () => {
    try {
      if (!selectedRowId && !editingNet) {
        toast.error("Please select a row to edit!");
        return;
      }

      if (
        !formData.design ||
        !formData.color ||
        !formData.price ||
        !formData.discount
      ) {
        toast.error("All fields are required!");
        return;
      }

      const id = editingNet?.id || selectedRowId;

      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/mosquitonetting/updateMosquitoNettingTableByID?Design=${formData.design}&Colour=${formData.color}&Price=${formData.price}&Discount=${formData.discount}&id=${id}`,
      );

      if (response.status === 200) {
        toast.success("Mosquito Net updated successfully!");
        fetchAllMosquitoData();
        setShowModal(false);
        handleReset();
      }
    } catch (error) {
      console.error("Error updating mosquito net:", error);
      toast.error("Failed to update mosquito net");
    }
  };

  // Delete mosquito net
  const deleteMosquito = async () => {
    try {
      if (!deleteNet) {
        toast.error("Please select a mosquito net to delete!");
        return;
      }

      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/mosquitonetting/deleteUserPasswordByID?id=${deleteNet.id}`,
      );

      if (response.status === 200) {
        toast.success("Mosquito Net deleted successfully!");
        fetchAllMosquitoData();
        setDeleteNet(null);
        if (selectedRowId === deleteNet.id) {
          handleReset();
        }
      }
    } catch (error) {
      console.error("Error deleting mosquito net:", error);
      toast.error("Failed to delete mosquito net");
    }
  };

  const handleSubmit = () => {
    if (editingNet || selectedRowId) {
      updateMosquito();
    } else {
      addMosquito();
    }
  };

  const getColorBadge = (color) => {
    const colorMap = {
      White: "bg-red-100 text-red-800 border-red-200",
      Black: "bg-black text-white border-black",
      "Two tone": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Non: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  const getDesignColor = (design) => {
    return "bg-red-600";
  };

  const getDesignIcon = (design) => {
    const iconMap = {
      Opening: "🚪",
      Sliding: "↔️",
      Folding: "📐",
    };
    return iconMap[design] || "🏠";
  };

  const calculateAveragePrice = () => {
    if (mosquitoNets.length === 0) return 0;
    const sum = mosquitoNets.reduce(
      (acc, net) => acc + parseFloat(net.Price || 0),
      0,
    );
    return (sum / mosquitoNets.length).toFixed(2);
  };

  const calculateAverageDiscount = () => {
    if (mosquitoNets.length === 0) return 0;
    const sum = mosquitoNets.reduce(
      (acc, net) => acc + parseFloat(net.Discount || 0),
      0,
    );
    return (sum / mosquitoNets.length).toFixed(1);
  };

  const getUniqueColors = () => {
    return new Set(mosquitoNets.map((net) => net.Colour)).size;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <ToastContainer autoClose={1000} position="top-right" />

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Mosquito Net Setup
            </h1>
            <p className="text-gray-600 mt-2">
              Manage mosquito net designs, colors, pricing, and discounts
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center shadow-sm"
          >
            <FiPlus className="mr-2" />
            Add New Net Type
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Net Types</p>
              <p className="text-2xl font-bold text-black">
                {mosquitoNets.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiGrid className="text-2xl text-red-600" />
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
              <p className="text-gray-600 text-sm">Avg. Discount</p>
              <p className="text-2xl font-bold text-yellow-600">
                ${calculateAverageDiscount()}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiDollarSign className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Color Variants</p>
              <p className="text-2xl font-bold text-black">
                {getUniqueColors()}
              </p>
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FiDroplet className="text-2xl text-white" />
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
              placeholder="Search net types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <select
            value={filterDesign}
            onChange={(e) => setFilterDesign(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Designs</option>
            {mosquitonettingdesign.map((design, index) => (
              <option key={index} value={design.design}>
                {design.design}
              </option>
            ))}
          </select>

          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Colors</option>
            {mosquitonettingcolour.map((color, index) => (
              <option key={index} value={color.color}>
                {color.color}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterDesign("all");
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
                <th className="px-6 py-4 text-left font-semibold">Net Type</th>
                <th className="px-6 py-4 text-left font-semibold">Design</th>
                <th className="px-6 py-4 text-left font-semibold">Color</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Discount</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMosquitoNets.map((net, index) => (
                <tr
                  key={net.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedRowId === net.id ? "bg-red-50" : ""
                  }`}
                  onClick={() => handleRowClick(net)}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${getDesignColor(
                          net.Design,
                        )} rounded-full flex items-center justify-center text-white font-semibold mr-3`}
                      >
                        {getDesignIcon(net.Design)}
                      </div>
                      <div>
                        <p className="font-semibold text-black">
                          {net.Design} Net
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                      <FiLayers className="mr-2" />
                      {net.Design}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getColorBadge(
                        net.Colour,
                      )}`}
                    >
                      <FiDroplet className="mr-2" />
                      {net.Colour}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">${net.Price}</td>
                  <td className="px-6 py-4">
                    <span className="text-red-600 font-semibold">
                      {net.Discount}$
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(net);
                        }}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Net Type"
                      >
                        <FiEdit3 className="text-lg" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(net);
                        }}
                        className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Net Type"
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
            <p className="text-gray-500 mt-4">Loading mosquito net data...</p>
          </div>
        )}

        {!loading && filteredMosquitoNets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiGrid className="text-2xl text-red-600" />
            </div>
            <p className="text-gray-500 text-lg">No mosquito net types found</p>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Add First Net Type
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
                  {editingNet ? "Edit Net Type" : "Add New Net Type"}
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
                    Select Design *
                  </label>
                  <div className="relative">
                    <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.design}
                      onChange={(e) =>
                        setFormData({ ...formData, design: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Design</option>
                      {mosquitonettingdesign.map((design, index) => (
                        <option key={index} value={design.design}>
                          {design.design}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Color *
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
                      {mosquitonettingcolour.map((color, index) => (
                        <option key={index} value={color.color}>
                          {color.color}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    Discount ($) *
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0"
                      required
                    />
                  </div>
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
                  {editingNet ? "Update Net" : "Add Net"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteNet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-xl text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black text-center mb-2">
                Delete Net Type
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>
                  {deleteNet.Design} {deleteNet.Colour}
                </strong>{" "}
                net? This action cannot be undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteNet(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteMosquito}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Net
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MosquitonetSetup;
