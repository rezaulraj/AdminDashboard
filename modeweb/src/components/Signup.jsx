import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/modalogo.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    navigate("/login");
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-red-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "150px 150px",
            backgroundRepeat: "repeat",
            backgroundBlendMode: "overlay",
          }}
        ></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-yellow-600 to-red-800 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-red-600 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#DC2626 1px, transparent 1px), linear-gradient(90deg, #DC2626 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-red-500">
                Account
              </span>
            </h1>
            <p className="text-lg text-yellow-100">
              Start your journey with Moda Window Door
            </p>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-red-600/30 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-yellow-400 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="block w-full px-4 py-3 bg-black/50 border border-red-600/30 rounded-xl text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 group-hover:border-yellow-500/50"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-yellow-500/0 group-hover:from-red-600/10 group-hover:to-yellow-500/10 transition-all duration-300 -z-10"></div>
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-yellow-400 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="block w-full px-4 py-3 bg-black/50 border border-red-600/30 rounded-xl text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 group-hover:border-yellow-500/50"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-yellow-500/0 group-hover:from-red-600/10 group-hover:to-yellow-500/10 transition-all duration-300 -z-10"></div>
                  </div>
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-yellow-400 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-4 py-3 bg-black/50 border border-red-600/30 rounded-xl text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 group-hover:border-yellow-500/50"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-yellow-500/0 group-hover:from-red-600/10 group-hover:to-yellow-500/10 transition-all duration-300 -z-10"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-yellow-400 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full px-4 py-3 bg-black/50 border border-red-600/30 rounded-xl text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 group-hover:border-yellow-500/50"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-yellow-500/0 group-hover:from-red-600/10 group-hover:to-yellow-500/10 transition-all duration-300 -z-10"></div>
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-yellow-400 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full px-4 py-3 bg-black/50 border border-red-600/30 rounded-xl text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 group-hover:border-yellow-500/50"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-yellow-500/0 group-hover:from-red-600/10 group-hover:to-yellow-500/10 transition-all duration-300 -z-10"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-red-600 focus:ring-yellow-500 border-red-600 rounded bg-black"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-yellow-200"
                >
                  I agree to the Terms and Conditions
                </label>
              </div>

              <div className="group relative">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative">Create Account</span>
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl blur group-hover:blur-md transition-all duration-500 -z-10 opacity-0 group-hover:opacity-30"></div>
              </div>

              <div className="text-center">
                <p className="text-yellow-200">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-300 cursor-pointer"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
