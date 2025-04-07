import { useForm } from "react-hook-form";
import { loginUser } from "../../ApiCalls/authUserApi";
import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await loginUser(data);
      if (response.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.message);

        localStorage.setItem("token", response.data.accessToken);
        //window.location.href = "/";
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }

      reset();
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
