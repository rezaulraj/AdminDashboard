import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiSave,
  FiX,
  FiSearch,
  FiRefreshCw,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUserCheck,
} from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddNewCustomer = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteCustomer, setDeleteCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Default user for ByWhom field
  const DEFAULT_USER = "rezaul test";

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\+?\d+$/;
    return regex.test(phone);
  };

  // Fetch all customers
  const fetchAllCustomer = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/customer/getAll");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.Phone_no?.includes(searchTerm) ||
      customer.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.ByWhom?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleCreateNew = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setShowModal(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.Name || "",
      phone: customer.Phone_no || "",
      email: customer.Email || "",
      address: customer.Address || "",
    });
    setShowModal(true);
  };

  const handleDelete = (customer) => {
    setDeleteCustomer(customer);
  };

  // Confirm delete with API call
  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/customer/deleteCustomerByID?id=${deleteCustomer.id}`,
      );

      if (response.status === 200) {
        toast.success("Customer deleted successfully!");
        fetchAllCustomer(); // Refresh the list
        setDeleteCustomer(null);
      } else {
        toast.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Error deleting customer");
    }
  };

  // Handle form submit (Create/Update)
  const handleSubmit = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      toast.warning("All fields are required");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.warning("Please enter a valid phone number");
      return;
    }

    try {
      if (editingCustomer) {
        // Update existing customer
        const response = await axiosInstance.put(
          `/customer/updateCustomerTableByID?Name=${formData.name}&Phone_no=${formData.phone}&Email=${formData.email}&Address=${formData.address}&id=${editingCustomer.id}`,
        );

        if (response.status === 200) {
          toast.success("Customer updated successfully!");
          fetchAllCustomer(); // Refresh the list
          setShowModal(false);
          setEditingCustomer(null);
          setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
          });
        } else {
          toast.error("Failed to update customer");
        }
      } else {
        // Create new customer - Using the correct POST API with ByWhom parameter
        const response = await axiosInstance.post(
          `/customer/postCustomer?Name=${formData.name}&Phone_no=${formData.phone}&Email=${formData.email}&Address=${formData.address}&ByWhom=${DEFAULT_USER}`,
        );

        if (response.status === 200) {
          toast.success("Customer added successfully!");
          fetchAllCustomer(); // Refresh the list
          setShowModal(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
          });
        } else {
          toast.error("Failed to add customer");
        }
      }
    } catch (error) {
      console.error("Error submitting customer:", error);
      toast.error("Error processing request");
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <ToastContainer autoClose={1000} position="top-right" />

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Customer Management
            </h1>
            <p className="text-gray-600 mt-2">
              Add, view, and manage customer information
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center shadow-sm"
          >
            <FiPlus className="mr-2" />
            Add New Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-2xl font-bold text-black">
                {customers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiUser className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Created By</p>
              <p className="text-2xl font-bold text-yellow-600">
                {DEFAULT_USER}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiUserCheck className="text-2xl text-yellow-600" />
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              fetchAllCustomer();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <FiRefreshCw className="mr-2" />
            Reset & Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-yellow-500 text-white">
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Customer</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Contact Information
                </th>
                <th className="px-6 py-4 text-left font-semibold">Address</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Created By
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      {index + 1}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {getInitials(customer.Name)}
                      </div>
                      <div>
                        <p className="font-semibold text-black">
                          {customer.Name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="mr-2 text-red-500" />
                        {customer.Phone_no}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMail className="mr-2 text-red-500" />
                        {customer.Email}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <FiMapPin className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600">
                        {customer.Address}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUserCheck className="mr-2 text-yellow-500" />
                      {customer.ByWhom || "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Customer"
                      >
                        <FiEdit3 className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
                        className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Customer"
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

        {filteredCustomers.length === 0 && !loading && (
          <div className="text-center py-12">
            <FiUser className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No customers found matching your criteria
            </p>
            <button
              onClick={handleCreateNew}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Add First Customer
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <FiRefreshCw className="mx-auto text-4xl text-gray-400 mb-4 animate-spin" />
            <p className="text-gray-500 text-lg">Loading customers...</p>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Customer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">
                  {editingCustomer ? "Edit Customer" : "Add New Customer"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {!editingCustomer && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center">
                    <FiUserCheck className="mr-2" />
                    Customer will be created by:{" "}
                    <strong className="ml-1">{DEFAULT_USER}</strong>
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter customer full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      rows="3"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Enter complete address"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" />
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-black text-center mb-2">
                Delete Customer
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteCustomer.Name}</strong>? This action cannot be
                undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setDeleteCustomer(null)}
                  className="px-6 py-2 text-gray-600 hover:text-black transition-colors border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewCustomer;
