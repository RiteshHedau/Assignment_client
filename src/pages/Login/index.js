import { useForm } from "react-hook-form";
import { loginUser } from "../../ApiCalls/authUserApi";
import React from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-8">
            {/* Placeholder for logo - replace with your actual logo */}
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">LC</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Please enter your details to sign in
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-[1.02] font-semibold text-sm"
            >
              Sign in
            </button>

            <div className="text-center text-gray-600">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
