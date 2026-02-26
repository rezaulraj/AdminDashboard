import React, { useState } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSave,
  FiX,
  FiPercent,
  FiSettings,
  FiDollarSign,
  FiHome,
  FiLayers,
} from "react-icons/fi";

const VatAndInstallation = () => {
  const vats = [
    { vat: 5 },
    { vat: 7.5 },
    { vat: 10 },
    { vat: 15 },
    { vat: 20 },
    { vat: 25 },
  ];

  const installType = [
    { type: "profile" },
    { type: "glass" },
    { type: "mosquitoNet" },
  ];

  const [vatSettings, setVatSettings] = useState([
    {
      id: 1,
      vatRate: 15,
      description: "Standard VAT Rate",
      isActive: true,
      createdAt: "2024-01-15",
    },
  ]);

  const [installationSettings, setInstallationSettings] = useState([
    {
      id: 1,
      type: "profile",
      price: 25.0,
      description: "Profile Installation",
      isActive: true,
    },
    {
      id: 2,
      type: "glass",
      price: 35.0,
      description: "Glass Installation",
      isActive: true,
    },
    {
      id: 3,
      type: "mosquitoNet",
      price: 15.0,
      description: "Mosquito Net Installation",
      isActive: true,
    },
  ]);

  const [showVatModal, setShowVatModal] = useState(false);
  const [showInstallationModal, setShowInstallationModal] = useState(false);
  const [editingVat, setEditingVat] = useState(null);
  const [editingInstallation, setEditingInstallation] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [activeTab, setActiveTab] = useState("vat");

  const [vatFormData, setVatFormData] = useState({
    vatRate: "",
    description: "",
    isActive: true,
  });

  const [installationFormData, setInstallationFormData] = useState({
    type: "",
    price: "",
    description: "",
    isActive: true,
  });

  const handleCreateVat = () => {
    setEditingVat(null);
    setVatFormData({
      vatRate: "",
      description: "",
      isActive: true,
    });
    setShowVatModal(true);
  };

  const handleCreateInstallation = () => {
    setEditingInstallation(null);
    setInstallationFormData({
      type: "",
      price: "",
      description: "",
      isActive: true,
    });
    setShowInstallationModal(true);
  };

  const handleEditVat = (vat) => {
    setEditingVat(vat);
    setVatFormData({
      vatRate: vat.vatRate,
      description: vat.description,
      isActive: vat.isActive,
    });
    setShowVatModal(true);
  };

  const handleEditInstallation = (installation) => {
    setEditingInstallation(installation);
    setInstallationFormData({
      type: installation.type,
      price: installation.price,
      description: installation.description,
      isActive: installation.isActive,
    });
    setShowInstallationModal(true);
  };

  const handleDelete = (item, type) => {
    setDeleteItem({ ...item, type });
  };

  const confirmDelete = () => {
    if (deleteItem.type === "vat") {
      setVatSettings(vatSettings.filter((vat) => vat.id !== deleteItem.id));
    } else {
      setInstallationSettings(
        installationSettings.filter((inst) => inst.id !== deleteItem.id)
      );
    }
    setDeleteItem(null);
  };

  const handleVatSubmit = () => {
    if (editingVat) {
      setVatSettings(
        vatSettings.map((vat) =>
          vat.id === editingVat.id
            ? {
                ...vat,
                ...vatFormData,
                vatRate: parseFloat(vatFormData.vatRate),
              }
            : vat
        )
      );
    } else {
      const newVat = {
        id: Math.max(...vatSettings.map((v) => v.id)) + 1,
        ...vatFormData,
        vatRate: parseFloat(vatFormData.vatRate),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setVatSettings([...vatSettings, newVat]);
    }
    setShowVatModal(false);
    setEditingVat(null);
  };

  const handleInstallationSubmit = () => {
    if (editingInstallation) {
      setInstallationSettings(
        installationSettings.map((inst) =>
          inst.id === editingInstallation.id
            ? {
                ...inst,
                ...installationFormData,
                price: parseFloat(installationFormData.price),
              }
            : inst
        )
      );
    } else {
      const newInstallation = {
        id: Math.max(...installationSettings.map((i) => i.id)) + 1,
        ...installationFormData,
        price: parseFloat(installationFormData.price),
      };
      setInstallationSettings([...installationSettings, newInstallation]);
    }
    setShowInstallationModal(false);
    setEditingInstallation(null);
  };

  const getStatusColor = (isActive) => {
    return isActive
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-black text-white border-black";
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      profile: "🏗️",
      glass: "🪟",
      mosquitoNet: "🦟",
    };
    return iconMap[type] || "⚙️";
  };

  const getTypeColor = (type) => {
    const colorMap = {
      profile: "bg-red-600",
      glass: "bg-red-600",
      mosquitoNet: "bg-red-600",
    };
    return colorMap[type] || "bg-red-600";
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          VAT & Installation Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage VAT rates and installation pricing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Current VAT Rate</p>
              <p className="text-2xl font-bold text-red-600">
                {vatSettings.find((v) => v.isActive)?.vatRate || 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiPercent className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Installation Types</p>
              <p className="text-2xl font-bold text-black">
                {installationSettings.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiSettings className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Active Settings</p>
              <p className="text-2xl font-bold text-yellow-600">
                {vatSettings.filter((v) => v.isActive).length +
                  installationSettings.filter((i) => i.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiHome className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-1 mb-6 shadow-sm inline-flex">
        <button
          onClick={() => setActiveTab("vat")}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            activeTab === "vat"
              ? "bg-linear-to-r from-red-500 to-yellow-500 text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          VAT Settings
        </button>
        <button
          onClick={() => setActiveTab("installation")}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            activeTab === "installation"
              ? "bg-linear-to-r from-red-500 to-yellow-500 text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Installation Pricing
        </button>
      </div>

      {activeTab === "vat" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">VAT Rates</h2>
            <button
              onClick={handleCreateVat}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
            >
              <FiPlus className="mr-2" />
              Add VAT Rate
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-red-500 to-yellow-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      VAT Rate
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Created Date
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vatSettings.map((vat) => (
                    <tr
                      key={vat.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            <FiPercent />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-red-600">
                              {vat.vatRate}%
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{vat.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            vat.isActive
                          )}`}
                        >
                          {vat.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{vat.createdAt}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditVat(vat)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit VAT"
                          >
                            <FiEdit3 className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(vat, "vat")}
                            className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete VAT"
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
          </div>
        </div>
      )}

      {activeTab === "installation" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">
              Installation Pricing
            </h2>
            <button
              onClick={handleCreateInstallation}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
            >
              <FiPlus className="mr-2" />
              Add Installation Type
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-red-500 to-yellow-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Type</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {installationSettings.map((installation) => (
                    <tr
                      key={installation.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 ${getTypeColor(
                              installation.type
                            )} rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3`}
                          >
                            {getTypeIcon(installation.type)}
                          </div>
                          <div>
                            <p className="font-semibold text-black capitalize">
                              {installation.type}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">
                          {installation.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white mr-3">
                            <FiDollarSign />
                          </div>
                          <p className="font-bold text-lg text-red-600">
                            ${installation.price}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            installation.isActive
                          )}`}
                        >
                          {installation.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditInstallation(installation)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Installation"
                          >
                            <FiEdit3 className="text-lg" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(installation, "installation")
                            }
                            className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete Installation"
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
          </div>
        </div>
      )}

      {showVatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">
                  {editingVat ? "Edit VAT Rate" : "Add New VAT Rate"}
                </h3>
                <button
                  onClick={() => setShowVatModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Rate (%) *
                  </label>
                  <div className="relative">
                    <FiPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={vatFormData.vatRate}
                      onChange={(e) =>
                        setVatFormData({
                          ...vatFormData,
                          vatRate: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select VAT Rate</option>
                      {vats.map((vat, index) => (
                        <option key={index} value={vat.vat}>
                          {vat.vat}%
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={vatFormData.description}
                    onChange={(e) =>
                      setVatFormData({
                        ...vatFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={vatFormData.isActive}
                    onChange={(e) =>
                      setVatFormData({
                        ...vatFormData,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Set as active VAT rate
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowVatModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVatSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {editingVat ? "Update VAT" : "Add VAT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showInstallationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">
                  {editingInstallation
                    ? "Edit Installation"
                    : "Add New Installation"}
                </h3>
                <button
                  onClick={() => setShowInstallationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Installation Type *
                  </label>
                  <div className="relative">
                    <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={installationFormData.type}
                      onChange={(e) =>
                        setInstallationFormData({
                          ...installationFormData,
                          type: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select Type</option>
                      {installType.map((type, index) => (
                        <option key={index} value={type.type}>
                          {type.type}
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
                      value={installationFormData.price}
                      onChange={(e) =>
                        setInstallationFormData({
                          ...installationFormData,
                          price: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={installationFormData.description}
                    onChange={(e) =>
                      setInstallationFormData({
                        ...installationFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={installationFormData.isActive}
                    onChange={(e) =>
                      setInstallationFormData({
                        ...installationFormData,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Set as active
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowInstallationModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInstallationSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {editingInstallation
                    ? "Update Installation"
                    : "Add Installation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-xl text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black text-center mb-2">
                Delete {deleteItem.type === "vat" ? "VAT Rate" : "Installation"}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>
                  {deleteItem.type === "vat"
                    ? `${deleteItem.vatRate}% VAT rate`
                    : `${deleteItem.type} installation`}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteItem(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VatAndInstallation;
