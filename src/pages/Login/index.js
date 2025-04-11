import { useForm } from "react-hook-form";
import { loginUser } from "../../ApiCalls/authUserApi";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import { FiLogIn, FiCheck, FiX } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);

      if (response.success) {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setUser(response.data.user));

        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-toast-slide-in" : "animate-toast-slide-out"
              } max-w-md w-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg pointer-events-auto flex overflow-hidden`}
            >
              <div className="flex-1 p-4 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.15),transparent)]" />
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-11 w-11 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center animate-success-icon">
                      <FiCheck className="h-6 w-6 text-white stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg tracking-tight">
                      Welcome Back!
                    </h3>
                    <p className="text-emerald-50 mt-1 text-sm">
                      Successfully logged in ✨
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-4 border-l border-emerald-200/20 hover:bg-white/10 transition-colors text-white/75 hover:text-white flex items-center"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          ),
          { duration: 2500, position: "top-center" }
        );

        reset();
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-toast-slide-in" : "animate-toast-slide-out"
              } max-w-md w-full bg-gradient-to-br from-rose-500 to-red-600 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg pointer-events-auto flex overflow-hidden`}
            >
              <div className="flex-1 p-4 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.12),transparent)]" />
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-11 w-11 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center animate-error-shake">
                      <FiX className="h-6 w-6 text-white stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg tracking-tight">
                      Access Denied
                    </h3>
                    <p className="text-rose-50 mt-1 text-sm">
                      Invalid credentials provided 🔐
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-4 border-l border-rose-200/20 hover:bg-white/10 transition-colors text-white/75 hover:text-white flex items-center"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          ),
          { duration: 3000, position: "top-center" }
        );
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Something went wrong!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 to-indigo-800 p-12 text-white items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-8">Welcome to our platform</h1>
          <p className="text-lg text-gray-200">
            Transform your experience with our cutting-edge solutions.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome back
            </h2>
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
                <p className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
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
                <p className="mt-1 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:opacity-90 transform transition-all duration-300 hover:scale-[1.02] focus:scale-[.99] font-medium text-lg shadow-lg shadow-violet-300 flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <BiLoaderAlt className="w-6 h-6 animate-spin" />
              ) : (
                <FiLogIn className="w-6 h-6" />
              )}
              {isLoading ? "Signing in..." : "Sign in"}
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
