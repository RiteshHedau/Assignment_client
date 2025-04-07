import { useForm } from "react-hook-form";
import { registerUser as apiRegisterUser } from "../../ApiCalls/authUserApi";
import React, { useEffect } from "react";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    console.log("Form Data:", formData);
    submitUser(formData);
    reset();
  };

  useEffect(() => {
    submitUser();
  }, []);

  const submitUser = async (data) => {
    try {
      const response = await apiRegisterUser(data);
      console.log("User registered successfully:", response);
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Educational Theme */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-12 text-white items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6">Start Your Learning Journey</h1>
          <div className="space-y-6">
            <p className="text-xl text-gray-200">Join thousands of students worldwide</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Access to 1000+ courses</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-300">Expert-led tutorials</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-300">Certificate of completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Begin your learning adventure today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input fields with floating labels */}
            <div className="relative">
              <input
                id="name"
                type="text"
                {...register("name", { required: "Full name is required" })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-gray-50"
              >
                Full Name
              </label>
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-gray-50"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-gray-50"
              >
                Password
              </label>
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-gray-50"
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:opacity-90 transform transition-all duration-300 hover:scale-[1.02] focus:scale-[.99] font-medium text-lg shadow-lg shadow-blue-200"
            >
              Start Learning Now
            </button>

            <div className="text-center text-gray-600">
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in to continue
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
