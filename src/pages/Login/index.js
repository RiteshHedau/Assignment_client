import { useForm } from "react-hook-form";
import { loginUser } from "../../ApiCalls/authUserApi";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      if (response.success) {
        // First store the token
        localStorage.setItem("token", response.data.accessToken);

        // Then update Redux state
        dispatch(setUser(response.data.user));

        // Show success message
        toast.success(response.message);

        // Reset form
        reset();

        // Finally navigate (this should be last)
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 to-indigo-800 p-12 text-white items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-8">Welcome to our platform</h1>
          <p className="text-lg text-gray-200">Transform your experience with our cutting-edge solutions.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome back</h2>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-violet-600 transition-colors"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-violet-600 peer-focus:bg-gray-50"
              >
                Email address
              </label>
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="peer w-full px-4 py-4 border-2 border-gray-200 rounded-xl placeholder-transparent focus:outline-none focus:border-violet-600 transition-colors"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-violet-600 peer-focus:bg-gray-50"
              >
                Password
              </label>
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:opacity-90 transform transition-all duration-300 hover:scale-[1.02] focus:scale-[.99] font-medium text-lg shadow-lg shadow-violet-300"
            >
              Sign in
            </button>

            <div className="text-center text-gray-600">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
